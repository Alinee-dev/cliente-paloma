// Menu Mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Scroll suave y cierre de menú móvil
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();

        // Cerrar menú móvil si está abierto
        navMenu.classList.remove('active');

        document.querySelector(anchor.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();
