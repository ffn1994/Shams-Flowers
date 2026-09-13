'use client';

import Link from 'next/link';
import { shopConfig } from '@/lib/config';
import { useCart } from '@/lib/cart';
import { getDict, type Lang } from '@/lib/i18n';
import { formatKwd } from '@/lib/money';
import { deliveryFeeFor } from '@/lib/orders';
import type { Product } from '@/lib/types';

export default function CartView({ products, lang }: { products: Product[]; lang: Lang }) {
  const t = getDict(lang);
  const { lines, setQuantity, remove, ready } = useCart();

  const rows = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((row): row is { line: (typeof lines)[number]; product: Product } => Boolean(row.product));

  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.line.quantity, 0);
  const deliveryFee = deliveryFeeFor(subtotal);

  if (!ready) return <div className="card p-8 text-center text-leaf-700">…</div>;

  if (rows.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-leaf-700">{t.cart.empty}</p>
        <Link href={`/${lang}/shop`} className="btn-primary mt-5">
          {t.cart.continue}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {rows.map(({ line, product }) => (
          <div key={product.id} className="card flex gap-4 p-4">
            <img
              src={product.image}
              alt={product.name[lang]}
              className="h-24 w-24 shrink-0 rounded-xl bg-sand-100 object-cover"
            />
            <div className="flex flex-1 flex-col gap-2">
              <Link
                href={`/${lang}/product/${product.slug}`}
                className="font-bold hover:text-blush-700"
              >
                {product.name[lang]}
              </Link>
              <span className="text-sm text-leaf-700" dir="ltr">
                {formatKwd(product.price, lang)}
              </span>
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="-"
                    className="h-8 w-8 rounded-full border border-sand-200 bg-white font-bold"
                    onClick={() => setQuantity(product.id, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label="+"
                    className="h-8 w-8 rounded-full border border-sand-200 bg-white font-bold"
                    onClick={() => setQuantity(product.id, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-blush-700 hover:underline"
                  onClick={() => remove(product.id)}
                >
                  {t.cart.remove}
                </button>
              </div>
            </div>
            <div className="hidden shrink-0 self-center font-extrabold sm:block" dir="ltr">
              {formatKwd(product.price * line.quantity, lang)}
            </div>
          </div>
        ))}
      </div>

      <aside className="card h-fit space-y-3 p-5">
        <h2 className="text-lg font-bold">{t.checkout.summary}</h2>
        <div className="flex justify-between text-sm">
          <span>{t.cart.subtotal}</span>
          <span dir="ltr">{formatKwd(subtotal, lang)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>{t.cart.delivery}</span>
          <span dir="ltr">
            {deliveryFee === 0 ? t.cart.freeDelivery : formatKwd(deliveryFee, lang)}
          </span>
        </div>
        <div className="flex justify-between border-t border-sand-200 pt-3 text-lg font-extrabold">
          <span>{t.cart.grandTotal}</span>
          <span dir="ltr">{formatKwd(subtotal + deliveryFee, lang)}</span>
        </div>
        <p className="text-xs text-leaf-700">
          {lang === 'ar'
            ? `التوصيل مجاني للطلبات فوق ${(shopConfig.freeDeliveryThreshold / 1000).toFixed(3)} د.ك`
            : `Free delivery on orders above ${(shopConfig.freeDeliveryThreshold / 1000).toFixed(3)} KWD`}
        </p>
        <Link href={`/${lang}/checkout`} className="btn-primary w-full">
          {t.cart.checkout}
        </Link>
        <Link href={`/${lang}/shop`} className="btn-ghost w-full">
          {t.cart.continue}
        </Link>
      </aside>
    </div>
  );
}
