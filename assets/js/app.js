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

    const savedTheme = localStorage.getItem("theme") || "light";

    document.body.setAttribute("data-theme", savedTheme);

    updateThemeIcon(savedTheme);

}


/* ==========================================================
                    THEME BUTTON
========================================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.body.getAttribute("data-theme") || "light";

        const nextTheme =
            currentTheme === "dark" ? "light" : "dark";

        document.body.setAttribute("data-theme", nextTheme);

        localStorage.setItem("theme", nextTheme);

        updateThemeIcon(nextTheme);

    });

}


/* ==========================================================
                    UPDATE THEME ICON
========================================================== */

function updateThemeIcon(theme) {

    const icon = document.querySelector("#themeToggle i");

    if (!icon) return;

    if (theme === "dark") {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}

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




