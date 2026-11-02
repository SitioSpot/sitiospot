/* =====================================================================
   main.js  -  the site's behavior
   ---------------------------------------------------------------------
   Loaded on every page AFTER config.js (see the <script> tags in HTML).
   It does five small jobs:
     1. Fill the page with values from config.js
     2. Build working WhatsApp / email / maps / social links
     3. Open and close the mobile menu
     4. Remember the visitor's language (localStorage)
     5. On the language-choice page, jump to the remembered language
   The page still works without JavaScript; this just upgrades it.
   ===================================================================== */
(function () {
  "use strict"; // helps catch mistakes early

  var CFG = window.SITIO_CONFIG || {};
  var STORAGE_KEY = "sitiospot-lang";

  // The page's language comes from <html lang="es"> or <html lang="en">.
  var LANG = document.documentElement.lang === "en" ? "en" : "es";

  /* ---------- Helpers ---------- */

  // Read "prices.from" from the config object.
  function getPath(obj, path) {
    return path.split(".").reduce(function (o, key) {
      return o && o[key] !== undefined ? o[key] : undefined;
    }, obj);
  }

  // If a value looks like { es: "...", en: "..." }, pick the page's language.
  function pick(value) {
    if (value && typeof value === "object" && ("es" in value || "en" in value)) {
      return value[LANG];
    }
    return value;
  }

  // localStorage can fail (private mode, blocked cookies), so always try/catch.
  function saveLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
  }
  function savedLang() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === "es" || v === "en" ? v : null;
    } catch (e) { return null; }
  }

  /* ---------- 1. Fill text from config.js ---------- */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var value = pick(getPath(CFG, el.getAttribute("data-config")));
    if (value) { el.textContent = value; }
  });

  // Current year in the footer.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 2. Links ---------- */

  // WhatsApp: https://wa.me/<digits>?text=<message>
  if (CFG.whatsapp) {
    var message = pick(CFG.whatsappMessage) || "";
    var waUrl = "https://wa.me/" + CFG.whatsapp +
      (message ? "?text=" + encodeURIComponent(message) : "");
    document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
      a.href = waUrl;
    });
  }

  // Email: stays hidden unless config.js has an address.
  if (CFG.email) {
    document.querySelectorAll("[data-email]").forEach(function (a) {
      a.href = "mailto:" + CFG.email;
      a.textContent = CFG.email;
    });
    document.querySelectorAll("[data-email-wrapper]").forEach(function (el) {
      el.hidden = false;
    });
  }

  // Google Maps link.
  if (CFG.mapsUrl) {
    document.querySelectorAll("[data-maps]").forEach(function (a) {
      a.href = CFG.mapsUrl;
    });
  }

  // Social links: each one appears only if it has a URL in config.js.
  if (CFG.social) {
    document.querySelectorAll("[data-social]").forEach(function (a) {
      var url = CFG.social[a.getAttribute("data-social")];
      if (url) { a.href = url; a.hidden = false; }
    });
  }

  /* ---------- 3. Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label",
        toggle.getAttribute(open ? "data-label-close" : "data-label-open"));
      menu.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setOpen(false); }
    });

    // Close with the Escape key and return focus to the button.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- 4. Remember the language ---------- */
  // Any link with data-lang-choice="es" or "en" saves that choice on click.
  document.querySelectorAll("[data-lang-choice]").forEach(function (a) {
    a.addEventListener("click", function () {
      saveLang(a.getAttribute("data-lang-choice"));
    });
  });

  /* ---------- 5. Language-choice page (/) ---------- */
  // If the visitor already chose a language, send them there.
  // Add ?choose to the address (index.html?choose) to see the choice page again.
  if (document.body.hasAttribute("data-chooser")) {
    var saved = savedLang();
    if (saved && location.search.indexOf("choose") === -1) {
      location.replace(saved + "/"); // relative path: works under /sitiospot/
    }
  }
})();
