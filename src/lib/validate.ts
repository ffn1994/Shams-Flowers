import { OCCASIONS, type Occasion, type Product } from './types';

export type ProductInput = Partial<{
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  includesAr: string;
  includesEn: string;
  sizeAr: string;
  sizeEn: string;
  price: number;
  image: string;
  occasion: string;
  stock: number;
  featured: boolean;
}>;

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || `item-${Date.now()}`
  );
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function int(value: unknown, fallback = 0): number {
  const n = typeof value === 'string' ? Number(value) : value;
  return typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : fallback;
}

/** Builds a validated Product from raw request input. Returns an error message when invalid. */
export function buildProduct(
  input: ProductInput,
  existing?: Product,
): { product: Product } | { error: string } {
  const nameAr = str(input.nameAr, existing?.name.ar ?? '');
  const nameEn = str(input.nameEn, existing?.name.en ?? '');
  if (!nameAr || !nameEn) return { error: 'name_required' };

  const price = int(input.price, existing?.price ?? -1);
  if (price < 0) return { error: 'price_invalid' };

  const occasionRaw = str(input.occasion, existing?.occasion ?? 'love');
  const occasion = (OCCASIONS as string[]).includes(occasionRaw)
    ? (occasionRaw as Occasion)
    : 'love';

  const image = str(input.image, existing?.image ?? '/products/roses-red.svg');
  if (!/^(\/|https?:\/\/)/.test(image)) return { error: 'image_invalid' };

  return {
    product: {
      id: existing?.id ?? `p-${Date.now().toString(36)}`,
      slug: str(input.slug, existing?.slug ?? '') || slugify(nameEn),
      name: { ar: nameAr, en: nameEn },
      description: {
        ar: str(input.descAr, existing?.description.ar ?? ''),
        en: str(input.descEn, existing?.description.en ?? ''),
      },
      includes: {
        ar: str(input.includesAr, existing?.includes.ar ?? ''),
        en: str(input.includesEn, existing?.includes.en ?? ''),
      },
      price,
      image,
      occasion,
      size: {
        ar: str(input.sizeAr, existing?.size.ar ?? ''),
        en: str(input.sizeEn, existing?.size.en ?? ''),
      },
      stock: Math.max(0, int(input.stock, existing?.stock ?? 0)),
      featured: typeof input.featured === 'boolean' ? input.featured : (existing?.featured ?? false),
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    },
  };
}

export function isValidKuwaitPhone(phone: string): boolean {
  return /^[569]\d{7}$/.test(phone.replace(/[\s-]/g, ''));
}
