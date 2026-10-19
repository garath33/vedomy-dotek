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

  // 4. FormSubmit: návrat na tuto stránku a potvrzení odeslání
  initContactForm();

  // 5. Přepínač tří návrhů vzhledu
  initVzhledPicker();
});

const VZHLEDY = [
  { id: 'klid', label: 'Lehátko v klidu' },
  { id: 'svetlo', label: 'Světlý dech' },
  { id: 'soumrak', label: 'Večerní klid' }
];

function currentVzhled() {
  const value = document.documentElement.getAttribute('data-vzhled');
  return VZHLEDY.some(item => item.id === value) ? value : 'klid';
}

function applyVzhled(id) {
  document.documentElement.setAttribute('data-vzhled', id);
  try {
    localStorage.setItem('tvd-vzhled', id);
  } catch (error) {
    /* prohlížeč může ukládání zakázat */
  }
  const url = new URL(window.location.href);
  url.searchParams.set('vzhled', id);
  history.replaceState({}, '', url);
  document.querySelectorAll('[data-vzhled-choice]').forEach(button => {
    button.setAttribute('aria-pressed', button.getAttribute('data-vzhled-choice') === id ? 'true' : 'false');
  });
}

function initVzhledPicker() {
  const active = currentVzhled();
  const bar = document.createElement('div');
  bar.className = 'vzhled-picker';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Návrh vzhledu');

  const label = document.createElement('p');
  label.className = 'vzhled-picker-label';
  label.textContent = 'Návrh vzhledu';

  const options = document.createElement('div');
  options.className = 'vzhled-picker-options';

  VZHLEDY.forEach(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.vzhledChoice = item.id;
    button.textContent = item.label;
    button.setAttribute('aria-pressed', item.id === active ? 'true' : 'false');
    button.addEventListener('click', () => applyVzhled(item.id));
    options.appendChild(button);
  });

  bar.append(label, options);
  const nav = document.querySelector('.site-nav');
  if (nav) nav.insertAdjacentElement('afterend', bar);
  else document.body.prepend(bar);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const nextInput = document.getElementById('form-next');
  const success = document.getElementById('form-success');
  const intro = document.getElementById('form-intro');
  if (!form || !nextInput) return;

  const url = new URL(window.location.href);
  url.hash = '';
  const sent = url.searchParams.get('odeslano') === '1';
  url.searchParams.set('odeslano', '1');
  nextInput.value = url.toString();

  if (sent && success) {
    success.hidden = false;
    form.hidden = true;
    if (intro) intro.hidden = true;
  }
}

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

