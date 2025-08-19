// About page JavaScript for Good Way Travels

(function() {
    'use strict';

    // Check if FontAwesome icons are loaded
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
            
            // Try to reload FontAwesome from alternative CDN
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
    
    // Check FontAwesome after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(checkFontAwesome, 300);
        });
    } else {
        setTimeout(checkFontAwesome, 300);
    }
    
    // Additional check after window load
    window.addEventListener('load', () => {
        setTimeout(checkFontAwesome, 100);
    });

    // Security measures
    (function() {
        // Disable right-click
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);

        // Disable specific keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (
                (e.ctrlKey && e.key.toLowerCase() === 'u') || // View Source
                (e.ctrlKey && e.key.toLowerCase() === 's') || // Save
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || // DevTools
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') || // Console
                (e.ctrlKey && e.key.toLowerCase() === 'c') || // Copy
                (e.key === 'F12') // DevTools
            ) {
                e.preventDefault();
            }
        });
    })();

    // Particles background
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

        // Create particles when page loads
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createParticles);
        } else {
            createParticles();
        }

        // Recreate particles on window resize
        window.addEventListener('resize', createParticles);
    })();

    // Team member animations
    function initTeamAnimations() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        teamMembers.forEach(member => observer.observe(member));
    }

    // Timeline animations
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach(item => observer.observe(item));
    }

    // Initialize all functions
    function init() {
        initTeamAnimations();
        initTimelineAnimations();
        console.log('About page initialized');
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
   