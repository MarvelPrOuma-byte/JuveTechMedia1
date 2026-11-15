import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { SectionHead } from "@/components/site/Sections";
import { pageHead } from "@/lib/seo";

const schoolWebsite = "https://kingsolomoncomprehensive.co.ke";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead(
      "/portfolio",
      "Portfolio | JuveTech Media",
      "Explore website and digital marketing projects from JuveTech Media.",
      ["JuveTech Media portfolio", "school website design Kenya"],
    ),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead
          eyebrow="Selected work"
          title="Projects built around real client needs"
          sub="A look at website and digital marketing work completed with our clients."
          primary
        />
        <article className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border bg-card">
          <a
            href={schoolWebsite}
            target="_blank"
            rel="noreferrer"
            aria-label="Live preview of King Solomon Comprehensive School website (opens in a new tab)"
            className="group relative block overflow-hidden bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <img
              src="/kingsolomon-homepage.png"
              alt="King Solomon Comprehensive School homepage"
              className="aspect-[16/8] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              width={1502}
              height={768}
            />
            <span className="absolute inset-0 grid place-items-center bg-slate-950/0 text-white opacity-0 transition duration-300 group-hover:bg-slate-950/55 group-hover:opacity-100 group-focus-visible:bg-slate-950/55 group-focus-visible:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-slate-950/70 px-5 py-3 font-semibold">
                Live preview <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </span>
          </a>
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
            <a href={schoolWebsite} target="_blank" rel="noreferrer" className="btn-ghost">
              Visit live website <ArrowUpRight aria-hidden="true" />
            </a>
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
