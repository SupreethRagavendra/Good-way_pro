/**
 * Core JavaScript for Good Way Travels
 * Essential functionality for initial page load
 */

(function() {
    'use strict';
    
    // Core utilities
    const Core = {
        // Element cache
        elements: new Map(),
        
        // Get element with caching
        getElement(selector) {
            if (this.elements.has(selector)) {
                return this.elements.get(selector);
            }
            const element = document.querySelector(selector);
            if (element) {
                this.elements.set(selector, element);
            }
            return element;
        },
        
        // Debounce function
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    func.apply(this, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
    // Essential theme management
    function initTheme() {
        const themeToggle = Core.getElement('#themeToggle');
        const body = document.body;
        const themeIcon = themeToggle?.querySelector('i');
        
        if (!themeToggle || !themeIcon) return;
        
        // Apply saved theme immediately
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        
        // Theme toggle handler
        const toggleTheme = Core.throttle(() => {
            const isDark = body.classList.contains('dark-mode');
            
            if (isDark) {
                body.classList.remove('dark-mode');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.add('dark-mode');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        }, 100);
        
        themeToggle.addEventListener('click', toggleTheme, { passive: true });
    }
    
    // Essential mobile menu
    function initMobileMenu() {
        const mobileMenuBtn = Core.getElement('#mobileMenuBtn');
        const mobileMenu = Core.getElement('#mobileMenu');
        const mobileMenuClose = Core.getElement('#mobileMenuClose');
        
        if (!mobileMenuBtn || !mobileMenu) return;
        
        const toggleMenu = (show) => {
            requestAnimationFrame(() => {
                if (show) {
                    mobileMenu.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        };
        
        mobileMenuBtn.addEventListener('click', () => toggleMenu(true), { passive: true });
        mobileMenuClose?.addEventListener('click', () => toggleMenu(false), { passive: true });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        }, { passive: true });
    }
    
    // Essential smooth scrolling
    function initSmoothScroll() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerHeight = Core.getElement('nav')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, { passive: false });
        });
    }
    
    // Essential cookie consent
    function initCookieConsent() {
        const cookieConsent = Core.getElement('#cookieConsent');
        const cookieAccept = Core.getElement('#cookieAccept');
        const cookieDecline = Core.getElement('#cookieDecline');
        
        if (!cookieConsent || localStorage.getItem('cookieConsent')) return;
        
        const handleConsent = (accepted) => {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            cookieConsent.style.display = 'none';
        };
        
        cookieAccept?.addEventListener('click', () => handleConsent(true), { passive: true });
        cookieDecline?.addEventListener('click', () => handleConsent(false), { passive: true });
        
        // Show cookie consent after 2 seconds
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Initialize core functionality
    function init() {
        initTheme();
        initMobileMenu();
        initSmoothScroll();
        initCookieConsent();
        
        console.log('Core functionality initialized');
    }
    
    // Export to global scope
    window.Core = Core;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();