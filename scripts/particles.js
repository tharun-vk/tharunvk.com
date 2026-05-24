/* ============================================================
   particles.js
   
   Subtle particle field for the hero section. Includes:
   - prefers-reduced-motion guard (skips entirely)
   - IntersectionObserver to pause when hero is off-screen
   - Resizes with the window
   - Mouse-react gently (push particles away)
   ============================================================ */

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  // Respect reduced motion at the OS level.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId = null;
  let isVisible = true;
  let dpr = window.devicePixelRatio || 1;

  function initCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
  }

  class Particle {
    constructor(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.4 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.baseOpacity = Math.random() * 0.4 + 0.1;
    }

    update(w, h) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x > w) this.x = 0;
      else if (this.x < 0) this.x = w;
      if (this.y > h) this.y = 0;
      else if (this.y < 0) this.y = h;

      // Gentle push from mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 32400) { // 180px radius
          this.x -= dx / 180;
          this.y -= dy / 180;
        }
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(125, 211, 252, ' + this.baseOpacity + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    // Scale density to viewport but cap so big screens don't get overloaded.
    const count = Math.min(Math.floor((w * h) / 14000), 110);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(w, h));
    }
  }

  function animate() {
    if (!isVisible) {
      animationId = null;
      return;
    }
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(w, h);
      particles[i].draw();
    }
    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animationId === null && isVisible) {
      animate();
    }
  }

  // Mouse tracking on the canvas's parent (the hero)
  const hero = canvas.parentElement;
  hero.addEventListener('mousemove', function (e) {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  // Resize handling — debounced
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initCanvas();
      createParticles();
    }, 150);
  });

  // Pause when scrolled off-screen
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      isVisible = entry.isIntersecting;
      if (isVisible) startAnimation();
    });
  }, { threshold: 0 });
  observer.observe(hero);

  // Boot
  initCanvas();
  createParticles();
  startAnimation();
})();
