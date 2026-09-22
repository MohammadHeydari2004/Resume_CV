(function () {
  "use strict";

  /* =====================================================
     Theme
  ===================================================== */

  var STORAGE_KEY = "portfolio-theme";

  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var themeColorMeta = document.getElementById("theme-color");
  var siteHeader = document.querySelector(".site-header");

  var metaThemeColors = {
    light: "#f8fafc",
    dark: "#0b1220",
  };

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function getSystemTheme() {
    if (!window.matchMedia) {
      return "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      return;
    }
  }

  function applyTheme(theme, shouldPersist) {
    if (theme !== "dark" && theme !== "light") {
      theme = "light";
    }

    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-pressed",
        theme === "dark" ? "true" : "false",
      );

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تاریک",
      );
    }

    if (themeColorMeta && metaThemeColors[theme]) {
      themeColorMeta.setAttribute("content", metaThemeColors[theme]);
    }

    if (shouldPersist) {
      persistTheme(theme);
    }
  }

  var storedTheme = getStoredTheme();

  var currentTheme =
    root.getAttribute("data-theme") ||
    (storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : getSystemTheme());

  applyTheme(currentTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      applyTheme(nextTheme, true);
    });
  }

  if (window.matchMedia) {
    var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    var handleSystemThemeChange = function (event) {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };

    if (typeof darkModeQuery.addEventListener === "function") {
      darkModeQuery.addEventListener("change", handleSystemThemeChange);
    } else if (typeof darkModeQuery.addListener === "function") {
      darkModeQuery.addListener(handleSystemThemeChange);
    }
  }

  /* =====================================================
     Header Height
  ===================================================== */

  function debounce(fn, delay) {
    var timer = null;

    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  function setHeaderHeight() {
    if (!siteHeader) {
      return;
    }

    root.style.setProperty(
      "--app-header-height",
      siteHeader.offsetHeight + "px",
    );
  }

  setHeaderHeight();

  window.addEventListener("resize", debounce(setHeaderHeight, 120));
  window.addEventListener("load", setHeaderHeight);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderHeight).catch(function () {
      return true;
    });
  }

  /* =====================================================
     Active Navigation Based on Scroll Snap
  ===================================================== */

  var sections = Array.prototype.slice.call(
    document.querySelectorAll(".snap-section[id]"),
  );

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-list a[href^='#']"),
  );

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var id = (this.getAttribute("href") || "").replace("#", "");

      if (id) {
        setActiveLink(id);
      }
    });
  });

  var initialId = (window.location.hash || "").replace("#", "");

  if (initialId && document.getElementById(initialId)) {
    setActiveLink(initialId);
  } else if (sections.length) {
    setActiveLink(sections[0].id);
  }
})();
