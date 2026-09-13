import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import ShopFilters from '@/components/ShopFilters';
import { getDict, type Lang } from '@/lib/i18n';
import { getProducts } from '@/lib/store';
import { OCCASIONS, type Occasion } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ occasion?: string; sort?: string; q?: string }>;
}) {
  const { lang } = await params;
  const filters = await searchParams;
  const t = getDict(lang);
  let products = await getProducts();

  const occasion = filters.occasion;
  if (occasion && (OCCASIONS as string[]).includes(occasion)) {
    products = products.filter((p) => p.occasion === (occasion as Occasion));
  }

  const query = (filters.q ?? '').trim().toLowerCase();
  if (query) {
    products = products.filter((p) =>
      [p.name.ar, p.name.en, p.description.ar, p.description.en]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }

  if (filters.sort === 'price-asc') products = [...products].sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-desc') products = [...products].sort((a, b) => b.price - a.price);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">{t.sections.all}</h1>
      <Suspense fallback={null}>
        <ShopFilters lang={lang} />
      </Suspense>
      {products.length === 0 ? (
        <p className="card p-8 text-center text-leaf-700">{t.filters.empty}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
