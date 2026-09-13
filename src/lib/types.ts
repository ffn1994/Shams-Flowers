export type Occasion =
  | 'love'
  | 'birthday'
  | 'congrats'
  | 'wedding'
  | 'newborn'
  | 'sympathy'
  | 'thanks';

export const OCCASIONS: Occasion[] = [
  'love',
  'birthday',
  'congrats',
  'wedding',
  'newborn',
  'sympathy',
  'thanks',
];

export const OCCASION_LABELS: Record<Occasion, { ar: string; en: string }> = {
  love: { ar: 'حب ورومانسية', en: 'Love & romance' },
  birthday: { ar: 'أعياد ميلاد', en: 'Birthdays' },
  congrats: { ar: 'تهنئة ونجاح', en: 'Congratulations' },
  wedding: { ar: 'أعراس وخطوبة', en: 'Weddings' },
  newborn: { ar: 'مواليد', en: 'New baby' },
  sympathy: { ar: 'مواساة', en: 'Sympathy' },
  thanks: { ar: 'شكر وتقدير', en: 'Thank you' },
};

export type Product = {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  includes: { ar: string; en: string };
  /** Price in fils. 1 KWD = 1000 fils. */
  price: number;
  image: string;
  occasion: Occasion;
  size: { ar: string; en: string };
  stock: number;
  featured: boolean;
  createdAt: string;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type OrderStatus = 'new' | 'confirmed' | 'delivered' | 'cancelled';

export type OrderItem = {
  productId: string;
  name: { ar: string; en: string };
  /** Unit price in fils at the time of ordering. */
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  reference: string;
  items: OrderItem[];
  /** All amounts in fils. */
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    area: string;
    block: string;
    street: string;
    house: string;
  };
  delivery: {
    date: string;
    slot: 'morning' | 'afternoon' | 'evening';
  };
  cardMessage: string;
  notes: string;
  payment: 'cod' | 'knet';
  status: OrderStatus;
  lang: 'ar' | 'en';
  createdAt: string;
};
