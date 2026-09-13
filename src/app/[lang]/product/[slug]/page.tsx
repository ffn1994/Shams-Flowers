import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import { shopConfig } from '@/lib/config';
import { getDict, type Lang } from '@/lib/i18n';
import { formatKwd } from '@/lib/money';
import { getProduct, getProducts } from '@/lib/store';
import { OCCASION_LABELS } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name[lang]} — ${getDict(lang).brand}`,
    description: product.description[lang],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = getDict(lang);
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = (await getProducts())
    .filter((p) => p.occasion === product.occasion && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href={`/${lang}/shop`} className="text-sm font-semibold text-blush-700">
        ← {t.product.back}
      </Link>

      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name[lang]}
          className="aspect-square w-full rounded-2xl bg-white object-cover shadow-soft"
        />
        <div>
          <span className="rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold text-blush-800">
            {OCCASION_LABELS[product.occasion][lang]}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold">{product.name[lang]}</h1>
          <div className="mt-2 text-2xl font-extrabold text-blush-700" dir="ltr">
            {formatKwd(product.price, lang)}
          </div>
          <p className="mt-4 text-leaf-700">{product.description[lang]}</p>

          <dl className="mt-6 space-y-3 rounded-2xl border border-sand-200 bg-white p-4 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold">{t.product.size}:</dt>
              <dd className="text-leaf-700">{product.size[lang]}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold">{t.product.includes}:</dt>
              <dd className="text-leaf-700">{product.includes[lang]}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton
              productId={product.id}
              lang={lang}
              disabled={product.stock === 0}
              className="btn-primary flex-1"
            />
            <a
              className="btn-ghost"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(
                `${t.brand}: ${product.name[lang]}`,
              )}`}
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-extrabold">{t.product.related}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
