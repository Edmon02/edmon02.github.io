/* =====================================================
   Edmon Sahakyan Portfolio - Interaction Script
   ===================================================== */
(function(){
  const root=document.documentElement;
  const themeToggle=document.getElementById('theme-toggle');
  const paletteToggle=document.getElementById('palette-toggle');
  const navToggle=document.querySelector('.nav-toggle');
  const navMenu=document.getElementById('nav-menu');
  const copyEmails=document.querySelectorAll('.copy-email');
  const prefersDark=window.matchMedia('(prefers-color-scheme: dark)');

  // Theme toggle
  const storedTheme=localStorage.getItem('theme');
  if(storedTheme==='dark' || (!storedTheme && prefersDark.matches)) root.classList.add('dark');
  themeToggle?.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');});

  // Palette toggle (cycle through a-e)
  paletteToggle?.addEventListener('click',()=>{const seq=['a','b','c','d','e'];const cur=root.getAttribute('data-palette')||'a';const next=seq[(seq.indexOf(cur)+1)%seq.length];root.setAttribute('data-palette',next);try{localStorage.setItem('palette',next);}catch(err){}});

  // Nav toggle
  navToggle?.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!open));navMenu.classList.toggle('open');});
  navMenu?.addEventListener('click',e=>{if(e.target.matches('a')){navMenu.classList.remove('open');navToggle?.setAttribute('aria-expanded','false');}});

  // Smooth scroll with header offset
  function scrollToHash(hash){const id=hash.replace('#','');const el=document.getElementById(id);if(!el)return;const offset=72;const top=el.getBoundingClientRect().top+window.scrollY-offset;window.scrollTo({top,behavior:'smooth'});history.replaceState(null,'','#'+id);}  
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href==='#')return; if(href.startsWith('#')){const target=document.getElementById(href.substring(1)); if(target){e.preventDefault();scrollToHash(href);} } });});
  document.querySelectorAll('[data-scroll]').forEach(btn=>{btn.addEventListener('click',e=>{const h=btn.getAttribute('data-scroll'); if(h){e.preventDefault();scrollToHash(h);} });});

  // Role rotator
  const rot=document.querySelector('.role-rotator');
  if(rot){try{const roles=JSON.parse(rot.getAttribute('data-roles'));let i=0;(function cycle(){rot.classList.remove('role-out');rot.textContent=roles[i];requestAnimationFrame(()=>rot.classList.add('role-in'));setTimeout(()=>rot.classList.remove('role-in'),600);i=(i+1)%roles.length;setTimeout(()=>{rot.classList.add('role-out');setTimeout(cycle,350);},2500);})();}catch(err){}}

  // Motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Magnetic buttons (skip if user prefers reduced motion)
  if(!prefersReduced.matches){
    document.querySelectorAll('[data-mag]').forEach(btn=>{const strength=18;btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x/strength}px, ${y/strength}px)`});btn.addEventListener('mouseleave',()=>{btn.style.transform='';});});
  }

  // Fade-in observer (with stagger ability using data-fade-group)
  const fadeObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');fadeObserver.unobserve(entry.target);}})},{threshold:0.15});
  document.querySelectorAll('.fade-in').forEach(el=>fadeObserver.observe(el));

  // Active nav link
  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav-list a')];
   const sectionObs=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){const id=en.target.id;navLinks.forEach(l=>{const active = l.getAttribute('href')===`#${id}`;l.classList.toggle('active',active);if(active){l.setAttribute('aria-current','true');} else {l.removeAttribute('aria-current');}});}})},{threshold:0.45});
  sections.forEach(s=>sectionObs.observe(s));

  // Clipboard copy feedback
  function copy(txt){if(navigator.clipboard) return navigator.clipboard.writeText(txt);const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(_){}ta.remove();return Promise.resolve();}
  copyEmails.forEach(link=>{link.addEventListener('click',e=>{const val=link.getAttribute('data-copy');if(!val)return; e.preventDefault();copy(val).then(()=>{const tip=link.querySelector('.tooltip');if(tip){tip.textContent='Copied!';tip.style.opacity='1';tip.style.transform='translateY(-6px)';setTimeout(()=>{tip.textContent='Copy';tip.removeAttribute('style');},1800);}});});});

  // Respond to system theme if user hasn't chosen
  prefersDark.addEventListener('change',ev=>{if(!localStorage.getItem('theme')){ev.matches?root.classList.add('dark'):root.classList.remove('dark');}});

  // Tag progress fill baseline
  document.querySelectorAll('.skill-tags li').forEach(li=>{const lvl=li.getAttribute('data-level');if(lvl)li.style.setProperty('--p',lvl);});

  // Scroll progress + header hide
  const header=document.querySelector('.site-header');
  const progress=document.querySelector('.scroll-progress__bar');
  let lastY=window.scrollY, ticking=false;
  function onScroll(){const y=window.scrollY;const h=document.documentElement.scrollHeight - window.innerHeight; if(progress&&h>0){progress.style.width=(y/h*100)+'%';} if(header){if(y>140 && y>lastY+10) header.classList.add('is-hidden'); else if(y<lastY-10 || y<140) header.classList.remove('is-hidden'); } lastY=y; ticking=false;}
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true}); onScroll();

  /* =====================
    Project Filters & Tilt
    ===================== */
  const filterButtons=document.querySelectorAll('.proj-filter');
  const projectCards=document.querySelectorAll('.project-card');
  function applyFilter(category){projectCards.forEach(card=>{const cats=(card.getAttribute('data-cat')||'').split(/\s+/);const show= category==='all'|| cats.includes(category); if(show){card.removeAttribute('data-hidden');card.dataset.hidden='false';} else {card.setAttribute('data-hidden','true');card.dataset.hidden='true';}});}  
  filterButtons.forEach(btn=>{btn.addEventListener('click',()=>{const cat=btn.getAttribute('data-filter'); filterButtons.forEach(b=>{const active=b===btn; b.classList.toggle('is-active',active); b.setAttribute('aria-pressed', active?'true':'false');}); applyFilter(cat);});});
  // Initial (all)
  applyFilter('all');

  // Card tilt (skip if reduced motion or coarse pointer)
  if(!prefersReduced.matches && window.matchMedia('(pointer: fine)').matches){
   projectCards.forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const px=(e.clientX-r.left)/r.width;const py=(e.clientY-r.top)/r.height;const rx=(py-.5)*6;const ry=(px-.5)*-6;card.style.setProperty('--rx', rx.toFixed(2)+'deg');card.style.setProperty('--ry', ry.toFixed(2)+'deg');});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});});
  }

  /* =====================
    Timeline reveal
    ===================== */
  const timelineItems=document.querySelectorAll('.timeline-item');
  if(timelineItems.length){const tObs=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');tObs.unobserve(en.target);} });},{threshold:0.25}); timelineItems.forEach(i=>tObs.observe(i));}

  /* =====================
     Micro-interactions
     ===================== */
  // 1. Custom cursor accent (desktop only, skip if reduced motion)
  let cursorRef=null;
  function removeCursor(){if(cursorRef){cursorRef.remove();cursorRef=null;}}
  function initCursor(){
    if(prefersReduced.matches || !window.matchMedia('(pointer: fine)').matches || cursorRef) return;
    const cursor=document.createElement('div');
    cursor.className='cursor-accent';
    document.body.appendChild(cursor); cursorRef=cursor;
    let latestX=0,latestY=0;let rafId=null;
    function move(){cursor.style.transform=`translate(${latestX}px,${latestY}px)`;rafId=null;}
    window.addEventListener('pointermove',e=>{latestX=e.clientX;latestY=e.clientY; if(!rafId) rafId=requestAnimationFrame(move);});
    document.addEventListener('mousedown',()=>cursor.classList.add('down'));
    document.addEventListener('mouseup',()=>cursor.classList.remove('down'));
  }
  initCursor();

  // 2. Parallax on hero visual elements (skip if reduced motion)
  const hero=document.querySelector('.hero-visual');
  function attachParallax(){
    if(!hero || prefersReduced.matches || !window.matchMedia('(pointer: fine)').matches) return;
    hero.addEventListener('pointermove',parallaxMove);
    hero.addEventListener('pointerleave',parallaxLeave);
  }
  function detachParallax(){if(!hero) return; hero.removeEventListener('pointermove',parallaxMove); hero.removeEventListener('pointerleave',parallaxLeave); hero.style.setProperty('--parx','0');hero.style.setProperty('--pary','0');}
  function parallaxMove(e){const r=hero.getBoundingClientRect();const rx=(e.clientX-r.left)/r.width-0.5;const ry=(e.clientY-r.top)/r.height-0.5;hero.style.setProperty('--parx', (rx*14).toFixed(2));hero.style.setProperty('--pary', (ry*14).toFixed(2));}
  function parallaxLeave(){hero.style.setProperty('--parx','0');hero.style.setProperty('--pary','0');}
  attachParallax();

  // Watch for motion preference changes
  prefersReduced.addEventListener('change',e=>{if(e.matches){removeCursor();detachParallax();document.querySelectorAll('[data-mag]').forEach(btn=>btn.style.transform='');} else {initCursor();attachParallax();}});

  // 3. Stagger fade sequencing: apply incremental delay within each container having data-fade-group
  document.querySelectorAll('[data-fade-group]').forEach(group=>{[...group.querySelectorAll('.fade-in')].forEach((el,i)=>{el.style.transitionDelay=(i*90)+'ms';});});

  /* =====================
     Contact Form Enhancement
     ===================== */
  const form=document.getElementById('contact-form');
  if(form){
    const nameEl=form.querySelector('#name');
    const emailEl=form.querySelector('#email');
    const msgEl=form.querySelector('#message');
    const statusEl=form.querySelector('#form-status');
    const toast=document.getElementById('toast');
    const submitBtn=form.querySelector('#contact-submit');

    function showError(input,msg){const errId=input.getAttribute('aria-describedby');const errEl=errId&&document.getElementById(errId);if(errEl){errEl.textContent=msg;errEl.hidden=!msg;}input.setAttribute('aria-invalid', msg? 'true':'false');}
    function validateName(){const v=nameEl.value.trim();if(v.length<2){showError(nameEl,'Name must be at least 2 characters');return false;}showError(nameEl,'');return true;}
    function validateEmail(){const v=emailEl.value.trim();const ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);if(!ok){showError(emailEl,'Enter a valid email');return false;}showError(emailEl,'');return true;}
    function validateMsg(){const v=msgEl.value.trim();if(v.length<10){showError(msgEl,'Message must be at least 10 characters');return false;}showError(msgEl,'');return true;}
    function validateAll(){return [validateName(),validateEmail(),validateMsg()].every(Boolean);}    

    ['input','blur'].forEach(ev=>{nameEl.addEventListener(ev,validateName);emailEl.addEventListener(ev,validateEmail);msgEl.addEventListener(ev,validateMsg);});

    function showToast(text,type='success'){if(!toast)return;toast.textContent=text;toast.className='toast '+type;toast.hidden=false;clearTimeout(showToast._t);showToast._t=setTimeout(()=>{toast.hidden=true;},3500);}    

    form.addEventListener('submit',e=>{e.preventDefault(); if(!validateAll()){statusEl.textContent='Please fix the highlighted fields.';return;} statusEl.textContent='Sending...'; form.classList.add('loading'); submitBtn.disabled=true; // Simulate async send
      setTimeout(()=>{form.classList.remove('loading');submitBtn.disabled=false;statusEl.textContent='Message sent!';showToast('Message sent successfully','success');form.reset();}, 1200);
    });
  }

})();
