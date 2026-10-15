/* ===================================================
   SHUVO PORTFOLIO - JAVASCRIPT
=================================================== */
'use strict';

/* ======== Loader ======== */
window.addEventListener('load', () => {
  document.body.classList.add('loading');
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }
  }, 2200);
});

/* ======== Custom Cursor ======== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .tech-badge, .product-card, .achievement-card, .edu-card, .filter-btn'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
})();

/* ======== Navbar Scroll ======== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });

    navLinksContainer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
      });
    });
  }
})();

/* ======== Particle Canvas ======== */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 80;
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = -(Math.random() * 0.8 + 0.2);
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? `rgba(139,92,246,${this.opacity})` : `rgba(236,72,153,${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ======== Typed Text ======== */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const words = ['Frontend Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
  let wordIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const currentWord = words[wordIdx];
    if (!isDeleting) {
      el.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 60 : 90);
  }
  setTimeout(type, 1200);
})();

/* ======== Counter Animation ======== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      animated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          counter.textContent = Math.floor(current);
        }, 16);
      });
    }
  }
  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();
})();

/* ======== Reveal on Scroll ======== */
(function initReveal() {
  const reveals = document.querySelectorAll(
    '.project-card, .skill-category, .tech-badge, .product-card, .achievement-card, .edu-card, .testimonial-card, .timeline-item, .section-header, .about-content, .about-image-wrapper'
  );

  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

/* ======== Skill Bar Animation ======== */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(fill => observer.observe(fill));
})();

/* ======== Project Filter ======== */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        if (show) {
          card.classList.remove('hidden');
          card.style.animationDelay = (i * 0.08) + 's';
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeInUp 0.5s ease both';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ======== Testimonials Slider ======== */
(function initSlider() {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoInterval;

  // Detect visible count
  function getVisible() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  function getMaxIndex() {
    return Math.max(0, total - getVisible());
  }

  // Create dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    const max = getMaxIndex() + 1;
    for (let i = 0; i < max; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, getMaxIndex()));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goTo(current); });

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function startAuto() {
    autoInterval = setInterval(() => {
      const next = current >= getMaxIndex() ? 0 : current + 1;
      goTo(next);
    }, 4500);
  }
  function resetAuto() { clearInterval(autoInterval); startAuto(); }
  startAuto();
})();

/* ======== Contact Form ======== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitContactBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('contactName')?.value.trim();
    const emailVal = document.getElementById('contactFormEmail')?.value.trim();
    const msgVal = document.getElementById('contactMessage')?.value.trim();
    if (!nameVal || !emailVal || !msgVal) return;

    // Simulate sending
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      if (successMsg) { successMsg.classList.add('show'); }
      setTimeout(() => { if (successMsg) successMsg.classList.remove('show'); }, 4000);
    }, 1500);
  });
})();

/* ======== Smooth Scroll for anchors ======== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ======== Parallax Hero ======== */
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (heroVisual) heroVisual.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  }, { passive: true });
})();

/* ======== Tilt effect on project cards ======== */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card, .product-card, .edu-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / cy * 6;
      const ry = (x - cx) / cx * -6;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
