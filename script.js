/* =====================================================
   Edmon Sahakyan Portfolio - Interaction Script
   ===================================================== */
(function() {
  const docEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-menu');
  const emailLinks = document.querySelectorAll('.copy-email');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Theme Persistence
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || (!storedTheme && prefersDark.matches)) {
    docEl.classList.add('dark');
  }

  themeToggle?.addEventListener('click', () => {
    docEl.classList.toggle('dark');
    const isDark = docEl.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Accessible Nav Toggle
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });
  navList?.addEventListener('click', e => {
    if (e.target.matches('a')) {
      navList.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll (improved; rely on native + offset management if needed later)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + targetId);
      }
    });
  });

  // Intersection Observer for fade-in sections
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Active nav link highlight
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(sec => sectionObserver.observe(sec));

  // Copy email to clipboard with feedback
  function copyText(text) {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement('textarea');
    textarea.value = text; document.body.appendChild(textarea); textarea.select();
    try { document.execCommand('copy'); } catch(e) {} finally { textarea.remove(); }
    return Promise.resolve();
  }
  emailLinks.forEach(link => {
    link.addEventListener('click', e => {
      const copyVal = link.getAttribute('data-copy');
      if (copyVal) {
        e.preventDefault();
        copyText(copyVal).then(() => {
          const tooltip = link.querySelector('.tooltip');
            if (tooltip) {
              tooltip.textContent = 'Copied!';
              tooltip.style.opacity = '1';
              tooltip.style.transform = 'translateY(-6px)';
              setTimeout(() => {
                tooltip.textContent = 'Copy';
                tooltip.removeAttribute('style');
              }, 1800);
            }
        });
      }
    });
  });

  // Reduce motion preference listener
  prefersDark.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // only auto update if user hasn't chosen manually
      if (e.matches) docEl.classList.add('dark'); else docEl.classList.remove('dark');
    }
  });

})();
