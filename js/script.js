/* =========================================================================
   Sibusiso Electrical & Plumbing Services
   Script: script.js
   WEDE5020 | Website Project | Part 1 | Theolin Chetty | ST10507916
   -------------------------------------------------------------------------
   Contents:
     1. Mobile navigation toggle (hamburger menu)
     2. Current-year footer stamp
     3. Generic client-side form validation (Enquiry + Contact pages)
   Loaded with `defer` on every page, so it is safe to query the DOM here.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------------------------------------
     1. Mobile navigation toggle
     The hamburger button toggles the `.is-open` class on the nav menu and
     flips `aria-expanded` for screen-reader users. On desktop widths the
     menu is always visible (see the min-width: 960px rule in style.css),
     so this only matters on smaller screens.
     ------------------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu automatically once a nav link is clicked,
    // so navigating between pages does not leave the menu stuck open.
    var navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------------------------
     2. Footer "current year" stamp
     Keeps the copyright year in the footer correct without editing every
     page by hand.
     ------------------------------------------------------------------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------------------
     3. Client-side form validation
     Applies to any <form> on the page carrying the `data-validate`
     attribute (used by the Enquiry quote form and the Contact form).
     This is a static, front-end-only demonstration for Part 1 of the
     assignment: there is no backend, so a successful "submission" just
     shows a confirmation message and resets the form.
     ------------------------------------------------------------------- */
  var forms = document.querySelectorAll("form[data-validate]");

  forms.forEach(function (form) {
    var statusBox = form.querySelector(".form-status");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = true;
      var fields = form.querySelectorAll("input[required], select[required], textarea[required]");

      fields.forEach(function (field) {
        var errorEl = document.getElementById(field.id + "-error");
        var fieldValid = field.checkValidity() && field.value.trim() !== "";

        if (!fieldValid) {
          isValid = false;
          field.classList.add("invalid");
          if (errorEl) {
            errorEl.classList.add("is-visible");
          }
        } else {
          field.classList.remove("invalid");
          if (errorEl) {
            errorEl.classList.remove("is-visible");
          }
        }
      });

      if (!statusBox) {
        return;
      }

      statusBox.classList.remove("form-status--success", "form-status--error");

      if (isValid) {
        statusBox.textContent =
          "Thanks! Your message has been captured. (Demonstration form for WEDE5020 Part 1 - no live backend is connected yet.)";
        statusBox.classList.add("form-status--success", "is-visible");
        form.reset();
      } else {
        statusBox.textContent = "Please fill in all required fields correctly before submitting.";
        statusBox.classList.add("form-status--error", "is-visible");
      }

      statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // Remove the invalid state as soon as the visitor starts fixing a field
    var allFields = form.querySelectorAll("input, select, textarea");
    allFields.forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.checkValidity() && field.value.trim() !== "") {
          field.classList.remove("invalid");
          var errorEl = document.getElementById(field.id + "-error");
          if (errorEl) {
            errorEl.classList.remove("is-visible");
          }
        }
      });
    });
  });

});
