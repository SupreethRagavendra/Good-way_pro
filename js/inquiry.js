

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


    // === AUTO-SELECT SERVICE FROM URL PARAMETER ===
function getServiceFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (!serviceParam) return;
    
    // Map URL parameters to form values
    const serviceMap = {
        'passport-services': 'Passport Services',
        'voter-id': 'Voter ID Services',
        'pan-card': 'PAN Card Services',
        'aadhaar-services': 'Aadhaar Services',
        'birth-certificate': 'Birth Certificate',
        'death-certificate': 'Death Certificate',
        'income-certificate': 'Income Certificate',
        'community-certificate': 'Community Certificate',
        'driving-license': 'Driving License',
        'marriage-certificate': 'Marriage Certificate',
        'nativity-certificate': 'Nativity Certificate',
        'fssai-registration': 'FSSAI Registration',
        'air-ticket': 'Air Ticket Booking',
        'bus-ticket': 'Bus Ticket Booking',
        'train-ticket': 'Train Ticket Booking',
        'income-tax': 'Income Tax Filing',
        'eb-bill': 'EB Bill Payment',
        'hajj-umrah':'Hajj and Umrah',
        'printing-services': 'Printing Services'


    };
    
    const serviceValue = serviceMap[serviceParam];
    if (serviceValue) {
        const serviceSelect = document.getElementById('service');
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value === serviceValue) {
                serviceSelect.selectedIndex = i;
                break;
            }
        }
    }
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', getServiceFromUrl);
    // === WHATSAPP SUBMISSION FUNCTION ===
    function submitToWhatsApp() {
        // Get form data
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form data
        if (!name || !phone || !service || !message) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        
        // Validate phone number
        const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid Indian mobile number.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `*Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Service Required: ${service}

*Inquiry Details:*
${message}`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/919994120140?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        // Show success message
        const successDiv = document.getElementById('formSuccess');
        successDiv.style.display = 'block';
        successDiv.textContent = 'WhatsApp opened! Please send the message to complete your inquiry.';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }

    // === FORM VALIDATION ===
    const inquiryForm = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    
    function validateName() {
        const name = document.getElementById('name');
        const error = document.getElementById('nameError');
        if (name.value.trim().length < 2) {
            name.classList.add('error');
            error.style.display = 'block';
            return false;
        } else {
            name.classList.remove('error');
            error.style.display = 'none';
            return true;
        }
    }
    
    function validatePhone() {
        const phone = document.getElementById('phone');
        const error = document.getElementById('phoneError');
        const pattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        if (!pattern.test(phone.value)) {
            phone.classList.add('error');
            error.style.display = 'block';
            return false;
        } else {
            phone.classList.remove('error');
            error.style.display = 'none';
            return true;
        }
    }
    
    function validateService() {
        const service = document.getElementById('service');
        const error = document.getElementById('serviceError');
        if (!service.value) {
            service.classList.add('error');
            error.style.display = 'block';
            return false;
        } else {
            service.classList.remove('error');
            error.style.display = 'none';
            return true;
        }
    }

    
    
    function validateMessage() {
        const message = document.getElementById('message');
        const error = document.getElementById('messageError');
        if (message.value.trim().length < 10) {
            message.classList.add('error');
            error.style.display = 'block';
            return false;
        } else {
            message.classList.remove('error');
            error.style.display = 'none';
            return true;
        }
    }
    
    // Real-time validation
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('service').addEventListener('change', validateService);
    document.getElementById('message').addEventListener('input', validateMessage);
    
    // Form submission
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isPhoneValid && isServiceValid && isMessageValid) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate processing delay
            setTimeout(() => {
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const service = document.getElementById('service').value;
                const message = document.getElementById('message').value;
                
                const whatsappMessage = `
*New Inquiry from Website*

*Name:* ${name}
*Phone:* ${phone}
*Service Required:* ${service}
*Message:* ${message}

Please provide more details about this service.
                `.trim();
                
                const whatsappUrl = `https://wa.me/9994120140?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                inquiryForm.reset();
                document.getElementById('formSuccess').style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Submit via WhatsApp';
                
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }, 1000);
        }
    });

    // === PARTICLES ===
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';
        document.querySelectorAll('[data-generated="particle-style"]').forEach(s => s.remove());

        // Reduced particle count for better performance
        const count = window.innerWidth < 768 ? 10 : 25;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');

            const size = Math.random() * 8 + 2; // Smaller particles
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;

            const duration = Math.random() * 8 + 4; // Faster animation
            const delay = Math.random() * 3; // Shorter delay
            const distance = Math.random() * 60 + 30; // Shorter distance
            const anim = `floatParticle-${i}`;

            p.style.animation = `${anim} ${duration}s ease-in-out ${delay}s infinite`;
            p.style.opacity = (Math.random() * 0.3 + 0.1).toFixed(2); // Lower opacity

            const style = document.createElement('style');
            style.setAttribute('data-generated', 'particle-style');
            style.textContent = `
                @keyframes ${anim} {
                    0%, 100% { transform: translate(0, 0); }
                    50% {
                        transform: translate(${(Math.random() * distance - distance/2).toFixed(1)}px,
                                             ${(Math.random() * distance - distance/2).toFixed(1)}px);
                    }
                }
            `;
            document.head.appendChild(style);
            container.appendChild(p);
        }
    }

    // === AIRPLANE ANIMATION - Optimized ===
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
                50% { transform: translate(30px, -15px) rotate(3deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);

        airplane.style.animation = 'fly 6s ease-in-out infinite';
    }

    // === DOCUMENT ICON FLOATING - Optimized ===
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
                    50% { transform: translateY(-15px) rotate(${i % 2 ? '3deg' : '-3deg'}); }
                }
            `;
            document.head.appendChild(style);
            doc.style.animation = `${anim} ${4 + i}s ease-in-out infinite`;
        });
    }

    // === ANIMATIONS & OBSERVER ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                target.querySelectorAll('.section-title, .section-subtitle, .benefit-card, .badge').forEach(el => {
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

    // === COOKIE CONSENT ===
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

    // Message templates for each service
