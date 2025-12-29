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
