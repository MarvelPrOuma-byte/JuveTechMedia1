import { Link } from "@tanstack/react-router";
import { Monitor, Search, Target, Palette, Clapperboard, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { individualServices, formatPackagePrice } from "@/lib/pricing";

const serviceIcons = [Monitor, Search, Target, Palette, Clapperboard];

export function IndividualPricing() {
  return <section className="mx-auto max-w-7xl px-5 pb-20">
    <div className="flex flex-col justify-between gap-4 border-b pb-8 md:flex-row md:items-end">
      <div><p className="text-xs font-semibold uppercase text-primary">À la carte</p><h2 className="mt-3 text-3xl font-bold">Just what your business needs.</h2></div>
      <p className="max-w-sm text-sm text-muted-foreground">Illustrative starting prices in Kenyan shillings. Request a quote for your exact scope.</p>
    </div>
    <div className="divide-y">
      {individualServices.map((service, i) => {
        const Icon = serviceIcons[i] ?? Monitor;
        return <article key={service.id} className="service-price-row grid items-center gap-5 py-7 md:grid-cols-[1fr_auto_auto]">
          <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Icon size={22} /></span><div><h3 className="text-lg font-semibold">{service.name}</h3><p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">{service.detail}</p></div></div>
          <div className="pl-15 md:pl-0"><p className="text-xs text-muted-foreground">From</p><p className="text-2xl font-bold">{formatPackagePrice(service.amount)}</p><p className="text-xs text-muted-foreground">{service.period}</p></div>
          <Button asChild variant="outline" className="ml-15 w-fit md:ml-6"><Link to="/contact">Request a quote <ArrowUpRight /></Link></Button>
        </article>;
      })}
    </div>
  </section>;
}