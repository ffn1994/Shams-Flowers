import { Link } from 'react-router-dom';
import BouquetCard from '../BouquetCard';
import SectionHeading from '../SectionHeading';
import { ArrowIcon } from '../Icons';
import { featuredBouquets } from '../../data/home';

export default function FeaturedBouquets() {
  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="start"
            eyebrow="مختارات"
            title="باقات مختارة من شمس"
            body="تشكيلة سريعة من الأكثر طلباً — وكل باقة تنسّق حسب ذوقك."
          />
          <Link to="/bouquets" className="btn-ghost hidden sm:inline-flex">
            الكل
            <ArrowIcon />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.id} bouquet={bouquet} />
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
