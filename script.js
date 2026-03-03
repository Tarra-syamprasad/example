// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Open mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    // Close mobile menu
    const closeMenu = () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    closeMenuBtn.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Sticky Header and Active Link on Scroll
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) { // Offset for fixed header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                //  Add styling for active state in CSS:  .nav-links a.active { color: var(--royal-blue);  } .nav-links a.active::after { width: 100%; }
            }
        });
    });

    // Smooth Scrolling for anchor links (if browser doesn't support 'scroll-behavior: smooth')
    // Most modern browsers support it, but this provides a fallback and handles offset perfectly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                // Add header height offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple Form Validation (Client Side) for Enquiry Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop default submission

            const phoneInput = document.getElementById('phone');
            const phoneVal = phoneInput.value.replace(/\D/g, ''); // Remove non-digits

            if (phoneVal.length !== 10) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }

            const parentName = document.getElementById('parentName').value;
            const childAge = document.getElementById('childAge').value;
            const classInterest = document.getElementById('classInterest').value;

            // Construct WhatsApp Message
            const schoolWhatsAppNumber = "919347887532"; // Format: +91 followed by number
            const message = `Hello Royal Kids School,\n\nI would like to enquire for admission. Here are my details:\n\n*Parent Name:* ${parentName}\n*Child's Age:* ${childAge}\n*Class Interested In:* ${classInterest}\n*Contact Number:* ${phoneVal}\n\nPlease let me know the further process.`;

            const whatsappUrl = `https://wa.me/${schoolWhatsAppNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp link in a new tab
            window.open(whatsappUrl, '_blank');

            // Reset form
            contactForm.reset();
        });
    }
});
