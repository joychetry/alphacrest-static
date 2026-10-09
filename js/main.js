/**
 * Alpha Crest - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar on Scroll
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (el, target, suffix = '') => {
    let current = 0;
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, stepTime);
  };

  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(stat => {
            const rawText = stat.getAttribute('data-target') || stat.textContent.trim();
            if (rawText.includes('+')) {
              const val = parseInt(rawText.replace('+', ''), 10);
              if (!isNaN(val)) countUp(stat, val, '+');
            } else if (rawText.toLowerCase().includes('k')) {
              const val = parseInt(rawText.toLowerCase().replace('k', ''), 10);
              if (!isNaN(val)) countUp(stat, val, 'k');
            }
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const statsWrapper = document.querySelector('.stats-banner-wrapper');
    if (statsWrapper) observer.observe(statsWrapper);
  }
});
