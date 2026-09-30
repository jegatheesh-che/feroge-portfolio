/**
 * FEROGE — Luxury High Fashion Portfolio
 * Main Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Navigation Highlighting & Fixed Header Scrolled State
  const siteHeader = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  // 2. Mobile Drawer Navigation & Morphing Hamburger
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    if (menuToggleBtn) menuToggleBtn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    if (menuToggleBtn) menuToggleBtn.classList.remove('is-active');
    document.body.style.overflow = 'auto';
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Hero Section Zoom Slideshow Auto-Rotation
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.slide-dot');
  let currentSlideIndex = 0;
  let slideInterval;

  function showSlide(index) {
    if (index === currentSlideIndex) return;

    heroSlides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('prev-active');
        slide.classList.remove('active');
        setTimeout(() => {
          slide.classList.remove('prev-active');
        }, 1100);
      } else if (i === index) {
        slide.classList.add('active');
        slide.classList.remove('prev-active');
      } else {
        slide.classList.remove('active', 'prev-active');
      }
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % heroSlides.length;
    showSlide(nextIndex);
  }

  function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 2000);
  }

  if (heroSlides.length > 0) {
    startSlideShow();

    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index, 10);
        showSlide(index);
        startSlideShow();
      });
    });
  }

  // 4. Moodboard Interactions & Universal "Click to View" Lightbox System
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const mbExpandBtn = document.getElementById('mb-expand-btn');
  const mbShuffleBtn = document.getElementById('mb-shuffle-btn');

  function openLightbox(src) {
    if (src && lightbox && lightboxImg) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Universal Click to View Initializer across ALL pages
  const photoSelectors = [
    '.moodboard-item',
    '.arc-card',
    '.compcard-photo-card',
    '.poster-photo-card',
    '.mid-photo-card',
    '.cluster-hero-box',
    '.subgrid-card',
    '.magazine-photo-window',
    '.teaser-image-wrap',
    '.gallery-card-item'
  ];

  const clickableItems = document.querySelectorAll(photoSelectors.join(', '));

  clickableItems.forEach(item => {
    const img = item.querySelector('img');
    const src = item.dataset.src || (img ? img.getAttribute('src') : null);

    if (src) {
      item.style.cursor = 'pointer';
      if (!item.dataset.src) item.dataset.src = src;

      // Inject sleek "Click to View" badge if absent
      if (!item.querySelector('.click-to-view-hint') && !item.querySelector('.photo-caption-overlay')) {
        const hint = document.createElement('div');
        hint.className = 'click-to-view-hint';
        hint.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>Click to View</span>
        `;
        item.appendChild(hint);
      }

      item.addEventListener('click', () => {
        openLightbox(item.dataset.src);
      });
    }
  });

  // Category Filtering Logic with GSAP Animations
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const galleryItems = document.querySelectorAll('.gallery-card-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active tab style
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.dataset.filter;

        galleryItems.forEach(item => {
          const itemCategory = item.dataset.category;
          const isMatch = selectedCategory === 'all' || itemCategory === selectedCategory;

          if (typeof gsap !== 'undefined') {
            if (isMatch) {
              item.style.display = 'block';
              gsap.fromTo(item, 
                { opacity: 0, scale: 0.92, y: 15 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform' }
              );
            } else {
              gsap.to(item, {
                opacity: 0,
                scale: 0.92,
                y: 15,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                  item.style.display = 'none';
                }
              });
            }
          } else {
            item.style.display = isMatch ? 'block' : 'none';
          }
        });
      });
    });
  }


  if (mbExpandBtn) {
    mbExpandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const heroPhoto = document.querySelector('.item-hero-photo');
      const src = heroPhoto ? heroPhoto.dataset.src : 'images/feroge_34.webp';
      openLightbox(src);
    });
  }

  // Curated look sets for shuffling editorial looks
  const editorialSets = [
    {
      hero: 'images/feroge_79.webp',
      wide: 'images/feroge_19.webp',
      tall: 'images/feroge_76.webp',
      bottomLeft: 'images/feroge_18.webp',
      bottomCenter: 'images/feroge_78.webp'
    },
    {
      hero: 'images/feroge_21.webp',
      wide: 'images/feroge_19.webp',
      tall: 'images/feroge_10.webp',
      bottomLeft: 'images/feroge_73.webp',
      bottomCenter: 'images/feroge_2.webp'
    },
    {
      hero: 'images/feroge_73.webp',
      wide: 'images/feroge_19.webp',
      tall: 'images/feroge_21.webp',
      bottomLeft: 'images/feroge_12.webp',
      bottomCenter: 'images/feroge_76.webp'
    }
  ];

  let currentSetIndex = 0;

  if (mbShuffleBtn) {
    mbShuffleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSetIndex = (currentSetIndex + 1) % editorialSets.length;
      const set = editorialSets[currentSetIndex];

      const heroEl = document.querySelector('.item-hero-photo');
      const wideEl = document.querySelector('.item-wide-photo');
      const tallEl = document.querySelector('.item-tall-photo');
      const bLeftEl = document.querySelector('.item-bottom-left');
      const bCenterEl = document.querySelector('.item-bottom-center');

      function updatePhoto(el, newSrc) {
        if (!el) return;
        const img = el.querySelector('img');
        if (img) {
          img.style.opacity = '0';
          setTimeout(() => {
            img.src = newSrc;
            el.dataset.src = newSrc;
            img.style.opacity = '1';
          }, 200);
        }
      }

      updatePhoto(heroEl, set.hero);
      updatePhoto(wideEl, set.wide);
      updatePhoto(tallEl, set.tall);
      updatePhoto(bLeftEl, set.bottomLeft);
      updatePhoto(bCenterEl, set.bottomCenter);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // 5. Arc Cards dynamic tilt micro-interaction
  const arcCards = document.querySelectorAll('.arc-card');
  arcCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
    });
  });

  // 6. Ultra-Smooth Luxury Scroll Observer (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .curtain-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Trigger Counter Animation if inside stats grid
        const statCounters = entry.target.querySelectorAll('.stat-number[data-target]');
        if (statCounters.length > 0) {
          statCounters.forEach(counter => animateCounter(counter));
        }

        // Single trigger for elements
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: '50px 0px 50px 0px'
  });

  revealElements.forEach(el => {
    // Immediate fallback for elements already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
    } else {
      revealObserver.observe(el);
    }
  });

  // 7. Stat Counter Rollup Animation Function
  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      el.textContent = `${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(updateCount);
  }

  // 8. Curved Text Interactive Wave Path Animation (GSAP Math-based Curve Morphing)
  const textPath = document.getElementById('footer-text-path');
  const waveBanner = document.querySelector('.footer-wave-banner');

  if (textPath && waveBanner) {
    let mouseX = 500;
    let mouseY = 30;
    let targetY = 30;
    let currentY = 30;
    let time = 0;

    waveBanner.addEventListener('mousemove', (e) => {
      const rect = waveBanner.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 1000;
      mouseY = ((e.clientY - rect.top) / rect.height) * 160;
      targetY = Math.min(Math.max(mouseY, 10), 130);
    });

    waveBanner.addEventListener('mouseleave', () => {
      targetY = 30;
    });

    function animateWave() {
      time += 0.035;
      // Smooth linear interpolation for spring lag
      currentY += (targetY - currentY) * 0.08;
      
      // Dynamic sine wave modulation
      const waveShift = Math.sin(time) * 16;
      const midY = currentY + waveShift;
      const ctrlX = mouseX;

      // Morph SVG path: M 50 100 Q ctrlX midY 950 100
      textPath.setAttribute('d', `M 50 100 Q ${ctrlX} ${midY} 950 100`);

      requestAnimationFrame(animateWave);
    }

    animateWave();
  }

  // 9. Horizontal Staggered Masonry Drag & Touch Gallery Component
  (function initStaggeredGallery() {
    const container = document.getElementById('gallery-container');
    const wrapper = document.getElementById('gallery-track-wrapper');
    const track = document.getElementById('gallery-track');
    const cursorDot = document.getElementById('gallery-cursor-dot');

    if (!container || !track) return;

    // --- CONFIGURATION VARIABLES ---
    let sensitivity = 1.15;       // Drag distance multiplier (higher = faster drag)
    let friction = 0.92;          // Momentum decay rate for inertia coasting
    let minVelocity = 0.05;       // Threshold to stop coasting

    // --- STATE VARIABLES ---
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let prevX = 0;
    let velocity = 0;
    let animationFrameId = null;

    // --- TOUCH INTENT DETECTION ---
    let touchStartY = 0;
    let touchStartX = 0;
    let isHorizontalIntent = null;

    // Disable native scrollbar when JS is active
    if (wrapper) wrapper.style.overflowX = 'hidden';

    // Helper: Compute single set width for seamless infinite looping
    function getSingleSetWidth() {
      const cols = track.querySelectorAll('.gallery-col');
      if (cols.length === 0) return 0;
      const singleSetCount = Math.floor(cols.length / 2);
      let width = 0;
      for (let i = 0; i < singleSetCount; i++) {
        const style = window.getComputedStyle(cols[i]);
        const marginRight = parseFloat(style.marginRight) || 0;
        width += cols[i].getBoundingClientRect().width + marginRight;
      }
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.gap) || 24;
      return width + (singleSetCount * gap);
    }

    // Helper: GPU-Accelerated Position Update with Seamless Infinite Loop Reset
    function updateTrackPosition(position) {
      currentX = position;
      const singleSetWidth = getSingleSetWidth();

      if (singleSetWidth > 0) {
        // Seamless loop reset when dragged past single set bounds
        if (currentX <= -singleSetWidth) {
          currentX += singleSetWidth;
        } else if (currentX > 0) {
          currentX -= singleSetWidth;
        }
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    // --- DESKTOP MOUSE EVENTS ---
    container.addEventListener('mouseenter', () => {
      if (window.innerWidth > 600) {
        container.classList.add('is-hovered');
      }
    });

    container.addEventListener('mouseleave', () => {
      container.classList.remove('is-hovered');
      if (isDragging) {
        stopDragging();
      }
    });

    window.addEventListener('mousemove', (e) => {
      // Follower cursor tracking
      if (cursorDot && window.innerWidth > 600 && container.classList.contains('is-hovered')) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }

      if (!isDragging) return;

      const deltaX = (e.clientX - startX) * sensitivity;
      startX = e.clientX;
      velocity = deltaX;

      updateTrackPosition(currentX + deltaX);
    });

    container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Left click only
      isDragging = true;
      startX = e.clientX;
      prevX = currentX;
      velocity = 0;

      container.classList.add('is-dragging');
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        stopDragging();
      }
    });

    function stopDragging() {
      isDragging = false;
      container.classList.remove('is-dragging');
      startInertia();
    }

    // Coasting / Inertia Deceleration Loop
    function startInertia() {
      if (Math.abs(velocity) > minVelocity) {
        velocity *= friction;
        updateTrackPosition(currentX + velocity);
        animationFrameId = requestAnimationFrame(startInertia);
      } else {
        velocity = 0;
      }
    }

    // --- MOBILE TOUCH EVENTS ---
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      isDragging = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      startX = touchStartX;
      isHorizontalIntent = null;
      velocity = 0;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;

      const currentTouchX = e.touches[0].clientX;
      const currentTouchY = e.touches[0].clientY;
      const diffX = Math.abs(currentTouchX - touchStartX);
      const diffY = Math.abs(currentTouchY - touchStartY);

      // Detect swipe intent on first movement
      if (isHorizontalIntent === null && (diffX > 6 || diffY > 6)) {
        isHorizontalIntent = diffX > diffY;
      }

      if (isHorizontalIntent) {
        if (e.cancelable) e.preventDefault(); // Prevent vertical scroll during horizontal swipe
        const deltaX = (currentTouchX - startX) * sensitivity;
        startX = currentTouchX;
        velocity = deltaX;

        updateTrackPosition(currentX + deltaX);
      }
    }, { passive: false });

    container.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        if (isHorizontalIntent) {
          startInertia();
        }
      }
    }, { passive: true });

    // Handle Window Resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateTrackPosition(currentX);
      }, 150);
    });
  })();

  // 10. Booking Form Submission Handler
  const bookingForm = document.getElementById('booking-form');
  const formStatus = document.getElementById('form-status');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('form-submit-btn');
      if (submitBtn) {
        submitBtn.style.opacity = '0.6';
        submitBtn.innerText = 'Submitting Request...';
      }

      setTimeout(() => {
        if (bookingForm) bookingForm.reset();
        if (submitBtn) {
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = '<span>Submit Booking Request</span><span class="btn-arrow-circle-white">&rarr;</span>';
        }
        if (formStatus) {
          formStatus.className = 'form-status-msg success';
          formStatus.innerText = 'Thank you! Your casting inquiry has been received. Our agency management will be in touch shortly.';
        }
      }, 800);
    });
  }

  // 12. Ultra-Smooth Hardware-Accelerated GSAP & ScrollTrigger Parallax Suite
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Global performance tuning for 60fps/120fps display devices
    ScrollTrigger.config({ limitCallbacks: true, syncInterval: 60 });
    gsap.config({ force3D: true });

    // Kinetic Watermark Lateral Scrubbing
    const watermarkLeft = document.querySelector('.watermark-left span');
    if (watermarkLeft) {
      gsap.to(watermarkLeft, {
        xPercent: -18,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.asymmetric-gallery-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }

    const watermarkRight = document.querySelector('.watermark-right span');
    if (watermarkRight) {
      gsap.to(watermarkRight, {
        xPercent: 15,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.asymmetric-gallery-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }

    // Hardware Accelerated Dual-Speed Spatial Parallax Scrubbing
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;
    const heroYShift = isTouch ? 15 : 40;
    const subYShift = isTouch ? 10 : 25;

    gsap.utils.toArray('.cluster-hero-box').forEach((box) => {
      const img = box.querySelector('.curtain-img, img');
      if (img) {
        gsap.fromTo(img,
          { yPercent: -heroYShift, scale: 1.12 },
          {
            yPercent: heroYShift,
            scale: 1.0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: box,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isTouch ? 0.5 : 1
            }
          }
        );
      }

      // Camera Lens Inset Clip-Path Expansion with GPU hint
      gsap.fromTo(box,
        { clipPath: 'inset(6% 8% 6% 8%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          duration: 1,
          scrollTrigger: {
            trigger: box,
            start: 'top 90%',
            end: 'top 45%',
            scrub: isTouch ? 0.4 : 0.8
          }
        }
      );
    });

    gsap.utils.toArray('.subgrid-card').forEach((card, i) => {
      const img = card.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { yPercent: i % 2 === 0 ? -subYShift : subYShift },
          {
            yPercent: i % 2 === 0 ? subYShift : -subYShift,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isTouch ? 0.5 : 1.2
            }
          }
        );
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3D Spatial Coverflow Carousel Engine (GSAP-Driven)
  // ─────────────────────────────────────────────────────────────
  const cfStage = document.getElementById('coverflow-stage');
  const cfCards = Array.from(document.querySelectorAll('.coverflow-card'));
  const cfPrevBtn = document.getElementById('cf-prev');
  const cfNextBtn = document.getElementById('cf-next');
  const cfDotsContainer = document.getElementById('cf-dots');

  if (cfStage && cfCards.length > 0) {
    let activeIndex = 0;
    const totalCards = cfCards.length;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Build Dots
    if (cfDotsContainer) {
      cfDotsContainer.innerHTML = '';
      cfCards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `cf-dot ${i === activeIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => updateCoverflow(i));
        cfDotsContainer.appendChild(dot);
      });
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentDiff = 0;
    let liveOffset = 0;
    let rafId = null;
    let hasDragThreshold = false;
    const prevDiffMap = new Map();

    function renderCoverflow(offset = 0, animate = true) {
      const w = window.innerWidth;
      const isMobile = w <= 768;
      const isTiny = w <= 480;

      // Exact spacing matching reference design
      const stepX = isTiny ? 115 : (isMobile ? 135 : 215);
      const maxVisible = isMobile ? 1 : 2;

      cfCards.forEach((card, i) => {
        // Calculate shortest cyclic distance
        let diff = i - activeIndex;
        if (diff > totalCards / 2) diff -= totalCards;
        if (diff < -totalCards / 2) diff += totalCards;

        const absDiff = Math.abs(diff);
        const isActive = diff === 0;

        card.classList.toggle('is-active', isActive && Math.abs(offset) < 20);

        let targetX = diff * stepX + offset;
        let targetScale = 1;
        let targetOpacity = 0;
        let zIndex = 10 - absDiff;
        let visibility = 'visible';

        if (isActive) {
          targetScale = isMobile ? 1.08 : 1.14;
          targetOpacity = 1;
          zIndex = 30;
        } else if (absDiff === 1) {
          targetScale = isMobile ? 0.88 : 0.92;
          targetOpacity = isMobile ? 0.6 : 0.88;
          zIndex = 20;
        } else if (absDiff === 2 && !isMobile) {
          targetScale = 0.78;
          targetOpacity = 0.6;
          zIndex = 10;
        } else {
          targetScale = 0.65;
          targetOpacity = 0;
          zIndex = 1;
          visibility = 'hidden';
        }

        if (absDiff > maxVisible) {
          targetOpacity = 0;
          visibility = 'hidden';
        }

        const prevDiff = prevDiffMap.has(i) ? prevDiffMap.get(i) : diff;
        prevDiffMap.set(i, diff);

        // Detect cyclic teleportation wrap (jumping across ends)
        const hasWrapped = Math.abs(diff - prevDiff) > 2.5;

        if (animate && typeof gsap !== 'undefined' && !prefersReducedMotion) {
          if (hasWrapped) {
            // Silently reposition off-screen without sweeping across
            gsap.set(card, {
              x: targetX,
              scale: targetScale,
              rotateY: 0,
              opacity: 0,
              zIndex: zIndex,
              visibility: visibility
            });
            if (targetOpacity > 0) {
              gsap.to(card, {
                opacity: targetOpacity,
                duration: 0.45,
                ease: 'power2.out',
                delay: 0.08
              });
            }
          } else {
            gsap.to(card, {
              x: targetX,
              scale: targetScale,
              rotateY: 0,
              opacity: targetOpacity,
              zIndex: zIndex,
              duration: 0.55,
              ease: 'power3.out',
              overwrite: 'auto',
              onStart: () => {
                if (targetOpacity > 0) card.style.visibility = 'visible';
              },
              onComplete: () => {
                if (targetOpacity === 0) card.style.visibility = 'hidden';
              }
            });
          }
        } else {
          card.style.transform = `translateX(${targetX}px) scale(${targetScale})`;
          card.style.opacity = targetOpacity;
          card.style.zIndex = zIndex;
          card.style.visibility = visibility;
        }
      });

      // Update dots
      if (cfDotsContainer) {
        const dots = cfDotsContainer.querySelectorAll('.cf-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      }
    }

    function updateCoverflow(newIndex) {
      activeIndex = (newIndex + totalCards) % totalCards;
      renderCoverflow(0, true);
    }

    // RAF Loop for 60fps/120fps live dragging without frame drops
    function rafDragLoop() {
      if (!isDragging) return;
      liveOffset += (dragCurrentDiff * 0.45 - liveOffset) * 0.35;
      renderCoverflow(liveOffset, false);
      rafId = requestAnimationFrame(rafDragLoop);
    }

    // Card click: side card brings to center, center card opens gallery
    cfCards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (hasDragThreshold) return;
        if (i === activeIndex) {
          window.location.href = 'gallery.html';
        } else {
          updateCoverflow(i);
        }
      });
    });

    if (cfPrevBtn) cfPrevBtn.addEventListener('click', () => updateCoverflow(activeIndex - 1));
    if (cfNextBtn) cfNextBtn.addEventListener('click', () => updateCoverflow(activeIndex + 1));

    // Pointer Events (Mouse Drag & Mobile Touch Swipe)
    cfStage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.coverflow-nav-btn')) return;
      isDragging = true;
      hasDragThreshold = false;
      dragStartX = e.clientX;
      dragCurrentDiff = 0;
      liveOffset = 0;
      cfStage.style.cursor = 'grabbing';
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(rafDragLoop);
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      dragCurrentDiff = e.clientX - dragStartX;
      if (Math.abs(dragCurrentDiff) > 8) {
        hasDragThreshold = true;
      }
    });

    window.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      cancelAnimationFrame(rafId);
      cfStage.style.cursor = '';

      if (Math.abs(dragCurrentDiff) > 40) {
        if (dragCurrentDiff < 0) updateCoverflow(activeIndex + 1);
        else updateCoverflow(activeIndex - 1);
      } else {
        updateCoverflow(activeIndex);
      }
      setTimeout(() => { hasDragThreshold = false; }, 50);
      dragCurrentDiff = 0;
      liveOffset = 0;
    });

    // Keyboard Arrow navigation when stage is in viewport
    document.addEventListener('keydown', (e) => {
      const rect = cfStage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') updateCoverflow(activeIndex - 1);
      if (e.key === 'ArrowRight') updateCoverflow(activeIndex + 1);
    });

    // Initial positioning
    renderCoverflow(0, false);

    // Responsive update on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderCoverflow(0, false);
      }, 100);
    });
  }
});




