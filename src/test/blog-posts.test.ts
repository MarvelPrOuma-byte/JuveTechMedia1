import { describe, expect, it } from "vitest";

import { blogPosts } from "../lib/blog-posts";

describe("full blog articles", () => {
  it("provides substantial article content for every Read More page", () => {
    for (const post of blogPosts) {
      const wordCount = post.sections
        .flatMap((section) => section.paragraphs)
        .join(" ")
        .trim()
        .split(/\s+/).length;

      expect(wordCount, post.slug).toBeGreaterThanOrEqual(600);
    }
  });
});
