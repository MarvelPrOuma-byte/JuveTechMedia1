export const blogPosts = [
  {
    slug: "seo-paid-media-growth",
    title: "A Practical SEO and Paid Media Plan for Sustainable Growth",
    description:
      "Connect search engine optimization and paid media to shared business goals, useful landing pages, and meaningful measurement.",
    category: "SEO & Performance Marketing",
    published: "2026-10-30",
    readingTime: "2 min read",
    sections: [
      {
        heading: "Start with one measurable business goal",
        paragraphs: [
          "Before choosing keywords or setting an ad budget, decide what progress means. It might be qualified enquiries, booked consultations, product sales, or visits to a physical location. Define the action that counts as a conversion and how it will be recorded.",
          "A shared definition helps SEO and paid media answer the same question: are we reaching people likely to take a valuable next step?",
        ],
      },
      {
        heading: "Map search intent to useful landing pages",
        paragraphs: [
          "A search phrase is a clue about what someone needs. A person comparing service providers needs a clear explanation of your offer, evidence that you understand their situation, and an easy way to make contact. Someone looking for an answer may need a practical guide first.",
          "Build focused pages for important services and audiences. Keep the promise in an ad consistent with the landing page that follows it.",
        ],
      },
      {
        heading: "Use paid campaigns to learn, not just to spend",
        paragraphs: [
          "Performance marketing can provide fast feedback about search terms, offers, and creative angles. Start with a manageable set of campaigns and track qualified actions, not just clicks.",
          "If a message attracts visits but not meaningful enquiries, investigate targeting and the landing page before increasing spend. Treat campaign insights as hypotheses to test, not guarantees.",
        ],
      },
      {
        heading: "Build organic growth with genuinely helpful content",
        paragraphs: [
          "SEO means making a site understandable, technically accessible, and useful to the people it is meant to serve. Make sure important pages can be crawled, work well on mobile, and explain the service clearly.",
          "Connect related articles to relevant service pages. Measure qualified organic visits and enquiries alongside rankings so the work stays tied to business needs.",
        ],
      },
      {
        heading: "Review the whole journey",
        paragraphs: [
          "Compare lead quality, conversion rates, and customer acquisition costs where that information is available. Look for friction: unclear pricing, a slow page, an incomplete form, or a mismatch between an ad and its landing page.",
          "Prioritize a specific change, give it time to produce useful evidence, and record what you learn. Use paid media to reach and learn, invest in SEO to build discoverability, and make each landing page clear.",
        ],
      },
    ],
  },
  {
    slug: "website-launch-checklist",
    title: "A Practical Website Launch Checklist for Kenyan Businesses",
    description:
      "The core content, contact, mobile, and search checks to complete before publishing a business website.",
    category: "Web Design",
    published: "2026-11-01",
    readingTime: "2 min read",
    sections: [
      {
        heading: "Make the offer and next step easy to find",
        paragraphs: [
          "A first-time visitor should be able to understand what the business does, who it serves, and what to do next. Put the essential service information and contact action where people can find them without hunting.",
          "Check that phone numbers, email addresses, opening hours, and location details are current. If the business uses WhatsApp for enquiries, include a working link and say what visitors can ask about.",
        ],
      },
      {
        heading: "Review the site on a phone",
        paragraphs: [
          "Open every important page on a real phone or a mobile browser preview. Check that text is readable, buttons are easy to tap, forms are not awkward to fill in, and no content spills beyond the screen.",
          "Test the main journey from the homepage to a service page and then to contact. A responsive layout matters most when visitors can complete what they came to do.",
        ],
      },
      {
        heading: "Check the basics of local discovery",
        paragraphs: [
          "Use consistent business names, phone numbers, addresses, and service areas wherever they appear. Add accurate page titles and descriptions, and make each important page's purpose clear in its headings.",
          "If a Google Business Profile is relevant, confirm that the website link and contact details match the information on the site.",
        ],
      },
      {
        heading: "Decide what needs to be measured",
        paragraphs: [
          "Choose the useful actions to track before launch, such as completed enquiry forms or clicks to call. Make sure the tracking setup respects applicable privacy requirements and test that events fire as intended.",
          "Do not treat visits alone as evidence that the site is helping. Review whether the intended audience can reach the right information and complete the next step.",
        ],
      },
      {
        heading: "Keep launch responsibilities clear",
        paragraphs: [
          "Confirm who owns the domain, hosting, website content, and any third-party accounts. Keep access credentials secure and agree who will update information after the launch.",
          "A launch checklist is not a one-time quality guarantee. Schedule a follow-up to check forms, links, page speed, and the accuracy of content as the business changes.",
        ],
      },
    ],
  },
  {
    slug: "digital-ad-budget-planning",
    title: "How to Plan a First Digital Advertising Budget",
    description:
      "A measured way to choose a starting budget, account for ad spend separately, and learn from early campaign results.",
    category: "Paid Advertising",
    published: "2026-11-01",
    readingTime: "2 min read",
    sections: [
      {
        heading: "Start with the business outcome",
        paragraphs: [
          "Choose the action that makes an advertising campaign useful to the business: a qualified enquiry, a purchase, or another clear outcome. Decide how that action will be measured before launch.",
          "If the offer, audience, or conversion path is not clear yet, address those basics before committing to a large budget.",
        ],
      },
      {
        heading: "Separate platform spend from management costs",
        paragraphs: [
          "The amount paid to an advertising platform is different from any strategy, creative, or management fee. Plan for these separately so the campaign budget is not confused with the cost of the work around it.",
          "Set a limit the business can afford to spend while learning. A starting budget is a test, not a promise of a particular number of leads or sales.",
        ],
      },
      {
        heading: "Choose one focused test",
        paragraphs: [
          "Begin with a specific audience, a clear offer, and a landing page that supports the campaign message. Testing too many audiences and messages at once can make results difficult to interpret.",
          "Confirm that forms, calls, and other conversion actions work on mobile before sending paid traffic to them.",
        ],
      },
      {
        heading: "Review lead quality, not just clicks",
        paragraphs: [
          "Clicks and impressions show that an ad was seen or opened; they do not prove that the campaign generated useful business. Review the quality of enquiries and the steps people take after clicking.",
          "If visitors do not convert, look at the whole journey: the audience, promise, page content, form, and follow-up process.",
        ],
      },
      {
        heading: "Set a regular review point",
        paragraphs: [
          "Agree how often the campaign will be reviewed and which decisions can change the budget. Record the original plan, what changed, and what the results suggest.",
          "Use early data to make a careful next decision. Pause or adjust a test when it is not producing useful evidence rather than increasing spend simply to chase activity.",
        ],
      },
    ],
  },
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
