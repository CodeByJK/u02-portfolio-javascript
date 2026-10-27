const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

// Dölj menyn när sidan laddas
navMenu.classList.add("hidden");

navToggle.addEventListener("click", function () {
const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

navToggle.setAttribute("aria-expanded", String(!isExpanded));
navMenu.classList.toggle("hidden");
});