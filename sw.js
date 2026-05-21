// Dynamically resolve base URL path from service worker scope (BMAD dynamic routing)
const scopeUrl = new URL(self.registration.scope);
const BASE_PATH = scopeUrl.pathname.endsWith('/') ? scopeUrl.pathname : `${scopeUrl.pathname}/`;

const CACHE_NAME = 'presentme-v2';
const ASSETS_TO_CACHE = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}logo.webp`,
  `${BASE_PATH}fond.webp`,
  `${BASE_PATH}bg-hero.webp`,
  `${BASE_PATH}favicon.ico`,
];

// Install event - Cache static shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - Cleanup old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Cache-First for static assets, Stale-While-Revalidate for JS/CSS/Fonts/Images
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // We only intercept requests for our own origin or static CDNs like google fonts
  if (
    requestUrl.origin === self.location.origin ||
    requestUrl.hostname.includes('fonts.googleapis.com') ||
    requestUrl.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Stale-While-Revalidate: fetch in background and update cache for future visits
          if (event.request.url.match(/\.(js|css|webp|png|jpg|jpeg|svg|ico|woff2)$/)) {
            fetch(event.request).then((networkResponse) => {
              if (networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse);
                });
              }
            }).catch(() => {}); // catch network down errors silently
          }
          return cachedResponse;
        }

        // Cache-Miss: Fetch from network and add to cache dynamically if it is a static asset
        return fetch(event.request).then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (event.request.url.match(/\.(js|css|webp|png|jpg|jpeg|svg|ico|woff2)$/) ||
             requestUrl.hostname.includes('fonts.'))
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
