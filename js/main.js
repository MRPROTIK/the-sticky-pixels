// ================================
// HAMBURGER MENU
// ================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('mobile-menu-close');

function closeMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}

// ================================
// MOBILE ACCORDION
// ================================
document.querySelectorAll('.mobile-nav-group-btn')
  .forEach(btn => {
    btn.addEventListener('click', function() {
      const sub = this.nextElementSibling;
      const isOpen = this.classList
        .contains('active');

      // Close all open groups first
      document.querySelectorAll(
        '.mobile-nav-group-btn.active'
      ).forEach(openBtn => {
        openBtn.classList.remove('active');
        openBtn.setAttribute(
          'aria-expanded', 'false');
        const openSub = openBtn.nextElementSibling;
        if (openSub) {
          openSub.classList.remove('open');
          openSub.setAttribute(
            'aria-hidden', 'true');
        }
      });

      // If it was closed open it
      if (!isOpen) {
        this.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        if (sub) {
          sub.classList.add('open');
          sub.setAttribute('aria-hidden', 'false');
        }
      }
    });
  });

// ================================
// SCROLL FADE IN
// ================================
const fadeEls = document.querySelectorAll(
  '.fade-in-up');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// ================================
// HEADER SCROLL EFFECT
// ================================
const header = document.getElementById(
  'main-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ================================
// ACCORDION (FAQ)
// ================================
document.querySelectorAll('.accordion-header')
  .forEach(h => {
    h.addEventListener('click', () => {
      h.parentElement.classList.toggle('open');
    });
  });

// ================================
// GALLERY FILTER TABS
// ================================
document.querySelectorAll('.gallery-tab')
  .forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gallery-tab')
        .forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.gallery-item')
        .forEach(item => {
          item.style.display = 
            (filter === 'all' || 
            item.dataset.category === filter) 
            ? 'block' : 'none';
        });
    });
  });

// ================================
// PRODUCT FILTER TABS
// ================================
document.querySelectorAll(
  '.filter-tab:not(.gallery-tab)')
  .forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll(
        '.filter-tab:not(.gallery-tab)')
        .forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll(
        '.product-card[data-category]')
        .forEach(card => {
          card.style.display = 
            (filter === 'all' || 
            card.dataset.category === filter) 
            ? 'block' : 'none';
        });
    });
  });
