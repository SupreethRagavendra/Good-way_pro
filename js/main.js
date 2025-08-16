// Performance-optimized main.js with FOUC prevention

(function() {
    'use strict';
    
    // Optimized CSS loading function
    function loadCSS(href, media = 'all') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = media;
        document.head.appendChild(link);
        return link;
    }
    
    // Load non-critical resources after initial render
    function loadNonCriticalResources() {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
                loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
            });
        } else {
            setTimeout(() => {
                loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
                loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
            }, 100);
        }
    }

    // Theme toggle with performance optimization
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle?.querySelector('i');

        if (!themeToggle) return;

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeIcon?.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon?.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Optimized timeline animation with performance considerations
    function initializeTimelineAnimation() {
        const timeline = document.querySelector('.process-timeline');
        const steps = document.querySelectorAll('.process-step');
        
        if (!timeline || !steps.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame for smoother animations
                    requestAnimationFrame(() => {
                        const line = document.getElementById('timelineLine');
                        if (line) {
                            line.style.height = '0';
                            line.style.transition = 'height 1.5s ease-in-out';
                            line.style.willChange = 'height';
                            
                            requestAnimationFrame(() => {
                                line.style.height = '100%';
                                // Remove will-change after animation
                                setTimeout(() => {
                                    line.style.willChange = 'auto';
                                }, 1500);
                            });
                        }
                        
                        // Stagger step animations with better performance
                        steps.forEach((step, index) => {
                            setTimeout(() => {
                                step.style.willChange = 'transform, opacity';
                                step.classList.add('animated');
                                // Remove will-change after animation
                                setTimeout(() => {
                                    step.style.willChange = 'auto';
                                }, 800);
                            }, index * 150); // Reduced delay for faster perceived performance
                        });
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2, // Reduced threshold for earlier trigger
            rootMargin: '0px 0px -50px 0px' // Reduced margin
        });
        
        observer.observe(timeline);
    }

    // Mobile menu optimization
    function initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        if (!mobileMenuBtn || !mobileMenu || !mobileMenuClose) return;

        const toggleMenu = (show) => {
            if (show) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
        mobileMenuClose.addEventListener('click', () => toggleMenu(false));

        // Close menu when clicking on links
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Close menu on outside click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) toggleMenu(false);
        });
    }

    // Optimized counter animation with RAF
    function animateCounter(id, target, duration = 2000) {
        const element = document.getElementById(id);
        if (!element) return;

        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Optimized particles with reduced count for better performance
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Clear existing particles
        container.innerHTML = '';
        
        // Reduce particle count for better performance
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 10 : 25; // Reduced from 20/50

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 8 + 2; // Reduced max size
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 8 + 4}s ease-in-out ${Math.random() * 3}s infinite;
                opacity: ${(Math.random() * 0.3 + 0.1).toFixed(2)};
                will-change: transform;
            `;
            
            fragment.appendChild(particle);
        }

        container.appendChild(fragment);
    }

    // Optimized intersection observer for animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target.classList.contains('process-section')) {
                        const timelineLine = document.getElementById('timelineLine');
                        if (timelineLine) {
                            requestAnimationFrame(() => {
                                timelineLine.style.transform = 'translateX(-50%) scaleY(1)';
                            });
                        }
                        
                        const steps = document.querySelectorAll('.process-step');
                        steps.forEach((step, i) => {
                            setTimeout(() => {
                                step.style.willChange = 'transform, opacity';
                                step.classList.add('animated');
                                setTimeout(() => {
                                    step.style.willChange = 'auto';
                                }, 800);
                            }, i * 200);
                        });
                    }

                    // Stats counter animation
                    if (target.classList.contains('section') && 
                        target.querySelector('.stats-container')) {
                        animateCounter('ticketsCounter', 3000);
                        animateCounter('documentsCounter', 5700);
                        animateCounter('yearsCounter', 3);
                    }

                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // Cookie consent optimization
    function initializeCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const cookieAccept = document.getElementById('cookieAccept');
        const cookieDecline = document.getElementById('cookieDecline');

        if (!cookieConsent || !cookieAccept || !cookieDecline) return;

        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 1500); // Reduced delay
        }

        const handleConsent = (accepted) => {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            cookieConsent.classList.remove('show');
        };

        cookieAccept.addEventListener('click', () => handleConsent(true));
        cookieDecline.addEventListener('click', () => handleConsent(false));
    }

    // Optimized smooth scroll
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

    // Debounced resize handler for better performance
    function initializeResizeHandler() {
        let resizeTimer;
        let rafId;
        
        const handleResize = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            rafId = requestAnimationFrame(() => {
                createParticles();
            });
        };

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 150); // Reduced debounce time
        }, { passive: true });
    }

    // Initialize hero animations with proper timing
    function initializeHeroAnimations() {
        // Wait for CSS to be fully loaded
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
                requestAnimationFrame(() => {
                    el.style.transition = 'all 0.6s ease-out';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    
                    // Remove will-change after animation
                    setTimeout(() => {
                        el.style.willChange = 'auto';
                    }, 600);
                });
            }, i * 150);
        });
    }

    // Main initialization function
    function initialize() {
        // Initialize theme immediately to prevent flash
        initializeThemeToggle();
        
        // Initialize other components
        initializeTimelineAnimation();
        initializeMobileMenu();
        initializeScrollAnimations();
        initializeCookieConsent();
        initializeSmoothScroll();
        initializeResizeHandler();
        
        // Create particles and hero animations after DOM is ready
        requestAnimationFrame(() => {
            createParticles();
            initializeHeroAnimations();
        });

        // Load non-critical resources after initial paint
        loadNonCriticalResources();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
   