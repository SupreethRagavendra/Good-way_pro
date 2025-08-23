

(function() {
    'use strict';

    // === SERVICE DATA ARRAYS ===
    const servicesData = {
        government: [
            {
                id: 'passport-services',
                title: 'Passport Services',
                description: 'Complete passport services including new application, renewal, and police verification assistance.',
                category: 'Government',
                image: 'assets/Images/passport-service.webp',
                icon: 'fas fa-passport',
                features: ['New Application', 'Renewal', 'Police Verification'],
                actionText: 'Apply Now'
            },
            {
                id: 'voter-id',
                title: 'Voter ID Card',
                description: 'New voter registration, address change, and corrections in voter ID details.',
                category: 'Government',
                image: 'assets/Images/voter-id-services.webp',
                icon: 'fas fa-vote-yea',
                features: ['New Registration', 'Address Change', 'Corrections'],
                actionText: 'Apply Now'
            },
            {
                id: 'pan-card',
                title: 'PAN Card Services',
                description: 'New PAN application, corrections, duplicate PAN, and Aadhaar linking services.',
                category: 'Government',
                image: 'assets/Images/pan-card-services.webp',
                icon: 'fas fa-id-card',
                features: ['New Application', 'Corrections', 'Duplicate Copy'],
                actionText: 'Apply Now'
            },
            {
                id: 'aadhaar-services',
                title: 'Aadhaar Services',
                description: 'Aadhaar enrollment, biometric updates, mobile number linking, and address updates.',
                category: 'Government',
                image: 'assets/Images/aadhaar-services.webp',
                icon: 'fas fa-fingerprint',
                features: ['New Enrollment', 'Updates', 'Print/Download'],
                actionText: 'Apply Now'
            },
            {
                id: 'birth-certificate',
                title: 'Birth Certificate',
                description: 'New birth certificate registration, duplicate copies, and corrections in birth records.',
                category: 'Government',
                image: 'assets/Images/Birth.webp',
                icon: 'fas fa-baby',
                features: ['New Registration', 'Duplicate Copy', 'Corrections'],
                actionText: 'Apply Now'
            },
            {
                id: 'death-certificate',
                title: 'Death Certificate',
                description: 'Death registration, duplicate death certificates, and related documentation services.',
                category: 'Government',
                image: 'assets/Images/death-certificate.webp',
                icon: 'fas fa-cross',
                features: ['New Registration', 'Duplicate Copy', 'Legal Documentation'],
                actionText: 'Apply Now'
            },
            {
                id: 'income-certificate',
                title: 'Income Certificate',
                description: 'Income certificate for educational admissions, loans, and government scheme applications.',
                category: 'Government',
                image: 'assets/Images/income-certificate.webp',
                icon: 'fas fa-file-invoice-dollar',
                features: ['For Education', 'For Loans', 'For Schemes'],
                actionText: 'Apply Now'
            },
            {
                id: 'community-certificate',
                title: 'Community Certificate',
                description: 'Caste certificate, religion certificate, and community verification documents.',
                category: 'Government',
                image: 'assets/Images/community-certificate.webp',
                icon: 'fas fa-users',
                features: ['Caste Certificate', 'Religion Certificate', 'Verification'],
                actionText: 'Apply Now'
            },
            {
                id: 'driving-license',
                title: 'Driving License',
                description: 'New driving license, renewal, international driving permit, and license corrections.',
                category: 'Government',
                image: 'assets/Images/driving-license.webp',
                icon: 'fas fa-car',
                features: ['New License', 'Renewal', 'International Permit'],
                actionText: 'Apply Now'
            },
            {
                id: 'marriage-certificate',
                title: 'Marriage Certificate',
                description: 'Marriage registration, certificate issuance, and duplicate marriage certificates.',
                category: 'Government',
                image: 'assets/Images/marriage-certificate.webp',
                icon: 'fas fa-ring',
                features: ['Registration', 'Certificate Issuance', 'Duplicate Copy'],
                actionText: 'Apply Now'
            },
            {
                id: 'nativity-certificate',
                title: 'Nativity Certificate',
                description: 'Domicile certificate, residence proof, and nativity verification documents.',
                category: 'Government',
                image: 'assets/Images/Nativity Certificate.webp',
                icon: 'fas fa-home',
                features: ['Domicile Certificate', 'Residence Proof', 'Verification'],
                actionText: 'Apply Now'
            },
            {
                id: 'fssai-registration',
                title: 'FSSAI Registration',
                description: 'Food license registration, FSSAI renewal, and food business compliance documentation.',
                category: 'Government',
                image: 'assets/Images/fssai-registration.webp',
                icon: 'fas fa-utensils',
                features: ['New Registration', 'License Renewal', 'Compliance Support'],
                actionText: 'Apply Now'
            }
        ],
        travel: [
            {
                id: 'air-ticket',
                title: 'Air Ticket Booking',
                description: 'Domestic and international flight bookings with best fare comparison and instant confirmation.',
                category: 'Travel',
                image: 'assets/Images/flight-inquiries.webp',
                icon: 'fas fa-plane',
                features: ['Domestic Flights', 'International Flights', 'Best Prices'],
                actionText: 'Book Now'
            },
            {
                id: 'bus-ticket',
                title: 'Bus Ticket Booking',
                description: 'State transport and private bus bookings across India with seat selection and real-time tracking.',
                category: 'Travel',
                image: 'assets/Images/bus-reservations.webp',
                icon: 'fas fa-bus',
                features: ['State Transport', 'Private Buses', 'Seat Selection'],
                actionText: 'Book Now'
            },
            {
                id: 'train-ticket',
                title: 'Train Ticket Booking',
                description: 'IRCTC authorized train ticket booking with tatkal, premium tatkal, and waitlist management.',
                category: 'Travel',
                image: 'assets/Images/train-ticket-booking.webp',
                icon: 'fas fa-train',
                features: ['IRCTC Authorized', 'Tatkal Booking', 'Waitlist Management'],
                actionText: 'Book Now'
            },
            {
                id: 'hajj-umrah',
                title: 'Hajj & Umrah Packages',
                description: 'Complete pilgrimage packages including flights, accommodation, visa processing, and guided tours.',
                category: 'Travel',
                image: 'assets/Images/hajj-umrah.webp',
                icon: 'fas fa-kaaba',
                features: ['All-Inclusive', 'Visa Assistance', 'Guided Tours'],
                actionText: 'Book Now'
            }
        ],
        additional: [
            {
                id: 'income-tax',
                title: 'Income Tax Filing',
                description: 'Professional ITR filing services with expert guidance and maximum refund assistance.',
                category: 'Financial',
                image: 'assets/Images/tx.webp',
                icon: 'fas fa-calculator',
                features: ['Expert Guidance', 'Maximum Refund', 'All ITR Forms'],
                actionText: 'File Now'
            },
            {
                id: 'eb-bill',
                title: 'EB Bill Payment',
                description: 'Quick electricity bill payments for all state electricity boards with instant confirmation.',
                category: 'Utility',
                image: 'assets/Images/ebill.webp',
                icon: 'fas fa-bolt',
                features: ['All State Boards', 'Instant Payment', 'SMS Confirmation'],
                actionText: 'Pay Now'
            },
            {
                id: 'printing-services',
                title: 'Color Printout & Exam Results',
                description: 'High-quality color printing, document scanning, and exam result printing services.',
                category: 'Printing',
                image: 'assets/Images/color.webp',
                icon: 'fas fa-print',
                features: ['Color Printing', 'Document Scanning', 'Exam Results'],
                actionText: 'Print Now'
            }
        ]
    };

    // === SERVICE FILTERING FUNCTIONS ===
    function showAllServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        const sectionTitles = document.querySelectorAll('.section-title');
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        
        // Show all service cards
        serviceCards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        });
        
        // Show all section titles and subtitles
        sectionTitles.forEach(title => title.style.display = 'block');
        sectionSubtitles.forEach(subtitle => subtitle.style.display = 'block');
        
        // Update filter buttons
        updateFilterButtons('all');
    }

    function showCategoryServices(category) {
        const serviceCards = document.querySelectorAll('.service-card');
        const sectionTitles = document.querySelectorAll('.section-title');
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        
        // Hide all service cards first
        serviceCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only cards from the selected category
        serviceCards.forEach(card => {
            const section = card.closest('[data-category]');
            if (section && section.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            }
        });
        
        // Show only relevant section titles and subtitles
        sectionTitles.forEach(title => {
            const section = title.closest('section');
            if (section && section.id === `${category}-services`) {
                title.style.display = 'block';
            } else {
                title.style.display = 'none';
            }
        });
        
        sectionSubtitles.forEach(subtitle => {
            const section = subtitle.closest('section');
            if (section && section.id === `${category}-services`) {
                subtitle.style.display = 'block';
            } else {
                subtitle.style.display = 'none';
            }
        });
        
        // Update filter buttons
        updateFilterButtons(category);
    }

    function showSingleService(serviceId) {
        const serviceCards = document.querySelectorAll('.service-card');
        const sectionTitles = document.querySelectorAll('.section-title');
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        
        // Hide all service cards first
        serviceCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only the selected service card
        const targetCard = document.querySelector(`[data-service="${serviceId}"]`);
        if (targetCard) {
            targetCard.style.display = 'block';
            targetCard.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }
        
        // Hide all section titles and subtitles
        sectionTitles.forEach(title => title.style.display = 'none');
        sectionSubtitles.forEach(subtitle => subtitle.style.display = 'none');
        
        // Update filter buttons to show "Show All" option
        updateFilterButtons('single');
    }

    function updateFilterButtons(activeFilter) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to appropriate button
        if (activeFilter === 'all') {
            const allBtn = document.querySelector('[data-filter="all"]');
            if (allBtn) allBtn.classList.add('active');
        } else if (activeFilter === 'single') {
            // Create or update "Show All" button for single service view
            let showAllBtn = document.querySelector('[data-filter="show-all"]');
            if (!showAllBtn) {
                showAllBtn = document.createElement('button');
                showAllBtn.className = 'filter-btn active';
                showAllBtn.setAttribute('data-filter', 'show-all');
                showAllBtn.textContent = 'Show All Services';
                
                // Insert after the first filter button
                const firstBtn = document.querySelector('.filter-btn');
                if (firstBtn) {
                    firstBtn.parentNode.insertBefore(showAllBtn, firstBtn.nextSibling);
                }
            }
            showAllBtn.classList.add('active');
        } else {
            const categoryBtn = document.querySelector(`[data-filter="${activeFilter}"]`);
            if (categoryBtn) categoryBtn.classList.add('active');
        }
    }

    // === INITIALIZATION FUNCTIONS ===
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

        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    function initServiceFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                if (filter === 'all') {
                    showAllServices();
                } else if (filter === 'show-all') {
                    showAllServices();
                    // Remove the "Show All" button
                    btn.remove();
                } else {
                    showCategoryServices(filter);
                }
            });
        });
    }

    function initServiceSearch() {
        const searchInput = document.getElementById('serviceSearch');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!searchInput || !serviceCards.length) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm === '') {
                showAllServices();
                return;
            }
            
            serviceCards.forEach(card => {
                const title = card.querySelector('.service-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.service-description')?.textContent.toLowerCase() || '';
                const category = card.dataset.service?.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

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
                
                this.innerHTML = `${actionText} <i class="fas fa-arrow-right"></i>`;
                
                // Redirect to inquiry page with service parameter
                window.location.href = `inquiry.html?service=${encodeURIComponent(serviceName)}`;
            });
        });
    }

    // Add click event listeners to service cards for individual service filtering
    function initIndividualServiceFiltering() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on the link button
                if (e.target.closest('.service-link')) return;
                
                const serviceId = this.dataset.service;
                if (serviceId) {
                    // Add visual feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                        showSingleService(serviceId);
                    }, 150);
                }
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
   
        initMobileMenu();
        initServiceFiltering();
        initServiceSearch();
        initServiceLinks();
        initIndividualServiceFiltering(); // Initialize individual service filtering
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
