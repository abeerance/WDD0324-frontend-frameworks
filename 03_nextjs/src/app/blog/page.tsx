import Link from "next/link";

async function getBlogPosts() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Uncomment this to test the error
  // throw new Error("Failed to fetch blog posts");

  return [
    { id: 1, title: "Getting Started with Next.js", slug: "nextjs-intro" },
    { id: 2, title: "Understanding React Server Components", slug: "rsc-explained" },
    { id: 3, title: "Building Fast Websites", slug: "fast-websites" },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <ul className="mt-6 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline text-lg">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
