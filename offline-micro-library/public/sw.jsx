const CACHE_NAME = 'offline-micro-library-v1';

const urlsToCache = [
  '/manifest.json',
  '/index.html',
  '/offline-homework-help',

  // Flashcards
  '/flashcards/math',
  '/flashcards/science',
  '/flashcards/vocabulary',

  // Quizzes
  '/quiz/math',
  '/quiz/science',
  '/quiz/vocabulary',

  // JS & CSS
  '/static/js/main.js',
  '/static/css/main.css',
];


// Install Service Worker and cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker and clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch handler: serve from cache first, then network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        console.log('[SW] Serving from cache:', request.url);
        return cached;
      }

      return fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
            console.log('[SW] Caching new resource:', request.url);
          });

          return response;
        })
        .catch(() => {
          // Optional fallback for offline
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Listen for messages from the client (optional)
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});