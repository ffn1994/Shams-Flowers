import { shopConfig } from '@/lib/config';
import { getDict, type Lang } from '@/lib/i18n';

export default async function ContactPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const items = [
    { label: t.contact.phone, value: shopConfig.phone, href: `tel:${shopConfig.phone}` },
    {
      label: t.contact.whatsapp,
      value: `+${shopConfig.whatsapp}`,
      href: `https://wa.me/${shopConfig.whatsapp}`,
    },
    {
      label: t.contact.instagram,
      value: `@${shopConfig.instagram}`,
      href: `https://instagram.com/${shopConfig.instagram}`,
    },
    { label: t.contact.location, value: shopConfig.address[lang], href: '' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">{t.contact.title}</h1>
      <p className="mt-3 text-leaf-700">{t.contact.body}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="card p-5">
            <div className="text-sm font-semibold text-leaf-700">{item.label}</div>
            {item.href ? (
              <a
                className="mt-1 block font-bold text-blush-700 hover:underline"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
              >
                {item.value}
              </a>
            ) : (
              <div className="mt-1 font-bold">{item.value}</div>
            )}
          </div>
        ))}
      </div>
      <div className="card mt-6 p-5 text-sm text-leaf-700">{t.footer.hours}</div>
    </div>
  );
}
