import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-blue-50 p-4 mb-8">
        <div className="flex gap-4">
          <Link href="/about" className="text-blue-600 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
        </div>
      </nav>
      <div className="px-8">{children}</div>
    </div>
  );
}
