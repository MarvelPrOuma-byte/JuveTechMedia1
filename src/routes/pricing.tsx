import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Pricing, Booking } from "@/components/site/Sections";
import { IndividualPricing } from "@/components/site/IndividualPricing";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead(
      "/pricing",
      "Digital Marketing Agency Prices in KSh | JuveTech Media",
      "Compare JuveTech Media packages and starting prices in Kenyan shillings for web design, SEO and organic growth, performance marketing, and paid media services.",
      [
        "digital marketing agency prices Kenya",
        "SEO services pricing",
        "performance marketing",
        "paid media services",
        "marketing consultancy",
      ],
    ),
  component: () => (
    <>
      <Pricing />
      <IndividualPricing />
      <Booking />
    </>
  ),
});
