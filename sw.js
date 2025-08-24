/**
 * Service Worker for Good Way Travels
 * Handles caching, offline functionality, and performance optimization
 */

const CACHE_NAME = 'good-way-travels-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/css/critical.css',
    '/js/core.js',
    '/js/performance-optimizer.js',
    '/assets/Images/logo.webp',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Static resources to cache
const STATIC_RESOURCES = [
    '/css/main.css',
    '/css/bootstrap-integration.css',
    '/css/about.css',
    '/css/contact.css',
    '/css/inquiry.css',
    '/css/services.css',
    '/js/main-optimized.js',
    '/js/about.js',
    '/js/contact.js',
    '/js/inquiry.js',
    '/js/services.js',
    '/about.html',
    '/contact.html',
    '/inquiry.html',
    '/services.html'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching critical resources');
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                console.log('Critical resources cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Failed to cache critical resources:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip external resources (except CDN resources we want to cache)
    if (!url.origin.includes(self.location.origin) && 
        !url.href.includes('cdn.jsdelivr.net') && 
        !url.href.includes('cdnjs.cloudflare.com') &&
        !url.href.includes('fonts.googleapis.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then(response => {
                // Return cached response if available
                if (response) {
                    return response;
                }
                
                // Clone the request for network fetch
                const fetchRequest = request.clone();
                
                return fetch(fetchRequest)
                    .then(response => {
                        // Check if response is valid
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response for caching
                        const responseToCache = response.clone();
                        
                        // Cache the response
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/offline.html');
                        }
                        
                        // Return fallback for other resources
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

// Push notifications
self.addEventListener('push', event => {
    console.log('Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from Good Way Travels',
        icon: '/assets/Images/logo.webp',
        badge: '/assets/Images/logo.webp',
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

// Notification click handler
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/services.html')
        );
    }
});

// Background sync function
async function doBackgroundSync() {
    try {
        // Get pending form submissions from IndexedDB
        const pendingSubmissions = await getPendingSubmissions();
        
        for (const submission of pendingSubmissions) {
            try {
                // Attempt to submit the form
                const response = await fetch(submission.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission.data)
                });
                
                if (response.ok) {
                    // Remove from pending submissions
                    await removePendingSubmission(submission.id);
                    console.log('Background sync successful for submission:', submission.id);
                }
            } catch (error) {
                console.error('Background sync failed for submission:', submission.id, error);
            }
        }
    } catch (error) {
        console.error('Background sync error:', error);
    }
}

// IndexedDB functions for offline form submissions
async function getPendingSubmissions() {
    // Implementation would depend on your IndexedDB setup
    return [];
}

async function removePendingSubmission(id) {
    // Implementation would depend on your IndexedDB setup
    console.log('Removing pending submission:', id);
}

// Cache warming for better performance
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_STATIC_RESOURCES') {
        event.waitUntil(
            caches.open(STATIC_CACHE)
                .then(cache => {
                    return cache.addAll(STATIC_RESOURCES);
                })
                .then(() => {
                    console.log('Static resources cached successfully');
                })
                .catch(error => {
                    console.error('Failed to cache static resources:', error);
                })
        );
    }
});

// Performance monitoring
self.addEventListener('fetch', event => {
    const startTime = performance.now();
    
    event.waitUntil(
        new Promise(resolve => {
            setTimeout(() => {
                const duration = performance.now() - startTime;
                console.log(`Fetch took ${duration.toFixed(2)}ms for ${event.request.url}`);
                resolve();
            }, 0);
        })
    );
});