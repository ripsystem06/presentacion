document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fullscreen-section');
    const jerseyPages = document.querySelectorAll('.jersey-page');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = fullscreenImage.querySelector('img');
    const closeFullscreen = document.getElementById('close-fullscreen');
    let currentIndex = 0;
    let currentJerseyIndex = 0;

    function updateNavigation() {
        prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
        nextButton.style.display = currentIndex < sections.length - 1 ? 'block' : 'none';
    }

    function scrollToSection(index) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        currentIndex = index;
        updateNavigation();
        updateJerseyNavigation();
        animateSection(sections[index]);
    }

    function animateSection(section) {
        const elements = section.querySelectorAll('.fade-in');
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('active');
            }, i * 200);
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToSection(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < sections.length - 1) {
            scrollToSection(currentIndex + 1);
        }
    });

    // Navegación entre jerseys
    function updateJerseyNavigation() {
        const jerseyNavButtons = document.querySelectorAll('.jersey-nav');
        if (sections[currentIndex].id === 'jersey-roja') {
            jerseyNavButtons.forEach(button => button.style.display = 'block');
        } else {
            jerseyNavButtons.forEach(button => button.style.display = 'none');
        }
    }

    prevButton.addEventListener('click', () => {
        if (sections[currentIndex].classList.contains('jersey-page') && currentJerseyIndex > 0) {
            scrollToSection(Array.from(sections).indexOf(jerseyPages[currentJerseyIndex - 1]));
        }
    });

    nextButton.addEventListener('click', () => {
        if (sections[currentIndex].classList.contains('jersey-page') && currentJerseyIndex < jerseyPages.length - 1) {
            scrollToSection(Array.from(sections).indexOf(jerseyPages[currentJerseyIndex + 1]));
        }
    });

    // Detectar cambios de sección al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentIndex = Array.from(sections).indexOf(entry.target);
                updateNavigation();
                updateJerseyNavigation();
                animateSection(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Funcionalidad de imagen a pantalla completa
    document.querySelectorAll('.jersey-image').forEach(img => {
        img.addEventListener('click', () => {
            fullscreenImg.src = img.getAttribute('data-fullscreen');
            fullscreenImage.style.display = 'flex';
        });
    });

    closeFullscreen.addEventListener('click', () => {
        fullscreenImage.style.display = 'none';
    });

    // Cerrar imagen a pantalla completa con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenImage.style.display === 'flex') {
            fullscreenImage.style.display = 'none';
        }
    });

    // Inicializar navegación y animación de la primera sección
    updateNavigation();
    updateJerseyNavigation();
    animateSection(sections[0]);
});

