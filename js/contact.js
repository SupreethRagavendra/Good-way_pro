document.addEventListener('DOMContentLoaded', function() {
    // Check if FontAwesome loaded properly for icons
    function checkFontAwesome() {
        // Create a test element to check if FontAwesome is loaded
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-phone';
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        testElement.style.fontSize = '16px';
        document.body.appendChild(testElement);
        
        // Check if the icon has proper width (FontAwesome loaded)
        const iconWidth = testElement.offsetWidth;
        document.body.removeChild(testElement);
        
        // If FontAwesome didn't load properly, add fallback class
        if (iconWidth === 0 || iconWidth < 10) {
            document.body.classList.add('fontawesome-fallback');
            console.warn('FontAwesome not loaded properly, using emoji fallbacks');
        }
    }
    
    // Check FontAwesome after a short delay to ensure CSS is loaded
    setTimeout(checkFontAwesome, 500);
    
    // Theme toggle is handled by shared-utils.js
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
            });
            
            // Open current if not active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide previous messages
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Get form values
                const formData = new FormData(contactForm);
                
                // Basic validation
                const name = formData.get('name')?.trim();
                const email = formData.get('email')?.trim();
                const phone = formData.get('phone')?.trim();
                const subject = formData.get('subject')?.trim();
                const message = formData.get('message')?.trim();
                
                if (!name || !email || !phone || !subject || !message) {
                    throw new Error('Please fill in all required fields.');
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error('Please enter a valid email address.');
                }
                
                // Phone validation (basic)
                if (phone.length < 8) {
                    throw new Error('Please enter a valid phone number.');
                }
                
                // Submit form
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
                console.error('Form submission error:', error);
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
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Initialize Particles
    initParticles();
    
    // Lazy load images
    initLazyLoading();
    
    // Security measures
    initSecurityMeasures();
});

// Particles Animation
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 50); // Limit to 50 particles max
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties with constrained ranges
        const size = Math.random() * 3 + 1; // 1-4px
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10; // 10-20s
        const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
        
        // Apply styles
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
            opacity: opacity,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            willChange: 'transform' // Optimize for performance
        });
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }
    
    // Animation loop with throttling
    let lastTime = 0;
    const animationFrame = (time) => {
        if (time - lastTime > 30) { // ~30fps
            particles.forEach(particle => {
                const currentTop = parseFloat(particle.style.top);
                const newTop = currentTop > 100 ? -10 : currentTop + 0.05;
                particle.style.top = `${newTop}%`;
            });
            lastTime = time;
        }
        requestAnimationFrame(animationFrame);
    };
    
    requestAnimationFrame(animationFrame);
}

// Lazy Loading
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback with IntersectionObserver
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    lazyLoadObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px' // Load images 200px before they enter viewport
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
}

// Security Measures
function initSecurityMeasures() {
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const blockedCombinations = [
            // Ctrl+U (View source)
            e.ctrlKey && e.key.toLowerCase() === 'u',
            // Ctrl+S (Save page)
            e.ctrlKey && e.key.toLowerCase() === 's',
            // Ctrl+Shift+I (DevTools)
            e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i',
            // Ctrl+Shift+J (DevTools Console)
            e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j',
            // Ctrl+C (Copy)
            e.ctrlKey && e.key.toLowerCase() === 'c',
            // F12 (DevTools)
            e.key === 'F12',
            // Option+Command+I (Mac DevTools)
            e.altKey && e.metaKey && e.key.toLowerCase() === 'i'
        ];

        if (blockedCombinations.some(combination => combination)) {
            e.preventDefault();
            // Optionally show a message
            // alert('This functionality is disabled.');
        }
    });
}
