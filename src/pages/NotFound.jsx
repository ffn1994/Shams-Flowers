import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

export default function NotFound() {
  return (
    <section className="section">
      <PageMeta title="الصفحة غير موجودة" />
      <div className="shell max-w-md text-center">
        <div className="text-5xl">🌸</div>
        <h1 className="mt-4 text-hero font-extrabold text-brand-700">٤٠٤</h1>
        <p className="mt-3 text-ink-muted">الصفحة اللي تدورها مو موجودة.</p>
        <Link to="/" className="btn-primary mt-6">
          الرجوع للرئيسية
        </Link>
      </div>
    </section>
  );
}
