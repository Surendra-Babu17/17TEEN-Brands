const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add("active");
}

// Change slide every 3 seconds
setInterval(showNextSlide, 3000);






function cart1(){
    document.getElementById("cart").style.cursor="pointer"
    window.location.href="./shoes.html"

}
function cart2(){
    window.location.href="./mens.html"

}
function cart3(){
    window.location.href="./pants.html"

}
function cart4(){
    window.location.href="./mt.html"

}
function cart5(){
    window.location.href="./mw.html"

}
function cart8(){

    window.location.href="./shoes.html"


}
function readmore(){
    window.location.href="./read.html"
}
function cart9(){
    window.location.href='./flip-flops.html'
}
function cart11(){
    window.location.href='./spets.html'
}
function cart13(){
    window.location.href='./ws.html'
}
function cart14(){
    window.location.href='./wt.html'
}
function cart15(){
    window.location.href='./wg.html'
}
function cart16(){
    window.location.href='./ch.html'
}
function cart17(){
    window.location.href='./t.html'
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navbar) {
    hamburger.addEventListener('click', (e) => {
      const isOpen = navbar.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close when clicking outside
    document.addEventListener('click', (ev) => {
      if (!navbar.contains(ev.target) && navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    // close on ESC
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // fill year
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();

  // basic cart hover (optional): show/hide #cart-items
  const cartIcon = document.querySelector('.nav-links a[href$="cart.html"]');
  const cartList = document.getElementById('cart-items');
  if (cartIcon && cartList) {
    cartIcon.addEventListener('mouseover', () => cartList.style.display = 'block');
    cartIcon.addEventListener('mouseout', () => cartList.style.display = 'none');
  }
});



// about.js 

// main.js - small utilities for about page: menu, smooth scroll, stats counter, modal team, badge
(function(){
  // Simple helpers
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
  const debounce = (fn, t=100) => { let id; return (...a)=>{ clearTimeout(id); id = setTimeout(()=>fn(...a), t); }; };

  // NAV / hamburger
  const hamburger = $('#hamburger');
  const primaryNav = $('#primary-nav');
  on(hamburger, 'click', (e)=>{
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    if(primaryNav){
      primaryNav.style.display = expanded ? '' : 'flex';
      if(!expanded) primaryNav.style.flexDirection = 'column';
      // small style: show as column on mobile
    }
  });

  // close mobile nav when clicking outside (small)
  document.addEventListener('click', (ev)=>{
    if (!primaryNav || !hamburger) return;
    if (window.innerWidth > 640) return;
    if (!primaryNav.contains(ev.target) && !hamburger.contains(ev.target)) {
      primaryNav.style.display = 'none';
      hamburger.setAttribute('aria-expanded','false');
    }
  });

  // Smooth scrolling for internal links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  // Stats counter: animate when visible
  function animateStat(el, to){
    const numEl = el.querySelector('.stat-number');
    if (!numEl) return;
    // Handle percent sign in original for 100%
    const isPercent = String(numEl.textContent || '').includes('%');
    let start = 0;
    const duration = 900;
    const stepTime = 24;
    const steps = Math.ceil(duration / stepTime);
    const inc = (to - start) / steps;
    let cur = start;
    const t = setInterval(()=>{
      cur += inc;
      if (cur >= to) {
        cur = to;
        clearInterval(t);
      }
      numEl.textContent = isPercent ? Math.round(cur) + '%' : Math.round(cur);
    }, stepTime);
  }

  // onVisible helper
  function onVisible(el, cb, options={threshold:0.3}) {
    if (!el) return;
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          cb(en.target);
          o.unobserve(en.target);
        }
      });
    }, options);
    obs.observe(el);
  }

  // Hook stats
  $$('.stat').forEach(statEl => {
    const target = Number(statEl.dataset.target || 0);
    onVisible(statEl, ()=> animateStat(statEl, target));
  });

  // Reveal animations for sections
  $$('.split, .values, .timeline, .team, .cta').forEach(s => {
    s.style.opacity = 0;
    s.style.transform = 'translateY(10px)';
    onVisible(s, (el)=>{
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, {threshold: 0.15});
  });

  // Team modal: opens when clicking a .member
  const modal = $('#member-modal');
  const modalClose = $('#modal-close');
  const memberImg = $('#member-img');
  const memberName = $('#member-name');
  const memberRole = $('#member-role');
  const memberBio = $('#member-bio');

  $$('.member').forEach(m => {
    m.addEventListener('click', () => {
      const name = m.dataset.name || m.querySelector('h3')?.innerText || '';
      const role = m.dataset.role || '';
      const bio = m.dataset.bio || '';
      const img = m.dataset.img || (m.querySelector('img') && m.querySelector('img').src) || '';
      if (memberImg) { memberImg.src = img; memberImg.alt = name; }
      if (memberName) memberName.textContent = name;
      if (memberRole) memberRole.textContent = role;
      if (memberBio) memberBio.textContent = bio;
      if (modal) { modal.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
    });
  });

  on(modalClose, 'click', ()=> {
    if (modal) { modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  });
  // close modal on background click
  on(modal, 'click', (e) => {
    if (e.target === modal) { modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  });
  // close on ESC
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      modal.setAttribute('aria-hidden','true'); document.body.style.overflow = '';
    }
  });

  // cart badge update - reads the same localStorage key used earlier (myCart)
  function updateCartBadge(){
    try {
      const badge = document.getElementById('cart-count');
      if (!badge) return;
      const cart = JSON.parse(localStorage.getItem('myCart') || '[]');
      const qty = cart.reduce((s,i)=> s + (i.qty || 1), 0);
      if (qty > 0) { badge.style.display = 'inline-block'; badge.textContent = qty; }
      else { badge.style.display = 'none'; badge.textContent = '0'; }
    } catch(e) { /* ignore */ }
  }
  // call on load and on storage changes (in case another tab updates)
  updateCartBadge();
  window.addEventListener('storage', debounce(updateCartBadge, 80));

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Expose a small API for dev console
  window.__site = { updateCartBadge };

})();




