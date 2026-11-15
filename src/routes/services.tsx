import { pageHead } from "@/lib/seo";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Services, Booking } from "@/components/site/Sections";

export const Route = createFileRoute("/services")({
  head: ({ matches }) => {
    if (matches.some(({ routeId }) => routeId.startsWith("/services/"))) return {};
    return pageHead(
      "/services",
      "Digital Services | JuveTech Media",
      "Explore social media, video production, web design, app development, SEO and PPC, branding, and local SEO services from JuveTech Media.",
      [
        "social media management Kenya",
        "video production",
        "web design Kenya",
        "app development",
        "SEO and PPC",
        "branding",
        "local SEO",
        "digital marketing agency Kenya",
      ],
    );
  },
  component: ServicesRoutePage,
});

function ServicesRoutePage() {
  const isServiceDetail = useRouterState({
    select: (state) => state.matches.some(({ routeId }) => routeId.startsWith("/services/")),
  });

  if (isServiceDetail) return <Outlet />;

  return (
    <>
      <Services primary />
      <Booking />
    </>
  );
}
