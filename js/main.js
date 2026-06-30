/* ============================================================
   main.js — interacțiuni + injectarea datelor din config.js
   ============================================================ */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};

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

  /* ---------- Hero video: oprește pe reduced-motion / fallback ---------- */
  var hero = document.getElementById("heroVideo");
  if (hero) {
    hero.addEventListener("error", function () { hero.style.display = "none"; });
  }
})();
