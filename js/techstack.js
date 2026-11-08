export function initTechStack() {
  const techItems = document.querySelectorAll(".tech-item");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const categoryButtons = document.querySelectorAll(".category-btn");

  let activeFilter = "all";
  let activeCategory = "all";

  function updateTechItems() {
    techItems.forEach((item) => {
      const matchesFilter =
        activeFilter === "all" ||
        item.dataset.status === activeFilter;

      const matchesCategory =
        activeCategory === "all" ||
        item.dataset.category === activeCategory;

      item.hidden = !(matchesFilter && matchesCategory);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive);
      });

      updateTechItems();
    });
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      categoryButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive);
      });

      updateTechItems();
    });
  });
}