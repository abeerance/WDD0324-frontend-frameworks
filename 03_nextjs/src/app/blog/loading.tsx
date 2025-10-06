export default function Loading() {
  return (
    <div className="text-center p-8">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-4 text-gray-600">Loading blog posts...</p>
    </div>
  );
}
