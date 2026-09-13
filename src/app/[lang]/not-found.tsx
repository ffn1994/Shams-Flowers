import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-5xl">🌸</div>
      <h1 className="mt-4 text-2xl font-extrabold">404</h1>
      <p className="mt-2 text-leaf-700">
        الصفحة غير موجودة
        <br />
        (Page not found)
      </p>
      <Link href="/" className="btn-primary mt-6">
        الرئيسية (Home)
      </Link>
    </div>
  );
}
