import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { SectionHead } from "@/components/site/Sections";
import { individualServices, formatPackagePrice } from "@/lib/pricing";
import { getServiceDetails } from "@/lib/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const service = getServiceDetails(params.serviceId);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params }) => {
    const service = getServiceDetails(params.serviceId);
    if (!service) {
      return pageHead(
        "/services",
        "Digital Marketing Services | JuveTech Media",
        "Explore JuveTech Media services.",
      );
    }
    return pageHead(
      `/services/${service.id}`,
      `${service.title} | JuveTech Media`,
      service.summary,
      [service.title, "digital marketing agency Kenya", "JuveTech Media"],
    );
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const price = individualServices.find((item) => item.id === service.pricingId);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" /> All services
        </Link>
        <div className="mt-10">
          <SectionHead
            eyebrow="JuveTech Media service"
            title={service.title}
            sub={service.summary}
            primary
          />
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold">A clear plan for the work</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{service.introduction}</p>
            <h3 className="mt-9 text-lg font-bold">Who this is for</h3>
            <p className="mt-2 leading-7 text-muted-foreground">{service.bestFor}</p>
            <h3 className="mt-9 text-lg font-bold">What the project can include</h3>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6">
                  <Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-2xl border bg-card p-7">
            <h2 className="text-xl font-bold">How we work</h2>
            <ol className="mt-6 space-y-5">
              {service.process.map(([title, description], index) => (
                <li key={title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            {price && (
              <p className="mt-7 border-t pt-5 text-sm text-muted-foreground">
                Illustrative starting price:{" "}
                <span className="font-semibold text-foreground">
                  {formatPackagePrice(price.amount)}
                </span>{" "}
                {price.period}. Final scope and fees are confirmed in a quote.
              </p>
            )}
            <Link to="/contact" className="btn-primary mt-6 w-full">
              Discuss this service <ArrowUpRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="border-y bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Looking for a joined-up growth plan?</h2>
            <p className="mt-2 text-muted-foreground">
              Explore our other services or request a strategy conversation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="btn-ghost">
              All services
            </Link>
            <Link to="/contact" className="btn-primary">
              Request a call <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
