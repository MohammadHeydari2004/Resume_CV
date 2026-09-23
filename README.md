<div align="center" dir="rtl">

# 🌐 پورتفولیو شخصی محمد حیدری

### معماری فرانت‌اند مدرن، دسترسی‌پذیر و بدون وابستگی (Zero-Dependency)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WCAG 2.1](https://img.shields.io/badge/WCAG_2.1-AA_Compliant-green?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100/100-brightgreen?style=for-the-badge&logo=lighthouse)](https://developer.chrome.com/docs/lighthouse/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

</div>

---

<div dir="rtl">

## 📖 ۱. مقدمه و چشم‌انداز (Overview & Vision)

این مخزن (Repository) حاوی کد منبع وب‌سایت پورتفولیوی شخصی **محمد حیدری**، توسعه‌دهنده فرانت‌اند است. هدف از پیاده‌سازی این پروژه، خلق یک تجربه وب **تک‌صفحه‌ای (SPA)**، **بسیار سریع** و **کاملاً دسترس‌پذیر** بوده است که بدون استفاده از فریم‌ورک‌های سنگین (مانند React یا Vue) و ابزارهای بیلد (مانند Webpack یا Vite)، قدرت خالص وب مدرن (Vanilla Web Platform) را به رخ بکشد.

تمرکز اصلی این پروژه بر روی **معماری تمیز (Clean Architecture)**، **بهینه‌سازی مسیر رندر بحرانی (Critical Rendering Path)** و **رعایت دقیق استانداردهای W3C و WAI-ARIA** است.

---

## 🏗️ ۲. شاهکارهای مهندسی و معماری (Engineering Highlights)

این پروژه صرفاً یک قالب HTML/CSS نیست؛ بلکه مجموعه‌ای از راه‌حل‌های مهندسی برای چالش‌های رایج فرانت‌اند است:

### 🌗 الف) مدیریت تم و جلوگیری از FOUC

برای جلوگیری از پدیده **Flash of Unstyled Content (FOUC)** هنگام تغییر تم تاریک/روشن، منطق تشخیص تم (`prefers-color-scheme` و `localStorage`) به صورت **همگام (Synchronous)** و **Inline** در تگ `<head>` اجرا می‌شود. این کار تضمین می‌کند که پیش از اولین رندر مرورگر (First Paint)، کلاس‌ها و متغیرهای CSS صحیح روی DOM اعمال شده باشند.

### 👁️ ب) ناوبری هوشمند و غیرمسدودکننده (Non-Blocking Scroll Spy)

به جای استفاده از رویداد پرهزینه `window.onscroll` که باعث مسدود شدن Main Thread و افت FPS می‌شود، از **`IntersectionObserver API`** استفاده شده است.

> **ترفند مهندسی:** با تنظیم `rootMargin: "-45% 0px -45% 0px"`، ناحیه تشخیص به ۱۰٪ مرکزی Viewport محدود شده تا از پرش (Flickering) لینک‌های فعال در هنگام اسکرول سریع جلوگیری شود.

### 📐 ج) سیستم طراحی مبتنی بر توکن (Tokenized Design System)

مدیریت رنگ‌ها، سایه‌ها و تایپوگرافی از طریق **CSS Custom Properties** در دو لایه `Primitive` و `Semantic` انجام شده است. این معماری، تغییر تم (Theming) را بدون نیاز به دستکاری در منطق کامپوننت‌ها و با کمترین سربار ممکن (Reflow/Repaint) امکان‌پذیر می‌سازد.

### 📏 د) محاسبه پویای ارتفاع هدر و جلوگیری از CLS

برای جلوگیری از پنهان شدن محتوا زیر هدر چسبان (Sticky Header) هنگام ناوبری با Anchor Linkها، ارتفاع هدر توسط جاوااسکریپت محاسبه و در متغیر `--app-header-height` تزریق می‌شود. این محاسبه به رویداد `document.fonts.ready` متصل است تا از جابجایی چیدمان (CLS) پس از لود فونت وزیرمتن جلوگیری کند.

### 🌍 ه) پشتیبانی بومی از RTL و Writing Modes

استفاده گسترده از **Logical Properties** (مانند `margin-inline`, `inset-block-start`, `inline-size`) به جای ویژگی‌های فیزیکی (`left`, `right`, `width`) برای تضمین سازگاری کامل با زبان‌های راست‌چین و چپ‌چین. همچنین استفاده از `unicode-bidi: plaintext` برای جلوگیری از به‌هم‌ریختگی متون LTR (مانند ایمیل و کدها) در محیط RTL.

---

## 🛠️ ۳. پشته فناوری و استانداردها (Tech Stack)

</div>

| دسته‌بندی       | فناوری‌ها و استانداردهای به‌کار رفته                                         |
| :-------------- | :--------------------------------------------------------------------------- |
| **Markup**      | Semantic HTML5, WAI-ARIA 1.2, Open Graph Protocol                            |
| **Styling**     | CSS3 (Grid, Flexbox, Custom Properties, `clamp()`, `min()`, Scroll Snap API) |
| **Logic**       | Vanilla JS (ES5/ES6+ Compatible, IIFE Module Pattern, Web Storage API)       |
| **Typography**  | Vazirmatn (Variable Font via Google Fonts with `preconnect` optimization)    |
| **Performance** | LCP Optimization, `loading="eager"`, `decoding="async"`, Debouncing          |

