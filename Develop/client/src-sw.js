// Import necessary modules from Workbox
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache and route static assets defined in the __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Cache responses with HTTP status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set an expiration time for cached pages (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the pageCache strategy with specified URLs
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register a route for navigation requests (e.g., HTML pages)
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching for styles, scripts, and workers
registerRoute(
  // Check if the request destination is style, script, or worker
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  // Use a StaleWhileRevalidate strategy to cache and update assets
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      // Cache responses with HTTP status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
