import { whatsappUrl } from '../siteConfig';
import { formatKwd } from '../utils/money';
import { categoryLabel } from '../data/packages';

/** بطاقة تنسيقة — صورة، المناسبة، الاسم، السعر، وزر طلب على الواتساب */
export default function PackageCard({ item }) {
  const { name, note, price, priceLabel = 'يبدأ من', onRequest, image, category, tag } = item;

  return (
    <article className="card group flex flex-col overflow-hidden transition duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="aspect-[4/3] w-full bg-cream-100 object-cover sm:aspect-square"
        />
        <span className="absolute top-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-700 shadow-soft">
          {categoryLabel(category)}
        </span>
        {tag && (
          <span className="absolute top-3 end-3 rounded-full bg-brand-700/90 px-3 py-1 text-xs font-bold text-white">
            {tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-extrabold text-ink">{name}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{note}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <span className="text-sm text-ink-faint">
            {onRequest ? (
              <span className="text-base font-extrabold text-brand-700">حسب الطلب</span>
            ) : (
              <>
                {priceLabel}{' '}
                <span className="text-base font-extrabold text-brand-700">{formatKwd(price)}</span>
              </>
            )}
          </span>
          <a
            href={whatsappUrl(`السلام عليكم، أبغى أطلب: ${name} 🌸`)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            اطلب الآن
          </a>
        </div>
      </div>
    </article>
  );
}
