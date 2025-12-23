// ================= INTRO SCROLL =================
document.querySelector(".scroll-arrow")
  .addEventListener("click", () => {
    document
      .getElementById("projects")
      .scrollIntoView({ behavior: "smooth" });
  });


// ================= PROJECT FILTERING =================
const checkboxes = document.querySelectorAll(".filter-table input");
const cards = document.querySelectorAll(".project-card");

checkboxes.forEach(box => {
  box.addEventListener("change", () => {

    // Get active tags
    const activeTags = [...checkboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.tag);

    // Show / hide cards
    cards.forEach(card => {
      const tags = card.dataset.tags.split(" ");

      const show =
        activeTags.length === 0 ||
        activeTags.some(tag => tags.includes(tag));

      // IMPORTANT CHANGE:
      // cards are flex-based & viewport-height now
      card.style.display = show ? "flex" : "none";
    });
  });
});
