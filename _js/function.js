"use strict";



/* ========================
   PARTICLES CANVAS
========================= */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  let resizeTimer;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      document.body.classList.remove("resize-animation-stopper");
    }, 200);
  }, { passive: true });

  const pts = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.3 + 0.1,
  }));

  (function drawParticles() {
    // Disable intensive canvas rendering on mobile breakpoint
    if (window.innerWidth < 1000) return requestAnimationFrame(drawParticles);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.a})`;
      ctx.fill();
    });
    // O(n^2) optimization loop limit constraints
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x,
          dy = pts[i].y - pts[j].y,
          d = Math.hypot(dx, dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  })();
}

/* ========================
   SCROLL REVEAL
========================= */
const revealIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

/* ========================
   LIGHTHOUSE RINGS
========================= */
const lhIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const fill = e.target.querySelector(".lh-ring-fill");
      if (!fill) return;
      const score = parseInt(fill.dataset.score, 10);
      const circ = 2 * Math.PI * 15.9;
      const offset = circ * (1 - score / 100);
      fill.style.strokeDasharray = `${circ}`;
      fill.style.strokeDashoffset = `${offset}`;
      lhIO.unobserve(e.target);
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".lh-score-card").forEach((el) => lhIO.observe(el));

/* ========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      
      const navHeight = 90; // Approx height of the fixed nav
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      // Prevent focus scroll jump by passing preventScroll: true
      target.focus({ preventScroll: true });
      
      // Si menu mobile ouvert, le fermer
      document.body.classList.remove("nav-open");
      const burgerBtn = document.querySelector(".burger-menu");
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
    }
  });
});

/* ========================
   REDUCED MOTION
========================= */
if (
  window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  canvas
) {
  canvas.style.display = "none";
}

/* ========================
   CAROUSEL
========================= */
const setupCarousel = (selector, total) => {
  const container = document.querySelector(selector);
  if (!container) return;
  
  const carousel = container.querySelector(".visual-carousel");
  const hint = container.querySelector(".carousel-hint");
  const btnPrev = container.querySelector(".carousel-nav.prev");
  const btnNext = container.querySelector(".carousel-nav.next");

  if (carousel && hint) {
    const updateHint = () => {
      const index = Math.round(carousel.scrollLeft / carousel.offsetWidth) + 1;
      hint.textContent =
        (window.innerWidth > 600
          ? "Explorez la plateforme"
          : "Swipez pour explorer") + ` • ${index}/${total}`;
    };

    carousel.addEventListener("scroll", updateHint, { passive: true });

    btnPrev?.addEventListener("click", () => {
      carousel.scrollBy({ left: -carousel.offsetWidth, behavior: "smooth" });
    });
    btnNext?.addEventListener("click", () => {
      carousel.scrollBy({ left: carousel.offsetWidth, behavior: "smooth" });
    });
  }
};

// Initialize carousels
setupCarousel(".visual-showcase:not([style*='grid-column: 1 / -1'])", 11); // Gardenz
setupCarousel(".visual-showcase[style*='grid-column: 1 / -1']", 3); // Reflexe

/* ========================
   SCROLL TO TOP (70%)
========================= */
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  window.addEventListener(
    "scroll",
    () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      // Seuil à 70% de la hauteur scrollable
      if (scrolled > height * 0.7) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    },
    { passive: true },
  );

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ========================
   BURGER MENU
========================= */
const burger = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", isOpen);
  });
}
