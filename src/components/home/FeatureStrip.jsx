import IconBadge from '../IconBadge';
import { features } from '../../data/home';

export default function FeatureStrip() {
  return (
    <section className="section">
      <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.id} className="card flex flex-col gap-3 p-5">
            <IconBadge name={feature.icon} />
            <h3 className="font-extrabold text-ink">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
