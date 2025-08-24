/**
 * Optimized Main JavaScript for Good Way Travels
 * Performance-focused version with essential features only
 */

(function() {
    'use strict';
    
    // Performance monitoring
    const startTime = performance.now();
    
    // Element cache for better performance
    const elementCache = new Map();
    
    function getElement(selector) {
        if (elementCache.has(selector)) {
            return elementCache.get(selector);
        }
        const element = document.querySelector(selector);
        if (element) {
            elementCache.set(selector, element);
        }
        return element;
    }
    
    // Optimized debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized throttle function
    function throttle(func, limit) {
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
    
    // Optimized hero animations
    function initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        
        if (!heroElements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px)';
                        entry.target.style.transition = 'all 0.6s ease-out';
                        
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        heroElements.forEach(el => observer.observe(el));
    }
    
    // Optimized counter animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (!counters.length) return;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.counter);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // Optimized scroll animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (!animatedElements.length) return;
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;
                    
                    requestAnimationFrame(() => {
                        element.classList.add('animated', animation);
                        element.style.willChange = 'transform, opacity';
                        
                        setTimeout(() => {
                            element.style.willChange = 'auto';
                        }, 600);
                    });
                    
                    scrollObserver.unobserve(element);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        animatedElements.forEach(el => scrollObserver.observe(el));
    }
    
    // Optimized form handling
    function initFormOptimizations() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Debounced validation
                const debouncedValidation = debounce(() => {
                    validateField(input);
                }, 300);
                
                input.addEventListener('input', debouncedValidation, { passive: true });
                input.addEventListener('blur', () => validateField(input), { passive: true });
            });
            
            // Form submission optimization
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }
                
                try {
                    // Simulate form submission
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Show success message
                    showMessage('Form submitted successfully!', 'success');
                    
                } catch (error) {
                    showMessage('Error submitting form. Please try again.', 'error');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit';
                    }
                }
            });
        });
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        let isValid = true;
        let message = '';
        
        if (required && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (value) {
            switch (type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        message = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        isValid = false;
                        message = 'Please enter a valid phone number';
                    }
                    break;
            }
        }
        
        // Update field state
        field.classList.toggle('invalid', !isValid);
        
        // Show/hide error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!isValid) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        } else if (errorElement) {
            errorElement.remove();
        }
        
        return isValid;
    }
    
    // Message display
    function showMessage(text, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = text;
        
        document.body.appendChild(messageDiv);
        
        requestAnimationFrame(() => {
            messageDiv.classList.add('show');
        });
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
    
    // Optimized resize handler
    function initResizeHandler() {
        const handleResize = throttle(() => {
            // Update any layout-dependent elements
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
        
        window.addEventListener('resize', handleResize, { passive: true });
        handleResize(); // Initial call
    }
    
    // Optimized scroll handler
    function initScrollHandler() {
        const nav = getElement('nav');
        if (!nav) return;
        
        const handleScroll = throttle(() => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initialize all optimizations
    function init() {
        // Initialize core features
        initHeroAnimations();
        initCounterAnimations();
        initScrollAnimations();
        initFormOptimizations();
        initResizeHandler();
        initScrollHandler();
        
        // Performance logging
        const loadTime = performance.now() - startTime;
        console.log(`Main JS loaded in ${loadTime.toFixed(2)}ms`);
        
        // Report to analytics if available
        if (window.gtag) {
            window.gtag('event', 'js_load_time', {
                value: Math.round(loadTime),
                custom_parameter: 'main_js'
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();