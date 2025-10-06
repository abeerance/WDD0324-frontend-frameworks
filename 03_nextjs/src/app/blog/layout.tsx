import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[250px_1fr] gap-8">
      <aside className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        <ul className="flex flex-col gap-4">
          <Link href="/blog/technology" className="text-blue-600 hover:underline cursor-pointer">
            Technology
          </Link>
          <Link href="/blog/design" className="text-blue-600 hover:underline cursor-pointer">
            Design
          </Link>
          <Link href="/blog/business" className="text-blue-600 hover:underline cursor-pointer">
            Business
          </Link>
        </ul>
      </aside>
      <div>{children}</div>
    </div>
  );
}
