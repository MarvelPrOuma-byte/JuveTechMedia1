import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHead, Booking } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "/about",
      "About JuveTech Media | Digital Marketing Consultancy Kenya",
      "Meet JuveTech Media, a digital marketing team in Kenya providing SEO and organic growth, performance marketing, paid media, and marketing consultancy.",
      [
        "digital marketing agency Kenya",
        "marketing consultancy",
        "SEO and organic growth",
        "performance marketing",
        "paid media services",
      ],
    ),
  component: About,
});

const values = [
  ["Results first", "Every pixel and every shilling of ad spend is tied to a measurable goal."],
  ["Creative that converts", "Beautiful work is great. Beautiful work that sells is better."],
  ["Radical transparency", "Clear pricing, live dashboards and honest monthly reports."],
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead
          eyebrow="About us"
          title="A digital marketing team built for sustainable growth"
          sub="JuveTech Media blends web engineering, SEO, performance marketing, paid media, and creative production so ambitious brands can scale faster."
          primary
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border bg-card p-7 transition hover:border-primary/50"
            >
              <h3 className="text-lg font-bold text-gradient">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <Booking />
    </>
  );
}
