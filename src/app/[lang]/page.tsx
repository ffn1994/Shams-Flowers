import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { shopConfig } from '@/lib/config';
import { getDict, type Lang } from '@/lib/i18n';
import { getProducts } from '@/lib/store';
import { OCCASION_LABELS, OCCASIONS } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function HomePage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const products = await getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <section className="bg-gradient-to-b from-blush-50 to-sand-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-blush-700 shadow-soft">
              {t.hero.badge}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-leaf-900 md:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-md text-base text-leaf-700">{t.hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/${lang}/shop`} className="btn-primary">
                {t.hero.cta}
              </Link>
              <a
                href={`https://wa.me/${shopConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {t.hero.secondary}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((product, index) => (
                <img
                  key={product.id}
                  src={product.image}
                  alt={product.name[lang]}
                  className={`w-full rounded-2xl bg-white object-cover shadow-soft ${
                    index % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: '🌷', ...t.features.fresh },
            { icon: '🚚', ...t.features.delivery },
            { icon: '🎀', ...t.features.custom },
          ].map((feature) => (
            <div key={feature.title} className="card p-5">
              <div className="text-2xl">{feature.icon}</div>
              <h3 className="mt-2 font-bold">{feature.title}</h3>
              <p className="mt-1 text-sm text-leaf-700">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-4 text-2xl font-extrabold">{t.sections.categories}</h2>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((occasion) => (
            <Link
              key={occasion}
              href={`/${lang}/shop?occasion=${occasion}`}
              className="rounded-full border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-leaf-700 transition hover:border-blush-300 hover:text-blush-700"
            >
              {OCCASION_LABELS[occasion][lang]}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">{t.sections.featured}</h2>
          <Link href={`/${lang}/shop`} className="text-sm font-semibold text-blush-700">
            {t.sections.all} →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </section>
    </>
  );
}
