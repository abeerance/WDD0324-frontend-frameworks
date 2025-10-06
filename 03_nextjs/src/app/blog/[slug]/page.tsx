import { Metadata } from "next";
import Link from "next/link";

async function getPost(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (slug === "error-test") {
    throw new Error("Failed to load this blog post");
  }

  return {
    title: slug.replace(/-/g, " "),
    content: "This is the full content of the blog post.",
    author: "John Doe",
    date: "2025-01-15",
    description: `Learn about ${slug.replace(/-/g, " ")} in this detailed blog post`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to blog
      </Link>
      <h1 className="text-3xl font-bold capitalize">{post.title}</h1>
      <p className="mt-2 text-gray-500">
        By {post.author} on {post.date}
      </p>
      <div className="mt-6">
        <p className="text-gray-700">{post.content}</p>
      </div>
    </article>
  );
}
