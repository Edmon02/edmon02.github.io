/* Link hub interactions and local admin overrides */
(function () {
  'use strict';

  const docEl = document.documentElement;
  const STORAGE_KEY = 'portfolio_config';
  const ADMIN_SHORTCUT_KEY = 'portfolio_admin_shortcut';
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const DEFAULT_CONFIG = {
    name: 'Edmon Sahakyan',
    bio: 'Full-Stack & Machine Learning Engineer · Physics Enthusiast',
    location: 'Yerevan, Armenia',
    about1: 'Full-Stack & Machine Learning Engineer with 2+ years of hands-on experience in AI/NLP and modern web development. Skilled in building and deploying ML models, fine-tuning LLMs, and developing full-stack applications using Svelte, Hono, and AWS.',
    about2: 'Passionate about creating high-performance systems and bridging the gap between AI innovation and real-world usability.',
    socials: [
      { label: 'GitHub', url: 'https://github.com/Edmon02', icon: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/edmon-sahakyan-64798619a/', icon: 'linkedin' },
      { label: 'Telegram', url: 'https://t.me/Edmon02', icon: 'telegram' },
      { label: 'Email', url: 'mailto:edmon.sahakyan@gmail.com', icon: 'email' },
      { label: 'Phone', url: 'tel:+37493791003', icon: 'phone' }
    ],
    links: [
      { label: 'About Me', href: '#about', type: 'section', enabled: true },
      { label: 'Skills & Tech Stack', href: '#skills', type: 'section', enabled: true },
      { label: 'Work Experience', href: '#experience', type: 'section', enabled: true },
      { label: 'Projects', href: '#projects', type: 'section', enabled: true },
      { label: 'Education & Certs', href: '#education', type: 'section', enabled: true },
      { label: 'GitHub Profile', href: 'https://github.com/Edmon02', type: 'external', enabled: true },
      { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/edmon-sahakyan-64798619a/', type: 'external', enabled: true },
      { label: 'Get In Touch', href: '#contact', type: 'accent', enabled: true }
    ]
  };

  const ICON_PATHS = {
    'sun-medium': [
      '<circle cx="12" cy="12" r="4"></circle>',
      '<path d="M12 3v2"></path>',
      '<path d="M12 19v2"></path>',
      '<path d="M3 12h2"></path>',
      '<path d="M19 12h2"></path>',
      '<path d="m18.364 5.636-1.414 1.414"></path>',
      '<path d="m7.05 16.95-1.414 1.414"></path>',
      '<path d="m5.636 5.636 1.414 1.414"></path>',
      '<path d="m16.95 16.95 1.414 1.414"></path>'
    ],
    'moon-star': [
      '<path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9Z"></path>',
      '<path d="M19 3v4"></path>',
      '<path d="M17 5h4"></path>'
    ],
    'user-round': [
      '<circle cx="12" cy="8" r="4"></circle>',
      '<path d="M6 20a6 6 0 0 1 12 0"></path>'
    ],
    sparkles: [
      '<path d="M12 3l1.9 4.6 4.6 1.9-4.6 1.9L12 16l-1.9-4.6-4.6-1.9 4.6-1.9L12 3Z"></path>',
      '<path d="M19 13l.8 2.2L23 16l-3.2.8L19 20l-.8-3.2L15 16l3.2-.8L19 13Z"></path>'
    ],
    'briefcase-business': [
      '<rect x="3" y="6" width="18" height="14" rx="2"></rect>',
      '<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
      '<path d="M3 11h18"></path>'
    ],
    'folder-git-2': [
      '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path>',
      '<path d="M8 12l-2 2 2 2"></path>',
      '<path d="M16 12l2 2-2 2"></path>'
    ],
    'graduation-cap': [
      '<path d="m3 10 9-4 9 4-9 4-9-4Z"></path>',
      '<path d="M7 12v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5"></path>',
      '<path d="M21 10v6"></path>'
    ],
    mail: [
      '<rect x="3" y="5" width="18" height="14" rx="2"></rect>',
      '<path d="m4 7 8 6 8-6"></path>'
    ],
    phone: [
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path>'
    ],
    send: [
      '<path d="M22 2 11 13"></path>',
      '<path d="m22 2-7 20-4-9-9-4 20-7Z"></path>'
    ],
    'code-2': [
      '<path d="m16 18 6-6-6-6"></path>',
      '<path d="m8 6-6 6 6 6"></path>'
    ],
    'messages-square': [
      '<path d="M7 10h.01"></path>',
      '<path d="M12 10h.01"></path>',
      '<path d="M17 10h.01"></path>',
      '<path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-5 5V5Z"></path>'
    ],
    globe: [
      '<circle cx="12" cy="12" r="9"></circle>',
      '<path d="M3 12h18"></path>',
      '<path d="M12 3a15 15 0 0 1 0 18"></path>',
      '<path d="M12 3a15 15 0 0 0 0 18"></path>'
    ],
    'play-square': [
      '<rect x="3" y="4" width="18" height="16" rx="2"></rect>',
      '<path d="m10 9 5 3-5 3V9Z"></path>'
    ],
    camera: [
      '<path d="M4 7h4l2-2h4l2 2h4"></path>',
      '<rect x="3" y="7" width="18" height="13" rx="2"></rect>',
      '<circle cx="12" cy="13.5" r="3.5"></circle>'
    ],
    'music-4': [
      '<path d="M9 18V5l12-2v13"></path>',
      '<circle cx="6" cy="18" r="3"></circle>',
      '<circle cx="18" cy="16" r="3"></circle>'
    ],
    'link-2': [
      '<path d="M9 17H7a5 5 0 1 1 0-10h2"></path>',
      '<path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>',
      '<path d="M8 12h8"></path>'
    ],
    'chevron-right': ['<path d="m9 18 6-6-6-6"></path>'],
    'external-link': [
      '<path d="M15 3h6v6"></path>',
      '<path d="M10 14 21 3"></path>',
      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>'
    ],
    'settings-2': [
      '<path d="M20 7h-9"></path>',
      '<path d="M14 17H5"></path>',
      '<circle cx="17" cy="17" r="3"></circle>',
      '<circle cx="7" cy="7" r="3"></circle>'
    ]
  };

  initializeTheme();
  applyPortfolioConfig();
  renderAdminShortcut();
  attachLinkHandlers();
  attachCloseHandlers();
  attachContactForm();
  attachCopyEmailHandlers();

  if (typeof prefersDark.addEventListener === 'function') {
    prefersDark.addEventListener('change', event => {
      if (localStorage.getItem('theme')) return;
      setTheme(event.matches);
    });
  }

  function initializeTheme() {
    if (themeToggle) {
      themeToggle.innerHTML = [
        renderIcon('sun-medium', { size: 18, className: 'icon-sun' }),
        renderIcon('moon-star', { size: 18, className: 'icon-moon' })
      ].join('');
      themeToggle.setAttribute('aria-label', 'Toggle color theme');
    }

    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark.matches);
    setTheme(isDark);

    themeToggle?.addEventListener('click', () => {
      const nextDark = !docEl.classList.contains('dark');
      setTheme(nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    });
  }

  function setTheme(isDark) {
    docEl.classList.toggle('dark', isDark);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('title', isDark ? 'Dark theme active' : 'Light theme active');
    }
  }

  function applyPortfolioConfig() {
    const config = getPortfolioConfig();
    updateTextContent(document.querySelector('.profile-name'), config.name);
    updateProfileBio(config.bio);
    updateLocation(config.location);
    updateAboutCopy(config.about1, config.about2);
    renderSocialRow(config.socials);
    renderLinkButtons(config.links);
  }

  function getPortfolioConfig() {
    const stored = readStoredConfig();
    return {
      ...DEFAULT_CONFIG,
      ...stored,
      socials: Array.isArray(stored.socials) && stored.socials.length ? stored.socials : DEFAULT_CONFIG.socials,
      links: Array.isArray(stored.links) && stored.links.length ? stored.links : DEFAULT_CONFIG.links
    };
  }

  function readStoredConfig() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function updateTextContent(node, value) {
    if (!node || !value) return;
    node.textContent = value;
  }

  function updateProfileBio(value) {
    const bioEl = document.querySelector('.profile-bio');
    if (!bioEl || !value) return;

    let textNode = null;
    for (const node of bioEl.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNode = node;
        break;
      }
    }

    if (textNode) {
      textNode.textContent = value;
      return;
    }

    bioEl.insertBefore(document.createTextNode(value), bioEl.firstChild);
  }

  function updateLocation(value) {
    const locationEl = document.querySelector('.profile-location');
    if (!locationEl || !value) return;

    const textNodes = Array.from(locationEl.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
    const textNode = textNodes[textNodes.length - 1];
    if (textNode) {
      textNode.textContent = ' ' + value;
      return;
    }

    locationEl.appendChild(document.createTextNode(' ' + value));
  }

  function updateAboutCopy(paragraphOne, paragraphTwo) {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const paragraphs = aboutSection.querySelectorAll('.detail-inner > p');
    if (paragraphs[0] && paragraphOne) paragraphs[0].textContent = paragraphOne;
    if (paragraphs[1] && paragraphTwo) paragraphs[1].textContent = paragraphTwo;
  }

  function renderSocialRow(socials) {
    const socialRow = document.getElementById('social-row');
    if (!socialRow || !Array.isArray(socials)) return;

    socialRow.innerHTML = socials
      .filter(item => item && item.url)
      .map(item => {
        const isExternal = /^https?:/i.test(item.url);
        const iconName = getSocialIconName(item.icon || item.label);
        return [
          `<a href="${escapeAttr(item.url)}" class="social-icon" aria-label="${escapeAttr(item.label || item.icon || 'Link')}"`,
          isExternal ? ' target="_blank" rel="noopener"' : '',
          '>',
          renderIcon(iconName, { size: 18 }),
          '</a>'
        ].join('');
      })
      .join('');
  }

  function renderLinkButtons(links) {
    const linksSection = document.getElementById('links-section');
    if (!linksSection || !Array.isArray(links)) return;

    linksSection.innerHTML = links
      .filter(link => link && link.enabled !== false && link.label && link.href)
      .map(link => renderLinkButton(link))
      .join('');
  }

  function renderLinkButton(link) {
    const isExternal = link.type === 'external';
    const isAccent = link.type === 'accent';
    const sectionId = !isExternal && String(link.href).startsWith('#') ? String(link.href).slice(1) : '';
    const className = ['link-btn', isExternal ? 'link-btn--external' : '', isAccent ? 'link-btn--accent' : '']
      .filter(Boolean)
      .join(' ');
    const arrowIcon = isExternal ? 'external-link' : 'chevron-right';
    const buttonAttrs = [
      `href="${escapeAttr(link.href)}"`,
      `class="${className}"`,
      isExternal ? 'target="_blank" rel="noopener"' : '',
      sectionId ? `data-section="${escapeAttr(sectionId)}"` : ''
    ].filter(Boolean).join(' ');

    return [
      `<a ${buttonAttrs}>`,
      `<span class="link-btn-icon">${renderIcon(getLinkIconName(link), { size: 18 })}</span>`,
      `<span class="link-btn-label">${escapeHtml(link.label)}</span>`,
      renderIcon(arrowIcon, { size: 16, className: 'link-btn-arrow', strokeWidth: 2.25 }),
      '</a>'
    ].join('');
  }

  function renderAdminShortcut() {
    const slot = document.getElementById('admin-link-slot');
    if (!slot) return;

    if (!shouldShowAdminShortcut()) {
      slot.innerHTML = '';
      return;
    }

    slot.innerHTML = [
      '<span aria-hidden="true"> · </span>',
      `<a href="./admin.html" class="admin-link" aria-label="Admin panel">${renderIcon('settings-2', { size: 14, strokeWidth: 2.1 })}</a>`
    ].join('');
  }

  function shouldShowAdminShortcut() {
    if (window.location.protocol === 'file:') return true;
    if (['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname)) return true;
    return localStorage.getItem(ADMIN_SHORTCUT_KEY) === 'visible';
  }

  function attachLinkHandlers() {
    document.querySelectorAll('.link-btn[data-section]').forEach(button => {
      if (button.dataset.bound === '1') return;
      button.dataset.bound = '1';
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', event => {
        event.preventDefault();
        const sectionId = button.dataset.section;
        const section = document.getElementById(sectionId);
        if (!section) return;

        const shouldOpen = section.classList.contains('hidden');

        document.querySelectorAll('.detail-section').forEach(detailSection => {
          detailSection.classList.add('hidden');
          detailSection.classList.remove('entering');
        });

        document.querySelectorAll('.link-btn[data-section]').forEach(linkButton => {
          linkButton.setAttribute('aria-expanded', 'false');
        });

        if (!shouldOpen) return;

        section.classList.remove('hidden');
        void section.offsetWidth;
        section.classList.add('entering');
        button.setAttribute('aria-expanded', 'true');

        section.querySelectorAll('.fade-in').forEach(node => {
          node.classList.remove('visible');
          void node.offsetWidth;
          node.classList.add('visible');
        });

        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      });
    });
  }

  function attachCloseHandlers() {
    document.querySelectorAll('.section-close').forEach(button => {
      if (button.dataset.bound === '1') return;
      button.dataset.bound = '1';
      button.addEventListener('click', () => {
        const section = button.closest('.detail-section');
        if (!section) return;
        section.classList.add('hidden');
        section.classList.remove('entering');
        document.querySelector(`.link-btn[data-section="${section.id}"]`)?.setAttribute('aria-expanded', 'false');
        document.querySelector('.links-section')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  function attachContactForm() {
    const form = document.getElementById('contact-form');
    if (!form || form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:edmon.sahakyan@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  function attachCopyEmailHandlers() {
    document.querySelectorAll('.copy-email').forEach(link => {
      if (link.dataset.bound === '1') return;
      link.dataset.bound = '1';
      link.addEventListener('click', event => {
        event.preventDefault();
        const text = link.dataset.copy || link.href.replace('mailto:', '');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => flash(link));
          return;
        }

        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        flash(link);
      });
    });
  }

  function flash(link) {
    const original = link.textContent;
    link.textContent = 'Copied';
    link.style.color = 'var(--accent)';
    setTimeout(() => {
      link.textContent = original;
      link.style.color = '';
    }, 1800);
  }

  function getSocialIconName(value) {
    const normalized = String(value || '').toLowerCase();
    if (normalized.includes('github')) return 'code-2';
    if (normalized.includes('linkedin')) return 'briefcase-business';
    if (normalized.includes('telegram')) return 'send';
    if (normalized.includes('twitter')) return 'messages-square';
    if (normalized.includes('email')) return 'mail';
    if (normalized.includes('phone')) return 'phone';
    if (normalized.includes('youtube')) return 'play-square';
    if (normalized.includes('instagram')) return 'camera';
    if (normalized.includes('website')) return 'globe';
    if (normalized.includes('discord')) return 'messages-square';
    if (normalized.includes('tiktok')) return 'music-4';
    return 'link-2';
  }

  function getLinkIconName(link) {
    const label = String(link.label || '').toLowerCase();
    const href = String(link.href || '').toLowerCase();

    if (label.includes('about')) return 'user-round';
    if (label.includes('skill') || label.includes('tech')) return 'sparkles';
    if (label.includes('work') || label.includes('experience')) return 'briefcase-business';
    if (label.includes('project') || label.includes('github') || href.includes('github.com')) return 'folder-git-2';
    if (label.includes('education') || label.includes('cert')) return 'graduation-cap';
    if (label.includes('contact') || label.includes('touch') || label.includes('email')) return 'mail';
    if (label.includes('linkedin') || href.includes('linkedin.com')) return 'briefcase-business';
    if (label.includes('telegram') || href.includes('t.me')) return 'send';
    if (label.includes('website')) return 'globe';
    return link.type === 'external' ? 'external-link' : 'link-2';
  }

  function renderIcon(name, options) {
    const { size = 20, className = '', strokeWidth = 2 } = options || {};
    const paths = ICON_PATHS[name] || ICON_PATHS['link-2'];
    const classAttr = className ? ` class="${className}"` : '';
    return [
      `<svg${classAttr} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`,
      paths.join(''),
      '</svg>'
    ].join('');
  }

  function escapeAttr(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})();
