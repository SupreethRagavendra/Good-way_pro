
// About page functionality

// FontAwesome check
function checkFontAwesome() {
    const testElement = document.createElement('i');
    testElement.className = 'fas fa-phone';
    testElement.style.cssText = 'position:absolute;left:-9999px;font-size:16px;visibility:hidden';
    document.body.appendChild(testElement);
    
    const iconWidth = testElement.offsetWidth;
    const computedStyle = window.getComputedStyle(testElement, '::before');
    const hasFontAwesome = computedStyle.fontFamily.includes('Font Awesome') || iconWidth > 10;
    
    document.body.removeChild(testElement);
    
    if (!hasFontAwesome) {
        document.body.classList.add('fontawesome-fallback');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
    }
}

setTimeout(checkFontAwesome, 300);

// Security measures
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && ['u', 's', 'c'].includes(e.key.toLowerCase())) || 
        (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) || 
        (e.key === 'F12')) {
        e.preventDefault();
    }
});

// Particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    container.innerHTML = '';
    document.querySelectorAll('[data-generated="particle-style"]').forEach(s => s.remove());

    const count = window.innerWidth < 768 ? 8 : 20;

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
        style.textContent = `@keyframes ${anim} { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(${(Math.random() * distance - distance/2).toFixed(1)}px, ${(Math.random() * distance - distance/2).toFixed(1)}px); } }`;
        document.head.appendChild(style);
        container.appendChild(p);
    }
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
        doc.style.animation = `${anim} ${4 + i}s ease-in-out infinite`;
    });
}

// Scroll animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-title, .section-subtitle, .about-text, .mission-card, .vision-card, .team-member, .timeline-item, .value-card, .certification, .contact-info').forEach(el => {
                el.classList.add('animated');
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('section').forEach(s => observer.observe(s));

// Cookie consent
const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');

if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => cookieConsent.classList.add('show'), 2000);
}

const handleConsent = (accepted) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    cookieConsent.classList.remove('show');
};

cookieAccept.addEventListener('click', () => handleConsent(true));
cookieDecline.addEventListener('click', () => handleConsent(false));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// Lazy loading
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

// Initialize everything
window.addEventListener('load', () => {
    createParticles();
    animateAirplane();
    animateDocumentIcons();
    lazyLoadImages();
});

// Resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createParticles, 120);
}, { passive: true });
   