// Services page functionality

(function() {
    'use strict';

    // Service filtering
    function initServiceFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!filterBtns.length || !serviceCards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                serviceCards.forEach(card => {
                    const section = card.closest('[data-category]');
                    const show = filter === 'all' || (section && section.dataset.category === filter);
                    card.style.display = show ? 'block' : 'none';
                    if (show) card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                });
            });
        });
    }

    // Service search
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
                
                card.style.display = (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) ? 'block' : 'none';
            });
        });
    }

    // Service links
    function initServiceLinks() {
        document.querySelectorAll('.service-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceCard = this.closest('.service-card');
                const serviceName = serviceCard?.dataset.service || '';
                window.location.href = `inquiry.html?service=${encodeURIComponent(serviceName)}`;
            });
        });
    }

    // FAQ accordion
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => faq.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }

    // Process timeline animation
    function initProcessTimeline() {
        const processSection = document.getElementById('service-process');
        if (!processSection) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timeline = document.getElementById('serviceTimeline');
                    if (timeline) timeline.style.transform = 'translateX(-50%) scaleY(1)';
                    
                    document.querySelectorAll('#service-process .process-step').forEach((step, i) => {
                        setTimeout(() => step.classList.add('animated'), i * 300);
                    });
                }
            });
        });

        observer.observe(processSection);
    }

    // Particles
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';
        document.querySelectorAll('[data-generated="particle-style"]').forEach(s => s.remove());

        const count = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';

            const size = Math.random() * 8 + 2;
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 3;
            const distance = Math.random() * 80 + 40;
            const anim = `floatParticle-${i}`;

            Object.assign(p.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `${anim} ${duration}s ease-in-out ${delay}s infinite`,
                opacity: (Math.random() * 0.4 + 0.1).toFixed(2)
            });

            const style = document.createElement('style');
            style.setAttribute('data-generated', 'particle-style');
            style.textContent = `
                @keyframes ${anim} {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(${(Math.random() * distance - distance/2).toFixed(1)}px, ${(Math.random() * distance - distance/2).toFixed(1)}px); }
                }
            `;
            document.head.appendChild(style);
            container.appendChild(p);
        }
    }

    // Document icon animation
    function animateDocumentIcons() {
        const docs = document.querySelectorAll('.document-icon');
        if (!docs.length) return;

        document.querySelectorAll('[data-generated="doc-icon-style"]').forEach(s => s.remove());

        docs.forEach((doc, i) => {
            const anim = `floatDoc${i}`;
            const style = document.createElement('style');
            style.setAttribute('data-generated', 'doc-icon-style');
            style.textContent = `@keyframes ${anim} { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(${i % 2 ? '3deg' : '-3deg'}); } }`;
            document.head.appendChild(style);
            doc.style.animation = `${anim} ${5 + i}s ease-in-out infinite`;
        });
    }

    // Cookie consent
    function initCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const cookieAccept = document.getElementById('cookieAccept');
        const cookieDecline = document.getElementById('cookieDecline');

        if (!cookieConsent || !cookieAccept || !cookieDecline) return;

        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => cookieConsent.classList.add('show'), 2000);
        }

        const handleConsent = (accepted) => {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            cookieConsent.classList.remove('show');
        };

        cookieAccept.addEventListener('click', () => handleConsent(true));
        cookieDecline.addEventListener('click', () => handleConsent(false));
    }

    // Airplane animation
    function animateAirplane() {
        const airplane = document.querySelector('.airplane');
        if (!airplane) return;

        const old = document.getElementById('airplane-fly-style');
        if (old) old.remove();

        const style = document.createElement('style');
        style.id = 'airplane-fly-style';
        style.textContent = '@keyframes fly { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(60px, -20px) rotate(3deg); } 100% { transform: translate(0, 0) rotate(0deg); } }';
        document.head.appendChild(style);

        airplane.style.animation = 'fly 6s ease-in-out infinite';
    }

    // CTA buttons
    function initCTAButtons() {
        document.querySelector('.cta-btn')?.addEventListener('click', () => window.location.href = 'inquiry.html');
        document.querySelector('.nav-cta')?.addEventListener('click', () => window.location.href = 'inquiry.html');
    }

    // Initialize all functions
    function init() {
        initServiceFiltering();
        initServiceSearch();
        initServiceLinks();
        initFAQAccordion();
        initProcessTimeline();
        initCookieConsent();
        initCTAButtons();
        
        createParticles();
        animateAirplane();
        animateDocumentIcons();
        
        // Service card animations
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            createParticles();
            animateDocumentIcons();
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Security measures
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && ['u', 's', 'c'].includes(e.key.toLowerCase())) || 
            (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) || 
            (e.key === 'F12')) {
            e.preventDefault();
        }
    });
   

})();