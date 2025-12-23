// Intro scroll
document.querySelector(".scroll-arrow")
  .addEventListener("click", () => {
    document.getElementById("projects")
      .scrollIntoView({ behavior: "smooth" });
  });

// Project filtering
const checkboxes = document.querySelectorAll(".filter-table input");
const cards = document.querySelectorAll(".project-card");

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

      card.style.display = show ? "" : "none";
    });
  });
});
