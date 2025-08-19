// Inquiry page JavaScript for Good Way Travels

(function() {
    'use strict';

    // Mobile menu functionality
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

    // Auto-select service from URL parameter
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

    // WhatsApp submission function
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
${message}

*Contact Information:*
• Business: Good Way Travels
• Phone: +91 9994120140
• Address: KPM BUILDING, 20/4, opp. WAHAB PETROL BUNK, Kuniyamuthur, Coimbatore, Tamil Nadu 641008`;

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/919994120140?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    }

    // Form validation
    function initFormValidation() {
        const form = document.getElementById('inquiryForm');
        const submitBtn = document.getElementById('submitBtn');
        
        if (!form || !submitBtn) return;
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitToWhatsApp();
            }
        });
    }
    
    function validateField() {
        const value = this.value.trim();
        const fieldName = this.name;
        
        // Remove existing error
        clearError.call(this);
        
        // Required field validation
        if (this.hasAttribute('required') && !value) {
            showError(this, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(this, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (fieldName === 'phone' && value) {
            const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
            if (!phonePattern.test(value)) {
                showError(this, 'Please enter a valid Indian mobile number');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function clearError() {
        this.classList.remove('error');
        const errorElement = this.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function validateForm() {
        const inputs = document.querySelectorAll('#inquiryForm input, #inquiryForm textarea, #inquiryForm select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField.call(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Service category filtering
    function initServiceFiltering() {
        const serviceSelect = document.getElementById('service');
        const categorySelect = document.getElementById('category');
        
        if (!serviceSelect || !categorySelect) return;
        
        const serviceCategories = {
            'Travel Services': ['Air Ticket Booking', 'Bus Ticket Booking', 'Train Ticket Booking', 'Hajj and Umrah'],
            'Document Services': ['Passport Services', 'Voter ID Services', 'PAN Card Services', 'Aadhaar Services', 'Driving License'],
            'Certificate Services': ['Birth Certificate', 'Death Certificate', 'Income Certificate', 'Community Certificate', 'Marriage Certificate', 'Nativity Certificate'],
            'Business Services': ['FSSAI Registration', 'Income Tax Filing'],
            'Utility Services': ['EB Bill Payment'],
            'Other Services': ['Printing Services']
        };
        
        serviceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            let selectedCategory = '';
            
            // Find category for selected service
            for (const [category, services] of Object.entries(serviceCategories)) {
                if (services.includes(selectedService)) {
                    selectedCategory = category;
                    break;
                }
            }
            
            // Update category select
            if (selectedCategory) {
                categorySelect.value = selectedCategory;
            }
        });
    }

    // Initialize all functions
    function init() {
        initFormValidation();
        initServiceFiltering();
        console.log('Inquiry page initialized');
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
