// Animasi saat scroll dan interaksi visual

/* =========================================================
   FERDINAND ARYAN BULU — PORTFOLIO
   ANIMATION JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .section-heading, .glass-card, .stat-card, " +
        ".timeline-card, .experience-card, .skill-card, " +
        ".project-card, .project-side-card, .contact-panel"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       2. TYPING TEXT ANIMATION
    ========================================= */

    const typingElement = document.querySelector(".typed-text");

    if (typingElement) {
        const words = [
            "Information Technology Graduate",
            "Data Processing Enthusiast",
            "Administrative Support",
            "Web Development Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingElement.textContent = currentWord.substring(
                0,
                charIndex
            );

            let speed = deleting ? 45 : 85;

            if (!deleting && charIndex === currentWord.length) {
                speed = 1600;
                deleting = true;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }


    /* =========================================
       3. NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".portfolio-nav");

    function navbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", navbarScroll);
    navbarScroll();


    /* =========================================
       4. PAGE SCROLL PROGRESS BAR
    ========================================= */

    const progressBar = document.querySelector(
        ".progress-track span"
    );

    function updateProgress() {
        if (!progressBar) return;

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();


    /* =========================================
       5. BACK TO TOP BUTTON
    ========================================= */

    const backTop = document.getElementById("backTop");

    if (backTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        });

        backTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =========================================
       6. STATISTIC COUNTER ANIMATION
    ========================================= */

    const counters = document.querySelectorAll("[data-counter]");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.counter);

                if (!Number.isFinite(target)) {
                    observer.unobserve(counter);
                    return;
                }

                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const value = Math.floor(target * progress);

                    counter.textContent = value;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            });
        },
        {
            threshold: 0.5
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    /* =========================================
       7. STAGGERED CARD ANIMATION
    ========================================= */

    const cardGroups = document.querySelectorAll(
        ".about-stat-grid, .skills-grid, .project-grid"
    );

    cardGroups.forEach((group) => {
        const cards = group.querySelectorAll(
            ".stat-card, .skill-card, .project-card"
        );

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
        });
    });


    /* =========================================
       8. IMAGE HOVER EFFECT
    ========================================= */

    const images = document.querySelectorAll(
        ".project-preview img, " +
        ".project-side-image img, " +
        ".experience-image img"
    );

    images.forEach((image) => {
        image.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.04)";
        });

        image.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });


    /* =========================================
       9. SMOOTH SCROLL NAVIGATION
    ========================================= */

    const navLinks = document.querySelectorAll(
        '.portfolio-nav a[href^="#"]'
    );

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Tutup menu Bootstrap pada tampilan mobile
            const navbarCollapse = document.querySelector(
                ".navbar-collapse"
            );

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show") &&
                window.bootstrap
            ) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(
                    navbarCollapse
                );

                collapse.hide();
            }
        });
    });


    /* =========================================
       10. ACTIVE NAVIGATION ON SCROLL
    ========================================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '.portfolio-nav .nav-link[href^="#"]'
    );

    function updateActiveNavigation() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navigationLinks.forEach((link) => {
            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();


    /* =========================================
       11. PAGE LOAD ANIMATION
    ========================================= */

    document.body.classList.add("page-loaded");

});
