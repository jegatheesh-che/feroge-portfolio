# Gallery Redesign & Category Organization Plan
**Project:** Feroge Model Portfolio  
**Target File:** `gallery.html` & `gallery/` asset directory structure  

---

## 📋 Plan Overview

This plan outlines the step-by-step process for organizing model photo assets into category sub-directories and transforming the `gallery.html` page into a dynamic, ultra-professional high-fashion portfolio with interactive filtering.

---

## 📁 1. Folder Structure Setup (User Action)

The project will feature an organized asset structure under a dedicated `gallery/` folder:

```text
feroge model portfolio/
└── gallery/
    ├── monochrome outlook/   <-- Black & white studio & high-contrast shots
    ├── formal/               <-- Suits, tuxedos & formal couture
    ├── editorial/            <-- Fashion magazine lookbooks & concepts
    ├── cinema & films/       <-- Movie stills (Madharasi, The Dorm)
    ├── streetwear/           <-- Urban cobblestone & outdoor looks
    └── portraits/            <-- Studio spotlights & headshots
```

---

## 🛠️ 2. Agent Implementation Steps

Once the user finishes setting up the category folders and adding photo assets, the assistant will execute the following technical implementation:

### A. Asset Scanning & Metadata Linking
* Scan `gallery/` sub-directories for images (`.webp`, `.jpg`, `.png`).
* Dynamically generate gallery card data structures with image paths, category tags, titles, and aspect ratio crop settings.

### B. Category Filter Navigation Bar
* Add a sticky, glassmorphic category filter tab bar below the gallery banner.
* Filter Pills:
  * `All Works`
  * `Monochrome Outlook`
  * `Formal`
  * `Editorial`
  * `Cinema & Films`
  * `Streetwear`
  * `Portraits`
* Include live counter badges on each category tab (e.g., `Monochrome (5)`).

### C. GSAP Animation Engine
* Implement smooth GSAP filtering transitions when switching tabs (opacity fade, scale down/up, and grid reflow).
* Retain ScrollTrigger curtain reveal animations for hero images.

### D. Lightbox Modal Enhancements
* Display category pill badges, image titles, and shoot context in the expanded lightbox viewer.

---

## 🚀 Execution Checklist

- [ ] **Step 1:** User creates `gallery/` folder and category sub-folders with photos.
- [ ] **Step 2:** User notifies assistant.
- [ ] **Step 3:** Assistant scans files and updates `gallery.html`, `style.css`, and `js/main.js`.
- [ ] **Step 4:** Verification & preview testing.
