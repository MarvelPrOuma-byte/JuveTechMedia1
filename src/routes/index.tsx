import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Hero, Services } from "@/components/site/Sections";
import { HomeCTA } from "@/components/site/HomeCTA";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "/",
      "JuveTech Media | Digital Marketing Agency, SEO & Paid Media Kenya",
      "JuveTech Media is a digital marketing agency in Kenya offering SEO and organic growth, performance marketing and paid media services, web design, and marketing consultancy.",
      [
        "digital marketing agency",
        "SEO and organic growth agency",
        "performance marketing",
        "paid media services",
        "marketing consultancy Kenya",
      ],
    ),
  component: () => (
    <>
      <Hero />
      <Services />
      <HomeCTA />
    </>
  ),
});
