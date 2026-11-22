import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* PPR (cacheComponents) is intentionally off for v1: with placeholder data there
     is nothing to stream, and a PPR shell would commit HTTP 200 before notFound()
     can run, so unknown profile slugs could never return a proper 404. Re-enable
     cacheComponents + partialPrefetching when real (async) data fetching lands,
     together with <Suspense> skeletons and a deliberate not-found strategy. */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
