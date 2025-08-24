/**
 * Performance Monitor for Good Way Travels
 * Tracks Core Web Vitals and other performance metrics
 */

(function() {
    'use strict';
    
    // Performance metrics storage
    const metrics = {
        navigationStart: performance.timing.navigationStart,
        loadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0,
        timeToInteractive: 0
    };
    
    // Performance observer for Core Web Vitals
    function initPerformanceObservers() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                metrics.largestContentfulPaint = lastEntry.startTime;
                console.log('LCP:', metrics.largestContentfulPaint);
                
                // Report to analytics
                reportMetric('LCP', metrics.largestContentfulPaint);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    metrics.firstInputDelay = entry.processingStart - entry.startTime;
                    console.log('FID:', metrics.firstInputDelay);
                    
                    // Report to analytics
                    reportMetric('FID', metrics.firstInputDelay);
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
                metrics.cumulativeLayoutShift = cls;
                console.log('CLS:', metrics.cumulativeLayoutShift);
                
                // Report to analytics
                reportMetric('CLS', metrics.cumulativeLayoutShift);
            }).observe({ entryTypes: ['layout-shift'] });
            
            // First Paint and First Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-paint') {
                        metrics.firstPaint = entry.startTime;
                        console.log('FP:', metrics.firstPaint);
                        reportMetric('FP', metrics.firstPaint);
                    } else if (entry.name === 'first-contentful-paint') {
                        metrics.firstContentfulPaint = entry.startTime;
                        console.log('FCP:', metrics.firstContentfulPaint);
                        reportMetric('FCP', metrics.firstContentfulPaint);
                    }
                });
            }).observe({ entryTypes: ['paint'] });
        }
    }
    
    // Track page load metrics
    function trackPageLoadMetrics() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            metrics.loadTime = loadTime;
            
            console.log('Page Load Time:', loadTime);
            reportMetric('LoadTime', loadTime);
            
            // Calculate Time to Interactive
            if (metrics.firstInputDelay > 0) {
                metrics.timeToInteractive = metrics.firstInputDelay + metrics.largestContentfulPaint;
                console.log('TTI:', metrics.timeToInteractive);
                reportMetric('TTI', metrics.timeToInteractive);
            }
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            metrics.domContentLoaded = performance.now();
            console.log('DOM Content Loaded:', metrics.domContentLoaded);
            reportMetric('DOMContentLoaded', metrics.domContentLoaded);
        });
    }
    
    // Track resource loading performance
    function trackResourcePerformance() {
        if ('PerformanceObserver' in window) {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'resource') {
                        const resourceTime = entry.responseEnd - entry.requestStart;
                        
                        // Log slow resources
                        if (resourceTime > 1000) {
                            console.warn('Slow resource:', entry.name, resourceTime + 'ms');
                        }
                        
                        // Track by resource type
                        const resourceType = entry.initiatorType;
                        if (resourceType === 'img' && resourceTime > 2000) {
                            console.warn('Slow image:', entry.name, resourceTime + 'ms');
                        } else if (resourceType === 'script' && resourceTime > 1000) {
                            console.warn('Slow script:', entry.name, resourceTime + 'ms');
                        } else if (resourceType === 'css' && resourceTime > 500) {
                            console.warn('Slow stylesheet:', entry.name, resourceTime + 'ms');
                        }
                    }
                });
            }).observe({ entryTypes: ['resource'] });
        }
    }
    
    // Track user interactions
    function trackUserInteractions() {
        let firstInteraction = true;
        
        const interactionEvents = ['click', 'keydown', 'scroll', 'touchstart'];
        
        interactionEvents.forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                if (firstInteraction) {
                    const interactionTime = performance.now();
                    console.log('First Interaction:', eventType, interactionTime);
                    reportMetric('FirstInteraction', interactionTime);
                    firstInteraction = false;
                }
            }, { passive: true, once: true });
        });
    }
    
    // Track memory usage (if available)
    function trackMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
                
                console.log('Memory Usage:', usedMB + 'MB / ' + totalMB + 'MB');
                
                // Alert if memory usage is high
                if (usedMB > 100) {
                    console.warn('High memory usage detected:', usedMB + 'MB');
                }
            }, 30000); // Check every 30 seconds
        }
    }
    
    // Track network conditions
    function trackNetworkConditions() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            console.log('Network Type:', connection.effectiveType);
            console.log('Downlink:', connection.downlink + 'Mbps');
            console.log('RTT:', connection.rtt + 'ms');
            
            // Report network conditions
            reportMetric('NetworkType', connection.effectiveType);
            reportMetric('Downlink', connection.downlink);
            reportMetric('RTT', connection.rtt);
            
            // Listen for network changes
            connection.addEventListener('change', () => {
                console.log('Network changed:', connection.effectiveType);
                reportMetric('NetworkChange', connection.effectiveType);
            });
        }
    }
    
    // Track errors and performance issues
    function trackErrors() {
        // JavaScript errors
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            reportMetric('Error', event.error.message);
        });
        
        // Promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            reportMetric('PromiseRejection', event.reason);
        });
        
        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target && event.target.tagName) {
                console.error('Resource Error:', event.target.src || event.target.href);
                reportMetric('ResourceError', event.target.src || event.target.href);
            }
        }, true);
    }
    
    // Report metrics to analytics
    function reportMetric(name, value) {
        // Send to Google Analytics if available
        if (window.gtag) {
            window.gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: Math.round(value * 100) / 100,
                page_location: window.location.href
            });
        }
        
        // Send to custom analytics endpoint
        if (window.analyticsEndpoint) {
            fetch(window.analyticsEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    metric: name,
                    value: value,
                    url: window.location.href,
                    timestamp: Date.now()
                })
            }).catch(error => {
                console.warn('Failed to send metric:', error);
            });
        }
        
        // Store in localStorage for offline analysis
        try {
            const storedMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
            storedMetrics.push({
                name: name,
                value: value,
                url: window.location.href,
                timestamp: Date.now()
            });
            
            // Keep only last 100 metrics
            if (storedMetrics.length > 100) {
                storedMetrics.splice(0, storedMetrics.length - 100);
            }
            
            localStorage.setItem('performanceMetrics', JSON.stringify(storedMetrics));
        } catch (error) {
            console.warn('Failed to store metric:', error);
        }
    }
    
    // Generate performance report
    function generatePerformanceReport() {
        const report = {
            url: window.location.href,
            timestamp: Date.now(),
            metrics: metrics,
            userAgent: navigator.userAgent,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null,
            memory: performance.memory ? {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            } : null
        };
        
        console.log('Performance Report:', report);
        return report;
    }
    
    // Initialize performance monitoring
    function init() {
        console.log('Performance monitoring initialized');
        
        initPerformanceObservers();
        trackPageLoadMetrics();
        trackResourcePerformance();
        trackUserInteractions();
        trackMemoryUsage();
        trackNetworkConditions();
        trackErrors();
        
        // Generate report after 5 seconds
        setTimeout(() => {
            generatePerformanceReport();
        }, 5000);
    }
    
    // Export functions to global scope
    window.PerformanceMonitor = {
        metrics: metrics,
        reportMetric: reportMetric,
        generateReport: generatePerformanceReport
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();