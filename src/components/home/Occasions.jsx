import { Link } from 'react-router-dom';
import IconBadge from '../IconBadge';
import SectionHeading from '../SectionHeading';
import { ArrowIcon } from '../Icons';
import { occasions } from '../../data/home';

export default function Occasions() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow="مناسباتكم"
          title="نجهز لك كل مناسبة من أولها لآخرها"
          body="اختر المناسبة ونرتب لك التفاصيل — الألوان، الحجم، البالونات، والديكور."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map((occasion) => (
            <article
              key={occasion.id}
              className="group rounded-petal border border-cream-300/70 bg-cream-50 p-6 transition duration-300 ease-soft hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50"
            >
              <IconBadge name={occasion.icon} className="group-hover:bg-white" />
              <h3 className="mt-4 font-extrabold text-ink">{occasion.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{occasion.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/bouquets" className="btn-outline">
            شوف كل الباقات
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
