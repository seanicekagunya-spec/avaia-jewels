/* AVAIA JEWELS — script.js
   External JavaScript file linked to all HTML pages.*/

function getLoggedInUser() {
    return sessionStorage.getItem("avaiaUser");
}

function setLoggedInUser(name) {
    sessionStorage.setItem("avaiaUser", name);
}

function clearLoggedInUser() {
    sessionStorage.removeItem("avaiaUser");
}

/* SECTION 1 — WELCOME MESSAGE (Home page) */

function initHomePage() {
    const welcomeTarget = document.getElementById("welcome-message");
    if (!welcomeTarget) return; // not on the home page, do nothing

/* SECTION 2 — FORM VALIDATION */

function initOrderForm() {
    const form = document.getElementById("order-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop the page reloading on submit
        clearErrors();

        const firstname = document.getElementById("o-firstname").value.trim();
        const lastname  = document.getElementById("o-lastname").value.trim();
        const email     = document.getElementById("o-email").value.trim();
        const phone     = document.getElementById("o-phone").value.trim();
        const desc      = document.getElementById("o-desc").value.trim();

        // Check at least one checkbox is ticked
        const checkboxes = document.querySelectorAll(".jewelry-check");
        const anyChecked = Array.from(checkboxes).some(cb => cb.checked);

        let valid = true;

        if (!firstname) { showError("err-firstname", "First name is required."); valid = false; }
        if (!lastname)  { showError("err-lastname",  "Last name is required.");  valid = false; }
        if (!email)     { showError("err-email",     "Email address is required."); valid = false; }
        else if (!isValidEmail(email)) { showError("err-email", "Please enter a valid email."); valid = false; }
        if (!phone)     { showError("err-phone",     "Phone number is required."); valid = false; }
        if (!anyChecked){ showError("err-jewelry",   "Please select at least one item."); valid = false; }
        if (!desc)      { showError("err-desc",      "Please describe your chosen jewelry."); valid = false; }

        if (valid) {
            showConfirmation("order-form", `
                 Thank you, <strong>${firstname}</strong>! 
                Your order has been received. We'll contact you at 
                <strong>${email}</strong> shortly.`);
        }
    });
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const fullname = document.getElementById("c-fullname").value.trim();
        const email    = document.getElementById("c-email").value.trim();
        const phone    = document.getElementById("c-phone").value.trim();
        const message  = document.getElementById("c-message").value.trim();

        let valid = true;

        if (!fullname) { showError("err-fullname", "Full name is required.");    valid = false; }
        if (!email)    { showError("err-email-c",  "Email address is required."); valid = false; }
        else if (!isValidEmail(email)) { showError("err-email-c", "Please enter a valid email."); valid = false; }
        if (!phone)    { showError("err-phone-c",  "Phone number is required.");  valid = false; }
        if (!message)  { showError("err-message",  "Please write your message."); valid = false; }

        if (valid) {
            showConfirmation("contact-form", `
                ✅ Message sent, <strong>${fullname}</strong>! 
                We'll get back to you at <strong>${email}</strong> within 24 hours.`);
        }
    });
}

// Helpers
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) { el.textContent = message; el.style.display = "block"; }
}

function clearErrors() {
    document.querySelectorAll(".field-error").forEach(el => {
        el.textContent = "";
        el.style.display = "none";
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showConfirmation(formId, messageHTML) {
    const form = document.getElementById(formId);
    if (!form) return;
    const box = document.createElement("div");
    box.className = "confirmation-box";
    box.innerHTML = messageHTML;
    form.replaceWith(box); // swap form out, show the confirmation in its place
}


/* SECTION 3 — DYNAMIC CONTENT (Collections page) */

function toggleInfo(id) {
    const el = document.getElementById(id);
    const btn = document.querySelector(`button[data-target="${id}"]`);
    if (!el || !btn) return;

    const isHidden = el.style.display === "none" || el.style.display === "";
    el.style.display  = isHidden ? "block" : "none";
    btn.textContent   = isHidden ? "Show Less ▲" : "Learn More ▼";
}

function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    let isGold = false;
    btn.addEventListener("click", function () {
        isGold = !isGold;
        document.documentElement.style.setProperty(
            "--rose-gold", isGold ? "#cda434" : "#b76e79"
        );
        document.documentElement.style.setProperty(
            "--rose-gold-dark", isGold ? "#a8841e" : "#9c5a64"
        );
        btn.textContent = isGold ? "🌸 Switch to Rose Gold" : " Switch to Gold Theme";
    });
}

/* SECTION 4 — ENTRY POINT */

document.addEventListener("DOMContentLoaded", function () {
    initNavUser();      // all pages — shows username in nav
    initHomePage();     // index.html — welcome message / auth modal
    initOrderForm();    // Order.html — form validation
    initContactForm();  // Contact.html — form validation
    initThemeToggle();  // Collections.html — colour theme toggle
});
