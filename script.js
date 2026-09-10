/* =========================================================
   YARIEL SCOTT
   CLEANING & HOME SERVICES
   Main Website JavaScript
========================================================= */


/* =========================================================
   1. WHATSAPP NUMBER
========================================================= */

const WHATSAPP_NUMBER = "2250554327726";


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {

      menuBtn.textContent = "✕";

    } else {

      menuBtn.textContent = "☰";

    }

  });


  /* Close menu after clicking a link */

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuBtn.textContent = "☰";

    });

  });

}


/* =========================================================
   3. BOOKING FORM → WHATSAPP
========================================================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

  bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Get form values */

    const name =
      bookingForm.querySelector('[name="name"]').value.trim();

    const phone =
      bookingForm.querySelector('[name="phone"]').value.trim();

    const service =
      bookingForm.querySelector('[name="service"]').value;

    const details =
      bookingForm.querySelector('[name="details"]').value.trim();


    /* Validate */

    if (!name || !phone || !service) {

      alert(
        "Please fill in your name, phone number and service."
      );

      return;

    }


    /* Create WhatsApp message */

    const message =
      `Hello Yariel Scott,

I would like to request a service.

Name: ${name}

Phone / WhatsApp: ${phone}

Service: ${service}

Details:
${details || "No additional details provided."}

Thank you.`;


    /* Encode message for WhatsApp */

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    /* Open WhatsApp */

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

  });

}


/* =========================================================
   4. CURRENT YEAR
========================================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   5. SMOOTH SCROLLING
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (event) {

    const targetID =
      this.getAttribute("href");

    if (
      !targetID ||
      targetID === "#"
    ) {

      return;

    }


    const target =
      document.querySelector(targetID);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({

        behavior: "smooth",

        block: "start"

      });

    }

  });

});


/* =========================================================
   6. SERVICE CARD INTERACTION
========================================================= */

const serviceCards =
  document.querySelectorAll(".card");


serviceCards.forEach(card => {

  card.addEventListener("click", function (event) {

    /*
      Don't interfere with an actual link click.
    */

    if (
      event.target.tagName.toLowerCase() === "a"
    ) {

      return;

    }


    const serviceName =
      card.querySelector("h3")?.textContent.trim();


    if (!serviceName) {

      return;

    }


    const message =
      `Hello Yariel Scott,

I am interested in your ${serviceName} service.

Please let me know the available options and pricing.`;


    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

  });

});


/* =========================================================
   7. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".card, .why-grid > div, .about, .booking, .contact"
);


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {

      threshold: 0.12

    }

  );


revealElements.forEach(element => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* =========================================================
   8. ADD REVEAL STYLES
========================================================= */

const revealStyle =
  document.createElement("style");


revealStyle.textContent = `

  .reveal {

    opacity: 0;

    transform: translateY(25px);

    transition:
      opacity 0.7s ease,
      transform 0.7s ease;

  }


  .reveal.visible {

    opacity: 1;

    transform: translateY(0);

  }

`;


document.head.appendChild(revealStyle);


/* =========================================================
   9. PROTECT AGAINST EMPTY LINKS
========================================================= */

document.querySelectorAll('a[href="#"]').forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

  });

});


/* =========================================================
   10. CONSOLE MESSAGE
========================================================= */

console.log(
  "Yariel Scott Cleaning & Home Services website loaded successfully."
);
