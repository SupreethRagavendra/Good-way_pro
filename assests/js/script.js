
        // Sticky Navigation Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar-custom');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Functionality
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const body = document.body;

        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                // Opening menu
                setTimeout(() => {
                    navbarCollapse.classList.add('show');
                    mobileOverlay.classList.add('show');
                    body.style.overflow = 'hidden';
                }, 10);
            } else {
                // Closing menu
                navbarCollapse.classList.remove('show');
                mobileOverlay.classList.remove('show');
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', function() {
            navbarCollapse.classList.remove('show');
            mobileOverlay.classList.remove('show');
            body.style.overflow = '';
            navbarToggler.setAttribute('aria-expanded', 'false');
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                    mobileOverlay.classList.remove('show');
                    body.style.overflow = '';
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });
   