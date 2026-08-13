/* AVAIA JEWELS — script.js */

// Helper Functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, message) {
    const el = document.getElementById(id);
    if (el) { 
        el.textContent = message; 
        el.style.display = "block"; 
    }
}

function clearErrors() {
    document.querySelectorAll(".field-error").forEach(el => {
        el.textContent = "";
        el.style.display = "none";
    });
}

// Theme Toggle Feature
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
        btn.textContent = isGold ? " Switch to Rose Gold" : " Switch to Gold Theme";
    });
}


// Form Validation Functions
function initOrderForm() {
    const form = document.getElementById("order-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        clearErrors();
        const firstname = document.getElementById("o-firstname")?.value.trim();
        const lastname  = document.getElementById("o-lastname")?.value.trim();
        const email     = document.getElementById("o-email")?.value.trim();
        const phone     = document.getElementById("o-phone")?.value.trim();
        const desc      = document.getElementById("o-desc")?.value.trim();
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

        if (!valid) e.preventDefault();
    });
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        clearErrors();
        const fullname = document.getElementById("c-fullname")?.value.trim();
        const email    = document.getElementById("c-email")?.value.trim();
        const phone    = document.getElementById("c-phone")?.value.trim();
        const message  = document.getElementById("c-message")?.value.trim();

        let valid = true;
        if (!fullname) { showError("err-fullname", "Full name is required.");    valid = false; }
        if (!email)    { showError("err-email-c",  "Email address is required."); valid = false; }
        else if (!isValidEmail(email)) { showError("err-email-c", "Please enter a valid email."); valid = false; }
        if (!phone)    { showError("err-phone-c",  "Phone number is required.");  valid = false; }
        if (!message)  { showError("err-message",  "Please write your message."); valid = false; }

        if (!valid) e.preventDefault();
    });
}

function initSignupForm() {
    const form = document.getElementById("signup-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        clearErrors();
        const name     = document.getElementById("s-name")?.value.trim();
        const email    = document.getElementById("s-email")?.value.trim();
        const password = document.getElementById("s-password")?.value;
        const confirm  = document.getElementById("s-confirm")?.value;

        let valid = true;
        if (!name)  { showError("err-s-name", "Please enter your name."); valid = false; }
        if (!email) { showError("err-s-email", "Email address is required."); valid = false; }
        else if (!isValidEmail(email)) { showError("err-s-email", "Please enter a valid email."); valid = false; }
        if (!password || password.length < 6) { showError("err-s-password", "Password must be at least 6 characters."); valid = false; }
        if (confirm !== password) { showError("err-s-confirm", "Passwords do not match."); valid = false; }

        if (!valid) e.preventDefault();
    });
}

function initLoginForm() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        clearErrors();
        const email    = document.getElementById("l-email")?.value.trim();
        const password = document.getElementById("l-password")?.value;

        let valid = true;
        if (!email)    { showError("err-l-email", "Email address is required."); valid = false; }
        if (!password) { showError("err-l-password", "Password is required."); valid = false; }

        if (!valid) e.preventDefault();
    });
}

// Global Initialization
document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initOrderForm();
    initContactForm();
    initSignupForm();
    initLoginForm();
});
