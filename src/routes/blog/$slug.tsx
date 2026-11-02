import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";

import { SectionHead } from "@/components/site/Sections";
import { getBlogPost } from "@/lib/blog-posts";
import { absoluteUrl, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      return pageHead(
        "/blog",
        "Digital Marketing Insights | JuveTech Media",
        "Practical marketing guides.",
      );
    }
    return pageHead(
      `/blog/${post.slug}`,
      `${post.title} | JuveTech Media`,
      post.description,
      [post.category, "JuveTech Media", "digital marketing"],
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        author: { "@type": "Organization", name: "JuveTech Media" },
        publisher: { "@type": "Organization", name: "JuveTech Media" },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        keywords: [post.category, "digital marketing"],
      },
    );
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { post } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-4xl px-5 py-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" /> All insights
      </Link>
      <div className="mt-10">
        <SectionHead eyebrow={post.category} title={post.title} sub={post.description} primary />
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
        <time dateTime={post.published}>
          {new Date(`${post.published}T12:00:00`).toLocaleDateString("en-KE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span>JuveTech Media</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 size={15} aria-hidden="true" /> {post.readingTime}
        </span>
      </div>
      <div className="blog-prose mx-auto mt-10 max-w-3xl rounded-2xl border bg-card p-6 sm:p-10">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <div className="mt-10 border-t pt-7">
          <p>
            Want help applying these ideas to your business?{" "}
            <Link to="/services" className="font-semibold text-primary hover:underline">
              Explore our services
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              request a strategy call{" "}
              <ArrowUpRight className="inline" size={15} aria-hidden="true" />
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/blog" className="btn-ghost">
          Browse all insights
        </Link>
      </div>
    </article>
  );
}
