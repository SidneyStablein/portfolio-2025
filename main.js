document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("[data-scroll-target]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const checkboxes = document.querySelectorAll(".filter-table input");
  const projects = document.querySelectorAll(".project-card");

  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      const activeTags = [...checkboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.tag);

      projects.forEach(project => {
        const tags = project.dataset.tags.split(" ");
        const show =
          activeTags.length === 0 ||
          activeTags.some(tag => tags.includes(tag));

        project.style.display = show ? "block" : "none";
      });
    });
  });

});
