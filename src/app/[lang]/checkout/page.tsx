import CheckoutForm from '@/components/CheckoutForm';
import { getDict, type Lang } from '@/lib/i18n';
import { getProducts } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">{t.checkout.title}</h1>
      <CheckoutForm products={products} lang={lang} />
    </div>
  );
}
