/** عنوان قسم موحّد: شارة صغيرة + عنوان + وصف */
export default function SectionHeading({ eyebrow, title, body, align = 'center' }) {
  const alignment = align === 'start' ? 'text-start' : 'text-center mx-auto';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold text-brand-800">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
      {body && <p className="mt-3 text-base leading-relaxed text-ink-muted">{body}</p>}
    </div>
  );
}
