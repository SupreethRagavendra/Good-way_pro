
// Inquiry page functionality - Mobile menu handled by shared-utils.js


function getServiceFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (!serviceParam) return;
    
    const serviceMap = {
        'passport-services': 'Passport Services', 'voter-id': 'Voter ID Services', 'pan-card': 'PAN Card Services',
        'aadhaar-services': 'Aadhaar Services', 'birth-certificate': 'Birth Certificate', 'death-certificate': 'Death Certificate',
        'income-certificate': 'Income Certificate', 'community-certificate': 'Community Certificate', 'driving-license': 'Driving License',
        'marriage-certificate': 'Marriage Certificate', 'nativity-certificate': 'Nativity Certificate', 'fssai-registration': 'FSSAI Registration',
        'air-ticket': 'Air Ticket Booking', 'bus-ticket': 'Bus Ticket Booking', 'train-ticket': 'Train Ticket Booking',
        'income-tax': 'Income Tax Filing', 'eb-bill': 'EB Bill Payment', 'hajj-umrah': 'Hajj and Umrah', 'printing-services': 'Printing Services'
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

document.addEventListener('DOMContentLoaded', getServiceFromUrl);
function submitToWhatsApp() {
    const fields = ['name', 'phone', 'service', 'message'];
    const values = fields.map(id => document.getElementById(id).value.trim());
    
    if (values.some(val => !val)) {
        alert('Please fill in all required fields before submitting.');
        return;
    }
    
    if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(values[1])) {
        alert('Please enter a valid Indian mobile number.');
        return;
    }
    
    const whatsappMessage = `*Customer Details:*\n• Name: ${values[0]}\n• Phone: ${values[1]}\n• Service Required: ${values[2]}\n\n*Inquiry Details:*\n${values[3]}`;
    const whatsappUrl = `https://wa.me/919994120140?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    const successDiv = document.getElementById('formSuccess');
    successDiv.style.display = 'block';
    successDiv.textContent = 'WhatsApp opened! Please send the message to complete your inquiry.';
    setTimeout(() => successDiv.style.display = 'none', 5000);
}

// Form validation
const inquiryForm = document.getElementById('inquiryForm');
const submitBtn = document.getElementById('submitBtn');

function validateField(fieldId, validator, minLength = 0) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    const isValid = validator ? validator(field.value) : field.value.trim().length >= minLength;
    
    field.classList.toggle('error', !isValid);
    if (error) error.style.display = isValid ? 'none' : 'block';
    return isValid;
}

const validateName = () => validateField('name', null, 2);
const validatePhone = () => validateField('phone', val => /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(val));
const validateService = () => validateField('service', val => !!val);
const validateMessage = () => validateField('message', null, 10);
    
// Real-time validation
document.getElementById('name').addEventListener('input', validateName);
document.getElementById('phone').addEventListener('input', validatePhone);
document.getElementById('service').addEventListener('change', validateService);
document.getElementById('message').addEventListener('input', validateMessage);

// Form submission
inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const validators = [validateName, validatePhone, validateService, validateMessage];
    if (validators.every(validator => validator())) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            const [name, phone, service, message] = ['name', 'phone', 'service', 'message'].map(id => document.getElementById(id).value);
            const whatsappMessage = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Required:* ${service}\n*Message:* ${message}\n\nPlease provide more details about this service.`;
            
            window.open(`https://wa.me/9994120140?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            
            inquiryForm.reset();
            document.getElementById('formSuccess').style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Submit via WhatsApp';
            
            setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 5000);
        }, 1000);
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

        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 6 + 3;
        const delay = Math.random() * 2;
        const distance = Math.random() * 50 + 25;
        const anim = `floatParticle-${i}`;

        Object.assign(p.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `${anim} ${duration}s ease-in-out ${delay}s infinite`,
            opacity: (Math.random() * 0.25 + 0.1).toFixed(2)
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
    style.textContent = '@keyframes fly { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(25px, -10px) rotate(2deg); } 100% { transform: translate(0, 0) rotate(0deg); } }';
    document.head.appendChild(style);

    airplane.style.animation = 'fly 5s ease-in-out infinite';
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
        style.textContent = `@keyframes ${anim} { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(${i % 2 ? '2deg' : '-2deg'}); } }`;
        document.head.appendChild(style);
        doc.style.animation = `${anim} ${3 + i}s ease-in-out infinite`;
    });
}

// Scroll animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-title, .section-subtitle, .benefit-card, .badge').forEach(el => {
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

// Message templates (simplified)
const messageTemplates = {
    'PAN Card Services': [{ title: "New PAN Card", template: `I need assistance with a new PAN Card application. Please provide information about required documents, processing time, and service charges.` }],
    'Passport Services': [{ title: "New Passport", template: `I need to apply for a new passport. Please provide details about required documents, application process, and fees structure.` }],
    'Aadhaar Services': [{ title: "New Aadhaar", template: `I need to register for a new Aadhaar card. Please guide me about documents required and process duration.` }],
    'Air Ticket Booking': [{ title: "Flight Booking", template: `I need to book a flight. Please provide information about available options and booking process.` }],
    'Train Ticket Booking': [{ title: "Train Booking", template: `I need help with train ticket booking. Please provide information about available trains and booking process.` }],
    'Income Certificate': [{ title: "Certificate Request", template: `I need an income certificate. Please guide me about required documents and processing time.` }],
    'Other': [{ title: "General Inquiry", template: `I need assistance with a service. Please provide details about required documents, processing time, and service charges.` }]
};

const defaultTemplate = `I need assistance with [Service]. Please provide information about required documents, processing time, and service charges.\n\nMy specific requirement: [Please describe in detail]`;

// Update message template
function updateMessageTemplate() {
    const serviceSelect = document.getElementById('service');
    const messageField = document.getElementById('message');
    const templateButtons = document.getElementById('templateButtons');
    const templateOptions = document.getElementById('templateOptions');
    
    const selectedService = serviceSelect.value;
    templateOptions.innerHTML = '';
    
    if (!selectedService) {
        templateButtons.style.display = 'none';
        return;
    }
    
    if (messageTemplates[selectedService]) {
        templateButtons.style.display = 'block';
        messageTemplates[selectedService].forEach(template => {
            const button = document.createElement('button');
            button.className = 'template-btn';
            button.textContent = template.title;
            button.onclick = () => {
                messageField.value = template.template;
                updateCharCount();
                messageField.focus();
            };
            templateOptions.appendChild(button);
        });
    } else {
        templateButtons.style.display = 'none';
        messageField.value = defaultTemplate.replace('[Service]', selectedService);
        updateCharCount();
    }
}

// Security measures
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && ['u', 's', 'c'].includes(e.key.toLowerCase())) || 
        (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) || 
        (e.key === 'F12')) {
        e.preventDefault();
    }
});

// Character counter
function updateCharCount() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const currentLength = messageField.value.length;
    
    charCount.textContent = `(${currentLength}/500 characters)`;
    charCount.style.color = currentLength > 490 ? 'var(--error)' : currentLength > 450 ? 'var(--warning)' : 'var(--dark-gray)';
}

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
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateAirplane();
    animateDocumentIcons();
    lazyLoadImages();
    updateCharCount();
    
    // Check URL parameters
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
});

// Resize handler
window.addEventListener('resize', () => {
    createParticles();
    animateAirplane();
    animateDocumentIcons();
});
