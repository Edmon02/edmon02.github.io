(function() {
  const docEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const copyStatus = document.getElementById('copy-status');
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const revealNodes = document.querySelectorAll('.reveal');
  const copyTriggers = document.querySelectorAll('[data-copy]');
  const yearNode = document.getElementById('year');

  function applyTheme(isDark) {
    docEl.classList.toggle('dark', isDark);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  const storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme ? storedTheme === 'dark' : prefersDark.matches);

  themeToggle?.addEventListener('click', () => {
    const nextIsDark = !docEl.classList.contains('dark');
    applyTheme(nextIsDark);
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  });

  prefersDark.addEventListener('change', event => {
    if (!localStorage.getItem('theme')) {
      applyTheme(event.matches);
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href')?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + targetId);
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -30px 0px' });

    revealNodes.forEach(node => revealObserver.observe(node));

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeId = '#' + entry.target.id;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === activeId));
      });
    }, { threshold: 0.5, rootMargin: '-20% 0px -35% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
  } else {
    revealNodes.forEach(node => node.classList.add('visible'));
  }

  function copyText(value) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(value);
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
    } finally {
      textarea.remove();
    }

    return Promise.resolve();
  }

  copyTriggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      const value = trigger.getAttribute('data-copy');
      if (!value) {
        return;
      }

      if (trigger.tagName === 'A') {
        event.preventDefault();
      }

      copyText(value).then(() => {
        const feedbackNode = trigger.querySelector('.copy-feedback');
        const originalText = feedbackNode?.textContent;
        const originalTriggerText = feedbackNode ? '' : trigger.textContent;

        if (feedbackNode) {
          feedbackNode.textContent = 'Copied to clipboard';
        } else {
          trigger.textContent = 'Copied';
        }

        if (copyStatus) {
          copyStatus.textContent = value + ' copied to clipboard';
        }

        window.setTimeout(() => {
          if (feedbackNode && originalText) {
            feedbackNode.textContent = originalText;
          } else if (!feedbackNode && originalTriggerText) {
            trigger.textContent = originalTriggerText;
          }

          if (copyStatus) {
            copyStatus.textContent = '';
          }
        }, 1800);
      });
    });
  });

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
