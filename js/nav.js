const DESKTOP_QUERY = "(min-width: 768px)";

export const initNav = () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (!navToggle || !navMenu) return;

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);

  const isMenuOpen = () => navToggle.getAttribute("aria-expanded") === "true";

  const setMenuOpen = (isOpen) => {
    navMenu.classList.toggle("hidden", !isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  navToggle.addEventListener("click", () => {
    setMenuOpen(!isMenuOpen());
  });

  // Close the menu when a link inside it is clicked
  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  // Close with Escape and return focus to the toggle button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

  // Reset when the window is resized between mobile and desktop
  desktopQuery.addEventListener("change", () => setMenuOpen(false));
};