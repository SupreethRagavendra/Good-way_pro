// main.js - External JavaScript File
// ==========================================

(function() {
    'use strict';

    // Theme toggle is handled by shared-utils.js

    // === MOBILE MENU TOGGLE ===
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        if (!mobileMenuBtn || !mobileMenu || !mobileMenuClose) return;

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking on navigation links
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // === SERVICE FILTERING ===
    function initServiceFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!filterBtns.length || !serviceCards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                serviceCards.forEach(card => {
                    const section = card.closest('[data-category]');
                    if (filter === 'all' || (section && section.dataset.category === filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // === SERVICE SEARCH FUNCTIONALITY ===
    function initServiceSearch() {
        const searchInput = document.getElementById('serviceSearch');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!searchInput || !serviceCards.length) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            serviceCards.forEach(card => {
                const title = card.querySelector('.service-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.service-description')?.textContent.toLowerCase() || '';
                const category = card.dataset.service?.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // === SERVICE LINK ENHANCEMENT ===
    function initServiceLinks() {
        document.querySelectorAll('.service-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceCard = this.closest('.service-card');
                const serviceName = serviceCard?.dataset.service || '';
                const serviceType = serviceCard?.querySelector('.service-category')?.textContent.toLowerCase() || '';
                
                let actionText = 'Apply Now';
                if (serviceType.includes('travel')) {
                    actionText = 'Book Now';
                } else if (serviceType.includes('financial') || serviceType.includes('utility')) {
                    actionText = 'Get Started';
                }
                
                // Update the link text if needed
                this.innerHTML = `${actionText} <i class="fas fa-arrow-right"></i>`;
                
                // Redirect to inquiry page with service parameter
                window.location.href = `inquiry.html?service=${encodeURIComponent(serviceName)}`;
            });
        });
    }

    // === FAQ ACCORDION ===
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // === SERVICE PROCESS TIMELINE ANIMATION ===
    function initProcessTimeline() {
        const processSection = document.getElementById('service-process');
        if (!processSection) return;

        const processObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.id === 'service-process') {
                    const timeline = document.getElementById('serviceTimeline');
                    if (timeline) {
                        timeline.style.transform = 'translateX(-50%) scaleY(1)';
                    }
                    
                    document.querySelectorAll('#service-process .process-step').forEach((step, i) => {
                        setTimeout(() => step.classList.add('animated'), i * 300);
                    });
                }
            });
        });

        processObserver.observe(processSection);
    }

    // === PARTICLES BACKGROUND ===
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';
        document.querySelectorAll('[data-generated="particle-style"]').forEach(s => s.remove());

        const count = window.innerWidth < 768 ? 20 : 50;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');

            const size = Math.random() * 12 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;

            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            const distance = Math.random() * 100 + 50;
            const anim = `floatParticle-${i}`;

            p.style.animation = `${anim} ${duration}s ease-in-out ${delay}s infinite`;
            p.style.opacity = (Math.random() * 0.5 + 0.1).toFixed(2);

            const style = document.createElement('style');
            style.setAttribute('data-generated', 'particle-style');
            style.textContent = `
                @keyframes ${anim} {
                    0%, 100% { transform: translate(0, 0); }
                    25%, 50%, 75% {
                        transform: translate(${(Math.random() * distance - distance/2).toFixed(1)}px,
                                    ${(Math.random() * distance - distance/2).toFixed(1)}px);
                    }
                }
            `;
            document.head.appendChild(style);
            container.appendChild(p);
        }
    }

    // === DOCUMENT ICON FLOATING ===
    function animateDocumentIcons() {
        const docs = document.querySelectorAll('.document-icon');
        if (!docs.length) return;

        document.querySelectorAll('[data-generated="doc-icon-style"]').forEach(s => s.remove());

        docs.forEach((doc, i) => {
            const anim = `floatDoc${i}`;
            const style = document.createElement('style');
            style.setAttribute('data-generated', 'doc-icon-style');
            style.textContent = `
                @keyframes ${anim} {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(${i % 2 ? '5deg' : '-5deg'}); }
                }
            `;
            document.head.appendChild(style);
            doc.style.animation = `${anim} ${6 + i}s ease-in-out infinite`;
        });
    }

    // === COOKIE CONSENT ===
    function initCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const cookieAccept = document.getElementById('cookieAccept');
        const cookieDecline = document.getElementById('cookieDecline');

        if (!cookieConsent || !cookieAccept || !cookieDecline) return;

        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => cookieConsent.classList.add('show'), 2000);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('show');
        });

        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('show');
        });
    }

    // === AIRPLANE ANIMATION ===
    function animateAirplane() {
        const airplane = document.querySelector('.airplane');
        if (!airplane) return;

        const old = document.getElementById('airplane-fly-style');
        if (old) old.remove();

        const style = document.createElement('style');
        style.id = 'airplane-fly-style';
        style.textContent = `
            @keyframes fly {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(50px, -30px) rotate(5deg); }
                50% { transform: translate(100px, 0) rotate(0deg); }
                75% { transform: translate(50px, 30px) rotate(-5deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);

        airplane.style.animation = 'fly 8s ease-in-out infinite';
    }

    // === LAZY LOAD IMAGES ===
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if (!lazyImages.length) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // === SMOOTH SCROLL ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const id = this.getAttribute('href');
                const target = document.querySelector(id);
                if (target) {
                    window.scrollTo({ 
                        top: target.offsetTop - 80, 
                        behavior: 'smooth' 
                    });
                }
            });
        });
    }

    // === CTA BUTTON REDIRECTS ===
    function initCTAButtons() {
        const ctaBtn = document.querySelector('.cta-btn');
        const navCta = document.querySelector('.nav-cta');

        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                window.location.href = 'inquiry.html';
            });
        }

        if (navCta) {
            navCta.addEventListener('click', () => {
                window.location.href = 'inquiry.html';
            });
        }
    }

    // === SERVICE CARDS ANIMATION ===
    function initServiceCardAnimations() {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
    }

    // === RESIZE HANDLER ===
    function handleResize() {
        createParticles();
        animateDocumentIcons();
    }

    // === INITIALIZATION ===
    function init() {
        // Initialize all functionality
        // Theme toggle is handled by shared-utils.js
        initMobileMenu();
        initServiceFiltering();
        initServiceSearch();
        initServiceLinks();
        initFAQAccordion();
        initProcessTimeline();
        initCookieConsent();
        initLazyLoading();
        initSmoothScroll();
        initCTAButtons();
        initServiceCardAnimations();
        
        // Create visual effects
        createParticles();
        animateAirplane();
        animateDocumentIcons();
        
        // Add resize event listener
        window.addEventListener('resize', handleResize);
    }

    // === DOM READY ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
     // Disable right-click and keyboard shortcuts
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.key.toLowerCase() === 'u') || 
            (e.ctrlKey && e.key.toLowerCase() === 's') || 
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || 
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') || 
            (e.ctrlKey && e.key.toLowerCase() === 'c') || 
            (e.key === 'F12')) {
            e.preventDefault();
        }
    });
   

})();