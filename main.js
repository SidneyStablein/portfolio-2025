/* ================= INTRO SCROLL ================= */

const scrollArrow = document.querySelector(".scroll-arrow");

if (scrollArrow) {
  scrollArrow.addEventListener("click", () => {
    document
      .getElementById("projects")
      .scrollIntoView({ behavior: "smooth" });
  });
}


/* ================= PROJECT FILTERING ================= */

const checkboxes = document.querySelectorAll(".filter-table input");
const cards = document.querySelectorAll(".project-card");

if (checkboxes.length && cards.length) {
  checkboxes.forEach(box => {
    box.addEventListener("change", () => {

      const activeTags = [...checkboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.tag);

      cards.forEach(card => {
        const tags = card.dataset.tags.split(" ");

        const show =
          activeTags.length === 0 ||
          activeTags.some(tag => tags.includes(tag));

        card.style.display = show ? "flex" : "none";
      });
    });
  });
}


/* ================= HEADER SCROLL (INDEX PAGE ONLY) ================= */

const header = document.querySelector(".site-header");

if (header && document.body.classList.contains("index-page")) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("visible");
    } else {
      header.classList.remove("visible");
    }
  });
}


/* ================= PROJECT PAGE STICKY HEADER ================= */

if (header && document.body.classList.contains("project-page")) {
  header.classList.add("sticky");
}


/* ================= PROJECT DROPDOWN ================= */

const projectNav = document.querySelector(".nav-projects");
const projectToggle = document.querySelector(".projects-toggle");

if (projectNav && projectToggle) {
  projectToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    projectNav.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!projectNav.contains(e.target)) {
      projectNav.classList.remove("open");
    }
  });
}

/* ================= SLIDESHOW ================= */

const slideshows = document.querySelectorAll(".slideshow-container");

slideshows.forEach((slideshow) => {
  const slides = slideshow.querySelectorAll(".slide");
  const dots = slideshow.querySelectorAll(".dot");
  const prevBtn = slideshow.querySelector(".slide-prev");
  const nextBtn = slideshow.querySelector(".slide-next");
  
  let currentSlide = 0;

  // Show slide by index
  function showSlide() {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide();
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide();
  }

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.dataset.slide);
      showSlide();
    });
  });

  // Button navigation
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Initialize first slide
  showSlide();
});

/* ================= BEFORE/AFTER SLIDERS ================= */

const sliders = [
  {
    slider: document.getElementById("slider1"),
    handle: document.getElementById("handle1"),
    afterMask: document.getElementById("afterMask1")
  },
  {
    slider: document.getElementById("slider2"),
    handle: document.getElementById("handle2"),
    afterMask: document.getElementById("afterMask2")
  }
];

sliders.forEach(({ slider, handle, afterMask }) => {
  if (!slider || !handle || !afterMask) return;

  const labelBefore = slider.querySelector(".label.before");
  const labelAfter = slider.querySelector(".label.after");

  let isDragging = false;

  function updateSlider(x) {
    const rect = slider.getBoundingClientRect();
    let offsetX = x - rect.left;

    // Clamp within bounds
    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    const percent = (offsetX / rect.width) * 100;

    // Move handle
    handle.style.left = percent + "%";

    // Reveal mask (THIS is what fixes the "moving image" issue)
    afterMask.style.width = percent + "%";

    // Fade labels
    if (labelBefore) {
      labelBefore.style.opacity = percent < 20 ? 0 : 1;
    }

    if (labelAfter) {
      labelAfter.style.opacity = percent > 80 ? 0 : 1;
    }
  }

  // ===== Mouse Events =====
  handle.addEventListener("mousedown", () => {
    isDragging = true;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // ===== Touch Events =====
  handle.addEventListener("touchstart", () => {
    isDragging = true;
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });
});

