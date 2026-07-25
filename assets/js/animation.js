/* ==========================================================
                    DOM ELEMENTS
========================================================== */

const appContainer = document.querySelector(".app-container");
const formSection = document.getElementById("form-section");

/* ==========================================================
                SHOW RESULT ANIMATION
========================================================== */

function playResultAnimation() {

    appContainer.classList.add("show-result");

    formSection.classList.add("slide-left");

    const resultSection = document.getElementById("resultSection");

    if (resultSection) {
        resultSection.classList.remove("hidden");
        resultSection.classList.add("slide-right");
    }

}

/* ==========================================================
                RESET ANIMATION
========================================================== */

function resetAnimation() {

    appContainer.classList.remove("show-result");

    formSection.classList.remove("slide-left");

    const resultSection = document.getElementById("resultSection");

    if (resultSection) {
        resultSection.classList.remove("slide-right");
        resultSection.classList.add("hidden");
    }

}

/* ==========================================================
                CARD POP ANIMATION
========================================================== */

function animateCards() {

    const cards = document.querySelectorAll(".stat-card");

    cards.forEach((card, index) => {

        card.style.animation = "none";

        card.offsetHeight;

        card.style.animation =
            `pop .5s ease ${index * .1}s forwards`;

    });

}

/* ==========================================================
                COUNT UP ANIMATION
========================================================== */

function animateCounter(element, endValue, suffix = "") {

    let start = 0;

    const duration = 1200;

    const step = Math.ceil(endValue / (duration / 20));

    const timer = setInterval(() => {

        start += step;

        if (start >= endValue) {

            start = endValue;

            clearInterval(timer);

        }

        element.textContent = start + suffix;

    }, 20);

}

/* ==========================================================
                ANIMATE ALL STATS
========================================================== */

function animateStatistics(result) {

    animateCounter(totalMarksCard, result.totalMarks);

    animateCounter(
        percentageCard,
        Math.round(result.percentage),
        "%"
    );

}

/* ==========================================================
                TROPHY EFFECT
========================================================== */

function animateTrophy() {

    const trophy = document.querySelector(".trophy");

    if (!trophy) return;

    trophy.classList.remove("float");

    void trophy.offsetWidth;

    trophy.classList.add("float");

}

/* ==========================================================
                COMPLETE DASHBOARD
========================================================== */

function runDashboardAnimation(result) {

    playResultAnimation();

    animateCards();

    animateStatistics(result);

    animateTrophy();

}

