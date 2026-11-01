import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { SectionHead } from "@/components/site/Sections";
import { blogPosts } from "@/lib/blog-posts";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    pageHead(
      "/blog",
      "Digital Marketing Insights | JuveTech Media",
      "Practical guides to website planning, SEO, and paid advertising for growing businesses.",
      ["digital marketing blog", "SEO strategy", "paid advertising", "website design Kenya"],
    ),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead
          eyebrow="JuveTech Media insights"
          title="Digital marketing ideas you can put to work"
          sub="Practical guidance on websites, SEO, and paid advertising for growing businesses."
          primary
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-2xl border bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {post.category}
              </p>
              <h2 className="mt-4 text-xl font-bold leading-snug">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground">
                <time dateTime={post.published}>
                  {new Date(`${post.published}T12:00:00`).toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={14} aria-hidden="true" /> {post.readingTime}
                </span>
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Read article <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
