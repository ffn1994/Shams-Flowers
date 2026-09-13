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

/** دائرة ملوّنة فيها أيقونة — تُستخدم بالمميزات والمناسبات والفلاتر */
export default function IconBadge({
  name,
  className = 'h-12 w-12 bg-brand-100 text-brand-700',
  iconClassName = 'h-6 w-6',
}) {
  const Icon = icons[name] ?? SparkleIcon;

  return (
    <span className={`grid shrink-0 place-items-center rounded-full ${className}`}>
      <Icon className={iconClassName} />
    </span>
  );
}
