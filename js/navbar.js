// Navigasi dan menu responsif

/* =====================================================
   NAVBAR JAVASCRIPT
   PORTOFOLIO FERDINAND ARYAN BULU
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Mengambil elemen navbar
    const navbar = document.querySelector(".portfolio-nav");
    const navLinks = document.querySelectorAll(
        ".portfolio-nav .nav-link"
    );
    const mainNav = document.getElementById("mainNav");

    const sections = document.querySelectorAll(
        ".slide-section"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ================================================
       1. EFEK NAVBAR SAAT SCROLL
       ================================================ */

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll, {
        passive: true
    });

    handleNavbarScroll();

    /* ================================================
       2. NAVIGASI MENU
       ================================================ */

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

    function navigateToSection(sectionId) {
        const target = document.getElementById(sectionId);

        if (!target) return;

        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });

        closeMobileMenu();
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const sectionId = href.substring(1);

            if (!document.getElementById(sectionId)) return;

            event.preventDefault();

            navigateToSection(sectionId);
        });
    });

    /* ================================================
       3. MENU AKTIF SESUAI BAGIAN YANG TERLIHAT
       ================================================ */

    function updateActiveMenu() {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= window.innerHeight * 0.38) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href");

            const isActive = href === `#${currentSection}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    let ticking = false;

    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateActiveMenu();
                ticking = false;
            });

            ticking = true;
        }
    }, {
        passive: true
    });

    updateActiveMenu();

    /* ================================================
       4. LOGO KEMBALI KE HOME
       ================================================ */

    const brand = document.querySelector(".navbar-brand");

    if (brand) {
        brand.addEventListener("click", function (event) {
            const home = document.getElementById("home");

            if (!home) return;

            event.preventDefault();
            navigateToSection("home");
        });
    }

    /* ================================================
       5. MENUTUP MENU MOBILE SETELAH KLIK
       ================================================ */

    document.addEventListener("click", function (event) {
        if (!mainNav || !mainNav.classList.contains("show")) {
            return;
        }

        const clickedInsideNavbar = event.target.closest(
            ".navbar"
        );

        if (!clickedInsideNavbar) {
            closeMobileMenu();
        }
    });

});
