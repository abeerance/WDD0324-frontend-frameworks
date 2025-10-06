"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 bg-red-50 border-2 border-red-500 rounded-lg">
      <h2 className="text-2xl font-bold text-red-700">Something went wrong!</h2>
      <p className="mt-4 text-red-600">{error.message}</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
        <Link href="/blog" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
          Back to blog
        </Link>
      </div>
    </div>
  );
}
