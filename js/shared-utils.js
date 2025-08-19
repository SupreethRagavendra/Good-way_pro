// Shared utilities for Good Way Travels website

(function(window) {
    'use strict';
    
    // Create namespace
    window.GoodWayUtils = window.GoodWayUtils || {};
    
    // Cache for DOM elements
    let cachedElements = {};
    
    // Get DOM element with caching
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
    
    // Debounce function to limit function calls
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
    
    // Theme toggle functionality
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

        // Apply saved theme
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Theme toggle with debouncing
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

    // Mobile menu functionality
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

        mobileMenuBtn.addEventListener('click', () => toggleMenu(true), { passive: true });
        mobileMenuClose?.addEventListener('click', () => toggleMenu(false), { passive: true });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMenu(false);
            }
        });
    };

    // Form validation
    GoodWayUtils.initFormValidation = function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const requiredFields = form.querySelectorAll('[required]');
            
            // Real-time validation
            requiredFields.forEach(field => {
                field.addEventListener('blur', () => {
                    if (!field.value.trim()) {
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
            });

            // Form submission validation
            form.addEventListener('submit', (e) => {
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    };

    // Smooth scrolling
    GoodWayUtils.initSmoothScrolling = function() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, { passive: true });
        });
    };

    // Counter animation
    GoodWayUtils.animateCounter = function(id, target, duration = 2000) {
        const element = document.getElementById(id);
        if (!element) return;

        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
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
    };

    // Initialize all utilities
    GoodWayUtils.init = function() {
        this.initThemeToggle();
        this.initMobileMenu();
        this.initFormValidation();
        this.initSmoothScrolling();
        console.log('Shared utilities initialized');
    };

})(window);