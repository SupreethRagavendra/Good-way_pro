// Contact page JavaScript for Good Way Travels

document.addEventListener('DOMContentLoaded', function() {
    // Check if FontAwesome icons are loaded
    function checkFontAwesome() {
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-phone';
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        testElement.style.fontSize = '16px';
        document.body.appendChild(testElement);
        
        const iconWidth = testElement.offsetWidth;
        document.body.removeChild(testElement);
        
        if (iconWidth === 0 || iconWidth < 10) {
            document.body.classList.add('fontawesome-fallback');
            console.warn('FontAwesome not loaded properly, using emoji fallbacks');
        }
    }
    
    // Check FontAwesome after a short delay
    setTimeout(checkFontAwesome, 500);
    
    // Mobile menu functionality
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
    
    // FAQ accordion functionality
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
    
    // Contact form submission
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
                
                // Phone validation
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(phone)) {
                    throw new Error('Please enter a valid phone number.');
                }
                
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                // Show error message
                formMessage.textContent = error.message || 'An error occurred. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Map functionality
    function initMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;
        
        // Simple map placeholder
        mapContainer.innerHTML = `
            <div style="width: 100%; height: 400px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                <div style="text-align: center;">
                    <i class="fas fa-map-marker-alt" style="font-size: 48px; color: #FF6600; margin-bottom: 16px;"></i>
                    <h3>Good Way Travels</h3>
                    <p>KPM BUILDING, 20/4, opp. WAHAB PETROL BUNK<br>Kuniyamuthur, Coimbatore, Tamil Nadu 641008</p>
                    <p><strong>Phone:</strong> +91 9994120140</p>
                </div>
            </div>
        `;
    }
    
    // Initialize map
    initMap();
    
    // Form field validation
    function initFormValidation() {
        const formFields = contactForm?.querySelectorAll('input, textarea');
        
        formFields?.forEach(field => {
            field.addEventListener('blur', function() {
                const value = this.value.trim();
                
                if (this.hasAttribute('required') && !value) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
                
                // Email validation
                if (this.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                }
                
                // Phone validation
                if (this.name === 'phone' && value) {
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(value)) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                }
            });
        });
    }
    
    // Initialize form validation
    initFormValidation();
    
    console.log('Contact page initialized');
});
