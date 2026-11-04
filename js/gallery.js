// Galeri foto dan pembesaran gambar

/* =====================================================
   GALLERY JAVASCRIPT
   PORTOFOLIO FERDINAND ARYAN BULU
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const galleryItems = document.querySelectorAll(".gallery-item");
    const filterButtons = document.querySelectorAll(".gallery-filter");
    const galleryImages = document.querySelectorAll(".gallery-item img");

    let currentImageIndex = 0;
    let visibleImages = [];

    /* =================================================
       1. FILTER GALERI
       ================================================= */

    function filterGallery(category) {
        galleryItems.forEach(function (item) {
            const itemCategory = item.dataset.category;

            const shouldShow =
                category === "all" ||
                itemCategory === category;

            item.classList.toggle("hidden", !shouldShow);
            item.style.display = shouldShow ? "" : "none";
        });

        updateVisibleImages();
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category = button.dataset.filter || "all";

            filterGallery(category);
        });
    });

    /* =================================================
       2. DAFTAR FOTO YANG TERLIHAT
       ================================================= */

    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(function (item) {
            return item.style.display !== "none";
        });
    }

    updateVisibleImages();

    /* =================================================
       3. MEMBUAT LIGHTBOX
       ================================================= */

    const lightbox = document.createElement("div");

    lightbox.className = "gallery-lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Tutup">&times;</button>

        <button class="lightbox-prev" aria-label="Foto sebelumnya">
            &#10094;
        </button>

        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="Foto galeri">
            <div class="lightbox-caption"></div>
            <div class="lightbox-counter"></div>
        </div>

        <button class="lightbox-next" aria-label="Foto berikutnya">
            &#10095;
        </button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const lightboxCounter = lightbox.querySelector(".lightbox-counter");

    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    /* =================================================
       4. MEMBUKA FOTO
       ================================================= */

    function openLightbox(index) {
        updateVisibleImages();

        if (!visibleImages.length) return;

        currentImageIndex = index;

        showLightboxImage();

        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
    }

    /* =================================================
       5. MENAMPILKAN FOTO
       ================================================= */

    function showLightboxImage() {
        const item = visibleImages[currentImageIndex];

        if (!item) return;

        const image = item.querySelector("img");

        if (!image) return;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Foto dokumentasi";

        const caption =
            item.dataset.caption ||
            image.alt ||
            "Dokumentasi kegiatan";

        lightboxCaption.textContent = caption;

        lightboxCounter.textContent =
            `${currentImageIndex + 1} / ${visibleImages.length}`;
    }

    /* =================================================
       6. FOTO BERIKUTNYA
       ================================================= */

    function nextImage() {
        if (!visibleImages.length) return;

        currentImageIndex =
            (currentImageIndex + 1) % visibleImages.length;

        showLightboxImage();
    }

    /* =================================================
       7. FOTO SEBELUMNYA
       ================================================= */

    function previousImage() {
        if (!visibleImages.length) return;

        currentImageIndex =
            (currentImageIndex - 1 + visibleImages.length) %
            visibleImages.length;

        showLightboxImage();
    }

    /* =================================================
       8. MENUTUP LIGHTBOX
       ================================================= */

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";
    }

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", previousImage);

    // Klik area luar gambar untuk menutup
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    /* =================================================
       9. KLIK FOTO GALERI
       ================================================= */

    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            updateVisibleImages();

            const index = visibleImages.indexOf(item);

            if (index !== -1) {
                openLightbox(index);
            }
        });
    });

    /* =================================================
       10. NAVIGASI KEYBOARD
       ================================================= */

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }
    });

    /* =================================================
       11. ANIMASI GALERI
       ================================================= */

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("gallery-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        galleryItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        galleryItems.forEach(function (item) {
            item.classList.add("gallery-visible");
        });
    }

});
