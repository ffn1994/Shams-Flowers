import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { getProducts, saveProduct } from '@/lib/store';
import { buildProduct, type ProductInput } from '@/lib/validate';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getProducts());
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const input = (await request.json().catch(() => ({}))) as ProductInput;
  const result = buildProduct(input);
  if ('error' in result) return NextResponse.json({ error: result.error }, { status: 400 });
  await saveProduct(result.product);
  return NextResponse.json(result.product, { status: 201 });
}
