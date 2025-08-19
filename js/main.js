// Main page specific functionality

(function() {
    'use strict';
    
    // Load non-critical resources
    function loadNonCriticalResources() {
        const loadCSS = (href, media = 'all') => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = media;
            document.head.appendChild(link);
        };

        const loadFonts = () => loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadFonts, { timeout: 2000 });
        } else {
            setTimeout(loadFonts, 100);
        }
    }

    // Timeline animation (page-specific)
    function initializeTimelineAnimation() {
        const timeline = document.querySelector('.process-timeline');
        if (!timeline) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const line = document.getElementById('timelineLine');
                    if (line) {
                        line.style.height = '0';
                        line.style.transition = 'height 1.5s ease-in-out';
                        setTimeout(() => line.style.height = '100%', 50);
                    }
                    
                    document.querySelectorAll('.process-step').forEach((step, index) => {
                        setTimeout(() => step.classList.add('animated'), index * 150);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        observer.observe(timeline);
    }

    // Counter animation
    function animateCounter(id, target, duration = 2000) {
        const element = document.getElementById(id);
        if (!element) return;

        const startTime = performance.now();
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    }



    // Particles animation
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';
        
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 8 : 15;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 6 + 2;
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 8 + 4}s ease-in-out ${Math.random() * 3}s infinite`,
                opacity: (Math.random() * 0.3 + 0.1).toFixed(2)
            });
            
            fragment.appendChild(particle);
        }

        container.appendChild(fragment);
    }

    // Scroll animations
    function initializeScrollAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target.classList.contains('process-section')) {
                        const timelineLine = document.getElementById('timelineLine');
                        if (timelineLine) {
                            timelineLine.style.transform = 'translateX(-50%) scaleY(1)';
                        }
                        
                        document.querySelectorAll('.process-step').forEach((step, i) => {
                            setTimeout(() => step.classList.add('animated'), i * 200);
                        });
                    }

                    // Stats counter animation
                    if (target.querySelector('.stats-container')) {
                        animateCounter('ticketsCounter', 3000);
                        animateCounter('documentsCounter', 5700);
                        animateCounter('yearsCounter', 3);
                    }

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
    }

    // Cookie consent
    function initializeCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const cookieAccept = document.getElementById('cookieAccept');
        const cookieDecline = document.getElementById('cookieDecline');

        if (!cookieConsent || !cookieAccept || !cookieDecline) return;

        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => cookieConsent.classList.add('show'), 1500);
        }

        const handleConsent = (accepted) => {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            cookieConsent.classList.remove('show');
        };

        cookieAccept.addEventListener('click', () => handleConsent(true));
        cookieDecline.addEventListener('click', () => handleConsent(false));
    }

    // Hero animations
    function initializeHeroAnimations() {
        const heroElements = document.querySelectorAll('.split-text-container, .hero-subtitle, .hero-cta, .hero-stats');
        
        heroElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 150);
        });
    }

    // Initialize all functions
    function initialize() {
        initializeTimelineAnimation();
        initializeScrollAnimations();
        initializeCookieConsent();
        
        createParticles();
        initializeHeroAnimations();
        loadNonCriticalResources();
        
        // Resize handler
        window.addEventListener('resize', () => {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(createParticles, 150);
        }, { passive: true });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
   