// Good Way Travels - Service Worker
// Version: 1.0.0
// Purpose: Caching, offline functionality, and performance optimization

const CACHE_NAME = 'good-way-travels-v1.0.0';
const STATIC_CACHE = 'good-way-travels-static-v1.0.0';
const DYNAMIC_CACHE = 'good-way-travels-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/contact.html',
    '/inquiry.html',
    '/css/main.css',
    '/css/bootstrap-integration.css',
    '/css/about.css',
    '/css/services.css',
    '/css/contact.css',
    '/css/inquiry.css',
    '/js/main.js',
    '/js/shared-utils.js',
    '/js/about.js',
    '/js/services.js',
    '/js/contact.js',
    '/js/inquiry.js',
    '/assets/Images/logo.webp',
    '/assets/Images/csc-certification-badge.webp',
    '/assets/Images/tnega-approval-badge.webp',
    '/site.webmanifest',
    '/robots.txt',
    '/sitemap.xml'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Handle different types of requests
    if (url.pathname.endsWith('.html') || url.pathname === '/') {
        // HTML pages - cache first, then network
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else if (url.pathname.includes('/css/') || url.pathname.includes('/js/')) {
        // CSS and JS files - cache first, then network
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else if (url.pathname.includes('/assets/Images/')) {
        // Images - cache first, then network
        event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    } else if (url.hostname.includes('cdn.jsdelivr.net') || 
               url.hostname.includes('fonts.googleapis.com') ||
               url.hostname.includes('cdnjs.cloudflare.com')) {
        // External resources - network first, then cache
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    } else {
        // Other requests - network first, then cache
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
    try {
        // Try to get from cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If not in cache, fetch from network
        const networkResponse = await fetch(request);
        
        // Cache the response for future use
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache First Strategy Error:', error);
        
        // If both cache and network fail, return offline page for HTML requests
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Network First Strategy Error:', error);
        
        // If network fails, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If both fail, return appropriate fallback
        if (request.destination === 'image') {
            return new Response('', { status: 404 });
        }
        
        throw error;
    }
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Handle any pending offline actions
        const pendingActions = await getPendingActions();
        
        for (const action of pendingActions) {
            await processPendingAction(action);
        }
        
        console.log('Service Worker: Background sync completed');
    } catch (error) {
        console.error('Service Worker: Background sync failed:', error);
    }
}

// Get pending actions from IndexedDB
async function getPendingActions() {
    // This would typically use IndexedDB to store pending actions
    // For now, return empty array
    return [];
}

// Process pending action
async function processPendingAction(action) {
    // Process the pending action (e.g., form submission)
    console.log('Processing pending action:', action);
}

// Push notification handling
self.addEventListener('push', event => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/assets/Images/logo.webp',
        badge: '/assets/Images/csc-certification-badge.webp',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Services',
                icon: '/assets/Images/logo.webp'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/Images/logo.webp'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Good Way Travels', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/services.html')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open homepage
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
    console.log('Service Worker: Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Error handling
self.addEventListener('error', event => {
    console.error('Service Worker Error:', event.error);
});

// Unhandled rejection handling
self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker Unhandled Rejection:', event.reason);
});