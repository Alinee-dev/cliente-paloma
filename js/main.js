// ===============================
// MENU MOBILE
// ===============================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ===============================
// SCROLL SUAVE + CIERRE MENU
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            navMenu?.classList.remove('active');
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===============================
// ANIMACIONES AL SCROLL
// ===============================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// ===============================
// AÑO DINÁMICO
// ===============================
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ===============================
// GALLERY CAROUSEL
// ===============================
const galleryGrid = document.getElementById('galleryGrid');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');

if (galleryGrid && galleryPrev && galleryNext) {
    const items = galleryGrid.querySelectorAll('.gallery-item');
    let currentSlide = 0;

    function getItemWidth() {
        if (!items.length) return 0;
        const style = window.getComputedStyle(galleryGrid);
        const gap = parseFloat(style.columnGap || style.gap || 0);
        return items[0].offsetWidth + gap;
    }

    function scrollToSlide(index) {
        galleryGrid.scrollTo({
            left: index * getItemWidth(),
            behavior: 'smooth'
        });
    }

    galleryNext.addEventListener('click', () => {
        currentSlide = Math.min(currentSlide + 1, items.length - 1);
        scrollToSlide(currentSlide);
    });

    galleryPrev.addEventListener('click', () => {
        currentSlide = Math.max(currentSlide - 1, 0);
        scrollToSlide(currentSlide);
    });

    // Sincroniza al hacer swipe en mobile
    galleryGrid.addEventListener('scroll', () => {
        const width = getItemWidth();
        if (width > 0) {
            currentSlide = Math.round(galleryGrid.scrollLeft / width);
        }
    });
}

// ===============================
// GALERIA / LIGHTBOX
// ===============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const btnClose = document.querySelector('.lightbox-close');
const btnPrev = document.querySelector('.lightbox-prev');
const btnNext = document.querySelector('.lightbox-next');

let currentIndex = -1;

function openLightbox(index) {
    const items = document.querySelectorAll('.gallery-item');
    if (index < 0 || index >= items.length) return;

    const item = items[index];
    const full = item.dataset.full || item.querySelector('img')?.src;
    const caption = item.dataset.caption || '';

    currentIndex = index;

    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');

    lightboxImg.src = '';
    lightboxImg.alt = caption;

    const img = new Image();
    img.onload = () => lightboxImg.src = img.src;
    img.src = full;

    btnClose?.focus();
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImg.src = '';
    currentIndex = -1;
}

function showPrev() {
    if (currentIndex > 0) openLightbox(currentIndex - 1);
}

function showNext() {
    const items = document.querySelectorAll('.gallery-item');
    if (currentIndex < items.length - 1) openLightbox(currentIndex + 1);
}

// Event Delegation
document.querySelector('.gallery-container')?.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (item) {
        const items = Array.from(document.querySelectorAll('.gallery-item'));
        openLightbox(items.indexOf(item));
    }
});

// Controles
btnClose?.addEventListener('click', closeLightbox);
btnPrev?.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
btnNext?.addEventListener('click', e => { e.stopPropagation(); showNext(); });

lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

