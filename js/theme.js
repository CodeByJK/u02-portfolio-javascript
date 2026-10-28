import { getStoredItem, setStoredItem } from "./storage.js";

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

const getInitialTheme = () => {
  const stored = getStoredItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme, toggleButton) => {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle(DARK_CLASS, isDark);
  toggleButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
};

export const initTheme = () => {
  const toggleButton = document.querySelector(".theme-toggle");
  if (!toggleButton) return;

  applyTheme(getInitialTheme(), toggleButton);

  toggleButton.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains(DARK_CLASS);
    const nextTheme = isDark ? "light" : "dark";
    applyTheme(nextTheme, toggleButton);
    setStoredItem(STORAGE_KEY, nextTheme);
  });
};