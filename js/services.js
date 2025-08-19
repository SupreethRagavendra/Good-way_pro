// Services page JavaScript for Good Way Travels

(function() {
    'use strict';

    // Mobile menu functionality
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

    // Service filtering functionality
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

    // Service search functionality
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

    // Service link enhancement
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
                } else if (serviceType.includes('document')) {
                    actionText = 'Apply Now';
                } else if (serviceType.includes('certificate')) {
                    actionText = 'Get Certificate';
                }
                
                // Show confirmation dialog
                if (confirm(`Would you like to ${actionText.toLowerCase()} for ${serviceName}?`)) {
                    // Redirect to contact page with service info
                    const contactUrl = `contact.html?service=${encodeURIComponent(serviceName)}&type=${encodeURIComponent(serviceType)}`;
                    window.location.href = contactUrl;
                }
            });
        });
    }

    // Service card animations
    function initServiceAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        serviceCards.forEach(card => observer.observe(card));
    }

    // Initialize all functions
    function init() {
        initMobileMenu();
        initServiceFiltering();
        initServiceSearch();
        initServiceLinks();
        initServiceAnimations();
        console.log('Services page initialized');
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();