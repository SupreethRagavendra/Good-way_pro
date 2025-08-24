/**
 * Performance Optimizer for Good Way Travels
 * Handles code splitting, lazy loading, and performance monitoring
 */

(function() {
    'use strict';
    
    // Performance monitoring
    const performanceMetrics = {
        startTime: performance.now(),
        resources: new Set(),
        errors: []
    };
    
    // Resource loading queue
    const loadQueue = [];
    let isProcessingQueue = false;
    
    // Lazy loading configuration
    const lazyConfig = {
        threshold: 0.1,
        rootMargin: '50px',
        fallbackDelay: 2000
    };
    
    // Performance-optimized resource loader
    function loadResource(url, type = 'script', priority = 'normal') {
        return new Promise((resolve, reject) => {
            const resource = {
                url,
                type,
                priority,
                resolve,
                reject,
                timestamp: Date.now()
            };
            
            loadQueue.push(resource);
            loadQueue.sort((a, b) => {
                const priorityOrder = { high: 3, normal: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
            
            if (!isProcessingQueue) {
                processLoadQueue();
            }
        });
    }
    
    // Process load queue with rate limiting
    async function processLoadQueue() {
        if (isProcessingQueue || loadQueue.length === 0) return;
        
        isProcessingQueue = true;
        
        while (loadQueue.length > 0) {
            const resource = loadQueue.shift();
            
            try {
                if (resource.type === 'script') {
                    await loadScript(resource.url);
                } else if (resource.type === 'css') {
                    await loadCSS(resource.url);
                } else if (resource.type === 'image') {
                    await loadImage(resource.url);
                }
                
                resource.resolve();
                performanceMetrics.resources.add(resource.url);
                
            } catch (error) {
                resource.reject(error);
                performanceMetrics.errors.push({
                    url: resource.url,
                    error: error.message,
                    timestamp: Date.now()
                });
            }
            
            // Rate limiting: wait 50ms between loads
            if (loadQueue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
        
        isProcessingQueue = false;
    }
    
    // Optimized script loader
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            
            script.onload = resolve;
            script.onerror = reject;
            
            document.head.appendChild(script);
        });
    }
    
    // Optimized CSS loader
    function loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            
            link.onload = () => {
                link.media = 'all';
                resolve();
            };
            link.onerror = reject;
            
            document.head.appendChild(link);
        });
    }
    
    // Optimized image loader
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }
    
    // Lazy loading for images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (!images.length) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, lazyConfig);
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Lazy loading for components
    function setupComponentLazyLoading() {
        const components = document.querySelectorAll('[data-lazy-component]');
        
        if (!components.length) return;
        
        const componentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const component = entry.target;
                    const componentType = component.dataset.lazyComponent;
                    
                    loadComponent(componentType, component);
                    observer.unobserve(component);
                }
            });
        }, lazyConfig);
        
        components.forEach(component => componentObserver.observe(component));
    }
    
    // Load components on demand
    async function loadComponent(type, container) {
        try {
            switch (type) {
                case 'contact-form':
                    await loadResource('js/contact-form.js', 'script', 'high');
                    break;
                case 'services-filter':
                    await loadResource('js/services-filter.js', 'script', 'high');
                    break;
                case 'inquiry-form':
                    await loadResource('js/inquiry-form.js', 'script', 'high');
                    break;
                default:
                    console.warn(`Unknown component type: ${type}`);
            }
        } catch (error) {
            console.error(`Failed to load component ${type}:`, error);
        }
    }
    
    // Performance monitoring
    function trackPerformance() {
        // Track Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });
            
            // Cumulative Layout Shift
            new PerformanceObserver((list) => {
                let cls = 0;
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        cls += entry.value;
                    }
                });
                console.log('CLS:', cls);
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    // Memory management
    function cleanupResources() {
        // Clear unused event listeners
        const unusedElements = document.querySelectorAll('[data-temp]');
        unusedElements.forEach(el => {
            el.remove();
        });
        
        // Clear unused timers
        if (window.performanceTimers) {
            window.performanceTimers.forEach(timer => clearTimeout(timer));
            window.performanceTimers = [];
        }
    }
    
    // Initialize performance optimizer
    function init() {
        // Setup lazy loading
        setupLazyLoading();
        setupComponentLazyLoading();
        
        // Track performance
        trackPerformance();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', cleanupResources);
        
        // Periodic cleanup
        setInterval(cleanupResources, 30000);
        
        console.log('Performance optimizer initialized');
    }
    
    // Export to global scope
    window.PerformanceOptimizer = {
        loadResource,
        setupLazyLoading,
        setupComponentLazyLoading,
        trackPerformance,
        cleanupResources,
        metrics: performanceMetrics
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();