const messageTemplates = {
    'PAN Card Services': [
        {
            title: "New PAN Card",
            template: `I need assistance with a new PAN Card application. Please provide information about:
- Required documents
- Processing time
- Service charges
- Any additional requirements

Additional details: [Specify if any special requirements]`
        },
        {
            title: "PAN Correction",
            template: `I need to correct details on my PAN Card. Please guide me about:
- Documents needed for correction
- Processing fees
- Time required
- Procedure to submit request

Details to correct: [Name/DOB/Photo/Other]`
        }
    ],
    'Passport Services': [
        {
            title: "New Passport",
            template: `I need to apply for a new passport. Please provide details about:
- Required documents
- Application process
- Fees structure
- Appointment availability

Type: [Normal/Tatkal]
Passport type: [Regular/Diplomatic/Official]`
        },
        {
            title: "Passport Renewal",
            template: `My passport needs renewal. Please inform about:
- Documents required
- Processing timeline
- Fees
- Any special requirements

Current passport expiry date: [Date]
Changes needed: [None/Address/Other]`
        }
    ],
    'Aadhaar Services': [
        {
            title: "New Aadhaar",
            template: `I need to register for a new Aadhaar card. Please guide me about:
- Documents required
- Process duration
- Available time slots
- Fees if any

Additional requirements: [Specify if any]`
        },
        {
            title: "Aadhaar Update",
            template: `I need to update my Aadhaar details. Please provide information about:
- Documents needed for update
- Processing time
- Fees if any
- Procedure to submit request

Details to update: [Address/Phone/Photo/Other]`
        }
    ],
    'Air Ticket Booking': [
        {
            title: "Domestic Flight",
            template: `I need to book a domestic flight. My travel details:
- From: [City]
- To: [City]
- Departure Date: [Date]
- Return Date: [Date] (if round trip)
- Number of passengers: [Count]
- Class preference: [Economy/Premium Economy/Business]

Preferred airlines: [Any/None]
Special requests: [Meal/Wheelchair/Other]`
        },
        {
            title: "International Flight",
            template: `I need to book an international flight. My travel details:
- From: [City]
- To: [City]
- Departure Date: [Date]
- Return Date: [Date]
- Number of passengers: [Count]
- Passport details available: [Yes/No]

Class preference: [Economy/Premium/Business/First]
Baggage requirements: [Standard/Extra]`
        }
    ],
    'Train Ticket Booking': [
        {
            title: "General Booking",
            template: `I need help with train ticket booking:
- From: [Station]
- To: [Station]
- Travel Date: [Date]
- Class preference: [Sleeper/3AC/2AC/1AC]
- Number of passengers: [Count]

Preferred train: [Any/Specific train number]
Quota: [General/Tatkal/Premium]`
        },
        {
            title: "Tatkal Booking",
            template: `I need Tatkal train tickets. Details:
- From: [Station]
- To: [Station]
- Travel Date: [Date]
- Class: [Sleeper/3AC/2AC/1AC]
- Passengers: [Count]

Train number if known: [Number]
Emergency contact: [Phone]`
        }
    ],
    'Income Certificate': [
        {
            title: "Standard Request",
            template: `I need an income certificate. Please guide me about:
- Required documents
- Processing time
- Government fees
- Collection process

Purpose: [Loan/Scholarship/Government Scheme/Other]
Annual Income: [Amount]
Family members: [Count]`
        }
    ],
    'Other': [
        {
            title: "General Inquiry",
            template: `I need assistance with a service. Please provide details about:
- Required documents
- Processing time
- Service charges
- Any additional requirements

Service required: [Describe your need in detail]`
        }
    ]
};

