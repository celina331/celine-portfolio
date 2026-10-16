
"use strict";

// ================================
// MENU DE NAVIGATION
// ================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const opened = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute(
      "aria-label",
      opened ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    });
  });
}

// ================================
// ANNÉE AUTOMATIQUE
// ================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ================================
// FORMULAIRE DE CONTACT - EMAILJS
// ================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Vérifier que la bibliothèque EmailJS est chargée
    if (typeof emailjs === "undefined") {
      formStatus.textContent =
        "Le service d'envoi est indisponible. Réessaie plus tard.";
      return;
    }

    formStatus.textContent = "Envoi de ton message en cours...";

    const submitButton = contactForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      await emailjs.sendForm(
        "service_16lcc7n",
        "template_d1hm4ts",
        contactForm
      );

      formStatus.textContent =
        "Merci ! Ton message a été envoyé avec succès.";

      contactForm.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi avec EmailJS :", error);

      formStatus.textContent =
        "L'envoi a échoué. Vérifie ta connexion et réessaie.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
