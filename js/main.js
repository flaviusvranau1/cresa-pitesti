/* ============================================================
   main.js — interacțiuni + injectarea datelor din config.js
   ============================================================ */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Link-uri din config ---------- */
  var telHref = "tel:+" + (cfg.phoneIntl || "");
  var waHref = "https://wa.me/" + (cfg.phoneIntl || "") +
    "?text=" + encodeURIComponent(cfg.whatsappMessage || "Bună ziua, sunt interesat să vizitez creșa dumneavoastră.");

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.setAttribute("href", waHref);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.setAttribute("href", telHref);
  });
  document.querySelectorAll("[data-phone-display]").forEach(function (el) {
    if (cfg.phoneDisplay) el.textContent = cfg.phoneDisplay;
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (cfg.email) { el.setAttribute("href", "mailto:" + cfg.email); el.textContent = cfg.email; }
  });
  document.querySelectorAll("[data-address]").forEach(function (el) {
    var parts = [cfg.addressStreet, cfg.addressCity, cfg.addressRegion].filter(Boolean);
    if (parts.length) el.textContent = parts.join(", ");
  });
  document.querySelectorAll("[data-hours]").forEach(function (el) {
    if (cfg.hours) el.textContent = cfg.hours;
  });

  /* ---------- Hartă (dacă există embed în config) ---------- */
  if (cfg.mapsEmbed) {
    var holder = document.getElementById("mapHolder");
    if (holder) {
      holder.innerHTML = '<iframe src="' + cfg.mapsEmbed + '" loading="lazy" ' +
        'referrerpolicy="no-referrer-when-downgrade" title="Hartă — Creșă Pitești" ' +
        'allowfullscreen></iframe>';
    }
  }

  /* ---------- An curent în footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Navbar sticky ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Meniu mobil ---------- */
  var burger = document.getElementById("burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".section__head, .card, .feature-row, .safety, .timeline li, .faq__item, .contact, .cta-banner__inner");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Galerie slider ---------- */
  (function () {
    var track = document.getElementById("galleryTrack");
    if (!track) return;
    var slides = track.querySelectorAll(".slide");
    var prev = document.getElementById("galPrev");
    var next = document.getElementById("galNext");
    var dotsWrap = document.getElementById("galleryDots");
    function step() { var s = track.querySelector(".slide"); return s ? s.getBoundingClientRect().width + 16 : 320; }
    function go(dir) { track.scrollBy({ left: dir * step(), behavior: "smooth" }); }

    var paused = false, resumeT = null, timer = null;
    function holdPause() { paused = true; clearTimeout(resumeT); resumeT = setTimeout(function () { paused = false; }, 9000); }

    if (next) next.addEventListener("click", function () { go(1); holdPause(); });
    if (prev) prev.addEventListener("click", function () { go(-1); holdPause(); });

    var dots = [];
    slides.forEach(function (s, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Mergi la imaginea " + (i + 1));
      b.addEventListener("click", function () { track.scrollTo({ left: i * step(), behavior: "smooth" }); holdPause(); });
      dotsWrap.appendChild(b); dots.push(b);
    });
    function syncDots() {
      var i = Math.round(track.scrollLeft / step());
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
    }
    track.addEventListener("scroll", function () { requestAnimationFrame(syncDots); }, { passive: true });
    syncDots();

    // autoplay (oprit pe reduced-motion)
    if (!reduce) {
      timer = setInterval(function () {
        if (paused) return;
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 6) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else { go(1); }
      }, 3800);
      track.addEventListener("mouseenter", function () { paused = true; });
      track.addEventListener("mouseleave", function () { paused = false; });
      track.addEventListener("pointerdown", function () { holdPause(); });
    }
  })();

  /* ---------- Hero video: fallback la eroare ---------- */
  var hero = document.getElementById("heroVideo");
  if (hero) {
    hero.addEventListener("error", function () { hero.style.display = "none"; });
  }

  /* ---------- Count-up pentru statistici ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var dur = 1300, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll(".stat__num[data-count]");
  if (nums.length && "IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io2.observe(n); });
  }

  /* ---------- Showcase: scroll-scrub video ---------- */
  var showcase = document.querySelector(".showcase");
  var sv = document.getElementById("showcaseVideo");
  var svDur = 0, svReady = false;
  if (showcase && sv) {
    sv.addEventListener("loadedmetadata", function () { svDur = sv.duration || 0; svReady = true; });
    // Implicit redă în buclă (mereu cinematic). Scrub-ul preia controlul doar
    // unde browser-ul/host-ul suportă seek (range requests).
    var pl = sv.play(); if (pl && pl.catch) pl.catch(function () {});
  }

  /* ---------- Loop unic de scroll (rAF) — parallax hero, scrub, nav ---------- */
  var heroContent = document.querySelector(".hero__content");
  var heroMedia = document.querySelector(".hero__media");
  var ticking = false;
  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;

    // parallax + fade hero (subtil)
    if (!reduce && heroContent && y < vh) {
      heroContent.style.transform = "translate3d(0," + (y * 0.16) + "px,0)";
      heroContent.style.opacity = Math.max(0, 1 - y / (vh * 0.72));
      if (heroMedia) heroMedia.style.transform = "translate3d(0," + (y * 0.12) + "px,0) scale(1.06)";
    }

    // scroll-scrub showcase video (doar dacă e seekable; altfel rămâne pe loop)
    if (!reduce && showcase && sv && svReady && svDur) {
      var rect = showcase.getBoundingClientRect();
      var total = showcase.offsetHeight - vh;
      var seekEnd = (sv.seekable && sv.seekable.length) ? sv.seekable.end(0) : 0;
      if (total > 0 && rect.top <= 0 && rect.bottom >= 0 && seekEnd > 1) {
        if (!sv.paused) sv.pause();
        var p = Math.min(1, Math.max(0, -rect.top / total));
        try { sv.currentTime = p * (Math.min(svDur, seekEnd) - 0.05); } catch (e) {}
      } else if (rect.bottom < 0 || rect.top > vh) {
        if (sv.paused && seekEnd <= 1) { var p2 = sv.play(); if (p2 && p2.catch) p2.catch(function () {}); }
      }
    }
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame, { passive: true });
  requestFrame();
})();
