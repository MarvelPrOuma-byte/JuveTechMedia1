import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { SectionHead } from "@/components/site/Sections";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/case-studies")({
  head: () =>
    pageHead(
      "/case-studies",
      "Case Studies | JuveTech Media",
      "Explore website and digital marketing project work from JuveTech Media.",
      ["JuveTech Media case studies", "school website design Kenya"],
    ),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead
          eyebrow="Selected work"
          title="Projects built around real client needs"
          sub="A look at website and digital marketing work completed with our clients."
          primary
        />
        <article className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border bg-card">
          <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Education · Website
              </p>
              <h2 className="mt-3 text-3xl font-extrabold">King Solomon Comprehensive School</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                JuveTech Media worked with King Solomon Comprehensive School on a website project.
              </p>
            </div>
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-primary">
              <GraduationCap size={32} aria-hidden="true" />
            </span>
          </div>
          <dl className="grid gap-5 border-t px-7 py-7 text-sm sm:grid-cols-3 sm:px-10">
            <div>
              <dt className="text-muted-foreground">Client</dt>
              <dd className="mt-1 font-semibold">King Solomon Comprehensive School</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Project</dt>
              <dd className="mt-1 font-semibold">School website</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Client contact</dt>
              <dd className="mt-1 font-semibold">Franc Oyugi, Director</dd>
            </div>
          </dl>
        </article>
      </section>
      <section className="border-y bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Have a project in mind?</h2>
            <p className="mt-2 text-muted-foreground">
              Tell us what you want to build and we’ll help plan the next step.
            </p>
          </div>
          <Link to="/contact" className="btn-primary">
            Discuss a project <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
