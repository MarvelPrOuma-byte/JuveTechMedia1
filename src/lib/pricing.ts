export const pricingCurrency = "KES";

// Illustrative package amounts, pending the agency's final rates.
export const packagePrices = { launchpad: 99000, growth: 189000 };

export const individualServices = [
  {
    id: "social-media",
    name: "Social Media Management",
    amount: 15000,
    period: "per month",
    detail: "Content planning, branded posts, and a monthly activity summary.",
  },
  {
    id: "video-production",
    name: "Video Production",
    amount: 10000,
    period: "per video",
    detail: "Short-form video production for social media and campaigns.",
  },
  {
    id: "web-design",
    name: "Web Design",
    amount: 35000,
    period: "per project",
    detail: "A responsive business website with essential on-page SEO.",
  },
  {
    id: "app-development",
    name: "App Development",
    amount: 150000,
    period: "per project",
    detail: "A scoped web application; final cost depends on requirements.",
  },
  {
    id: "seo",
    name: "SEO & PPC",
    amount: 25000,
    period: "per month",
    detail: "Organic search improvements and paid search management. Ad spend is separate.",
  },
  {
    id: "branding",
    name: "Branding",
    amount: 15000,
    period: "per project",
    detail: "Visual direction and digital-ready brand identity assets.",
  },
  {
    id: "local-seo",
    name: "Local SEO",
    amount: 12000,
    period: "per month",
    detail: "Local business profile and location-focused search improvements.",
  },
];

export function formatPackagePrice(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}
