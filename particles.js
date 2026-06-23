/* ============================================================
   particles.js

   Subtle particle field for the hero section. Sits on the
   #particleCanvas element layered behind the hero content.

   Design intent: "observatory at night" — a field of small,
   slow-drifting dots in the deep navy background. Particles
   near the cursor lean gently toward it. No clicking, no game,
   just a quiet sense that the page is alive.

   Safeguards:
     - Respects prefers-reduced-motion (animation disabled).
     - IntersectionObserver pauses the loop when the hero is
       scrolled off-screen, to save CPU/battery.

   Plain JS, no dependencies. Loaded only on the home page.
   ============================================================ */

(function () {
  "use strict";

  var canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  // Accessibility: honour reduced-motion. Leave the canvas blank.
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  if (reduceMotion.matches) return;

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Waterline accent, matching the site's primary accent token.
  var PARTICLE_RGB = "78, 163, 196"; // #4ea3c4

  var hero = canvas.parentElement; // .hero is position:relative
  var particles = [];
  var mouse = { x: null, y: null };
  var running = false;
  var rafId = null;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function size() {
    var rect = hero.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
  }

  function buildParticles() {
    // Density scales with area but is capped so large monitors
    // don't draw an excessive count.
    var area = canvas.width * canvas.height;
    var count = Math.min(90, Math.max(24, Math.round(area / 26000)));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // Very slow drift, sub-pixel per frame.
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (Math.random() * 1.4 + 0.6) * dpr,
        a: Math.random() * 0.4 + 0.2
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Gentle lean toward the cursor when it's near.
      if (mouse.x !== null) {
        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var radius = 120 * dpr;
        if (dist < radius && dist > 0.001) {
          var pull = (1 - dist / radius) * 0.04;
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;
        }
      }

      // Damping so the lean stays subtle and doesn't accumulate.
      p.vx *= 0.96;
      p.vy *= 0.96;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges for a seamless field.
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + PARTICLE_RGB + ", " + p.a + ")";
      ctx.fill();
    }

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Track cursor in canvas coordinates.
  hero.addEventListener("mousemove", function (e) {
    var rect = hero.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * dpr;
    mouse.y = (e.clientY - rect.top) * dpr;
  });
  hero.addEventListener("mouseleave", function () {
    mouse.x = null;
    mouse.y = null;
  });

  // Pause when the hero scrolls out of view.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.05 }
    );
    io.observe(hero);
  } else {
    start();
  }

  // Resize handling, debounced.
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      size();
      buildParticles();
    }, 150);
  });

  // If the user toggles reduced-motion at runtime, stop cleanly.
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", function (e) {
      if (e.matches) {
        stop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  // Init.
  size();
  buildParticles();
})();
