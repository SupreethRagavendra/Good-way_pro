document.addEventListener('DOMContentLoaded', function() {
    // FontAwesome check
    function checkFontAwesome() {
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-phone';
        testElement.style.cssText = 'position:absolute;left:-9999px;font-size:16px';
        document.body.appendChild(testElement);
        
        const iconWidth = testElement.offsetWidth;
        document.body.removeChild(testElement);
        
        if (iconWidth < 10) {
            document.body.classList.add('fontawesome-fallback');
        }
    }
    
    setTimeout(checkFontAwesome, 500);
    
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const fields = ['name', 'email', 'phone', 'subject', 'message'];
                const values = fields.map(field => formData.get(field)?.trim());
                
                if (values.some(val => !val)) {
                    throw new Error('Please fill in all required fields.');
                }
                
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[1])) {
                    throw new Error('Please enter a valid email address.');
                }
                
                if (values[2].length < 8) {
                    throw new Error('Please enter a valid phone number.');
                }
                
                const response = await fetch('https://good-way.onrender.com/index.php', {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                    credentials: 'omit'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.text();
                
                if (data.trim() === 'success') {
                    showFormMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(data || 'Unknown server response');
                }
            } catch (error) {
                showFormMessage(error.message || 'There was an error submitting your form. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function showFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        if (type === 'success') {
            setTimeout(() => formMessage.style.display = 'none', 5000);
        }
    }
    
    // Initialize particles and lazy loading
    initParticles();
    initLazyLoading();
    
    // Security measures
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && ['u', 's', 'c'].includes(e.key.toLowerCase())) || 
            (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) || 
            (e.key === 'F12') || (e.altKey && e.metaKey && e.key.toLowerCase() === 'i')) {
            e.preventDefault();
        }
    });
});

// Particles
function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;
    
    const count = Math.min(Math.floor(window.innerWidth / 15), 30);
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        Object.assign(particle.style, {
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
        });
        
        container.appendChild(particle);
    }
}

// Lazy loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px' });
        
        lazyImages.forEach(img => observer.observe(img));
    }
}
