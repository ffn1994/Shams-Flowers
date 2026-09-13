import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import { getDict, type Lang } from '@/lib/i18n';
import { formatKwd } from '@/lib/money';
import { OCCASION_LABELS, type Product } from '@/lib/types';

export default function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const t = getDict(lang);
  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={`/${lang}/product/${product.slug}`} className="relative block">
        <img
          src={product.image}
          alt={product.name[lang]}
          className="aspect-square w-full bg-sand-100 object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span className="absolute top-3 start-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-leaf-700">
          {OCCASION_LABELS[product.occasion][lang]}
        </span>
        {product.stock === 0 && (
          <span className="absolute top-3 end-3 rounded-full bg-leaf-900/80 px-3 py-1 text-xs font-semibold text-white">
            {t.product.outOfStock}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/${lang}/product/${product.slug}`} className="font-bold hover:text-blush-700">
          {product.name[lang]}
        </Link>
        <p className="line-clamp-2 text-sm text-leaf-700">{product.description[lang]}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-extrabold text-blush-700" dir="ltr">
            {formatKwd(product.price, lang)}
          </span>
          <AddToCartButton
            productId={product.id}
            lang={lang}
            disabled={product.stock === 0}
            className="btn-primary"
          />
        </div>
      </div>
    </article>
  );
}
