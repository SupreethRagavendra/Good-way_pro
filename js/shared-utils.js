// Shared Utilities for Good Way Travels Website
// Optimized for performance and mobile experience

(function(window) {
    'use strict';
    
    // Create namespace
    window.GoodWayUtils = window.GoodWayUtils || {};
    
    // Performance optimizations - Cache DOM elements
    let cachedElements = {};
    
    // Optimized DOM element getter with caching
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
    
    // Optimized debounce function
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
    
    // === THEME TOGGLE ===
    GoodWayUtils.initThemeToggle = function() {
        const themeToggle = getElement('#themeToggle');
        const body = document.body;
        const themeIcon = themeToggle?.querySelector('i');

        if (!themeToggle || !themeIcon) return;

        // Apply saved theme
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Toggle theme
        themeToggle.addEventListener('click', debounce(() => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }, 50), { passive: true });
    };

        // === MOBILE MENU ===
    GoodWayUtils.initMobileMenu = function() {
        const mobileMenuBtn = getElement('#mobileMenuBtn');
        const mobileMenu = getElement('#mobileMenu');
        const mobileMenuClose = getElement('#mobileMenuClose');

        if (!mobileMenuBtn || !mobileMenu) return;

        function toggleMenu(show) {
            mobileMenu.classList.toggle('active', show);
            mobileMenuBtn.setAttribute('aria-expanded', show);
            mobileMenu.setAttribute('aria-hidden', !show);
            document.body.style.overflow = show ? 'hidden' : '';
        }

        mobileMenuBtn.addEventListener('click', () => toggleMenu(true), { passive: true });
        mobileMenuClose?.addEventListener('click', () => toggleMenu(false), { passive: true });
        
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false), { passive: true });
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) toggleMenu(false);
        }, { passive: true });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) toggleMenu(false);
        }, { passive: true });
    };

    // === SMOOTH SCROLLING ===
    GoodWayUtils.initSmoothScrolling = function() {
        document.addEventListener('click', function(e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            e.preventDefault();
            const target = getElement(anchor.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - (getElement('nav')?.offsetHeight || 80),
                    behavior: 'smooth'
                });
            }
        }, { passive: false });
    };

    // === RESIZE HANDLER ===
    GoodWayUtils.initResizeHandler = function(callback) {
        window.addEventListener('resize', debounce(callback, 250), { passive: true });
    };

    // === SCROLL ANIMATIONS ===
    GoodWayUtils.initScrollAnimations = function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

        document.querySelectorAll('.animate-on-scroll').forEach(element => observer.observe(element));
    };

    // === FORM VALIDATION ===
    GoodWayUtils.initFormValidation = function() {
        const validateField = (field) => {
            const isValid = field.checkValidity();
            field.setAttribute('aria-invalid', !isValid);
            field.classList.toggle('invalid', !isValid);
            field.classList.toggle('valid', isValid);
        };

        document.querySelectorAll('form').forEach(form => {
            form.querySelectorAll('input, textarea, select').forEach(input => {
                input.addEventListener('input', debounce(() => validateField(input), 300), { passive: true });
                input.addEventListener('blur', () => validateField(input), { passive: true });
            });
        });
    };

    // === LAZY LOADING ===
    GoodWayUtils.initLazyLoading = function() {
        if (!('IntersectionObserver' in window)) return;
        
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

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    };

    // === INITIALIZATION ===
    GoodWayUtils.init = function() {
        const initAll = () => {
            GoodWayUtils.initThemeToggle();
            GoodWayUtils.initMobileMenu();
            GoodWayUtils.initSmoothScrolling();
            GoodWayUtils.initScrollAnimations();
            GoodWayUtils.initFormValidation();
            GoodWayUtils.initLazyLoading();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    };

    // Auto-initialize when script loads
    GoodWayUtils.init();

})(window);