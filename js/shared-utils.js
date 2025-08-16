// Shared Utilities for Good Way Travels Website
// Optimized for performance and mobile experience

(function(window) {
    'use strict';
    
    // Create namespace
    window.GoodWayUtils = window.GoodWayUtils || {};
    
    // === PERFORMANCE OPTIMIZED THEME TOGGLE ===
    GoodWayUtils.initThemeToggle = function() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle?.querySelector('i');

        if (!themeToggle || !themeIcon) return;

        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply theme immediately to prevent flash
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Optimized theme toggle with debouncing
        let toggleTimeout;
        themeToggle.addEventListener('click', () => {
            clearTimeout(toggleTimeout);
            toggleTimeout = setTimeout(() => {
                body.classList.toggle('dark-mode');
                if (body.classList.contains('dark-mode')) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            }, 100);
        });
    };

    // === OPTIMIZED MOBILE MENU ===
    GoodWayUtils.initMobileMenu = function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        if (!mobileMenuBtn || !mobileMenu || !mobileMenuClose) return;

        const toggleMenu = (show) => {
            if (show) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Focus trap for accessibility
                mobileMenuClose.focus();
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.focus();
            }
        };

        // Event listeners with performance optimization
        mobileMenuBtn.addEventListener('click', () => toggleMenu(true), { passive: true });
        mobileMenuClose.addEventListener('click', () => toggleMenu(false), { passive: true });

        // Close menu when clicking on links
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false), { passive: true });
        });

        // Close menu on outside click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) toggleMenu(false);
        }, { passive: true });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    };

    // === OPTIMIZED SMOOTH SCROLL ===
    GoodWayUtils.initSmoothScroll = function() {
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
            }, { passive: false });
        });
    };

    // === PERFORMANCE OPTIMIZED PARTICLES ===
    GoodWayUtils.createParticles = function() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Clear existing particles
        container.innerHTML = '';
        
        // Reduce particle count for mobile performance
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 8 : 20;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 6 + 2;
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 3}s ease-in-out ${Math.random() * 2}s infinite;
                opacity: ${(Math.random() * 0.2 + 0.1).toFixed(2)};
                will-change: transform;
            `;
            
            fragment.appendChild(particle);
        }

        container.appendChild(fragment);
    };

    // === DEBOUNCED RESIZE HANDLER ===
    GoodWayUtils.initResizeHandler = function() {
        let resizeTimer;
        let rafId;
        
        const handleResize = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            rafId = requestAnimationFrame(() => {
                GoodWayUtils.createParticles();
            });
        };

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 100);
        }, { passive: true });
    };

    // === INTERSECTION OBSERVER FOR ANIMATIONS ===
    GoodWayUtils.initScrollAnimations = function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Add animation class
                    target.classList.add('animated');
                    
                    // Unobserve after animation starts
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        // Observe elements that need animation
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    };

    // === FORM OPTIMIZATION ===
    GoodWayUtils.initFormOptimizations = function() {
        // Optimize form inputs with debounced validation
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                let validationTimer;
                
                input.addEventListener('input', () => {
                    clearTimeout(validationTimer);
                    validationTimer = setTimeout(() => {
                        // Validate input (placeholder for actual validation)
                        if (input.checkValidity()) {
                            input.classList.remove('invalid');
                            input.classList.add('valid');
                        } else {
                            input.classList.remove('valid');
                            input.classList.add('invalid');
                        }
                    }, 300);
                }, { passive: true });
            });
        });
    };

    // === INITIALIZE ALL UTILITIES ===
    GoodWayUtils.init = function() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                GoodWayUtils.initThemeToggle();
                GoodWayUtils.initMobileMenu();
                GoodWayUtils.initSmoothScroll();
                GoodWayUtils.initScrollAnimations();
                GoodWayUtils.initFormOptimizations();
                GoodWayUtils.initResizeHandler();
                
                // Create particles after initial layout
                requestAnimationFrame(() => {
                    GoodWayUtils.createParticles();
                });
            });
        } else {
            GoodWayUtils.initThemeToggle();
            GoodWayUtils.initMobileMenu();
            GoodWayUtils.initSmoothScroll();
            GoodWayUtils.initScrollAnimations();
            GoodWayUtils.initFormOptimizations();
            GoodWayUtils.initResizeHandler();
            
            // Create particles after initial layout
            requestAnimationFrame(() => {
                GoodWayUtils.createParticles();
            });
        }
    };

    // === PERFORMANCE MONITORING ===
    GoodWayUtils.logPerformance = function() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Performance:', {
                        'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        'Page Load': perfData.loadEventEnd - perfData.loadEventStart,
                        'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
                    });
                }, 1000);
            });
        }
    };

})(window);