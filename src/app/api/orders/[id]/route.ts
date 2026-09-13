import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { getOrder, saveOrder } from '@/lib/store';
import type { OrderStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

const STATUSES: OrderStatus[] = ['new', 'confirmed', 'delivered', 'cancelled'];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  const body = (await request.json().catch(() => ({}))) as { status?: string };
  if (!STATUSES.includes(body.status as OrderStatus)) {
    return NextResponse.json({ error: 'invalid_status' }, { status: 400 });
  }
  order.status = body.status as OrderStatus;
  await saveOrder(order);
  return NextResponse.json(order);
}
