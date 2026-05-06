// InterviewPrep service worker — minimal cache-first strategy for offline use.
// Bumping CACHE_NAME forces all clients to re-fetch on next visit.
const CACHE_NAME = "prepfast-v1";

const CORE_ASSETS = [
  "/",
  "/recall/",
  "/compress/",
  "/compare/",
  "/about/",
  "/privacy/",
  "/terms/",
  "/manifest.webmanifest",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {
        // Best-effort precache — don't block install on a single failure.
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  // Skip non-http(s) (chrome-extension://, etc.) and analytics.
  const url = new URL(request.url);
  if (!url.protocol.startsWith("http")) return;
  if (url.pathname.startsWith("/_vercel/")) return;

  // Cache-first for static assets; network-first for HTML.
  const isHtml = request.headers.get("accept")?.includes("text/html");

  if (isHtml) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
