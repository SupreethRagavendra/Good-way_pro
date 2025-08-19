// Main JavaScript file for Good Way Travels website

(function() {
    'use strict';
    
    // Check if shared utilities are available
    if (typeof window.GoodWayUtils !== 'undefined') {
        console.log('Using shared utilities');
    }
    
    // Load CSS files
    function loadCSS(href, media = 'all') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = media;
        document.head.appendChild(link);
        return link;
    }
    
    // Load fonts and other resources
    function loadNonCriticalResources() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
            }, { timeout: 2000 });
        } else {
            setTimeout(() => {
                loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
            }, 100);
        }
    }

    // Theme toggle functionality
    function initializeThemeToggle() {
        if (typeof window.GoodWayUtils !== 'undefined') return;
        
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle?.querySelector('i');

        if (!themeToggle) return;

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply saved theme
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            requestAnimationFrame(() => {
                const isDark = body.classList.contains('dark-mode');
                
                if (isDark) {
                    // Switch to light mode
                    body.classList.remove('dark-mode');
                    themeIcon?.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light');
                } else {
                    // Switch to dark mode
                    body.classList.add('dark-mode');
                    themeIcon?.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark');
                }
            });
        });
    }

    // Timeline animation
    function initializeTimelineAnimation() {
        const timeline = document.querySelector('.process-timeline');
        const steps = document.querySelectorAll('.process-step');
        
        if (!timeline || !steps.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        const line = document.getElementById('timelineLine');
                        if (line) {
                            line.style.height = '0';
                            line.style.transition = 'height 1.5s ease-in-out';
                            line.style.willChange = 'height';
                            
                            requestAnimationFrame(() => {
                                line.style.height = '100%';
                                setTimeout(() => {
                                    line.style.willChange = 'auto';
                                }, 1500);
                            });
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        steps.forEach(step => observer.observe(step));
    }

    // Initialize mobile menu
    function initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

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
    }

    // Smooth scrolling for navigation links
    function initializeSmoothScrolling() {
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
    }

    // Initialize form validation
    function initializeFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const requiredFields = form.querySelectorAll('[required]');
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
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    function initializeApp() {
        // Initialize all components
        initializeThemeToggle();
        initializeTimelineAnimation();
        initializeMobileMenu();
        initializeSmoothScrolling();
        initializeFormValidation();
        
        // Load non-critical resources
        loadNonCriticalResources();
        
        console.log('Main.js initialized successfully');
    }

})();
   