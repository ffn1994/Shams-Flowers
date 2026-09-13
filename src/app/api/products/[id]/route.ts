import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deleteProduct, getProduct, saveProduct } from '@/lib/store';
import { buildProduct, type ProductInput } from '@/lib/validate';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const existing = await getProduct(id);
  if (!existing) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  const input = (await request.json().catch(() => ({}))) as ProductInput;
  const result = buildProduct(input, existing);
  if ('error' in result) return NextResponse.json({ error: result.error }, { status: 400 });
  await saveProduct(result.product);
  return NextResponse.json(result.product);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const removed = await deleteProduct(id);
  if (!removed) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