// Default template for services not listed above
const defaultTemplate = `I need assistance with [Service]. Please provide information about:
- Required documents
- Processing time
- Service charges
- Any additional requirements

My specific requirement: [Please describe in detail]`;

// Update message field based on service selection
function updateMessageTemplate() {
    const serviceSelect = document.getElementById('service');
    const messageField = document.getElementById('message');
    const templateButtons = document.getElementById('templateButtons');
    const templateOptions = document.getElementById('templateOptions');
    
    const selectedService = serviceSelect.value;
    
    // Clear previous options
    templateOptions.innerHTML = '';
    
    if (!selectedService) {
        templateButtons.style.display = 'none';
        return;
    }
    
    // Check if we have templates for this service
    if (messageTemplates[selectedService]) {
        templateButtons.style.display = 'block';
        
        // Add template options
        messageTemplates[selectedService].forEach((template, index) => {
            const button = document.createElement('button');
            button.className = 'template-btn';
            button.textContent = template.title;
            button.onclick = function() {
                messageField.value = template.template;
                updateCharCount();
                // Smooth scroll to message field
                messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                messageField.focus();
            };
            templateOptions.appendChild(button);
        });
        
        // Add default option if there are multiple templates
        if (messageTemplates[selectedService].length > 1) {
            const button = document.createElement('button');
            button.className = 'template-btn';
            button.textContent = 'Blank Template';
            button.onclick = function() {
                messageField.value = '';
                updateCharCount();
                messageField.focus();
            };
            templateOptions.appendChild(button);
        }
    } else if (selectedService === 'Other') {
        templateButtons.style.display = 'block';
        messageField.value = messageTemplates['Other'][0].template;
        updateCharCount();
    } else {
        templateButtons.style.display = 'none';
        messageField.value = defaultTemplate.replace('[Service]', selectedService);
        updateCharCount();
    }
}

    document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
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
        alert("This shortcut is disabled.");
    }
});

// Character counter for message field
function updateCharCount() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const currentLength = messageField.value.length;
    
    charCount.textContent = `(${currentLength}/500 characters)`;
    
    if (currentLength > 450) {
        charCount.style.color = 'var(--warning)';
    } else if (currentLength > 490) {
        charCount.style.color = 'var(--error)';
    } else {
        charCount.style.color = 'var(--dark-gray)';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for service parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase())) {
                serviceSelect.selectedIndex = i;
                updateMessageTemplate();
                break;
            }
        }
    }
    
    // Initialize character counter
    updateCharCount();
});

    // === SMOOTH SCROLL ===
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

    // === LAZY LOAD IMAGES ===
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

    // === INIT ON DOM READY ===
    document.addEventListener('DOMContentLoaded', () => {
        createParticles();
        animateAirplane();
        animateDocumentIcons();
        lazyLoadImages();
    });

    // === RESIZE OPTIMIZED ===
    window.addEventListener('resize', () => {
        createParticles();
        animateAirplane();
        animateDocumentIcons();
    });
