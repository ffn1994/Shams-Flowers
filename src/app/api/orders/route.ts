import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deliveryFeeFor, makeReference } from '@/lib/orders';
import { decrementStock, getOrders, getProducts, saveOrder } from '@/lib/store';
import type { Order, OrderItem } from '@/lib/types';
import { isValidKuwaitPhone } from '@/lib/validate';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  return NextResponse.json(await getOrders());
}

type OrderRequest = {
  items?: { productId?: string; quantity?: number }[];
  customer?: Record<string, string>;
  delivery?: { date?: string; slot?: string };
  cardMessage?: string;
  notes?: string;
  payment?: string;
  lang?: string;
};

const SLOTS = ['morning', 'afternoon', 'evening'] as const;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as OrderRequest;
  const catalog = await getProducts();

  const items: OrderItem[] = [];
  for (const line of body.items ?? []) {
    const product = catalog.find((p) => p.id === line.productId);
    const quantity = Math.max(1, Math.min(99, Math.round(Number(line.quantity) || 0)));
    if (!product || !quantity) continue;
    // Price always comes from the catalog, never from the client.
    items.push({ productId: product.id, name: product.name, price: product.price, quantity });
  }
  if (items.length === 0) return NextResponse.json({ error: 'empty_cart' }, { status: 400 });

  const c = body.customer ?? {};
  const name = (c.name ?? '').trim();
  const phone = (c.phone ?? '').replace(/[\s-]/g, '');
  const area = (c.area ?? '').trim();
  if (!name || !area) return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  if (!isValidKuwaitPhone(phone)) return NextResponse.json({ error: 'invalid_phone' }, { status: 400 });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryFeeFor(subtotal);
  const slot = SLOTS.includes(body.delivery?.slot as (typeof SLOTS)[number])
    ? (body.delivery?.slot as (typeof SLOTS)[number])
    : 'evening';

  const order: Order = {
    id: randomUUID(),
    reference: makeReference(),
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    customer: {
      name,
      phone,
      area,
      block: (c.block ?? '').trim(),
      street: (c.street ?? '').trim(),
      house: (c.house ?? '').trim(),
    },
    delivery: {
      date: (body.delivery?.date ?? '').slice(0, 10) || new Date().toISOString().slice(0, 10),
      slot,
    },
    cardMessage: (body.cardMessage ?? '').slice(0, 300),
    notes: (body.notes ?? '').slice(0, 500),
    payment: body.payment === 'knet' ? 'knet' : 'cod',
    status: 'new',
    lang: body.lang === 'en' ? 'en' : 'ar',
    createdAt: new Date().toISOString(),
  };

  await saveOrder(order);
  await decrementStock(items.map((i) => ({ productId: i.productId, quantity: i.quantity })));

  return NextResponse.json(order, { status: 201 });
}
