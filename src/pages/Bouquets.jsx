import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import PackageCard from '../components/PackageCard';
import SectionHeading from '../components/SectionHeading';
import WhatsAppButton from '../components/WhatsAppButton';
import { categories, categoryLabel, packages } from '../data/packages';
import { site } from '../siteConfig';
import { formatKwd } from '../utils/money';

const VALID = ['all', ...categories.map((category) => category.id)];

export default function Bouquets() {
  // المناسبة محفوظة بالرابط عشان تنقدر تنسخه وترسله
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('category') ?? 'all';
  const active = VALID.includes(requested) ? requested : 'all';

  const counts = useMemo(() => {
    const result = { all: packages.length };
    for (const category of categories) {
      result[category.id] = packages.filter((item) => item.category === category.id).length;
    }
    return result;
  }, []);

  const visible = useMemo(
    () => (active === 'all' ? packages : packages.filter((item) => item.category === active)),
    [active],
  );

  function selectCategory(id) {
    setSearchParams(id === 'all' ? {} : { category: id }, { replace: true });
  }

  return (
    <>
      <section className="bg-petal-gradient">
        <div className="shell py-12 text-center md:py-16">
          <SectionHeading
            eyebrow={site.deliveryNoteAr}
            title="باقات وتنسيقات شمس فلاورز"
            body={`اختر المناسبة وتصفح التنسيقات المناسبة لها. الأسعار تبدأ من ${formatKwd(site.priceFrom)}، والطلب يتم مباشرة على الواتساب.`}
          />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <CategoryFilter active={active} onChange={selectCategory} counts={counts} />

          <div className="mt-8 text-center text-sm text-ink-faint">
            {active === 'all'
              ? `كل التنسيقات (${visible.length})`
              : `${categoryLabel(active)} — ${visible.length} تنسيقات`}
          </div>

          {visible.length === 0 ? (
            <p className="card mt-6 p-10 text-center text-ink-muted">
              ما فيه تنسيقات بهذي المناسبة حالياً — كلمنا على الواتساب ونرتب لك.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((item) => (
                <PackageCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className="mt-12 rounded-bloom bg-white p-8 text-center shadow-soft">
            <h2 className="text-xl font-extrabold text-ink">ما لقيت اللي تبيه؟</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              كلمنا وخبرنا عن المناسبة والألوان والميزانية، ونرتب لك تنسيقة خاصة.
            </p>
            <WhatsAppButton
              className="mt-5"
              message="السلام عليكم، أبغى تنسيقة خاصة 🌸"
            >
              كلمنا واتساب
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
