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

/* SECTION 2 — WELCOME MESSAGE (Home page) */

function initHomePage() {
    const welcomeTarget = document.getElementById("welcome-message");
    if (!welcomeTarget) return; // not on the home page, do nothing

    const user = getLoggedInUser();
    if (user) {
        showWelcomeBanner(user);
    } else {
        showAuthModal();
    }
}

function showWelcomeBanner(name) {
    const welcomeTarget = document.getElementById("welcome-message");
    if (!welcomeTarget) return;
    welcomeTarget.innerHTML = `
        <div class="welcome-banner">
            <p>✨ Welcome back, <strong>${name}</strong>! We're glad you're here.</p>
            <button onclick="handleLogout()" class="btn-logout">Log Out</button>
        </div>`;
}

function handleLogout() {
    clearLoggedInUser();
    location.reload();
}


/* SECTION 3 — AUTH MODAL (Sign Up / Log In) */

function showAuthModal() {
    // Build the modal HTML and inject into <body>
    const modal = document.createElement("div");
    modal.id = "auth-modal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
        <div class="modal-box">
            <h2>Welcome to Avaia Jewels ✨</h2>
            <p>Please sign up or log in to continue.</p>

            <!-- Toggle between Sign Up and Log In -->
            <div class="auth-tabs">
                <button id="tab-signup" class="tab-btn active" onclick="switchTab('signup')">Sign Up</button>
                <button id="tab-login" class="tab-btn" onclick="switchTab('login')">Log In</button>
            </div>

            <!-- Sign Up Panel -->
            <div id="panel-signup" class="auth-panel">
                <label for="signup-name">Full Name</label>
                <input type="text" id="signup-name" placeholder="e.g. Amara Wanjiku" />
                <label for="signup-email">Email Address</label>
                <input type="email" id="signup-email" placeholder="you@example.com" />
                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" placeholder="Create a password" />
                <p id="signup-error" class="auth-error"></p>
                <button onclick="handleSignUp()" class="btn-auth">Create Account</button>
            </div>

            <!-- Log In Panel -->
            <div id="panel-login" class="auth-panel" style="display:none;">
                <label for="login-name">Full Name</label>
                <input type="text" id="login-name" placeholder="Enter your name" />
                <label for="login-password">Password</label>
                <input type="password" id="login-password" placeholder="Enter your password" />
                <p id="login-error" class="auth-error"></p>
                <button onclick="handleLogIn()" class="btn-auth">Log In</button>
            </div>

            <p class="guest-link">
                <a href="#" onclick="dismissAsGuest()">Continue as guest →</a>
            </p>
        </div>`;

    document.body.appendChild(modal);
}

function switchTab(tab) {
    const isSignup = tab === "signup";
    document.getElementById("panel-signup").style.display = isSignup ? "flex" : "none";
    document.getElementById("panel-login").style.display  = isSignup ? "none"  : "flex";
    document.getElementById("tab-signup").classList.toggle("active",  isSignup);
    document.getElementById("tab-login").classList.toggle("active",  !isSignup);
}

function handleSignUp() {
    const name     = document.getElementById("signup-name").value.trim();
    const email    = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const errEl    = document.getElementById("signup-error");

    if (!name)     { errEl.textContent = "Please enter your full name."; return; }
    if (!email)    { errEl.textContent = "Please enter your email address."; return; }
    if (!password) { errEl.textContent = "Please create a password."; return; }
    if (password.length < 6) { errEl.textContent = "Password must be at least 6 characters."; return; }

    errEl.textContent = "";
    setLoggedInUser(name);
    closeModal();
    showWelcomeBanner(name);
}

function handleLogIn() {
    const name     = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-password").value;
    const errEl    = document.getElementById("login-error");

    if (!name)     { errEl.textContent = "Please enter your name."; return; }
    if (!password) { errEl.textContent = "Please enter your password."; return; }

    errEl.textContent = "";
    setLoggedInUser(name);
    closeModal();
    showWelcomeBanner(name);
}

function dismissAsGuest() {
    setLoggedInUser("Guest");
    closeModal();
    showWelcomeBanner("Guest");
}

function closeModal() {
    const modal = document.getElementById("auth-modal");
    if (modal) modal.remove();
}


/* SECTION 4 — FORM VALIDATION */

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
                🎉 Thank you, <strong>${firstname}</strong>! 
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


/* SECTION 5 — DYNAMIC CONTENT (Collections page) */

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
        btn.textContent = isGold ? "🌸 Switch to Rose Gold" : "✨ Switch to Gold Theme";
    });
}


/* SECTION 6 — NAVBAR: show logged-in user's name */

function initNavUser() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const user = getLoggedInUser();
    if (user && user !== "Guest") {
        const tag = document.createElement("span");
        tag.className = "nav-user";
        tag.textContent = `👤 ${user}`;
        nav.appendChild(tag);
    }
}


/* SECTION 7 — ENTRY POINT */

document.addEventListener("DOMContentLoaded", function () {
    initNavUser();      // all pages — shows username in nav
    initHomePage();     // index.html — welcome message / auth modal
    initOrderForm();    // Order.html — form validation
    initContactForm();  // Contact.html — form validation
    initThemeToggle();  // Collections.html — colour theme toggle
});