import Link from "next/link";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-orange-50 p-4 mb-8">
        <div className="flex gap-4">
          <Link href="/products" className="text-orange-600 hover:underline">
            Products
          </Link>
          <Link href="/cart" className="text-orange-600 hover:underline">
            Cart (0)
          </Link>
        </div>
      </nav>
      <div className="px-8">{children}</div>
    </div>
  );
}
