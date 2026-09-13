import {
  ArchIcon,
  BalloonIcon,
  CakeIcon,
  CapIcon,
  FlowerIcon,
  HeartIcon,
  SparkleIcon,
  TruckIcon,
} from './Icons';

const icons = {
  truck: TruckIcon,
  flower: FlowerIcon,
  sparkle: SparkleIcon,
  heart: HeartIcon,
  balloon: BalloonIcon,
  cap: CapIcon,
  cake: CakeIcon,
  arch: ArchIcon,
};

/** دائرة ملوّنة فيها أيقونة — تُستخدم بالمميزات والمناسبات */
export default function IconBadge({ name, className = '' }) {
  const Icon = icons[name] ?? SparkleIcon;

  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 ${className}`}
    >
      <Icon className="h-6 w-6" />
    </span>
  );
}
