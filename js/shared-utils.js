

(function(window) {
    'use strict';
    
    window.GoodWayUtils = window.GoodWayUtils || {};
    
    let cachedElements = {};
    
    function getElement(selector, useCache = true) {
        if (useCache && cachedElements[selector]) {
            return cachedElements[selector];
        }
        const element = document.querySelector(selector);
        if (useCache && element) {
            cachedElements[selector] = element;
        }
        return element;
    }
    
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }
    
    // === PERFORMANCE OPTIMIZED THEME TOGGLE ===
    GoodWayUtils.initThemeToggle = function() {
        const themeToggle = getElement('#themeToggle');
        const body = document.body;
        const themeIcon = themeToggle?.querySelector('i');

        console.log('Theme toggle initialization:', { themeToggle, themeIcon });

        if (!themeToggle || !themeIcon) {
            console.warn('Theme toggle elements not found');
            return;
        }

        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply theme immediately to prevent flash
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Optimized theme toggle with better debouncing
        const debouncedToggle = debounce(() => {
            console.log('Theme toggle clicked, current theme:', body.classList.contains('dark-mode') ? 'dark' : 'light');
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
                console.log('Switched to dark mode');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
                console.log('Switched to light mode');
            }
        }, 50);
        
        themeToggle.addEventListener('click', debouncedToggle, { passive: true });
        console.log('Theme toggle event listener added');
    };

    // === OPTIMIZED MOBILE MENU ===
    GoodWayUtils.initMobileMenu = function() {
        const mobileMenuBtn = getElement('#mobileMenuBtn');
        const mobileMenu = getElement('#mobileMenu');
        const mobileMenuClose = getElement('#mobileMenuClose');

        if (!mobileMenuBtn || !mobileMenu) return;

                 function toggleMenu(show) {
             requestAnimationFrame(() => {
                 if (show) {
                     mobileMenu.classList.add('active');
                     mobileMenu.setAttribute('aria-hidden', 'false');
                     mobileMenuBtn.setAttribute('aria-expanded', 'true');
                     document.body.style.overflow = 'hidden';
                 } else {
                     mobileMenu.classList.remove('active');
                     mobileMenu.setAttribute('aria-hidden', 'true');
                     mobileMenuBtn.setAttribute('aria-expanded', 'false');
                     document.body.style.overflow = '';
                 }
             });
         }

        // Use passive listeners for better performance
        mobileMenuBtn.addEventListener('click', () => toggleMenu(true), { passive: true });
        mobileMenuClose?.addEventListener('click', () => toggleMenu(false), { passive: true });

        // Close menu when clicking menu links
        const menuLinks = document.querySelectorAll('.mobile-menu-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false), { passive: true });
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) toggleMenu(false);
        }, { passive: true });

                 // Close menu on Escape key
         document.addEventListener('keydown', (e) => {
             if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                 toggleMenu(false);
             }
         }, { passive: true });
    };

    // === OPTIMIZED SMOOTH SCROLLING ===
    GoodWayUtils.initSmoothScrolling = function() {
        document.addEventListener('click', function(e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            e.preventDefault();
            const target = getElement(anchor.getAttribute('href'));
            
            if (target) {
                const navHeight = getElement('nav')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, { passive: false });
    };

    // === OPTIMIZED RESIZE HANDLER ===
    GoodWayUtils.initResizeHandler = function(callback) {
        const debouncedResize = debounce(callback, 250);
        window.addEventListener('resize', debouncedResize, { passive: true });
    };

    // === OPTIMIZED SCROLL ANIMATIONS ===
    GoodWayUtils.initScrollAnimations = function() {
        const observerOptions = {
            threshold: [0.1, 0.5],
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animate-in');
                    });
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => observer.observe(element));
    };

    // === OPTIMIZED FORM VALIDATION ===
    GoodWayUtils.initFormValidation = function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const debouncedValidation = debounce(() => {
                    validateField(input);
                }, 300);
                
                input.addEventListener('input', debouncedValidation, { passive: true });
                input.addEventListener('blur', () => validateField(input), { passive: true });
            });
        });

        function validateField(field) {
            // Basic validation logic - can be expanded
            const isValid = field.checkValidity();
            field.setAttribute('aria-invalid', !isValid);
            
            // Visual feedback
            field.classList.toggle('invalid', !isValid);
            field.classList.toggle('valid', isValid);
        }
    };

    // === OPTIMIZED LAZY LOADING ===
    GoodWayUtils.initLazyLoading = function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px' });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    };

    // === PERFORMANCE MONITORING ===
    GoodWayUtils.monitorPerformance = function() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            try {
                const longTaskObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.duration > 50) {
                            console.warn('Long task detected:', entry.duration + 'ms');
                        }
                    });
                });
                longTaskObserver.observe({ entryTypes: ['longtask'] });
            } catch (e) {
            }
        }
    };

    GoodWayUtils.init = function() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                GoodWayUtils.initThemeToggle();
                GoodWayUtils.initMobileMenu();
                GoodWayUtils.initSmoothScrolling();
                GoodWayUtils.initScrollAnimations();
                GoodWayUtils.initFormValidation();
                GoodWayUtils.initLazyLoading();
                GoodWayUtils.monitorPerformance();
            });
        } else {
            GoodWayUtils.initThemeToggle();
            GoodWayUtils.initMobileMenu();
            GoodWayUtils.initSmoothScrolling();
            GoodWayUtils.initScrollAnimations();
            GoodWayUtils.initFormValidation();
            GoodWayUtils.initLazyLoading();
            GoodWayUtils.monitorPerformance();
        }
    };

    // Auto-initialize when script loads
    GoodWayUtils.init();

})(window);
