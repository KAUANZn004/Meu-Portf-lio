// script.js
// ============================================
// ELEMENTOS DO DOM
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar__overlay');
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
const reveals = document.querySelectorAll('.reveal');
const sidebarYear = document.querySelector('#sidebarYear');

if (sidebarYear) {
  sidebarYear.textContent = new Date().getFullYear();
}

// ============================================
// TOGGLE SIDEBAR
// ============================================
function toggleSidebar() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  const newState = !isExpanded;
  
  menuToggle.setAttribute('aria-expanded', String(newState));
  menuToggle.setAttribute('aria-label', newState ? 'Fechar menu' : 'Abrir menu');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  overlay.setAttribute('aria-hidden', String(!newState));
  document.body.classList.toggle('menu-open', newState);
}

menuToggle.addEventListener('click', toggleSidebar);

// Fechar sidebar ao clicar no overlay
overlay.addEventListener('click', closeSidebar);

// Fechar sidebar ao clicar em um link de navegação
navLinks.forEach(link => {
  link.addEventListener('click', closeSidebar);
});

// Fechar sidebar quando pressionar ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebar();
  }
});

// Função para fechar o sidebar
function closeSidebar() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

// ============================================
// SCROLL SPY (ATUALIZAR NAV ATIVO)
// ============================================
window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// INTERSECTION OBSERVER (REVEAL ANIMATIONS)
// ============================================
const observerOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.12}s`;
  revealObserver.observe(item);
});

// ============================================
// SMOOTH SCROLL PARA ÂNCORAS
// ============================================
document.querySelectorAll('.nav-item').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 2 },
    move: { speed: 1 },
    line_linked: {
      enable: true,
      opacity: 0.2
    }
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

reveals.forEach(el => observer.observe(el));


