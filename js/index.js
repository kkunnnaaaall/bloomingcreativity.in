// const hamburger = document.getElementById("hamburger");
// const navLinks = document.getElementById("nav-links");

// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("active");
// });

// window.addEventListener('load', () => {
//   const skeleton = document.getElementById('skeleton-loader');
//   const content = document.getElementById('main-content');
//   if (skeleton && content) {
//     skeleton.style.display = 'none';
//     content.style.display = 'block';
//   }
// });

/**
 * Main Logic for Blooming Creativity
 * Handles Loading, Navigation, Scroll Animations, and Performance
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Skeleton Loader Logic ---
    const skeleton = document.getElementById('skeleton-loader');
    const mainContent = document.getElementById('main-content');

    // Simulate loading time (or wait for assets)
    setTimeout(() => {
        skeleton.classList.add('hidden');
        mainContent.style.display = 'block';
        
        // Trigger generic entry animation for content
        mainContent.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        // Start Observers after content load
        initObservers();
    }, 1500);


    // --- 2. Mobile Navigation Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('#nav-links li a');

    // Toggle Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate Hamburger Icon
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });


    // --- 3. Scroll Header Logic (Glassmorphism trigger) ---
    const header = document.querySelector('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Performance: Passive listener for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });


    // --- 4. Intersection Observer for Scroll Animations ---
    function initObservers() {
        const observerOptions = {
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, observerOptions);

        // Target specific elements to animate
        // We add the class '.reveal-anim' dynamically to existing elements to avoid modifying HTML manually
        const targets = document.querySelectorAll('.hero .container1, .section .content, .gallery-item, #about .container');
        
        targets.forEach(target => {
            target.classList.add('reveal-anim');
            appearOnScroll.observe(target);
        });
    }

    // --- 5. Resize Debouncer (Performance) ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});