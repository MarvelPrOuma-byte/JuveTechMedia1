import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { blogPosts } from "@/lib/blog-posts";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(["/work", "/case-studies", "/pricing"])("does not expose the removed %s page", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).toBe(rootRouteId);
  });

  const serviceAndPagePaths = [
    "/team",
    "/blog",
    "/portfolio",
    "/services/social-media",
    "/services/video-production",
    "/services/web-design",
    "/services/app-development",
    "/services/seo",
    "/services/branding",
    "/services/local-seo",
  ];

  it.each([...serviceAndPagePaths, ...blogPosts.map((post) => `/blog/${post.slug}`)])(
    "matches the %s page",
    (path) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

      const matches = router.matchRoutes(path);

      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    },
  );
});
