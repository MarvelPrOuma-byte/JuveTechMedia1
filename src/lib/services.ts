export const serviceDetails = [
  {
    id: "web-design",
    title: "Website Design & Development",
    summary:
      "Plan, build, and launch a clear website that works across phones, tablets, and desktops.",
    introduction:
      "A business website should make it easy for visitors to understand what you offer and how to get in touch. We work with you on the page structure, content priorities, visual direction, and build.",
    bestFor:
      "Businesses that need a first website, a redesign, or a more useful path from a visit to an enquiry.",
    deliverables: [
      "A project scope and page structure agreed before development",
      "Responsive page layouts and implementation",
      "Contact links and enquiry calls to action",
      "Basic on-page search setup and launch checks",
    ],
    process: [
      ["Discover", "Agree the audience, goals, content, and essential pages."],
      ["Design and build", "Create the visual direction and implement responsive pages."],
      ["Review and launch", "Check the content and core journeys together before launch."],
    ],
    pricingId: "web",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    summary: "Improve how clearly your website explains its pages to people and search engines.",
    introduction:
      "SEO starts with useful pages, a site that can be crawled, and content aligned with the questions your customers actually ask. We focus on practical improvements and track meaningful search and enquiry signals.",
    bestFor:
      "Businesses looking to build long-term organic visibility and make their existing site easier to find and use.",
    deliverables: [
      "Technical and on-page review",
      "Search topic and page mapping",
      "Page title, heading, and internal-link recommendations",
      "A prioritized list of improvements and measurement ideas",
    ],
    process: [
      ["Review", "Understand the site, current search visibility, and business priorities."],
      ["Prioritize", "Choose improvements based on customer value and effort."],
      ["Improve and learn", "Make or guide changes, then review useful search and enquiry data."],
    ],
    pricingId: "seo",
  },
  {
    id: "paid-media",
    title: "Paid Advertising Management",
    summary:
      "Plan and manage Google or Meta campaigns around a defined audience and conversion goal.",
    introduction:
      "Paid media works best when the campaign, landing page, and conversion measurement agree. We help set up a focused plan, review the results, and make considered adjustments. Advertising spend is separate from management fees.",
    bestFor:
      "Businesses with a clear offer that want to test or improve paid acquisition with measurable goals.",
    deliverables: [
      "Campaign and audience plan",
      "Account and conversion-tracking checks",
      "Campaign setup and ongoing optimization",
      "Regular reporting on agreed measures",
    ],
    process: [
      ["Set goals", "Agree the offer, audience, conversion action, and budget."],
      ["Launch carefully", "Prepare the campaign and check that measurement works."],
      ["Review", "Use campaign and lead-quality signals to guide changes."],
    ],
    pricingId: "ads",
  },
  {
    id: "video-production",
    title: "Video and Advertising Creative",
    summary:
      "Develop short-form video adverts and creative assets for your campaign or social channels.",
    introduction:
      "A useful video starts with a clear message and a format suited to where it will appear. We help shape the brief and produce short-form creative that communicates your offer without relying on unsupported performance promises.",
    bestFor:
      "Teams that need campaign creative, product explainers, or a consistent supply of short-form social video.",
    deliverables: [
      "A creative brief and message outline",
      "Short-form video production scoped to the project",
      "Platform-conscious versions where agreed",
      "Review and delivery of final files",
    ],
    process: [
      ["Brief", "Agree the audience, message, format, and deliverables."],
      ["Create", "Develop the concept and produce the agreed assets."],
      ["Review and deliver", "Gather feedback and provide the final files."],
    ],
    pricingId: "video",
  },
  {
    id: "graphic-design",
    title: "Graphic Design and Social Content",
    summary: "Create consistent branded graphics for social posts, campaigns, and promotions.",
    introduction:
      "Clear graphic content helps a business communicate consistently across its digital channels. We use your brand direction and campaign message to scope a set of practical, reusable visual assets.",
    bestFor:
      "Businesses that need campaign graphics or regular branded content for social platforms.",
    deliverables: [
      "A visual direction aligned with supplied brand assets",
      "Designed social or campaign graphics",
      "File sizes and formats agreed for the intended channels",
      "A review round scoped to the project",
    ],
    process: [
      ["Brief", "Agree the audience, message, channels, and asset list."],
      ["Design", "Prepare graphics using the agreed visual direction."],
      ["Review and deliver", "Incorporate agreed feedback and provide final files."],
    ],
    pricingId: "graphic",
  },
] as const;

export function getServiceDetails(id: string) {
  return serviceDetails.find((service) => service.id === id);
}
