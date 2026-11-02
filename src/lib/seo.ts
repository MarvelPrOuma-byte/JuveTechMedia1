export const SITE_URL = "https://www.juvetechmedia.co.ke";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageHead(
  path: string,
  title: string,
  description: string,
  keywords: string[] = [],
  structuredData?: Record<string, unknown>,
) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(keywords.length ? [{ name: "keywords", content: keywords.join(", ") }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl(path) },
      { property: "og:image", content: absoluteUrl("/juvetechmedia.png") },
      { property: "og:image:alt", content: "JuveTech Media" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl("/juvetechmedia.png") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
    ...(structuredData
      ? {
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify(structuredData),
            },
          ],
        }
      : {}),
  };
}
