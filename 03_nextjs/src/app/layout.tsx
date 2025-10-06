import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white p-4">
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-blue-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-300">
              About
            </Link>
            <Link href="/blog" className="hover:text-blue-300">
              Blog
            </Link>
            <Link href="/products" className="hover:text-blue-300">
              Products
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 p-4 mt-8">
          <p className="text-center text-gray-600">© 2025 My Blog</p>
        </footer>
      </body>
    </html>
  );
}
