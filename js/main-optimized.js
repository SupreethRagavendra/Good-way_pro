/**
 * Good Way Travels - Optimized Main JavaScript
 * Performance optimized with accessibility enhancements
 */

(function() {
    'use strict';
    
    // Performance monitoring
    const performance = {
        start: function(name) {
            if (window.performance && window.performance.mark) {
                window.performance.mark(`${name}-start`);
            }
        },
        end: function(name) {
            if (window.performance && window.performance.mark) {
                window.performance.mark(`${name}-end`);
                window.performance.measure(name, `${name}-start`, `${name}-end`);
            }
        }
    };
    
    // Utility functions
    const utils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function for scroll events
        throttle: function(func, limit) {
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
        },
        
        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        
        // Smooth scroll to element
        scrollToElement: function(element, offset = 0) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        },
        
        // Get system theme preference
        getSystemTheme: function() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        },
        
        // Set theme with proper transitions
        setTheme: function(theme) {
            const html = document.documentElement;
            const body = document.body;
            
            // Remove existing theme classes
            html.removeAttribute('data-theme');
            body.classList.remove('dark-mode');
            
            // Apply new theme
            if (theme === 'dark') {
                html.setAttribute('data-theme', 'dark');
                body.classList.add('dark-mode');
            }
            
            // Store preference
            localStorage.setItem('theme', theme);
        }
    };
    
    // Theme management
    const themeManager = {
        init: function() {
            performance.start('theme-init');
            
            const themeToggle = document.getElementById('themeToggle');
            if (!themeToggle) return;
            
            const themeIcon = themeToggle.querySelector('i');
            const savedTheme = localStorage.getItem('theme');
            const systemTheme = utils.getSystemTheme();
            
            // Apply initial theme without transitions
            const initialTheme = savedTheme || systemTheme;
            utils.setTheme(initialTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = initialTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Add event listener
            themeToggle.addEventListener('click', this.handleThemeToggle.bind(this));
            
            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    utils.setTheme(newTheme);
                    if (themeIcon) {
                        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                    }
                }
            });
            
            performance.end('theme-init');
        },
        
        handleThemeToggle: function(e) {
            e.preventDefault();
            
            const body = document.body;
            const themeIcon = e.currentTarget.querySelector('i');
            const isDark = body.classList.contains('dark-mode');
            const newTheme = isDark ? 'light' : 'dark';
            
            // Use requestAnimationFrame for smooth transition
            requestAnimationFrame(() => {
                utils.setTheme(newTheme);
                
                if (themeIcon) {
                    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            });
        }
    };
    
    // Mobile menu management
    const mobileMenu = {
        init: function() {
            performance.start('mobile-menu-init');
            
            const menuBtn = document.getElementById('mobileMenuBtn');
            const menu = document.getElementById('mobileMenu');
            const closeBtn = document.getElementById('mobileMenuClose');
            
            if (!menuBtn || !menu || !closeBtn) return;
            
            // Event listeners
            menuBtn.addEventListener('click', this.openMenu.bind(this));
            closeBtn.addEventListener('click', this.closeMenu.bind(this));
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    this.closeMenu();
                }
            });
            
            // Close on outside click
            menu.addEventListener('click', (e) => {
                if (e.target === menu) {
                    this.closeMenu();
                }
            });
            
            // Focus management
            this.setupFocusManagement();
            
            performance.end('mobile-menu-init');
        },
        
        openMenu: function() {
            const menu = document.getElementById('mobileMenu');
            const menuBtn = document.getElementById('mobileMenuBtn');
            
            menu.classList.add('active');
            menu.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item
            const firstLink = menu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        },
        
        closeMenu: function() {
            const menu = document.getElementById('mobileMenu');
            const menuBtn = document.getElementById('mobileMenuBtn');
            
            menu.classList.remove('active');
            menu.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Return focus to menu button
            menuBtn.focus();
        },
        
        setupFocusManagement: function() {
            const menu = document.getElementById('mobileMenu');
            const menuLinks = menu.querySelectorAll('a');
            
            // Trap focus within menu when open
            menu.addEventListener('keydown', (e) => {
                if (!menu.classList.contains('active')) return;
                
                const firstLink = menuLinks[0];
                const lastLink = menuLinks[menuLinks.length - 1];
                
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstLink) {
                            e.preventDefault();
                            lastLink.focus();
                        }
                    } else {
                        if (document.activeElement === lastLink) {
                            e.preventDefault();
                            firstLink.focus();
                        }
                    }
                }
            });
        }
    };
    
    // Particle system
    const particleSystem = {
        init: function() {
            performance.start('particles-init');
            
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;
            
            // Reduce particles on mobile for performance
            const isMobile = window.innerWidth <= 768;
            const particleCount = isMobile ? 8 : 20;
            
            this.createParticles(particlesContainer, particleCount);
            
            performance.end('particles-init');
        },
        
        createParticles: function(container, count) {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const size = Math.random() * 4 + 2;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const delay = Math.random() * 6;
                const duration = Math.random() * 4 + 4;
                
                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}%;
                    top: ${y}%;
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                `;
                
                container.appendChild(particle);
            }
        }
    };
    
    // Animation system
    const animationSystem = {
        init: function() {
            performance.start('animations-init');
            
            // Intersection Observer for scroll animations
            this.setupScrollAnimations();
            
            // Counter animations
            this.setupCounters();
            
            performance.end('animations-init');
        },
        
        setupScrollAnimations: function() {
            if (!('IntersectionObserver' in window)) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Special handling for timeline
                        if (entry.target.classList.contains('process-timeline')) {
                            this.animateTimeline();
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements for animation
            const animateElements = document.querySelectorAll('.service-card, .stat-card, .process-timeline, .badge');
            animateElements.forEach(el => observer.observe(el));
        },
        
        animateTimeline: function() {
            const line = document.getElementById('timelineLine');
            if (!line) return;
            
            // Animate timeline line
            line.style.height = '0';
            line.style.transition = 'height 1.5s ease-in-out';
            
            requestAnimationFrame(() => {
                line.style.height = '100%';
            });
            
            // Animate steps with stagger
            const steps = document.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('animate-in');
                }, index * 200);
            });
        },
        
        setupCounters: function() {
            const counters = {
                tickets: { element: document.getElementById('ticketsCounter'), target: 5000, duration: 2000 },
                documents: { element: document.getElementById('documentsCounter'), target: 3000, duration: 2000 },
                years: { element: document.getElementById('yearsCounter'), target: 5, duration: 1500 }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = counters[entry.target.id];
                        if (counter) {
                            this.animateCounter(counter.element, counter.target, counter.duration);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            Object.values(counters).forEach(counter => {
                if (counter.element) {
                    observer.observe(counter.element);
                }
            });
        },
        
        animateCounter: function(element, target, duration) {
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }
    };
    
    // Cookie consent
    const cookieConsent = {
        init: function() {
            const consent = localStorage.getItem('cookieConsent');
            if (consent) return;
            
            const banner = document.getElementById('cookieConsent');
            if (!banner) return;
            
            const acceptBtn = document.getElementById('cookieAccept');
            const declineBtn = document.getElementById('cookieDecline');
            
            // Show banner after delay
            setTimeout(() => {
                banner.classList.add('show');
            }, 2000);
            
            // Event listeners
            acceptBtn?.addEventListener('click', () => this.accept());
            declineBtn?.addEventListener('click', () => this.decline());
        },
        
        accept: function() {
            localStorage.setItem('cookieConsent', 'accepted');
            this.hideBanner();
        },
        
        decline: function() {
            localStorage.setItem('cookieConsent', 'declined');
            this.hideBanner();
        },
        
        hideBanner: function() {
            const banner = document.getElementById('cookieConsent');
            if (banner) {
                banner.classList.remove('show');
            }
        }
    };
    
    // Form validation
    const formValidation = {
        init: function() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                this.setupFormValidation(form);
            });
        },
        
        setupFormValidation: function(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Real-time validation
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', utils.debounce(() => this.validateField(input), 300));
            });
            
            // Form submission
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        },
        
        validateField: function(field) {
            const value = field.value.trim();
            const type = field.type;
            const required = field.hasAttribute('required');
            
            // Remove existing error
            this.removeError(field);
            
            // Required field validation
            if (required && !value) {
                this.showError(field, 'This field is required');
                return false;
            }
            
            // Type-specific validation
            if (value) {
                switch (type) {
                    case 'email':
                        if (!this.isValidEmail(value)) {
                            this.showError(field, 'Please enter a valid email address');
                            return false;
                        }
                        break;
                    case 'tel':
                        if (!this.isValidPhone(value)) {
                            this.showError(field, 'Please enter a valid phone number');
                            return false;
                        }
                        break;
                    case 'url':
                        if (!this.isValidUrl(value)) {
                            this.showError(field, 'Please enter a valid URL');
                            return false;
                        }
                        break;
                }
            }
            
            return true;
        },
        
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        isValidPhone: function(phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(phone.replace(/\s/g, ''));
        },
        
        isValidUrl: function(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },
        
        showError: function(field, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.setAttribute('role', 'alert');
            
            field.classList.add('error');
            field.parentNode.appendChild(errorDiv);
            
            // Announce error to screen readers
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', errorDiv.id || 'error');
        },
        
        removeError: function(field) {
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
            
            field.classList.remove('error');
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        },
        
        handleSubmit: function(e) {
            const form = e.target;
            const inputs = form.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            // Validate all fields
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Focus first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
            }
        }
    };
    
    // Performance monitoring
    const performanceMonitor = {
        init: function() {
            // Monitor Core Web Vitals
            this.monitorLCP();
            this.monitorFID();
            this.monitorCLS();
            
            // Monitor resource loading
            this.monitorResources();
        },
        
        monitorLCP: function() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            }
        },
        
        monitorFID: function() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                observer.observe({ entryTypes: ['first-input'] });
            }
        },
        
        monitorCLS: function() {
            if ('PerformanceObserver' in window) {
                let clsValue = 0;
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    console.log('CLS:', clsValue);
                });
                observer.observe({ entryTypes: ['layout-shift'] });
            }
        },
        
        monitorResources: function() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.initiatorType === 'img' && entry.duration > 1000) {
                            console.warn('Slow image load:', entry.name, entry.duration + 'ms');
                        }
                    });
                });
                observer.observe({ entryTypes: ['resource'] });
            }
        }
    };
    
    // Initialize everything when DOM is ready
    function init() {
        performance.start('app-init');
        
        // Initialize all systems
        themeManager.init();
        mobileMenu.init();
        particleSystem.init();
        animationSystem.init();
        cookieConsent.init();
        formValidation.init();
        performanceMonitor.init();
        
        // Add global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
        });
        
        // Add unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
        
        performance.end('app-init');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for global access if needed
    window.GoodWayApp = {
        utils,
        themeManager,
        mobileMenu,
        particleSystem,
        animationSystem
    };
    
})();