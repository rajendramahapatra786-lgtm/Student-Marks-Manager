/* ==========================================================
                    LOADER ELEMENTS
========================================================== */

const loaderScreen = document.getElementById("loaderScreen");

const loaderTitle = document.getElementById("loaderTitle");

const loaderProgress = document.getElementById("loaderProgress");

const loaderPercent = document.getElementById("loaderPercent");

/* ==========================================================
                    LOADER STEPS
========================================================== */

const loadingSteps = [

    "Reading Student Information...",

    "Checking Subject Marks...",

    "Calculating Total Marks...",

    "Calculating Percentage...",

    "Generating Grade...",

    "Preparing Result Dashboard...",

    "Almost Done..."

];

/* ==========================================================
                    SHOW LOADER
========================================================== */

let loaderTimer = null;

function showLoader() {

    loaderScreen.classList.add("active");

    startLoadingAnimation();

}

/* ==========================================================
                    HIDE LOADER
========================================================== */

function hideLoader() {

    clearInterval(loaderTimer);

    loaderScreen.classList.remove("active");

    loaderPercent.textContent = "0%";

    loaderProgress.style.width = "0%";

    loaderTitle.textContent = "Preparing...";

}

/* ==========================================================
                START LOADING
========================================================== */

function startLoadingAnimation() {

    let progress = 0;

    let step = 0;

    loaderPercent.textContent = "0%";

    loaderProgress.style.width = "0%";

    loaderTitle.textContent = loadingSteps[0];

    loaderTimer = setInterval(() => {

        progress++;

        loaderPercent.textContent = progress + "%";

        loaderProgress.style.width = progress + "%";

        const index = Math.floor(progress / 15);

        if (
            index < loadingSteps.length &&
            index !== step
        ) {

            step = index;

            loaderTitle.textContent = loadingSteps[step];

        }

        if (progress >= 100) {

            clearInterval(loaderTimer);

        }

    }, 28);

}

/* ==========================================================
                LOADER SAFETY RESET
========================================================== */

window.addEventListener("beforeunload", () => {

    clearInterval(loaderTimer);

});

