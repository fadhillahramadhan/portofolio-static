const CACHE_NAME = 'v1_cache';
const urlsToCache = [
	'/portofolio-static',
	'/portofolio-static/css/app.css',
	'/portofolio-static/images/logo.png',
	'https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js',
	'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
	// Add more files you want to cache
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

self.addEventListener('activate', (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
