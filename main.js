// Smooth scroll arrow
document.querySelectorAll("[data-scroll-target]").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Project filtering
const checkboxes = document.querySelectorAll(".filter-table input");
const projects = document.querySelectorAll(".project-card");

checkboxes.forEach(box => {
  box.addEventListener("change", () => {
    const activeTags = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.tag);

    projects.forEach(project => {
      const projectTags = project.dataset.tags.split(" ");
      const visible =
        activeTags.length === 0 ||
        activeTags.some(tag => projectTags.includes(tag));

      project.style.display = visible ? "block" : "none";
    });
  });
});