import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Hero, Services } from "@/components/site/Sections";
import { HomeCTA } from "@/components/site/HomeCTA";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "/",
      "JuveTech Media | Digital Marketing Agency in Kenya",
      "Looking for a digital marketing agency in Kenya? JuveTech Media helps businesses grow with SEO, paid media, web design, and digital marketing consultancy.",
      [
        "digital marketing agency Kenya",
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
