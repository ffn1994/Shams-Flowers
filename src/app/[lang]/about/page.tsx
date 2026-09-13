import { getDict, type Lang } from '@/lib/i18n';

export default async function AboutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const stats = [
    { value: '12,000+', label: t.about.stat1 },
    { value: '8', label: t.about.stat2 },
    { value: '4.9/5', label: t.about.stat3 },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">{t.about.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-leaf-700">{t.about.body}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-blush-700" dir="ltr">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-leaf-700">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
