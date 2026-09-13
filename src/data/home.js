import wrappedBouquet from '../assets/bouquets/wrapped-bouquet.svg';
import flowerBox from '../assets/bouquets/flower-box.svg';
import vaseArrangement from '../assets/bouquets/vase-arrangement.svg';
import luxeRoundBox from '../assets/bouquets/luxe-round-box.svg';

/**
 * محتوى الصفحة الرئيسية.
 * ⚠️ الصور والأسعار مؤقتة — بدّلها بصور المحل وأسعاره الحقيقية.
 * Placeholder artwork and prices — replace with the real catalogue.
 */

export const features = [
  {
    id: 'delivery',
    icon: 'truck',
    title: 'توصيل بنفس اليوم',
    body: 'اطلب قبل ٦ المساء ونوصلك بنفس اليوم لجميع مناطق الكويت.',
  },
  {
    id: 'fresh',
    icon: 'flower',
    title: 'ورد طازج يومياً',
    body: 'نستلم شحنات يومية ونختار كل وردة بعناية قبل ما تنسّق.',
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
    title: 'ديكور مناسبات كامل',
    body: 'من بوكيه صغير لين تجهيز قاعة استقبال — كل شي بمكان واحد.',
  },
];

export const occasions = [
  {
    id: 'baby',
    icon: 'balloon',
    title: 'استقبال المواليد',
    body: 'بوكسات وبالونات وتنسيقات بألوان ناعمة لغرفة المستشفى والبيت.',
  },
  {
    id: 'graduation',
    icon: 'cap',
    title: 'حفلات التخرج',
    body: 'باقات وبوكيهات تخرج مع لمسات ذهبية تليق باليوم اللي تعبت عليه.',
  },
  {
    id: 'birthday',
    icon: 'cake',
    title: 'أعياد الميلاد',
    body: 'تنسيقات مبهجة مع بالونات وكيك ستاند وكرت إهداء بكلماتك.',
  },
  {
    id: 'reception',
    icon: 'arch',
    title: 'الاستقبالات والأعراس',
    body: 'ممرات ورد وأقواس ومداخل مجهزة بالكامل لليلة ما تتنسى.',
  },
];

export const featuredBouquets = [
  {
    id: 'classic-wrap',
    name: 'باقة الورد الكلاسيكية',
    note: 'ورد جوري مع أوراق موسمية وتغليف كريمي',
    priceFrom: 25,
    image: wrappedBouquet,
    tag: 'الأكثر طلباً',
  },
  {
    id: 'signature-box',
    name: 'بوكس شمس المميز',
    note: 'بوكس مربع بلون الهوية مع ورد متدرج',
    priceFrom: 32,
    image: flowerBox,
    tag: null,
  },
  {
    id: 'vase-arrangement',
    name: 'تنسيقة الفازة',
    note: 'تنسيقة طويلة بفازة أنيقة تناسب المكاتب والبيت',
    priceFrom: 28,
    image: vaseArrangement,
    tag: null,
  },
  {
    id: 'luxe-round',
    name: 'البوكس الدائري الفاخر',
    note: 'ورد كثيف بلمسة ذهبية لأهم المناسبات',
    priceFrom: 45,
    image: luxeRoundBox,
    tag: 'فاخر',
  },
];

export const steps = [
  {
    id: 1,
    title: 'اختر الباقة أو المناسبة',
    body: 'تصفح الباقات الجاهزة أو قل لنا المناسبة ونرشح لك المناسب.',
  },
  {
    id: 2,
    title: 'كلمنا على الواتساب',
    body: 'نتفق على الألوان والحجم وكلمة الإهداء ووقت التوصيل.',
  },
  {
    id: 3,
    title: 'نوصلها لباب البيت',
    body: 'نجهزها بنفس اليوم ونوصلها لأي منطقة بالكويت.',
  },
];
