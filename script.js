// =====================
// SKILL PROGRESS BARS
// Animate each .progress bar from 0 up to its set width on page load.
// =====================
window.addEventListener("load", () => {
    const bars = document.querySelectorAll(".progress");

    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";

        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});

// =====================
// DARK MODE TOGGLE
// Toggles the .dark class on <body>, which style.css uses for dark styling.
// Listens on document (event delegation) instead of the button directly,
// so this keeps working even if #theme-btn moves around in the HTML later.
// =====================
document.addEventListener("click", (event) => {
    if (event.target.closest("#theme-btn")) {
        document.body.classList.toggle("dark");
    }
});

// =====================
// MOBILE NAV TOGGLE
// Shows/hides the nav links list when the hamburger button is tapped.
// =====================
const menu = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// =====================
// HERO TYPING EFFECT
// Types the tagline into #typing-text one character at a time.
// =====================
const text = "Aspiring Cybersecurity Professional & Frontend Learner";
const typing = document.getElementById("typing-text");
let i = 0;

function typeText() {
    if (i < text.length) {
        typing.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeText, 60);
    }
}

typeText();

// =====================
// SCROLL REVEAL
// Adds .show to each <section> once it scrolls into view; style.css uses
// this to animate the underline beneath .section-title.
// =====================
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });
});

// =====================
// PDF PREVIEW MODAL (certificates + resume)
// Opens a certificate/resume PDF inside an on-page modal (iframe) instead
// of letting the browser navigate to / download the file directly.
// =====================
const certModal = document.getElementById("cert-modal");
const certFrame = document.getElementById("cert-modal-frame");
const certFallbackLink = document.getElementById("cert-modal-fallback-link");
const certDownloadLink = document.getElementById("cert-modal-download-link");
const certCloseBtn = document.getElementById("cert-modal-close");

function openCertModal(src) {
    certFrame.src = src;
    certFallbackLink.href = src;
    certDownloadLink.href = src;
    certModal.hidden = false;
    document.body.style.overflow = "hidden"; // prevent background scroll while open
}

function closeCertModal() {
    certModal.hidden = true;
    certFrame.src = ""; // stop the PDF from loading/rendering in the background
    document.body.style.overflow = "";
}

// .cert-view-btn = the 4 certificate buttons, .pdf-link = the resume link
document.querySelectorAll(".cert-view-btn, .pdf-link").forEach(el => {
    el.addEventListener("click", (event) => {
        const src = el.dataset.cert || el.getAttribute("href");
        if (!src) return;
        event.preventDefault(); // stop the resume <a> from navigating away
        openCertModal(src);
    });
});

certCloseBtn.addEventListener("click", closeCertModal);

document.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", closeCertModal);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !certModal.hidden) {
        closeCertModal();
    }
});

// =====================
// HERO BACKGROUND PARTICLES
// Generates 30 floating dots inside #particles with randomized position
// and animation delay (see .particle / @keyframes particleFloat in CSS).
// =====================
for (let i = 0; i < 30; i++) {
    let particle = document.createElement("span");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 5 + "s";

    document.getElementById("particles").appendChild(particle);
}
