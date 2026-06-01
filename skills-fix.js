(function(){
  // Robust override for Skills Grid/Map toggle & orbit build
  if(window.__skillsFixApplied) return; window.__skillsFixApplied = true;
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded",fn); }
  ready(function(){
    const grid = document.querySelector('.skills-grid');
    const map = document.querySelector('.skills-map');
    const orbit = map?.querySelector('.skill-orbit');
    const inspector = map?.querySelector('.skill-inspector');
    const labelEl = inspector?.querySelector('.skill-inspector__label');
    const metaEl = inspector?.querySelector('.skill-inspector__meta');
    const modeButtons = document.querySelectorAll('.skills-mode-btn');
    if(!grid || !map || !orbit || !modeButtons.length){ return; }

    // Hide all original tag lists when in map mode for cleaner UI
    function showGrid(){
      grid.hidden = false; grid.setAttribute('aria-hidden','false');
      map.hidden = true; map.setAttribute('aria-hidden','true');
      document.querySelectorAll('.skill-tags').forEach(ul=>ul.style.display='');
    }
    function showMap(){
      map.hidden = false; map.setAttribute('aria-hidden','false');
      grid.hidden = true; grid.setAttribute('aria-hidden','true');
      document.querySelectorAll('.skill-tags').forEach(ul=>ul.style.display='none');
      if(!orbit.dataset.populated) buildOrbit();
    }

    modeButtons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        const mode = btn.getAttribute('data-mode');
        modeButtons.forEach(b=>{
          const active = b===btn; b.classList.toggle('is-active',active); b.setAttribute('aria-selected',String(active));
        });
        mode==='map'?showMap():showGrid();
      }, {capture:true}); // capture to win over earlier listeners
    });

    function collectSkills(){
      const out = [];
      document.querySelectorAll('.skill-tags li').forEach(li=>{
        out.push({ name: li.getAttribute('data-skill'), level: parseInt(li.getAttribute('data-level')||'0',10) });
      });
      return out;
    }

    function buildOrbit(retry=0){
      if(!orbit) return;
      const w = orbit.clientWidth, h=orbit.clientHeight;
      if((w<60||h<60) && retry < 6){ return requestAnimationFrame(()=>buildOrbit(retry+1)); }
      const skills = collectSkills();
      if(!skills.length){ console.warn('[skills-fix] No skills found'); return; }
      orbit.dataset.populated = '1';
      orbit.setAttribute('role','list');
      orbit.innerHTML='';
      skills.sort((a,b)=>b.level-a.level);
      const maxR = Math.min(w,h)*0.38; const minR = maxR*0.25; const cx=w/2, cy=h/2;
      skills.forEach((sk,idx)=>{
        const t = idx/skills.length; const angle = t*Math.PI*4; const R=minR + (maxR-minR)*(0.15+0.85*t);
        const x = cx + Math.cos(angle)*R; const y = cy + Math.sin(angle)*R*0.85;
        const btn = document.createElement('button');
        btn.type='button'; btn.className='skill-orb'; btn.textContent=sk.name; btn.setAttribute('data-level',String(sk.level));
        btn.setAttribute('role','listitem'); btn.setAttribute('tabindex','0');
        btn.setAttribute('aria-label',`${sk.name} skill level ${sk.level}`);
        btn.style.left=(x-27)+'px'; btn.style.top=(y-27)+'px'; btn.style.setProperty('--size', (54+sk.level/100*18)+'px');
        btn.addEventListener('mouseenter',()=>select(btn,sk));
        btn.addEventListener('focus',()=>select(btn,sk));
        btn.addEventListener('mouseleave',()=>clearSel());
        btn.addEventListener('keydown',ev=>{
          if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(ev.key)){
            ev.preventDefault();
            const items = Array.from(orbit.querySelectorAll('.skill-orb'));
            const cur = items.indexOf(btn); let next = cur;
            if(ev.key==='ArrowRight'||ev.key==='ArrowDown') next=(cur+1)%items.length;
            else if(ev.key==='ArrowLeft'||ev.key==='ArrowUp') next=(cur-1+items.length)%items.length;
            else if(ev.key==='Home') next=0; else if(ev.key==='End') next=items.length-1;
            items[next].focus();
          } else if(ev.key==='Enter' || ev.key===' '){ ev.preventDefault(); select(btn,sk); }
        });
        orbit.appendChild(btn);
      });
    }

    let active = null;
    function select(el, sk){
      if(active) active.classList.remove('is-active');
      active = el; active.classList.add('is-active');
      if(labelEl) labelEl.textContent = sk.name;
      if(metaEl){ metaEl.innerHTML=''; const bar=document.createElement('div'); bar.className='skill-inspector__bar'; const span=document.createElement('span'); requestAnimationFrame(()=>{ span.style.width=sk.level+'%'; }); bar.appendChild(span); metaEl.appendChild(bar); }
    }
    function clearSel(){}

    window.__skills = window.__skills || {};
    window.__skills.rebuild = ()=>{ if(!orbit) return; orbit.dataset.populated=''; orbit.innerHTML=''; buildOrbit(); };

    // If user loaded with map button pre-clicked (e.g. deep link), ensure state consistent
    // Default remains grid; user may click map.
  });
})();
