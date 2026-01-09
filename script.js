document.addEventListener('DOMContentLoaded', function () {
    
    // === EMAILJS INITIALIZATION ===
    // Make sure you have the EmailJS library loaded in your HTML head before this script runs
    (function() { emailjs.init("KHvTYzwjN1E5G_cuB"); })();

    // === CACHED DOM ELEMENTS ===
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.getElementById('back-to-top');
    const typedTextElement = document.getElementById('typed-text');

    // === CONTACT FORM LOGIC ===
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            emailjs.sendForm('service_74juac1', 'template_icjifjr', this)
                .then(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    contactForm.reset();
                    showAlert('Message sent successfully!');
                }, (err) => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    console.error("EmailJS Error:", err);
                    showAlert('Failed to send message. Check console for details.');
                });
        });
    }

    // === CUSTOM ALERT MODAL LOGIC ===
    function showAlert(message) {
        if (alertModal && alertMessage) {
            alertMessage.textContent = message;
            alertModal.classList.remove('hidden');
            setTimeout(() => alertModal.classList.remove('opacity-0'), 10);
        } else {
            alert(message); // Fallback if modal elements are missing
        }
    }

    if (alertClose && alertModal) {
        alertClose.addEventListener('click', () => {
            alertModal.classList.add('opacity-0');
            setTimeout(() => alertModal.classList.add('hidden'), 300);
        });
    }

    // === MOBILE MENU TOGGLE ===
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => { 
            mobileMenu.classList.toggle('hidden'); 
        });

        navLinks.forEach(link => { 
            link.addEventListener('click', () => { 
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden'); 
                }
            }); 
        });
    }
    
    // === TYPED.JS ANIMATION ===
    if (typedTextElement) {
        new Typed(typedTextElement, {
            strings: ['Web Developer', 'Java Developer', 'Creative Designer'],
            typeSpeed: 70, 
            backSpeed: 50, 
            backDelay: 1000, 
            loop: true
        });
    }

    // === GSAP SCROLL ANIMATIONS ===
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        function animateGrid(selector) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                gsap.from(elements, {
                    scrollTrigger: { 
                        trigger: elements[0], 
                        start: "top 85%", 
                        toggleActions: "play none none none", 
                        once: true 
                    },
                    opacity: 0, 
                    y: 40, 
                    duration: 0.5, 
                    ease: "power2.out", 
                    stagger: 0.1
                });
            }
        }

        animateGrid("#skills-grid .skill-item");
        animateGrid("#tools-grid .skill-item");
        animateGrid("#projects-grid a");
        animateGrid("#services .service-card");
    }

    // === BACK TO TOP BUTTON (with throttling) ===
    if (backToTopButton) {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 300) { 
                    backToTopButton.classList.remove('opacity-0'); 
                } else { 
                    backToTopButton.classList.add('opacity-0'); 
                }
                scrollTimeout = null;
            }, 100);
        }, { passive: true });
        
        backToTopButton.addEventListener('click', () => { 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }
});