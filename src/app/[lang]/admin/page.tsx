import AdminDashboard from '@/components/AdminDashboard';
import { getDict, type Lang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">{t.admin.title}</h1>
      <AdminDashboard lang={lang} />
    </div>
  );
}
