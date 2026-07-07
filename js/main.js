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
  document.querySelectorAll("[data-facebook]").forEach(function (el) {
    if (cfg.facebook) { el.setAttribute("href", cfg.facebook); el.hidden = false; }
  });
  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    if (cfg.instagram) { el.setAttribute("href", cfg.instagram); el.hidden = false; }
  });
  document.querySelectorAll("[data-youtube]").forEach(function (el) {
    if (cfg.youtube) { el.setAttribute("href", cfg.youtube); el.hidden = false; }
  });
  document.querySelectorAll("[data-maps-link]").forEach(function (el) {
    var q = [cfg.addressStreet, cfg.addressCity, cfg.addressRegion].filter(Boolean).join(", ");
    el.setAttribute("href", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q || "Pitești"));
  });

  /* ---------- Hartă (OpenStreetMap — fără cheie, fără consimțământ EU) ---------- */
  (function () {
    var holder = document.getElementById("mapHolder");
    if (!holder) return;
    var src = cfg.mapsEmbed;
    if (!src && cfg.geoLat && cfg.geoLng) {
      var lat = parseFloat(cfg.geoLat), lon = parseFloat(cfg.geoLng);
      var bbox = (lon - 0.012) + "," + (lat - 0.006) + "," + (lon + 0.012) + "," + (lat + 0.006);
      src = "https://www.openstreetmap.org/export/embed.html?bbox=" + encodeURIComponent(bbox) +
            "&layer=mapnik&marker=" + lat + "," + lon;
    }
    if (src) {
      holder.innerHTML = '<iframe src="' + src + '" loading="lazy" title="Hartă — Creșă Pitești" ' +
        'referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    }
  })();

  /* ---------- An curent în footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Cookie banner ---------- */
  var cookieBar = document.getElementById("cookieBar");
  if (cookieBar) {
    var accepted = false;
    try { accepted = !!localStorage.getItem("cookieOk"); } catch (e) {}
    if (!accepted) cookieBar.hidden = false;
    var ca = document.getElementById("cookieAccept");
    if (ca) ca.addEventListener("click", function () {
      try { localStorage.setItem("cookieOk", "1"); } catch (e) {}
      cookieBar.hidden = true;
    });
  }

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

  /* ---------- Galerie: filtre + slider ---------- */
  (function () {
    var track = document.getElementById("galleryTrack");
    if (!track) return;
    var slides = [].slice.call(track.querySelectorAll(".slide"));
    var prev = document.getElementById("galPrev");
    var next = document.getElementById("galNext");
    var filters = document.getElementById("galleryFilters");

    function step() {
      var s = track.querySelector(".slide:not(.is-hidden)");
      return s ? s.getBoundingClientRect().width + 16 : 320;
    }
    function go(dir) { track.scrollBy({ left: dir * step(), behavior: "smooth" }); }

    var paused = false, resumeT = null;
    function holdPause() { paused = true; clearTimeout(resumeT); resumeT = setTimeout(function () { paused = false; }, 10000); }

    if (next) next.addEventListener("click", function () { go(1); holdPause(); });
    if (prev) prev.addEventListener("click", function () { go(-1); holdPause(); });

    // filtre pe categorii
    if (filters) {
      filters.addEventListener("click", function (e) {
        var btn = e.target.closest(".gfilter");
        if (!btn) return;
        var cat = btn.getAttribute("data-filter");
        filters.querySelectorAll(".gfilter").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        slides.forEach(function (s) {
          var show = cat === "toate" || s.getAttribute("data-cat") === cat;
          s.classList.toggle("is-hidden", !show);
        });
        track.scrollTo({ left: 0, behavior: "smooth" });
        holdPause();
      });
    }

    // autoplay lejer (oprit pe reduced-motion)
    if (!reduce) {
      setInterval(function () {
        if (paused) return;
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 6) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else { go(1); }
      }, 4600);
      track.addEventListener("mouseenter", function () { paused = true; });
      track.addEventListener("mouseleave", function () { paused = false; });
      track.addEventListener("pointerdown", holdPause, { passive: true });
      track.addEventListener("touchstart", holdPause, { passive: true });
    }
  })();

  /* ---------- Testimonials slider (autoplay + swipe) ---------- */
  (function () {
    var track = document.getElementById("tTrack");
    if (!track) return;
    function step() { var c = track.querySelector(".tcard"); return c ? c.getBoundingClientRect().width + 18 : 360; }
    var paused = false, resumeT = null;
    function hold() { paused = true; clearTimeout(resumeT); resumeT = setTimeout(function () { paused = false; }, 9000); }
    var tPrev = document.getElementById("tPrev"), tNext = document.getElementById("tNext");
    if (tNext) tNext.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); hold(); });
    if (tPrev) tPrev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); hold(); });
    if (!reduce) {
      setInterval(function () {
        if (paused) return;
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 6) track.scrollTo({ left: 0, behavior: "smooth" });
        else track.scrollBy({ left: step(), behavior: "smooth" });
      }, 5200);
      track.addEventListener("mouseenter", function () { paused = true; });
      track.addEventListener("mouseleave", function () { paused = false; });
      track.addEventListener("pointerdown", hold, { passive: true });
      track.addEventListener("touchstart", hold, { passive: true });
    }
  })();

  /* ---------- Hero video: pornire robustă + fallback ---------- */
  var hero = document.getElementById("heroVideo");
  if (hero) {
    hero.addEventListener("error", function () { hero.style.display = "none"; });
    if (!reduce) {
      hero.muted = true; hero.setAttribute("muted", "");
      var tryPlay = function () { var p = hero.play(); if (p && p.catch) p.catch(function () {}); };
      tryPlay();
      // reîncearcă la prima interacțiune (unele browsere blochează autoplay-ul)
      ["touchstart", "click", "scroll"].forEach(function (ev) {
        window.addEventListener(ev, tryPlay, { once: true, passive: true });
      });
    }
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

  /* ---------- Showcase: secvență de cadre derulată la scroll (fluid pe mobil) ---------- */
  (function () {
    var showcase = document.querySelector(".showcase");
    var canvas = document.getElementById("seqCanvas");
    if (!showcase || !canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var FRAMES = 72;
    function pad(n) { return ("00" + n).slice(-3); }
    var imgs = new Array(FRAMES);
    var started = false, inView = false, raf = null;
    var curr = 0, target = 0;

    // Dimensiunile containerului fixat (nu window.innerHeight — pe iOS 100vh ≠ innerHeight)
    function dims() {
      var s = canvas.parentElement;
      return { w: (s && s.clientWidth) || window.innerWidth, h: (s && s.clientHeight) || window.innerHeight };
    }
    function sizeCanvas() {
      var d = dims();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(d.w * dpr); canvas.height = Math.round(d.h * dpr);
      // fără canvas.style.width/height inline — CSS-ul (inset:0; 100%) umple exact containerul
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(i) {
      var img = imgs[Math.max(0, Math.min(FRAMES - 1, Math.round(i)))];
      if (!img || !img.complete || !img.naturalWidth) return;
      var d = dims(); var cw = d.w, ch = d.h;
      ctx.fillStyle = "#0e2330";            // fundal opac: elimină orice rest din cadrul anterior
      ctx.fillRect(0, 0, cw + 1, ch + 1);
      var ir = img.naturalWidth / img.naturalHeight, cr = cw / ch, dw, dh, dx, dy;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      ctx.drawImage(img, dx, dy, dw, dh);
    }
    function ensureSize() {
      var d = dims();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(d.w * dpr) || canvas.height !== Math.round(d.h * dpr)) sizeCanvas();
    }
    function preload() {
      if (started) return; started = true;
      sizeCanvas();
      for (var i = 0; i < FRAMES; i++) {
        (function (k) {
          var im = new Image();
          im.decoding = "async";
          im.onload = function () { if (k === 0) draw(0); };
          im.src = "assets/img/seq/f" + pad(k + 1) + ".webp";
          imgs[k] = im;
        })(i);
      }
    }
    function progress() {
      var r = showcase.getBoundingClientRect();
      var total = showcase.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      return Math.min(1, Math.max(0, -r.top / total));
    }
    function tick() {
      ensureSize();
      target = progress() * (FRAMES - 1);
      if (reduce) { curr = target; draw(curr); raf = null; return; }
      curr += (target - curr) * 0.18;
      if (Math.abs(target - curr) < 0.04) curr = target;
      draw(curr);
      raf = inView ? requestAnimationFrame(tick) : null;
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          inView = e.isIntersecting;
          if (e.isIntersecting) { preload(); if (!raf) raf = requestAnimationFrame(tick); }
        });
      }, { rootMargin: "600px 0px" });
      io.observe(showcase);
    } else { preload(); inView = true; raf = requestAnimationFrame(tick); }

    window.addEventListener("resize", function () { if (started) { sizeCanvas(); draw(curr); } }, { passive: true });
  })();

  /* ---------- Reels: autoplay când intră în ecran ---------- */
  (function () {
    var vids = document.querySelectorAll(".reel video");
    if (!vids.length) return;

    /* pe desktop, clipurile se mută în rândul grupat; pe mobil, între secțiuni */
    var slots = document.querySelectorAll(".reelbreak");
    var deskRow = document.getElementById("reelsRow");
    var mqDesk = window.matchMedia("(min-width: 761px)");
    function placeReels() {
      var reels = document.querySelectorAll("figure.reel");
      if (deskRow && mqDesk.matches) {
        reels.forEach(function (r) { deskRow.appendChild(r); });
      } else {
        slots.forEach(function (s, i) { if (reels[i]) s.appendChild(reels[i]); });
      }
    }
    placeReels();
    if (mqDesk.addEventListener) mqDesk.addEventListener("change", placeReels);
    else if (mqDesk.addListener) mqDesk.addListener(placeReels);

    /* preîncărcare din timp: când clipul se apropie la ~900px, începe descărcarea */
    if ("IntersectionObserver" in window && !reduce) {
      var ioPre = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var v = en.target;
            if (v.preload === "none") { v.preload = "auto"; v.load(); }
            ioPre.unobserve(v);
          }
        });
      }, { rootMargin: "900px 0px" });
      vids.forEach(function (v) { ioPre.observe(v); });
    }
    if (reduce) {
      vids.forEach(function (v) { v.setAttribute("controls", ""); v.setAttribute("preload", "metadata"); });
      return;
    }
    var tryPlayReel = function (v) {
      var p = v.play();
      if (p && p.catch) p.catch(function () {
        // clipul încă se încarcă (preload=none) — reîncearcă atunci când are date
        v.addEventListener("loadeddata", function () {
          if (v.getAttribute("data-inview") === "1") { var p2 = v.play(); if (p2 && p2.catch) p2.catch(function () {}); }
        }, { once: true });
      });
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target;
          if (en.isIntersecting && en.intersectionRatio >= 0.35) {
            v.setAttribute("data-inview", "1");
            tryPlayReel(v);
          } else {
            v.setAttribute("data-inview", "0");
            if (!v.paused) v.pause();
          }
        });
      }, { threshold: [0, 0.35, 1] });
      vids.forEach(function (v) { io.observe(v); });
    } else {
      vids.forEach(function (v) { v.setAttribute("controls", ""); });
    }
    document.querySelectorAll(".reel__sound").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var v = btn.parentElement.querySelector("video");
        if (!v) return;
        v.muted = !v.muted;
        btn.textContent = v.muted ? "🔇" : "🔊";
        btn.setAttribute("aria-label", v.muted ? "Pornește sunetul" : "Oprește sunetul");
        if (!v.muted && v.getAttribute("data-inview") === "1") { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      });
    });
  })();

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

  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame, { passive: true });
  requestFrame();
})();
