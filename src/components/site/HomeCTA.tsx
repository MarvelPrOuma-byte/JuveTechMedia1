import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

export function HomeCTA() {
  return (
    <section className="border-y bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">Your next chapter</p>
          <h2 className="mt-2 text-3xl font-bold">
            Ready to grow with a digital marketing agency?
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="outline">
            <Link to="/case-studies">
              See our work <Briefcase />
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link to="/contact">
              Book a strategy call <ArrowUpRight />
            </Link>
          </Button>
          <WhatsAppLink className="btn-ghost" />
        </div>
      </div>
    </section>
  );
}