---

<div dir="rtl">

## 📂 ۴. ساختار دایرکتوری‌ها (Directory Structure)

</div>

```text
portfolio/
├── css/
│   └── Style.css          # سیستم طراحی، توکن‌ها، ریست‌ها و کوئری‌های واکنش‌گرا (Mobile-First)
├── Images/
│   └── profile.jpg        # دارایی‌های تصویری بهینه‌شده (Aspect-Ratio preserved)
├── js/
│   └── Script.js          # منطق سمت کلاینت (Theme, Header Height, Scroll-Spy)
├── .gitignore             # قوانین کنترل نسخه (نادیده‌گیری node_modules, dist, IDE configs)
├── index.html             # نقطه ورود، ساختار معنایی و Landmarkهای دسترسی‌پذیر
├── LICENSE                # پروانه نرم‌افزاری MIT
└── README.md              # مستندات جامع پروژه (فایل فعلی)
```

---

<div dir="rtl">

## ⚡ ۵. عملکرد و دسترسی‌پذیری (Performance & Accessibility)

### 🚀 شاخص‌های Core Web Vitals

- **LCP (Largest Contentful Paint):** بهینه‌سازی شده از طریق `loading="eager"` برای تصویر پروفایل و `preconnect` برای سرورهای فونت.
- **CLS (Cumulative Layout Shift):** صفر (0)؛ به دلیل تعیین صریح `width` و `height` برای تصاویر و مدیریت پویای ارتفاع هدر.
- **INP (Interaction to Next Paint):** حداقلی؛ به دلیل عدم مسدودسازی Main Thread و استفاده از `IntersectionObserver`.

### ♿ انطباق با WCAG 2.1 (سطح AA)

- **مدیریت فوکوس:** استفاده از `:focus-visible` برای نمایش حلقه فوکوس تنها هنگام ناوبری با کیبورد.
- **Screen Readers:** استفاده از `aria-label`, `aria-pressed`, `aria-current="page"` و `aria-hidden="true"` برای آیکون‌های تزئینی.
- **حرکت ایمن:** پشتیبانی از `@media (prefers-reduced-motion: reduce)` برای کاربران حساس به انیمیشن.

---

## 🚀 ۶. راهنمای راه‌اندازی (Setup & Run)

با توجه به معماری **Zero-Dependency** این پروژه، نیازی به نصب `Node.js` یا اجرای `npm install` نیست.

1. **شبیه‌سازی مخزن (Clone):**

</div>

```bash
git clone https://github.com/MohammadHeydari2004/your-repo-name.git
cd your-repo-name
```

<div dir="rtl">

1. **اجرای محلی (Local Server):**
   برای جلوگیری از محدودیت‌های CORS و `localStorage` در پروتکل `file://`، توصیه می‌شود از یک سرور محلی استفاده کنید:
   - **VS Code:** نصب افزونه **Live Server** و کلیک راست روی `index.html`.
   - **Python 3:** اجرای دستور `python -m http.server 8000` در ترمینال.
   - **Node.js:** اجرای دستور `npx serve`.

---

## 🧠 ۷. ثبت تصمیمات معماری (Architecture Decision Records - ADR)

</div>

| شناسه       | تصمیم معماری                            | دلیل فنی (The "Why")                                                               |
| :---------- | :-------------------------------------- | :--------------------------------------------------------------------------------- |
| **ADR-001** | اجرای Inline اسکریپت تم در `<head>`     | جلوگیری از FOUC و پرش رنگ در اولین رندر مرورگر.                                    |
| **ADR-002** | استفاده از `scroll-snap-type` در دسکتاپ | ایجاد تجربه Full-Page و مدرن بدون نیاز به کتابخانه‌های سنگین JS.                   |
| **ADR-003** | عدم استفاده از فریم‌ورک (React/Vue)     | به حداقل رساندن حجم Bundle (زیر 50KB) و دستیابی به بالاترین امتیاز Lighthouse.     |
| **ADR-004** | استفاده از `Array.prototype.slice.call` | تضمین اجرای کد در مرورگرهای قدیمی‌تر (ES5 Fallback) بدون نیاز به Babel/Transpiler. |

---

<div dir="rtl">

## 📬 ۸. راه‌های ارتباطی (Contact)

جهت همکاری‌های حرفه‌ای، مشاوره فنی یا بررسی فرصت‌های شغلی، می‌توانید از طریق کانال‌های زیر با اینجانب در ارتباط باشید:

- **پست الکترونیک:** [mh348797@gmail.com](mailto:mh348797@gmail.com)
- **تماس مستقیم:** [+98 910 540 3918](tel:+989105403918)
- **پروفایل گیت‌هاب:** [MohammadHeydari2004](https://github.com/MohammadHeydari2004)
- **پروفایل لینکدین:** [Mohammad Heydari](https://www.linkedin.com/in/mohammad-h-6044b8268/)

</div>

---

<div align="center">

### ⚖️ مجوز (License)

این پروژه تحت پروانه‌ی **MIT** منتشر شده است. استفاده، کپی، و تغییر کد با ذکر منبع بلامانع است.

**© ۱۴۰۵ هجری شمسی - محمد حیدری. تمامی حقوق محفوظ است.**

</div>
