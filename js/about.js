

    function checkFontAwesome() {
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-phone';
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        testElement.style.fontSize = '16px';
        testElement.style.visibility = 'hidden';
        document.body.appendChild(testElement);
        
        const iconWidth = testElement.offsetWidth;
        const computedStyle = window.getComputedStyle(testElement, '::before');
        const hasFontAwesome = computedStyle.fontFamily.includes('Font Awesome') || 
                              computedStyle.fontFamily.includes('FontAwesome') ||
                              iconWidth > 10;
        
        document.body.removeChild(testElement);
        
        if (!hasFontAwesome) {
            document.body.classList.add('fontawesome-fallback');
            console.warn('FontAwesome not loaded properly, using emoji fallbacks');
            
            const alternativeLink = document.createElement('link');
            alternativeLink.rel = 'stylesheet';
            alternativeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            alternativeLink.onload = () => {
                setTimeout(() => {
                    if (!document.body.classList.contains('fontawesome-fallback')) {
                        document.body.classList.remove('fontawesome-fallback');
                        console.log('FontAwesome loaded successfully from alternative CDN');
                    }
                }, 100);
            };
            document.head.appendChild(alternativeLink);
        } else {
            console.log('FontAwesome loaded successfully');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(checkFontAwesome, 300);
        });
    } else {
        setTimeout(checkFontAwesome, 300);
    }
    
    window.addEventListener('load', () => {
        setTimeout(checkFontAwesome, 100);
    });

    (function() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);

        document.addEventListener('keydown', function(e) {
            if (
                (e.ctrlKey && e.key.toLowerCase() === 'u') || 
                (e.ctrlKey && e.key.toLowerCase() === 's') || 
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || 
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') || 
                (e.ctrlKey && e.key.toLowerCase() === 'c') || 
                (e.key === 'F12') 
            ) {
                e.preventDefault();
            }
        });
    })();

    (function() {
        function createParticles() {
            const container = document.getElementById('particles');
            if (!container) return;

            container.innerHTML = '';
            document.querySelectorAll('[data-generated="particle-style"]').forEach(s => s.remove());

            const count = window.innerWidth < 768 ? 10 : 25;

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

        window.addEventListener('load', createParticles);
        let resizeTimer; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(createParticles, 120); }, { passive: true });
    })();

    // === AIRPLANE ANIMATION ===
    (function() {
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

        window.addEventListener('load', animateAirplane);
    })();

    (function() {
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

        window.addEventListener('load', animateDocumentIcons);
    })();

    (function() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    target.querySelectorAll('.section-title, .section-subtitle, .about-text, .mission-card, .vision-card, .team-member, .timeline-item, .value-card, .certification, .contact-info').forEach(el => {
                        if (!el.classList.contains('animated')) {
                            el.classList.add('animated');
                        }
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('section').forEach(s => observer.observe(s));
    })();

    // === COOKIE CONSENT ===
    (function() {
        const cookieConsent = document.getElementById('cookieConsent');
        const cookieAccept = document.getElementById('cookieAccept');
        const cookieDecline = document.getElementById('cookieDecline');

        // Show cookie consent if not already accepted
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => cookieConsent.classList.add('show'), 2000);
        }

        // Accept cookies
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('show');
        });

        // Decline cookies
        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('show');
        });
    })();

    // === SMOOTH SCROLL ===
    (function() {
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
    })();

    // === LAZY LOAD IMAGES ===
    (function() {
        function lazyLoadImages() {
            const imgs = document.querySelectorAll('img[loading="lazy"]');
            if ('loading' in HTMLImageElement.prototype) {
                imgs.forEach(img => img.src = img.dataset.src || img.src);
            } else {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            observer.unobserve(img);
                        }
                    });
                });
                imgs.forEach(img => io.observe(img));
            }
        }

        window.addEventListener('load', lazyLoadImages);
    })();

    // === NAVBAR SCROLL EFFECT ===
   
