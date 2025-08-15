
        
    // Load non-critical CSS asynchronously
    function loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
    
    // Load Font Awesome after page load
    window.addEventListener('load', function() {
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

      document.addEventListener('DOMContentLoaded', function() {
            const timeline = document.querySelector('.process-timeline');
            const steps = document.querySelectorAll('.process-step');
            
            if (timeline && steps.length) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animate the timeline line first
                            const line = document.getElementById('timelineLine');
                            if (line) {
                                line.style.height = '0';
                                line.style.transition = 'height 1.5s ease-in-out';
                                setTimeout(() => {
                                    line.style.height = '100%';
                                }, 100);
                            }
                            
                            // Animate each step with staggered delays
                            steps.forEach((step, index) => {
                                setTimeout(() => {
                                    step.classList.add('animated');
                                }, index * 300);
                            });
                            
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                
                observer.observe(timeline);
            }
            
            // ... (rest of your existing JavaScript remains the same) ...
        });
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

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

    // Counter animation
    function animateCounter(id, target, duration = 2000) {
        const element = document.getElementById(id);
        if (!element) return;
        const increment = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Particles animation
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';
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
            p.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            p.style.opacity = (Math.random() * 0.5 + 0.1).toFixed(2);
            container.appendChild(p);
        }
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                if (target.classList.contains('process-section')) {
                    document.getElementById('timelineLine').style.transform = 'translateX(-50%) scaleY(1)';
                    document.querySelectorAll('.process-step').forEach((step, i) => {
                        setTimeout(() => step.classList.add('animated'), i * 300);
                    });
                }

                if (target.classList.contains('section') && target.previousElementSibling?.id === 'trust') {
                    animateCounter('ticketsCounter', 3000);
                    animateCounter('documentsCounter', 5700);
                    animateCounter('yearsCounter', 3);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('section').forEach(s => observer.observe(s));

    // Cookie consent
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

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

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            const target = document.querySelector(id);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        createParticles();
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.split-text-container, .hero-subtitle, .hero-cta, .hero-stats');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 300);
        });
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createParticles();
        }, 250);
    });

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
   