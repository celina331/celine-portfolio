
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

// Remplace ces trois valeurs par celles de ton compte EmailJS.
const EMAILJS_PUBLIC_KEY = "VzYTA_D02C_u6oBk9";
const EMAILJS_SERVICE_ID = "service_16lcc7n";
const EMAILJS_TEMPLATE_ID = "template_d1hm4ts";

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Vérifier que la bibliothèque EmailJS est chargée.
    if (typeof emailjs === "undefined") {
      formStatus.textContent =
        "Erreur : le service d'envoi n'est pas chargé. Recharge la page ou vérifie la configuration.";
      return;
    }



    const submitButton = contactForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    formStatus.textContent = "Envoi du message en cours...";

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      // Initialiser EmailJS avec la clé publique.
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
      });

      // Envoyer les champs du formulaire au modèle EmailJS.
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      formStatus.textContent =
        "Merci ! Ton message a été envoyé avec succès.";

      contactForm.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi EmailJS :", error);

      formStatus.textContent =
        "L'envoi a échoué. Vérifie ta connexion et ta configuration EmailJS, puis réessaie.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
