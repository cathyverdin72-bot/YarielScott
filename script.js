
"use strict";

/* Yariel Scott — site interactions */

const WHATSAPP_NUMBER = "2250554327726";

/* Mobile navigation */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function closeMobileMenu() {
  if (!menuBtn || !nav) return;

  nav.classList.remove("open");
  menuBtn.textContent = "☰";
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Ouvrir le menu");
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMobileMenu();
  });
}

/* Booking form: prepare a French-language WhatsApp message */
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const getValue = (fieldName) => {
      const field = bookingForm.querySelector(`[name="${fieldName}"]`);
      return field ? field.value.trim() : "";
    };

    const name = getValue("name");
    const phone = getValue("phone");
    const service = getValue("service");
    const location = getValue("location");
    const appointmentDate = getValue("appointmentDate");
    const appointmentTime = getValue("appointmentTime");
    const details = getValue("details");

    if (!name || !phone || !service) {
      if (formStatus) {
        formStatus.textContent =
          "Veuillez renseigner votre nom, votre téléphone et le service souhaité.";
      }
      return;
    }

    const message = [
      "Bonjour Yariel Scott,",
      "",
      "Je souhaite demander un devis ou un rendez-vous.",
      "",
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Service souhaité : ${service}`,
      `Lieu de l'intervention : ${location || "À préciser"}`,
      `Date souhaitée : ${appointmentDate || "À convenir"}`,
      `Moment souhaité : ${appointmentTime || "À convenir"}`,
      "",
      "Détails de la demande :",
      details || "Aucun détail supplémentaire fourni.",
      "",
      "Merci de me confirmer vos disponibilités et le tarif."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (formStatus) {
      formStatus.textContent =
        "WhatsApp va s'ouvrir. Vérifiez votre message puis envoyez-le pour confirmer votre demande.";
    }

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    /* Fallback in case the browser blocks opening a new tab */
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  });
}

/* Current year */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* Smooth scrolling for internal page links */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetID = link.getAttribute("href");

    if (!targetID || targetID === "#") return;

    const target = document.getElementById(targetID.slice(1));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    }
  });
});

/* Keep service cards informational; their links handle service requests. */
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button, input, select, textarea")) return;

    const serviceLink = card.querySelector(".card-content > a");

    if (serviceLink) {
      serviceLink.click();
    }
  });
});

/* Subtle reveal animation, respecting reduced-motion settings */
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealElements = document.querySelectorAll(
    ".card, .why-grid > div, .about, .booking, .contact"
  );

  const revealStyle = document.createElement("style");
  revealStyle.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal.visible {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;
  document.head.appendChild(revealStyle);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

console.log("Yariel Scott — site scripts loaded.");
