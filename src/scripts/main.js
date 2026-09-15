// Interaktivní logika webu Terapie vědomého dotyku

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobilní menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Zavřít menu při kliknutí na odkaz
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
      });
    });
  }

  // 2. Slideshow referencí
  initTestimonialSlideshow();

  // 3. Filtrování referencí na podstránce reference.html
  initReferenceFilters();
});

function initTestimonialSlideshow() {
  const root = document.querySelector('.slideshow-wrapper');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('.slide-item'));
  const dotsContainer = root.querySelector('.slide-dots');
  const prevBtn = root.querySelector('.slide-btn.prev');
  const nextBtn = root.querySelector('.slide-btn.next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 8000;

  // Vygenerovat navigační tečky
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Zobrazit referenci ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slide-dot') : [];
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function restartAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  root.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  root.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

function initReferenceFilters() {
  const filterTabs = document.querySelector('.filter-tabs');
  if (!filterTabs) return;

  const buttons = filterTabs.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.reference-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

