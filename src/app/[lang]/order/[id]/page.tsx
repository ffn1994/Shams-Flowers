import Link from 'next/link';
import { notFound } from 'next/navigation';
import { shopConfig } from '@/lib/config';
import { getDict, type Lang } from '@/lib/i18n';
import { formatKwd } from '@/lib/money';
import { getOrder } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function OrderPage({
  params,
}: {
  params: Promise<{ lang: Lang; id: string }>;
}) {
  const { lang, id } = await params;
  const t = getDict(lang);
  const order = await getOrder(id);
  if (!order) notFound();

  const lines = [
    `${t.brand} — ${t.confirm.number}: ${order.reference}`,
    ...order.items.map((item) => `• ${item.name[lang]} × ${item.quantity}`),
    `${t.cart.grandTotal}: ${formatKwd(order.total, lang)}`,
    `${t.checkout.name}: ${order.customer.name}`,
    `${t.checkout.phone}: ${order.customer.phone}`,
    `${t.checkout.area}: ${order.customer.area} - ${order.customer.block} - ${order.customer.street}`,
    `${t.checkout.date}: ${order.delivery.date} (${t.slots[order.delivery.slot]})`,
  ];
  const whatsappHref = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf-100 text-2xl">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-extrabold">{t.confirm.title}</h1>
        <p className="mt-2 text-leaf-700">{t.confirm.body}</p>
        <div className="mt-5 inline-block rounded-xl bg-sand-100 px-5 py-3">
          <div className="text-xs text-leaf-700">{t.confirm.number}</div>
          <div className="text-lg font-extrabold tracking-wide" dir="ltr">
            {order.reference}
          </div>
        </div>

        <ul className="mt-7 space-y-2 border-t border-sand-200 pt-5 text-start text-sm">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3">
              <span>
                {item.name[lang]} × {item.quantity}
              </span>
              <span dir="ltr">{formatKwd(item.price * item.quantity, lang)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-3">
            <span>{t.cart.delivery}</span>
            <span dir="ltr">
              {order.deliveryFee === 0 ? t.cart.freeDelivery : formatKwd(order.deliveryFee, lang)}
            </span>
          </li>
          <li className="flex justify-between gap-3 border-t border-sand-200 pt-3 text-base font-extrabold">
            <span>{t.cart.grandTotal}</span>
            <span dir="ltr">{formatKwd(order.total, lang)}</span>
          </li>
        </ul>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a className="btn-primary" href={whatsappHref} target="_blank" rel="noreferrer">
            {t.confirm.whatsapp}
          </a>
          <Link className="btn-ghost" href={`/${lang}`}>
            {t.confirm.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
