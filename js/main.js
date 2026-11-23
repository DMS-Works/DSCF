/* ============================================================
   DEE THE SAMARITAN CHARITY FOUNDATION
   Main JavaScript — DMS Works  ·  v2
   ============================================================ */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  // ── STICKY HEADER SHADOW ──────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── MOBILE NAV TOGGLE ─────────────────────────────────────
  const burger = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');

  function setMenu(open) {
    if (!burger || !mobileNav) return;
    mobileNav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity = open ? '0' : '';
    spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', () => setMenu(!mobileNav.classList.contains('open')));
    // Close the menu if the screen grows past the mobile breakpoint
    window.addEventListener('resize', () => { if (window.innerWidth > 1100) setMenu(false); });
  }

  // ── ACTIVE NAV LINK ───────────────────────────────────────
  // Works with or without ".html" (Netlify serves /about and /about.html)
  const clean = (p) => (p.split('/').pop() || 'index').replace(/\.html$/, '').replace(/[?#].*$/, '') || 'index';
  const currentPage = clean(window.location.pathname);
  document.querySelectorAll('.nav__links a, .nav__mobile a:not(.btn)').forEach(link => {
    if (clean(link.getAttribute('href')) === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ── SMOOTH SCROLL FOR IN-PAGE LINKS ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
        setMenu(false);
      }
    });
  });

  // ── FAQ ACCORDION ─────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq__question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── GALLERY LIGHTBOX ──────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbClose = lightbox.querySelector('.lightbox__close');
    let lastTrigger = null;

    document.querySelectorAll('.gallery__item button').forEach(btn => {
      btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        if (!img) return;
        lastTrigger = btn;
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (lbClose) lbClose.focus();
      });
    });

    function closeLightbox() {
      if (!lightbox.classList.contains('open')) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ── CONTACT FORM (Netlify) ────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      // Netlify handles the submission; this just shows feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }
    });
  }

  // ── SCROLL REVEAL (simple fade-in) ────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // ── FOOTER YEAR ───────────────────────────────────────────
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

});
