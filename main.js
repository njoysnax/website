/* Minimal, accessible vanilla JS enhancements */
(function(){
  const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav toggle (if present)
  (function(){
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.navbar nav');
    if(!btn || !nav) return;
    const focusable = () => nav.querySelectorAll('a,button,[tabindex="0"]');
    function openMenu(){
      document.body.classList.add('nav-open');
      btn.setAttribute('aria-expanded','true');
      (focusable()[0]||btn).focus();
      document.addEventListener('keydown', trap);
    }
    function closeMenu(){
      document.body.classList.remove('nav-open');
      btn.setAttribute('aria-expanded','false');
      btn.focus();
      document.removeEventListener('keydown', trap);
    }
    function trap(e){
      if(e.key === 'Escape') return closeMenu();
      if(e.key !== 'Tab') return;
      const items = Array.from(focusable());
      if(items.length === 0) return;
      const first = items[0], last = items[items.length-1];
      if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
      else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
    }
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });
  })();

  // Build slides from legacy images if empty
  const slidesHost = document.getElementById('heroSlides');
  if(slidesHost && slidesHost.children.length === 0){
    const legacy = document.querySelector('#legacyContent');
    if(legacy){
      const srcs = Array.from(legacy.querySelectorAll('img')).map(i=>i.getAttribute('src')).filter(Boolean);
      const unique = Array.from(new Set(srcs)).slice(0, 8);
      unique.forEach((src, i)=>{
        const wrap = document.createElement('div');
        wrap.className = 'slide' + (i===0 ? ' active' : '');
        const img = new Image();
        img.src = src; img.alt = 'Showcase ' + (i+1);
        img.loading = 'lazy'; img.decoding='async';
        wrap.appendChild(img);
        slidesHost.appendChild(wrap);
      });
    }
  }

  // Carousel controls
  (function(){
    const host = document.getElementById('heroSlides');
    if(!host) return;
    let idx = 0;
    function items(){ return host.querySelectorAll('.slide'); }
    function show(i){
      const list = items();
      if(list.length === 0) return;
      list[idx]?.classList.remove('active');
      idx = (i + list.length) % list.length;
      list[idx]?.classList.add('active');
    }
    let timer = null;
    function start(){
      if(prefersReduce) return; // honor reduced motion
      stop();
      timer = setInterval(()=> show(idx+1), 3500);
    }
    function stop(){
      if(timer){ clearInterval(timer); timer = null; }
    }
    // Pause on hover (desktop)
    host.addEventListener('mouseenter', stop);
    host.addEventListener('mouseleave', start);

    // Swipe on mobile (touch)
    let startX = 0, dy = 0, moved = false;
    const THRESH = 48; // px
    host.addEventListener('touchstart', (e)=>{
      if(!e.touches || e.touches.length !== 1) return;
      startX = e.touches[0].clientX; dy = e.touches[0].clientY; moved = false; stop();
    }, {passive:true});
    host.addEventListener('touchmove', (e)=>{
      moved = true;
    }, {passive:true});
    host.addEventListener('touchend', (e)=>{
      if(!moved){ start(); return; }
      const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
      const delta = endX - startX;
      if(Math.abs(delta) > THRESH){
        show(idx + (delta < 0 ? 1 : -1));
      }
      start();
    }, {passive:true});

    // Start
    show(0);
    start();
    // Expose for a11y (optional)
    host.setAttribute('aria-live', prefersReduce ? 'off' : 'polite');
  })();

  // IntersectionObserver for reveal
  (function(){
    const targets = Array.from(document.querySelectorAll('.reveal'));
    if(targets.length === 0) return;
    if(prefersReduce){ targets.forEach(t=>t.classList.add('is-revealed')); return; }
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-revealed');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.14, rootMargin: '0px 0px -10% 0px'});
    targets.forEach(t=> io.observe(t));
  })();

})();
