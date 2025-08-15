
    document.addEventListener('DOMContentLoaded', function() {
        // Theme Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        const body = document.body;
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Set initial theme
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Theme toggle event
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        
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
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const item = this.parentNode;
                const isActive = item.classList.contains('active');
                
                // Close all items first
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                    el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });
                
                // Open current if not active
                if (!isActive) {
                    item.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
        
        // Contact Form Submission
     // Contact Form Submission - CORRECTED VERSION
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form values
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value.trim());
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('phone', document.getElementById('phone').value.trim());
        formData.append('subject', document.getElementById('subject').value.trim());
        formData.append('message', document.getElementById('message').value.trim());
        
        // Basic validation
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !phone || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            resetSubmitButton();
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            resetSubmitButton();
            return;
        }
        
        // Submit form
        fetch('https://good-way.onrender.com/index.php', {
            method: 'POST',
            body: formData,
            mode: 'cors', // Important for cross-origin requests
            credentials: 'omit' // Don't send credentials with cross-origin requests
        })
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Your PHP returns plain text, not JSON
            return response.text();
        })
        .then(data => {
            console.log('Response data:', data);
            
            // Check if response is "success" (as your PHP returns)
            if (data.trim() === 'success') {
                showFormMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                // Show the actual error message from PHP
                showFormMessage(`Error: ${data}`, 'error');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            showFormMessage('There was a network error. Please check your connection and try again.', 'error');
        })
        .finally(() => {
            resetSubmitButton();
        });
        
        function resetSubmitButton() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
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
}   // Initialize Particles
        initParticles();
        
        // Lazy load images
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers without native lazy loading
            const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                lazyLoadObserver.observe(img);
            });
        }
    });
    
    // Optimized Particles Animation
    function initParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        const particleCount = Math.floor(window.innerWidth / 10);
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
            particles.push(particle);
        }
        
        // Optimize animation performance
        function updateParticles() {
            particles.forEach(particle => {
                const currentTop = parseFloat(particle.style.top);
                const newTop = currentTop > 100 ? -10 : currentTop + 0.05;
                particle.style.top = `${newTop}%`;
            });
            
            requestAnimationFrame(updateParticles);
        }
        
        // Start animation
        requestAnimationFrame(updateParticles);
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
   