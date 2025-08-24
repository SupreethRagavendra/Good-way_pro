
(function() {
    'use strict';
    
    // Performance optimization: Cache DOM queries
    const domCache = {
        body: null,
        nav: null,
        hero: null,
        particlesContainer: null,
        themeToggle: null,
        mobileMenuToggle: null,
        mobileMenu: null
    };
    
    // Initialize DOM cache
    function initDOMCache() {
        domCache.body = document.body;
        domCache.nav = document.querySelector('nav');
        domCache.hero = document.querySelector('.hero');
        domCache.particlesContainer = document.querySelector('.particles-container');
        domCache.themeToggle = document.getElementById('themeToggle');
        domCache.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        domCache.mobileMenu = document.querySelector('.mobile-menu');
    }
    
    // Performance optimization: Use Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add animation class
                target.classList.add('animate-in');
                
                // Unobserve after animation
                setTimeout(() => {
                    animationObserver.unobserve(target);
                }, 1000);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Performance optimization: Debounced resize handler
    let resizeTimeout;
    function debouncedResize(callback, delay = 150) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(callback, delay);
    }
    
    // Performance optimization: RAF for smooth animations
    function smoothAnimation(callback) {
        requestAnimationFrame(() => {
            requestAnimationFrame(callback);
        });
    }
    
    // Service Worker Registration
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker registered successfully:', registration.scope);
                        
                        // Check for updates
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New service worker available
                                    showUpdateNotification();
                                }
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
            });
        }
    }
    
    // Show update notification
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <p>🔄 New version available!</p>
                <button onclick="location.reload()">Update Now</button>
                <button onclick="this.parentElement.parentElement.remove()">Later</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--brand-blue);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
    }
    
    // Performance Monitoring
    function initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                
                if (lastEntry.startTime > 2500) {
                    console.warn('LCP is above 2.5s threshold');
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                    
                    if (entry.processingStart - entry.startTime > 100) {
                        console.warn('FID is above 100ms threshold');
                    }
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            
            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
                
                if (clsValue > 0.1) {
                    console.warn('CLS is above 0.1 threshold');
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
        
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
            }, 0);
        });
    }
    
    // Optimized CSS loading with error handling
    function loadCSS(href, media = 'all') {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = media;
            
            link.onload = () => resolve(link);
            link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
            
            document.head.appendChild(link);
        });
    }
    
    // Performance optimization: Load non-critical resources
    function loadNonCriticalResources() {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Load additional fonts if needed
                loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap')
                    .catch(err => console.warn('Font loading failed:', err));
            }, { timeout: 2000 });
        } else {
            // Fallback for older browsers
            setTimeout(() => {
                loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap')
                    .catch(err => console.warn('Font loading failed:', err));
            }, 100);
        }
    }

    // Optimized theme toggle with performance improvements
    function initializeThemeToggle() {
        if (!domCache.themeToggle) return;
        
        const themeIcon = domCache.themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply theme immediately to prevent flash
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            domCache.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Optimized click handler
        domCache.themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            smoothAnimation(() => {
                const isDark = domCache.body.classList.contains('dark-mode');
                
                if (isDark) {
                    domCache.body.classList.remove('dark-mode');
                    themeIcon?.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light');
                } else {
                    domCache.body.classList.add('dark-mode');
                    themeIcon?.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark');
                }
            });
        });
    }

    // Performance optimization: Optimized timeline animation
    function initializeTimelineAnimation() {
        const timeline = document.querySelector('.process-timeline');
        const steps = document.querySelectorAll('.process-step');
        
        if (!timeline || !steps.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const line = document.getElementById('timelineLine');
                    if (line) {
                        smoothAnimation(() => {
                            line.style.height = '0';
                            line.style.transition = 'height 1.5s ease-in-out';
                            line.style.willChange = 'height';
                            
                            smoothAnimation(() => {
                                line.style.height = '100%';
                                setTimeout(() => {
                                    line.style.willChange = 'auto';
                                }, 1500);
                            });
                        });
                    }
                    
                    // Animate steps with optimized timing
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.willChange = 'transform, opacity';
                            step.classList.add('animated');
                            setTimeout(() => {
                                step.style.willChange = 'auto';
                            }, 800);
                        }, index * 150);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(timeline);
    }

    // Performance optimization: Optimized mobile menu
    function initializeMobileMenu() {
        if (!domCache.mobileMenuToggle || !domCache.mobileMenu) return;

        const menuLinks = domCache.mobileMenu.querySelectorAll('a');
        
        // Optimized toggle handler
        domCache.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            smoothAnimation(() => {
                const isOpen = domCache.mobileMenu.classList.contains('active');
                
                if (isOpen) {
                    domCache.mobileMenu.classList.remove('active');
                    domCache.mobileMenuToggle.classList.remove('active');
                    domCache.body.style.overflow = '';
                } else {
                    domCache.mobileMenu.classList.add('active');
                    domCache.mobileMenuToggle.classList.add('active');
                    domCache.body.style.overflow = 'hidden';
                }
            });
        });

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                smoothAnimation(() => {
                    domCache.mobileMenu.classList.remove('active');
                    domCache.mobileMenuToggle.classList.remove('active');
                    domCache.body.style.overflow = '';
                });
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && domCache.mobileMenu.classList.contains('active')) {
                smoothAnimation(() => {
                    domCache.mobileMenu.classList.remove('active');
                    domCache.mobileMenuToggle.classList.remove('active');
                    domCache.body.style.overflow = '';
                });
            }
        });
    }

    // Performance optimization: Optimized particle system
    function createParticles() {
        if (!domCache.particlesContainer) return;
        
        // Clear existing particles
        domCache.particlesContainer.innerHTML = '';
        
        // Performance optimization: Use document fragment
        const fragment = document.createDocumentFragment();
        const particleCount = window.innerWidth < 768 ? 10 : 25; // Reduced for mobile
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const animationDuration = Math.random() * 8 + 4;
            const animationDelay = Math.random() * 3;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${animationDuration}s ease-in-out ${animationDelay}s infinite;
                opacity: ${(Math.random() * 0.3 + 0.1).toFixed(2)};
                will-change: transform;
                pointer-events: none;
            `;
            
            fragment.appendChild(particle);
        }

        domCache.particlesContainer.appendChild(fragment);
    }

    // Performance optimization: Optimized scroll animations
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    // Performance optimization: Optimized counter animation
    function animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Performance optimization: Optimized cookie consent
    function initializeCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const cookieAccept = document.getElementById('cookieAccept');
        const cookieDecline = document.getElementById('cookieDecline');

        if (!cookieConsent || !cookieAccept || !cookieDecline) return;

        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 1500);
        }

        const handleConsent = (accepted) => {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            smoothAnimation(() => {
                cookieConsent.classList.remove('show');
            });
        };

        cookieAccept.addEventListener('click', () => handleConsent(true));
        cookieDecline.addEventListener('click', () => handleConsent(false));
    }

    // Performance optimization: Optimized smooth scroll
    function initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Performance optimization: Optimized resize handler
    function initializeResizeHandler() {
        debouncedResize(() => {
            createParticles();
        }, 150);
    }

    // Performance optimization: Optimized hero animations
    function initializeHeroAnimations() {
        if (document.readyState === 'complete') {
            startHeroAnimations();
        } else {
            window.addEventListener('load', startHeroAnimations);
        }
    }

    function startHeroAnimations() {
        const heroElements = document.querySelectorAll('.split-text-container, .hero-subtitle, .hero-cta, .hero-stats');
        
        heroElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.willChange = 'transform, opacity';
            
            setTimeout(() => {
                smoothAnimation(() => {
                    el.style.transition = 'all 0.6s ease-out';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        el.style.willChange = 'auto';
                    }, 600);
                });
            }, i * 150);
        });
    }

    // Performance optimization: Lazy load images
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Main initialization function with performance optimizations
    function initialize() {
        // Initialize DOM cache first
        initDOMCache();
        
        // Initialize service worker
        registerServiceWorker();
        
        // Initialize performance monitoring
        initPerformanceMonitoring();
        
        // Initialize critical components immediately
        initializeThemeToggle();
        initializeMobileMenu();
        
        // Initialize other components
        initializeTimelineAnimation();
        initializeScrollAnimations();
        initializeCookieConsent();
        initializeSmoothScroll();
        initializeLazyLoading();
        
        // Initialize resize handler
        window.addEventListener('resize', () => {
            debouncedResize(() => {
                createParticles();
            }, 150);
        }, { passive: true });
        
        // Create particles and hero animations after DOM is ready
        smoothAnimation(() => {
            createParticles();
            initializeHeroAnimations();
        });

        // Load non-critical resources after initial paint
        loadNonCriticalResources();
        
        // Mark page as loaded
        domCache.body.classList.add('loaded');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
   
