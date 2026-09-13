import wrappedBouquet from '../assets/bouquets/wrapped-bouquet.svg';
import flowerBox from '../assets/bouquets/flower-box.svg';
import vaseArrangement from '../assets/bouquets/vase-arrangement.svg';
import luxeRoundBox from '../assets/bouquets/luxe-round-box.svg';

/**
 * محتوى الصفحة الرئيسية.
 * الخدمات والأسعار مأخوذة من حساب إنستغرام @shamsflowerskw — راجعها وأكّدها.
 * ⚠️ الصور رسومات مؤقتة — بدّلها بصور المحل الحقيقية.
 */

export const features = [
  {
    id: 'delivery',
    icon: 'truck',
    title: 'توصيل لجميع مناطق الكويت',
    body: 'نوصل طلبك لأي منطقة بالكويت، والطلب والتنسيق كله أون لاين.',
  },
  {
    id: 'flowers',
    icon: 'flower',
    title: 'ورد طبيعي وصناعي',
    body: 'تشكيلة ورد طبيعي منسّق بعناية، وورد صناعي يدوم لفترة أطول.',
  },
  {
    id: 'custom',
    icon: 'sparkle',
    title: 'تنسيق حسب ذوقك',
    body: 'اختر الألوان والحجم وكلمة الإهداء، ونجهزها بالشكل اللي تبيه.',
  },
  {
    id: 'events',
    icon: 'heart',
    title: 'استقبالات وحفلات',
    body: 'تنسيق استقبالات المواليد والتخرج والحفلات من أولها لآخرها.',
  },
];

export const occasions = [
  {
    id: 'baby',
    icon: 'balloon',
    title: 'استقبال المواليد',
    body: 'استاندات وتنسيقات باسم المولود بألوان ناعمة للمستشفى والبيت.',
  },
  {
    id: 'graduation',
    icon: 'cap',
    title: 'حفلات التخرج',
    body: 'باقات واستاندات تخرج مع كرت تهنئة يليق باليوم اللي تعبت عليه.',
  },
  {
    id: 'parties',
    icon: 'cake',
    title: 'الحفلات والمناسبات',
    body: 'تنسيقات وتوزيعات للحفلات والمجالس وكل مناسبة تجمع الأحبة.',
  },
  {
    id: 'stands',
    icon: 'arch',
    title: 'استاندات الاستقبال',
    body: 'استاندات ورد بأحجام مختلفة توصل لين متر ونص لمداخل الاستقبال.',
  },
];

export const featuredBouquets = [
  {
    id: 'baby-stand',
    name: 'استاند استقبال مواليد',
    note: 'استاند ورد باسم المولود بألوان تختارها أنت',
    priceFrom: 15,
    image: wrappedBouquet,
    tag: 'الأكثر طلباً',
  },
  {
    id: 'tall-stand',
    name: 'استاند متر ونص',
    note: 'استاند طويل لمداخل الاستقبالات والقاعات',
    priceFrom: 20,
    image: luxeRoundBox,
    tag: null,
  },
  {
    id: 'graduation-bouquet',
    name: 'باقة تخرج',
    note: 'باقة تهنئة بالتخرج مع كرت بكلماتك',
    priceFrom: 12,
    image: vaseArrangement,
    tag: null,
  },
  {
    id: 'giveaways',
    name: 'توزيعات المناسبات',
    note: 'توزيعات ورد للحفلات والمجالس — تنسّق بالعدد اللي تبيه',
    priceFrom: 0.75,
    priceLabel: 'الحبة',
    image: flowerBox,
    tag: 'توزيعات',
  },
];

export const steps = [
  {
    id: 1,
    title: 'اختر التنسيق أو المناسبة',
    body: 'تصفح التنسيقات أو قل لنا المناسبة ونرشح لك المناسب.',
  },
  {
    id: 2,
    title: 'كلمنا على الواتساب',
    body: 'نتفق على الألوان والحجم وكلمة الإهداء ووقت التوصيل.',
  },
  {
    id: 3,
    title: 'نجهزها ونوصلها لك',
    body: 'ننسّقها بعناية ونوصلها لأي منطقة بالكويت.',
  },
];
