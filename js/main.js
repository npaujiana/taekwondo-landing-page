/* ==========================================================================
   main.js — entry tunggal, tanpa dependensi, < 4KB gz.
   Modul (IIFE per fitur):
     01 Header   — solid saat scroll + hamburger mobile
     02 Gallery  — <dialog> lightbox (Esc + klik luar menutup)
     03 Map      — klik-untuk-muat (jaga LCP)
     04 Form     — Web3Forms + honeypot + state sukses/error
     05 Counters — Animasi stat counter smooth saat masuk viewport
     06 Misc     — tahun otomatis
   ========================================================================== */
(() => {
  "use strict";

  /* -- 01 Header -- */
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");

  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  /* -- 02 Gallery lightbox -- */
  const dialog = document.getElementById("lightbox");
  const dlgImg = document.getElementById("lightboxImg");
  const dlgCap = document.getElementById("lightboxCap");
  const dlgClose = document.getElementById("lightboxClose");

  document.getElementById("galleryList")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-full]");
    if (!btn || !dialog) return;
    const thumb = btn.querySelector("img");
    dlgImg.src = btn.dataset.full;
    dlgImg.alt = thumb?.alt ?? "";
    dlgCap.textContent = btn.dataset.cap ?? "";
    dialog.showModal();
  });
  dlgClose?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close(); // klik backdrop menutup
  });

  /* -- 03 Map lazy: jangan bebani LCP dengan iframe Google Maps -- */
  const mapBox = document.getElementById("mapLazy");
  const mapBtn = document.getElementById("mapBtn");
  const MAP_SRC =
    "https://www.google.com/maps?q=1420+Pacific+Hwy+Sydney+NSW+2060+Australia&output=embed";
  const loadMap = () => {
    if (!mapBox || mapBox.dataset.loaded) return;
    mapBox.dataset.loaded = "1";
    mapBox.innerHTML =
      '<iframe title="Map to Baekho Martial Arts Academy, 1420 Pacific Hwy Sydney NSW Australia" src="' +
      MAP_SRC +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  };
  mapBtn?.addEventListener("click", loadMap);
  if ("IntersectionObserver" in window && mapBox) {
    new IntersectionObserver((entries, obs) => {
      if (entries.some((en) => en.isIntersecting)) {
        obs.disconnect();
      }
    }).observe(mapBox);
  }

  /* -- 04 Form: Web3Forms + honeypot + rate-limit sederhana -- */
  const form = document.getElementById("trialForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("formSubmit");
  let lastSubmit = 0;

  const say = (msg, kind) => {
    if (!status) return;
    status.textContent = msg;
    status.className = "form__status " + (kind === "ok" ? "is-success" : "is-error");
  };

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Honeypot: bot mengisi field "company" → diam-diam anggap sukses
    if (form.company?.value) {
      say("Thanks — we'll reply within one business day.", "ok");
      form.reset();
      return;
    }
    // Rate limit: max 1x per 10 detik
    if (Date.now() - lastSubmit < 10_000) {
      say("Please wait a few seconds before sending again.", "err");
      return;
    }
    lastSubmit = Date.now();

    const key = form.dataset.web3formsKey ?? "";
    const data = Object.fromEntries(new FormData(form).entries());

    // Demo tanpa key: jangan error diam — arahkan ke WhatsApp sebagai fallback
    if (!key || key.includes("PASTE_")) {
      say("Demo mode: form needs a Web3Forms key. Meanwhile, reach us via WhatsApp below — we reply fast.", "err");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: key, subject: "Free trial request — Baekho TKD", ...data }),
      });
      if (!res.ok) throw new Error("http " + res.status);
      say("Thanks — we'll reply within one business day.", "ok");
      form.reset();
    } catch {
      say("Something went wrong (are you offline?). Try WhatsApp or call us directly.", "err");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Claim Free Trial Pass →";
    }
  });

  /* -- 05 Stat Counters Animation (Smooth Ease-Out on Scroll) -- */
  const counters = document.querySelectorAll("[data-counter]");
  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);
        const target = parseFloat(el.dataset.counter);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const isDecimal = target % 1 !== 0;
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
          const current = progress === 1 ? target : (target * ease);
          el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.25 });
    counters.forEach((c) => counterObserver.observe(c));
  }

  /* -- 06 Misc -- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
