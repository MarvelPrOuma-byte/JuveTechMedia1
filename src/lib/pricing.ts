export const pricingCurrency = "KES";

// Illustrative package amounts, pending the agency's final rates.
export const packagePrices = { launchpad: 99000, growth: 189000 };

export const individualServices = [
  { id: "web", name: "Web Design & Development", amount: 35000, period: "per project", detail: "A custom business website, mobile-ready with essential SEO." },
  { id: "seo", name: "Search Engine Optimization", amount: 20000, period: "per month", detail: "Site audit, keyword strategy and on-page improvements." },
  { id: "ads", name: "Paid Ads Management", amount: 15000, period: "per month", detail: "Google or Meta campaign setup and ongoing optimization. Ad spend is separate." },
  { id: "graphic", name: "Graphic Posters", amount: 1500, period: "per design", detail: "Branded posters and social media graphics." },
  { id: "video", name: "Advert & Video Production", amount: 10000, period: "per video", detail: "Short-form branded adverts for social media campaigns." },
];

export function formatPackagePrice(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}