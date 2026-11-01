import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Booking } from "@/components/site/Sections";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "/contact",
      "Book a Digital Marketing Strategy Call | JuveTech Media Kenya",
      "Book a strategy call with JuveTech Media, a digital marketing agency in Kenya. Get marketing consultancy for SEO, organic growth, performance marketing and paid media.",
      [
        "strategy call booking",
        "marketing consultancy",
        "digital marketing agency Kenya",
        "SEO",
        "paid media services",
      ],
    ),
  component: () => (
    <>
      <Booking primary />
    </>
  ),
});
