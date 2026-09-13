/**
 * عنصر مؤقت لحد ما تنبني الصفحات
 * Temporary placeholder until the real pages are built.
 */
export default function PagePlaceholder({ title, description }) {
  return (
    <section className="section">
      <div className="shell max-w-2xl text-center">
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold text-brand-800">
          قريباً
        </span>
        <h1 className="mt-4 text-hero font-extrabold text-brand-gradient">{title}</h1>
        {description && <p className="mt-4 text-base text-ink-muted">{description}</p>}
      </div>
    </section>
  );
}
