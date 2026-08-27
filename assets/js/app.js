/* ==========================================================
                    APP INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================================
                    INITIALIZE APP
========================================================== */

function initializeApp() {

    console.log("Student Marks Manager Started");

    initializeTheme();

    initializeSpeech();

    loadSavedForm();

    hideLoader();

    hideResultPanel();

}

/* ==========================================================
                    THEME
========================================================== */

function initializeTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

        document.body.setAttribute("data-theme", savedTheme);

    }

}

/* ==========================================================
                    THEME BUTTON
========================================================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.body.getAttribute("data-theme");

    const nextTheme =
        currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", nextTheme);

    localStorage.setItem("theme", nextTheme);

});

/* ==========================================================
                    SPEECH INIT
========================================================== */

function initializeSpeech() {

    if (typeof loadVoices === "function") {

        loadVoices();

    }

}
/* ==========================================================
                    GLOBAL ERROR
========================================================== */

window.addEventListener("error", (event) => {

    console.error("Application Error:", event.message);

});
/* ==========================================================
                    BEFORE UNLOAD
========================================================== */

window.addEventListener("beforeunload", () => {

    if (typeof stopSpeech === "function") {

        stopSpeech();

    }

});




