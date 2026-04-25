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

const beforeAfterSliders = document.querySelectorAll(".before-after-slider");

beforeAfterSliders.forEach((slider) => {
  const wrapper = slider.querySelector(".before-after-img-wrapper");
  const handle = slider.querySelector(".before-after-slider-handle");
  let isActive = false;

  // Initialize wrapper to 50%
  wrapper.style.width = "50%";
  handle.style.left = "50%";

  function updateSlider(e) {
    if (!isActive) return;

    const rect = slider.getBoundingClientRect();
    let x = e.clientX - rect.left;

    // Handle touch events
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
    }

    // Clamp x between 0 and slider width
    x = Math.max(0, Math.min(x, rect.width));

    const percentage = (x / rect.width) * 100;

    // Update wrapper width and handle position
    wrapper.style.width = percentage + "%";
    handle.style.left = percentage + "%";
  }

  // Mouse events
  handle.addEventListener("mousedown", (e) => {
    isActive = true;
    e.preventDefault();
  });

  document.addEventListener("mouseup", () => {
    isActive = false;
  });

  document.addEventListener("mousemove", updateSlider);

  // Touch events
  handle.addEventListener("touchstart", (e) => {
    isActive = true;
    e.preventDefault();
  });

  document.addEventListener("touchend", () => {
    isActive = false;
  });

  document.addEventListener("touchmove", updateSlider, { passive: false });
});

