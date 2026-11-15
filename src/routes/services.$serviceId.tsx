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
            eyebrow="Service details"
            title={service.title}
            sub={service.summary}
            primary
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-12">
            <section aria-labelledby="service-overview">
              <h2 id="service-overview" className="text-2xl font-bold">
                About {service.title}
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                {service.introduction}
              </p>
            </section>

            <section aria-labelledby="service-benefits">
              <h2 id="service-benefits" className="text-2xl font-bold">
                How this service can help
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {service.benefits.map((benefit, index) => (
                  <article key={benefit} className="rounded-2xl border bg-card p-5">
                    <span className="text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-sm leading-6">{benefit}</p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="service-fit"
              className="grid gap-6 rounded-2xl border bg-secondary p-6 sm:grid-cols-2 sm:p-8"
            >
              <div>
                <h2 id="service-fit" className="text-xl font-bold">
                  Who this is for
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.bestFor}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">What to prepare</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.preparation}
                </p>
              </div>
            </section>

            <section aria-labelledby="service-deliverables">
              <h2 id="service-deliverables" className="text-2xl font-bold">
                What the project can include
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                We confirm the exact deliverables with you before work begins. Depending on your
                goals and project scope, the work may include:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm leading-6"
                  >
                    <Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="service-process">
              <h2 id="service-process" className="text-2xl font-bold">
                Our process
              </h2>
              <ol className="mt-5 grid gap-4 md:grid-cols-3">
                {service.process.map(([title, description], index) => (
                  <li key={title} className="rounded-2xl border bg-card p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="service-faqs">
              <h2 id="service-faqs" className="text-2xl font-bold">
                Frequently asked questions
              </h2>
              <div className="mt-5 divide-y rounded-2xl border bg-card px-5">
                {service.faqs.map(([question, answer]) => (
                  <details key={question} className="group py-4">
                    <summary className="cursor-pointer font-semibold marker:text-primary">
                      {question}
                    </summary>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Investment
            </p>
            <h2 className="mt-3 text-xl font-bold">Starting price</h2>
            {price && (
              <>
                <p className="mt-3 text-3xl font-extrabold">{formatPackagePrice(price.amount)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{price.period}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{price.detail}</p>
              </>
            )}
            <p className="mt-5 border-t pt-4 text-sm leading-6 text-muted-foreground">
              This is an illustrative starting price. Final fees depend on requirements and are
              confirmed in a written quote. Third-party and advertising costs are separate unless
              the quote says otherwise.
            </p>
            <Link to="/contact" className="btn-primary mt-6 w-full">
              Discuss this service <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="mt-4 inline-flex w-full justify-center text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Compare all services
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
