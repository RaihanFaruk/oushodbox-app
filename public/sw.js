/**
 * ঔষধBox (OushodBox) — Service Worker v1.0.0
 * Production-safe offline caching engine
 */

const CACHE_STATIC = 'OUSHODBOX_STATIC_V1';
const CACHE_RUNTIME = 'OUSHODBOX_RUNTIME_V1';
const CACHE_MEDICINES = 'OUSHODBOX_MEDICINES_V1';

const CORE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install Event — pre-cache core shell & offline fallback
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_STATIC)
      .then((cache) => {
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[SW] Core pre-cache error:', err);
      })
  );
});

// Activate Event — cleanup outdated cache versions
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_STATIC, CACHE_RUNTIME, CACHE_MEDICINES];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event — smart offline handling
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  // Ignore browser extensions or other protocols
  if (!url.protocol.startsWith('http')) return;

  // Security: Never cache sensitive API/auth routes or requests with Authorization headers
  if (
    url.pathname.startsWith('/api/auth') ||
    url.pathname.startsWith('/api/admin') ||
    url.pathname.includes('/auth') ||
    url.pathname.includes('/login') ||
    request.headers.has('authorization')
  ) {
    return;
  }

  // 1. Navigation Requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If valid response, clone to runtime/medicines cache
          if (response && response.status === 200) {
            const responseClone = response.clone();
            const targetCache = url.pathname.startsWith('/medicines')
              ? CACHE_MEDICINES
              : CACHE_RUNTIME;

            caches.open(targetCache).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // Network failed: try cache first
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback to offline page
          const offlinePage = await caches.match('/offline');
          if (offlinePage) {
            return offlinePage;
          }

          return new Response(
            '<html><body><h1>Offline</h1><p>ইন্টারনেট সংযোগ নেই।</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, images, Google fonts)
  if (
    url.origin === location.origin &&
    (url.pathname.startsWith('/_next/static/') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.ico'))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached, update in background (Stale-While-Revalidate)
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_STATIC).then((cache) => {
                  cache.put(request, networkResponse);
                });
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_STATIC).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Google Fonts & CDNs
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_RUNTIME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
