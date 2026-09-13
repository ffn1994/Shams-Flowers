import babyStand from '../assets/bouquets/baby-stand.svg';
import babyBox from '../assets/bouquets/baby-box.svg';
import tallStand from '../assets/bouquets/tall-stand.svg';
import graduation from '../assets/bouquets/graduation.svg';
import giveaways from '../assets/bouquets/giveaways.svg';
import entrance from '../assets/bouquets/entrance.svg';
import artificial from '../assets/bouquets/artificial.svg';
import tableCenterpiece from '../assets/bouquets/table-centerpiece.svg';
import standGold from '../assets/bouquets/stand-gold.svg';
import walkway from '../assets/bouquets/walkway.svg';
import wrappedBouquet from '../assets/bouquets/wrapped-bouquet.svg';
import flowerBox from '../assets/bouquets/flower-box.svg';
import vaseArrangement from '../assets/bouquets/vase-arrangement.svg';
import luxeRoundBox from '../assets/bouquets/luxe-round-box.svg';

/**
 * كتالوج التنسيقات مرتّب حسب المناسبة.
 * الخدمات والأسعار مأخوذة من حساب إنستغرام @shamsflowerskw — راجعها وأكّدها.
 * ⚠️ الصور رسومات مؤقتة — بدّلها بصور المحل الحقيقية.
 *
 * price: بالدينار الكويتي. priceLabel: نص قبل السعر (افتراضياً "يبدأ من").
 * onRequest: يعرض "حسب الطلب" بدل السعر.
 */

export const categories = [
  { id: 'babies', label: 'مواليد', icon: 'balloon' },
  { id: 'graduation', label: 'تخرج', icon: 'cap' },
  { id: 'parties', label: 'حفلات', icon: 'cake' },
  { id: 'receptions', label: 'استقبالات', icon: 'arch' },
];

export function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label ?? '';
}

export const packages = [
  // ---------- مواليد ----------
  {
    id: 'baby-stand-classic',
    category: 'babies',
    name: 'استاند استقبال مواليد',
    note: 'استاند ورد باسم المولود بألوان تختارها أنت.',
    price: 15,
    image: babyStand,
    tag: 'الأكثر طلباً',
    featured: true,
  },
  {
    id: 'baby-stand-deluxe',
    category: 'babies',
    name: 'استاند مواليد ديلوكس',
    note: 'استاند أكبر بورد كثيف ولوحة تهنئة بخط مميز.',
    price: 20,
    image: tallStand,
    featured: false,
  },
  {
    id: 'baby-box',
    category: 'babies',
    name: 'بوكس مولود',
    note: 'بوكس ورد بألوان ناعمة يناسب غرفة المستشفى.',
    price: 12,
    image: babyBox,
    featured: false,
  },
  {
    id: 'baby-bedside',
    category: 'babies',
    name: 'تنسيقة سرير المستشفى',
    note: 'تنسيقة صغيرة تنحط جنب السرير مع كرت تهنئة.',
    price: 10,
    image: vaseArrangement,
    featured: false,
  },

  // ---------- تخرج ----------
  {
    id: 'graduation-bouquet',
    category: 'graduation',
    name: 'باقة تخرج',
    note: 'باقة تهنئة بالتخرج مع كرت بكلماتك.',
    price: 12,
    image: graduation,
    tag: 'مناسب للهدايا',
    featured: true,
  },
  {
    id: 'graduation-stand',
    category: 'graduation',
    name: 'استاند تخرج',
    note: 'استاند ورد بلمسات ذهبية لحفلة التخرج.',
    price: 18,
    image: standGold,
    featured: true,
  },
  {
    id: 'graduation-box',
    category: 'graduation',
    name: 'بوكس تخرج',
    note: 'بوكس ورد مع قبعة تخرج صغيرة وكرت.',
    price: 15,
    image: flowerBox,
    featured: false,
  },
  {
    id: 'graduation-bundle',
    category: 'graduation',
    name: 'تنسيقة تخرج فاخرة',
    note: 'تنسيقة كبيرة بورد مشكّل لحفلات التخرج الكبيرة.',
    price: 22,
    image: luxeRoundBox,
    featured: false,
  },

  // ---------- حفلات ----------
  {
    id: 'giveaways',
    category: 'parties',
    name: 'توزيعات المناسبات',
    note: 'توزيعات ورد للحفلات والمجالس — تنسّق بالعدد اللي تبيه.',
    price: 0.75,
    priceLabel: 'الحبة',
    image: giveaways,
    tag: 'توزيعات',
    featured: true,
  },
  {
    id: 'table-centerpiece',
    category: 'parties',
    name: 'تنسيقة طاولة',
    note: 'تنسيقة وسط الطاولة للحفلات والعزائم.',
    price: 14,
    image: tableCenterpiece,
    featured: false,
  },
  {
    id: 'artificial-arrangement',
    category: 'parties',
    name: 'تنسيقة ورد صناعي',
    note: 'ورد صناعي يدوم لفترة أطول، مناسب للديكور الدائم.',
    price: 20,
    image: artificial,
    tag: 'ورد صناعي',
    featured: true,
  },
  {
    id: 'congrats-bouquet',
    category: 'parties',
    name: 'بوكيه تهنئة',
    note: 'بوكيه ورد للتهنئة بالمناسبات السعيدة.',
    price: 10,
    image: wrappedBouquet,
    featured: false,
  },

  // ---------- استقبالات ----------
  {
    id: 'stand-150',
    category: 'receptions',
    name: 'استاند متر ونص',
    note: 'استاند طويل لمداخل الاستقبالات والقاعات.',
    price: 20,
    image: tallStand,
    featured: true,
    tag: 'متر ونص',
  },
  {
    id: 'position-stand',
    category: 'receptions',
    name: 'استاند مبروك المنصب',
    note: 'استاند تهنئة بالترقية أو المنصب الجديد.',
    price: 20,
    image: luxeRoundBox,
    featured: false,
  },
  {
    id: 'entrance-setup',
    category: 'receptions',
    name: 'تنسيق مدخل القاعة',
    note: 'تنسيق كامل لمدخل القاعة — الحجم والتفاصيل حسب المكان.',
    onRequest: true,
    image: entrance,
    featured: false,
  },
  {
    id: 'reception-walk',
    category: 'receptions',
    name: 'ممر استقبال',
    note: 'ممر ورد على جانبي المدخل — نتفق عليه حسب الطول والميزانية.',
    onRequest: true,
    image: walkway,
    featured: false,
  },
];

export const featuredPackages = packages.filter((item) => item.featured);
