"use strict";

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent =
    "Merci ! Le formulaire fonctionne en mode démonstration, mais aucun e-mail n'a été envoyé.";
  contactForm.reset();
});
