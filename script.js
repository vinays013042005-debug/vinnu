// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. Mobile Navigation (Burger Menu)
     */
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        
        if (burger && nav) {
            burger.addEventListener('click', () => {
                // Toggle Nav
                nav.classList.toggle('nav-active');
                
                // Burger Animation
                burger.classList.toggle('toggle');
            });
        }
    };
    
    /**
     * 2. Active Navigation Link Highlighter
     */
    const highlightActiveLink = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        // Get the last part of the URL (e.g., "resume.html")
        const currentPage = window.location.pathname.split('/').pop();

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();

            // Handle home page case (which could be "" or "index.html")
            if (currentPage === '' && (linkPage === '' || linkPage === 'index.html')) {
                link.classList.add('active');
            } else if (linkPage === currentPage && currentPage !== '') {
                link.classList.add('active');
            }
        });
    };

    /**
     * 3. "Buttery Smooth" Scroll-Reveal Animation
     * Uses IntersectionObserver for high performance.
     */
    const revealOnScroll = () => {
        const hiddenElements = document.querySelectorAll('.hidden');

        const observerOptions = {
            root: null, // observes intersections relative to the viewport
            threshold: 0.15, // 15% of the element must be visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add 'show' class to trigger the CSS animation
                    entry.target.classList.add('show');
                    // Stop observing the element once it's shown
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe each hidden element
        hiddenElements.forEach(el => observer.observe(el));
    };

    /**
     * 4. Contact Form Validation
     */
    const validateContactForm = () => {
        const form = document.getElementById('contact-form');
        if (!form) return; // Only run if the form is on this page

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const formMessage = document.getElementById('form-message');

        // Regex for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the form from submitting traditionally
            let errors = [];

            // Reset styles
            formMessage.textContent = '';
            formMessage.className = '';
            [name, email, subject, message].forEach(el => el.classList.remove('error'));

            // --- Validation Checks ---
            if (name.value.trim() === '') {
                errors.push('Name is required');
                name.classList.add('error');
            }
            if (!emailRegex.test(email.value.trim())) {
                errors.push('Please enter a valid email address');
                email.classList.add('error');
            }
            if (subject.value.trim() === '') {
                errors.push('Subject is required');
                subject.classList.add('error');
            }
            if (message.value.trim() === '') {
                errors.push('Message is required');
                message.classList.add('error');
            }
            // --- End Validation ---

            if (errors.length > 0) {
                // Show first error
                formMessage.textContent = errors[0];
                formMessage.classList.add('error');
            } else {
                // Success!
                formMessage.textContent = 'Thank you! Your message has been sent.';
                formMessage.classList.add('success');
                
                // Here, you would typically send the data to a backend server
                // For this demo, we'll just clear the form.
                form.reset();
            }
        });
    };

    // --- Initialize all functions ---
    navSlide();
    highlightActiveLink();
    revealOnScroll();
    validateContactForm();

});
