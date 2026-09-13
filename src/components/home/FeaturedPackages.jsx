import { Link } from 'react-router-dom';
import PackageCard from '../PackageCard';
import SectionHeading from '../SectionHeading';
import { ArrowIcon } from '../Icons';
import { featuredPackages } from '../../data/packages';

export default function FeaturedPackages() {
  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="start"
            eyebrow="مختارات"
            title="تنسيقات مختارة من شمس"
            body="لمحة سريعة عن الأكثر طلباً — وكل تنسيقة تتغيّر حسب ذوقك والمناسبة."
          />
          <Link to="/bouquets" className="btn-ghost hidden sm:inline-flex">
            كل الباقات
            <ArrowIcon />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/bouquets" className="btn-outline w-full">
            شوف كل الباقات
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
