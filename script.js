const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const socialLinks = document.querySelector(".social-links");

navLinks.classList.add("hidden");

navToggle.addEventListener("click", function () {
  navLinks.classList.toggle("hidden");
  socialLinks.classList.toggle("visible");
});