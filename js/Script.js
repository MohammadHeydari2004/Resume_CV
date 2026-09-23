/**
 * ==========================================================================
 * سند معماری منطق کلاینت (Client-Side Logic Architecture)
 * پروژه: پورتفولیوی شخصی محمد حیدری
 * الگوی طراحی: Module Pattern (IIFE) جهت ایزوله‌سازی Scope و جلوگیری از Global Pollution
 * رویکرد عملکردی: Non-blocking, Event-driven, Observer Pattern
 * ==========================================================================
 * @file Script.js
 * @author Mohammad Heydari
 * @version 1.0.0
 */
(function () {
  "use strict";

  /* =====================================================
     ۱. ماژول مدیریت تم (Theme Management Module)
     مسئولیت: همگام‌سازی State تم بین DOM، LocalStorage و System Preferences.
     رعایت استانداردهای WCAG برای تغییر State دکمه‌های Toggle.
  ===================================================== */

  /** @constant {string} STORAGE_KEY - کلید اختصاصی برای ذخیره‌سازی در Web Storage API */
  var STORAGE_KEY = "portfolio-theme";

  // [بهینه‌سازی عملکرد] کش کردن (Caching) ارجاعات DOM در ابتدای اسکریپت
  // جهت جلوگیری از DOM Lookupهای مکرر و پرهزینه در طول چرخه حیات برنامه.
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var themeColorMeta = document.getElementById("theme-color");
  var siteHeader = document.querySelector(".site-header");

  /**
   * @constant {Object.<string, string>} metaThemeColors
   * @description مپینگ رنگ‌های متاتگ theme-color برای تطبیق با نوار آدرس مرورگرهای موبایل (Mobile Browser Chrome).
   */
  var metaThemeColors = {
    light: "#f8fafc",
    dark: "#0b1220",
  };

  /**
   * بازیابی ایمن تم ذخیره‌شده کاربر از LocalStorage
   * @returns {string|null} مقدار تم ('dark' یا 'light') یا null در صورت عدم وجود/خطا
   * @description
   * استفاده از try/catch برای مدیریت حالت‌هایی که LocalStorage در دسترس نیست
   * (مانند حالت Incognito در برخی مرورگرها یا غیرفعال بودن Storage توسط کاربر).
   */
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  /**
   * تشخیص تم پیش‌فرض سیستم‌عامل کاربر از طریق Media Queries Level 5
   * @returns {'light'|'dark'} تم ترجیحی سیستم
   */
  function getSystemTheme() {
    if (!window.matchMedia) {
      return "light"; // Fallback برای مرورگرهای بسیار قدیمی
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /**
   * ذخیره‌سازی ایمن (Safe Persistence) تم در LocalStorage
   * @param {string} theme - تم مورد نظر برای ذخیره
   * @returns {void}
   */
  function persistTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      return; // Silent Fail در صورت پر بودن ظرفیت Storage یا محدودیت‌های امنیتی
    }
  }

  /**
   * اعمال تم به DOM و به‌روزرسانی ویژگی‌های دسترسی‌پذیری (a11y)
   * @param {'light'|'dark'} theme - تم هدف
   * @param {boolean} shouldPersist - آیا این تغییر باید در LocalStorage ذخیره شود؟
   * @description
   * این تابع به عنوان Single Source of Truth برای تغییر تم عمل می‌کند.
   * ۱. تنظیم data-theme برای فعال‌سازی CSS Variables.
   * ۲. به‌روزرسانی aria-pressed و aria-label جهت اطلاع‌رسانی دقیق به Screen Readerها.
   * ۳. تغییر متاتگ theme-color برای یکپارچگی بصری در PWA و مرورگرهای موبایل.
   */
  function applyTheme(theme, shouldPersist) {
    if (theme !== "dark" && theme !== "light") {
      theme = "light";
    }

    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      // به‌روزرسانی State برای فناوری‌های کمکی (Assistive Technologies)
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

    // جلوگیری از Writeهای اضافی در LocalStorage هنگام لود اولیه صفحه
    if (shouldPersist) {
      persistTheme(theme);
    }
  }

  // --- منطق راه‌اندازی اولیه (Initialization Logic) ---
  var storedTheme = getStoredTheme();

  // اولویت‌بندی: ۱. تم فعلی DOM (که در <head> ست شده) ۲. تم ذخیره‌شده ۳. تم سیستم
  var currentTheme =
    root.getAttribute("data-theme") ||
    (storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : getSystemTheme());

  // فراخوانی اولیه بدون ذخیره‌سازی مجدد (چون قبلاً در <head> یا توسط کاربر ست شده است)
  applyTheme(currentTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      // در صورت کلیک کاربر، تم جدید باید Persist شود
      applyTheme(nextTheme, true);
    });
  }

  // --- همگام‌سازی با تغییرات سیستم‌عامل (System Preference Listener) ---
  if (window.matchMedia) {
    var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    /**
     * @param {MediaQueryListEvent} event
     * @description
     * استراتژی احترام به کاربر (User Override Respect):
     * تنها در صورتی تم را با سیستم همگام می‌کند که کاربر قبلاً تمی را "دستی" انتخاب نکرده باشد.
     */
    var handleSystemThemeChange = function (event) {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };

    // [سازگاری بین‌مرورگری] Safari < 14 تنها از addListener پشتیبانی می‌کند
    if (typeof darkModeQuery.addEventListener === "function") {
      darkModeQuery.addEventListener("change", handleSystemThemeChange);
    } else if (typeof darkModeQuery.addListener === "function") {
      darkModeQuery.addListener(handleSystemThemeChange);
    }
  }

  /* =====================================================
     ۲. ماژول محاسبه ارتفاع هدر (Dynamic Header Height Module)
     مسئولیت: محاسبه دقیق ارتفاع هدر و تزریق آن به عنوان CSS Variable.
     این کار برای تنظیم دقیق `scroll-padding-top` و جلوگیری از پنهان شدن محتوا
     زیر هدرِ چسبان (Sticky Header) در هنگام ناوبری با Anchor Linkها حیاتی است.
  ===================================================== */

  /**
   * الگوریتم Debounce برای بهینه‌سازی رویدادهای پرهزینه (High-Frequency Events)
   * @param {Function} fn - تابع هدف
   * @param {number} delay - میزان تاخیر به میلی‌ثانیه
   * @returns {Function} تابع پوشش‌داده‌شده (Debounced Function)
   * @description
   * از اجرای مکرر تابع `setHeaderHeight` در هنگام Resize پنجره جلوگیری کرده
   * و آن را تنها پس از توقف کاربر به مدت ۱۲۰ میلی‌ثانیه اجرا می‌کند (جلوگیری از Layout Thrashing).
   */
  function debounce(fn, delay) {
    var timer = null;

    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /**
   * خواندن ارتفاع هدر و تزریق آن به متغیرهای سراسری CSS
   * @returns {void}
   */
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

  // [جلوگیری از CLS] فونت‌های وب (مانند Vazirmatn) پس از لود شدن ممکن است
  // باعث تغییر ارتفاع هدر (به دلیل تغییر line-height یا font-weight) شوند.
  // این Promise تضمین می‌کند که پس از رندر نهایی فونت، متغیر CSS مجدداً محاسبه شود.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderHeight).catch(function () {
      return true; // Silent Fail
    });
  }

  /* =====================================================
     ۳. ماژول ناوبری فعال بر اساس اسکرول (Scroll Spy / Active Navigation)
     مسئولیت: تشخیص بخش (Section) فعلی در Viewport و فعال‌سازی لینک متناظر.
     معماری: استفاده از IntersectionObserver API به جای رویداد `scroll`
     جهت جلوگیری از مسدود شدن Main Thread (Main Thread Blocking) و افت FPS.
  ===================================================== */

  // [سازگاری ES5] تبدیل NodeList به Array جهت استفاده از متدهای آرایه‌ای (جایگزین Array.from)
  var sections = Array.prototype.slice.call(
    document.querySelectorAll(".snap-section[id]"),
  );

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-list a[href^='#']"),
  );

  /**
   * به‌روزرسانی State لینک‌های ناوبری و ویژگی‌های ARIA
   * @param {string} id - شناسه (ID) بخش فعال
   * @description
   * استفاده از `aria-current="page"` یک استاندارد WAI-ARIA برای اعلام صفحه/بخش فعلی
   * به فناوری‌های کمکی (Assistive Technologies) است.
   */
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

  /**
   * تنظیمات پیشرفته IntersectionObserver
   * @description
   * شاهکار مهندسی در `rootMargin: "-45% 0px -45% 0px"`:
   * این مقدار، ناحیه تشخیص (Intersection Box) را به ۱۰٪ مرکزیِ Viewport محدود می‌کند.
   * در نتیجه، یک بخش تنها زمانی "فعال" در نظر گرفته می‌شود که دقیقاً از مرکز صفحه عبور کند.
   * این تکنیک از تغییر وضعیت سریع و پرش (Flickering) بین لینک‌ها هنگام اسکرول جلوگیری می‌کند.
   */
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

  // مدیریت کلیک روی لینک‌ها برای به‌روزرسانی فوری State (پیش از اسکرول)
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var id = (this.getAttribute("href") || "").replace("#", "");

      if (id) {
        setActiveLink(id);
      }
    });
  });

  // --- تعیین State اولیه بر اساس URL Hash ---
  var initialId = (window.location.hash || "").replace("#", "");

  if (initialId && document.getElementById(initialId)) {
    setActiveLink(initialId);
  } else if (sections.length) {
    setActiveLink(sections[0].id); // Fallback به اولین بخش در صورت عدم وجود Hash
  }
})();
