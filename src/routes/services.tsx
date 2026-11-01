import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Services, Booking } from "@/components/site/Sections";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead(
      "/services",
      "SEO & Organic Growth Agency | Performance Marketing Kenya",
      "Explore SEO and organic growth, performance marketing and paid media services from JuveTech Media, a digital marketing agency in Kenya.",
      [
        "SEO and organic growth agency",
        "performance marketing",
        "paid media services",
        "digital marketing agency Kenya",
      ],
    ),
  component: () => (
    <>
      <Services primary />
      <Booking />
    </>
  ),
});
