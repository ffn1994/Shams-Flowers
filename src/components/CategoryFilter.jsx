import IconBadge from './IconBadge';
import { categories } from '../data/packages';

/** أزرار تبديل المناسبة في صفحة الباقات */
export default function CategoryFilter({ active, onChange, counts }) {
  const options = [{ id: 'all', label: 'الكل', icon: 'sparkle' }, ...categories];

  return (
    <div
      role="tablist"
      aria-label="تصفية حسب المناسبة"
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
    >
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition duration-200 ease-soft ${
              isActive
                ? 'border-brand-600 bg-brand-600 text-white shadow-soft'
                : 'border-cream-300 bg-white text-ink-muted hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            <IconBadge
              name={option.icon}
              className={`h-7 w-7 ${isActive ? 'bg-white/20 text-white' : ''}`}
              iconClassName="h-4 w-4"
            />
            <span>{option.label}</span>
            {counts?.[option.id] != null && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive ? 'bg-white/20 text-white' : 'bg-cream-200 text-ink-faint'
                }`}
              >
                {counts[option.id]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
