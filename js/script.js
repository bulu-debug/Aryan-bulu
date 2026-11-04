// Interaksi utama website

/* =========================================================
   PORTOFOLIO FERDINAND ARYAN BULU
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Mengambil elemen HTML
    const sections = document.querySelectorAll(".slide-section");
    const navLinks = document.querySelectorAll(".portfolio-nav .nav-link");
    const progressBar = document.getElementById("progressBar");
    const navbar = document.querySelector(".portfolio-nav");
    const backTopButton = document.getElementById("backTop");
    const mainNav = document.getElementById("mainNav");
    const yearElement = document.getElementById("year");
    const typedText = document.getElementById("typedText");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =====================================================
       1. TAHUN OTOMATIS
       ===================================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* =====================================================
       2. NAVIGASI MANUAL
       Halaman berpindah hanya ketika menu diklik.
       ===================================================== */

    function closeMobileMenu() {
        if (
            mainNav &&
            mainNav.classList.contains("show") &&
            window.bootstrap &&
            window.bootstrap.Collapse
        ) {
            window.bootstrap.Collapse
                .getOrCreateInstance(mainNav)
                .hide();
        }
    }

    function scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);

        if (!target) return;

        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });

        closeMobileMenu();
    }

    // Navigasi melalui menu dan tombol internal
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const sectionId = href.substring(1);
            const target = document.getElementById(sectionId);

            if (!target) return;

            event.preventDefault();
            scrollToSection(sectionId);
        });
    });

    // Logo mengarahkan kembali ke Home
    document.querySelectorAll(".navbar-brand").forEach(function (brand) {
        brand.addEventListener("click", function (event) {
            event.preventDefault();
            scrollToSection("home");
        });
    });

    /* =====================================================
       3. PROGRESS BAR DAN NAVBAR
       ===================================================== */

    let scrollTicking = false;

    function updatePageState() {
        const scrollTop = window.scrollY ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (progressBar) {
            const progress = documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

            progressBar.style.width =
                `${Math.min(100, Math.max(0, progress))}%`;
        }

        // Efek navbar saat scroll
        if (navbar) {
            navbar.classList.toggle("scrolled", scrollTop > 30);
        }

        // Tombol kembali ke atas
        if (backTopButton) {
            backTopButton.classList.toggle("show", scrollTop > 400);
        }

        // Menandai menu aktif sesuai posisi halaman
        if (sections.length > 0 && navLinks.length > 0) {
            let currentSectionId = sections[0].id;
            const activationPoint = window.innerHeight * 0.38;

            sections.forEach(function (section) {
                if (
                    section.getBoundingClientRect().top <= activationPoint
                ) {
                    currentSectionId = section.id;
                }
            });

            navLinks.forEach(function (link) {
                const isActive =
                    link.getAttribute("href") === `#${currentSectionId}`;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        scrollTicking = false;
    }

    function requestPageStateUpdate() {
        if (!scrollTicking) {
            window.requestAnimationFrame(updatePageState);
            scrollTicking = true;
        }
    }

    window.addEventListener("scroll", requestPageStateUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestPageStateUpdate);

    // Klik tombol kembali ke atas
    if (backTopButton) {
        backTopButton.addEventListener("click", function () {
            scrollToSection("home");
        });
    }

    /* =====================================================
       4. ANIMASI MENGETIK
       ===================================================== */

    if (typedText && !prefersReducedMotion) {
        const words = [
            "Information Technology",
            "Data Processing",
            "Web Development"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;
        let typingTimer = null;

        function typeLoop() {
            const currentWord = words[wordIndex];

            typedText.textContent =
                currentWord.substring(0, characterIndex);

            let delay = 75;

            if (!isDeleting && characterIndex < currentWord.length) {
                characterIndex++;
            } else if (
                !isDeleting &&
                characterIndex === currentWord.length
            ) {
                isDeleting = true;
                delay = 1300;
            } else if (isDeleting && characterIndex > 0) {
                characterIndex--;
                delay = 35;
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            typingTimer = setTimeout(typeLoop, delay);
        }

        document.addEventListener("visibilitychange", function () {
            clearTimeout(typingTimer);

            if (!document.hidden) {
                typingTimer = setTimeout(typeLoop, 250);
            }
        });

        typingTimer = setTimeout(typeLoop, 700);
    }

    /* =====================================================
       5. ANIMASI REVEAL SAAT SCROLL
       ===================================================== */

    if ("IntersectionObserver" in window) {
        const revealElements = document.querySelectorAll(".reveal");

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {
        document.querySelectorAll(".reveal").forEach(function (element) {
            element.classList.add("visible");
        });
    }

    /* =====================================================
       6. ZOOM GAMBAR DOKUMENTASI
       ===================================================== */

    const zoomableImages = document.querySelectorAll(
        ".experience-image img, " +
        ".project-preview img, " +
        ".project-side-image img"
    );

    zoomableImages.forEach(function (img) {
        img.addEventListener("click", function () {
            if (
                img.style.display === "none" ||
                !img.complete ||
                img.naturalWidth === 0
            ) {
                return;
            }

            window.open(
                img.src,
                "_blank",
                "noopener,noreferrer"
            );
        });

        img.style.cursor = "zoom-in";
        img.setAttribute(
            "title",
            "Klik untuk melihat gambar ukuran penuh"
        );
    });

    /* =====================================================
       7. KEAMANAN LINK EKSTERNAL
       ===================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach(
        function (link) {
            link.setAttribute("rel", "noopener noreferrer");
        }
    );

    /* =====================================================
       8. JALANKAN PEMBARUAN PERTAMA
       ===================================================== */

    updatePageState();

});
