"use strict";

/* ===========================================
            LOADER
=========================================== */

function showLoader() {

    let loader = document.getElementById("pageLoader");

    if (!loader) {

        loader = document.createElement("div");

        loader.id = "pageLoader";

        loader.innerHTML = `

            <div class="loading-spinner"></div>

        `;

        document.body.appendChild(loader);

    }

    loader.style.display = "flex";

}

function hideLoader() {

    const loader = document.getElementById("pageLoader");

    if (loader) {

        loader.style.display = "none";

    }

}

/* ===========================================
            TOAST
=========================================== */

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast-message ${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

/* ===========================================
            BUTTON EFFECT
=========================================== */

document.addEventListener("click", function (e) {

    if (!e.target.closest("button")) return;

    const btn = e.target.closest("button");

    btn.classList.add("clicked");

    setTimeout(() => {

        btn.classList.remove("clicked");

    }, 180);

});

/* ===========================================
            PAGE READY
=========================================== */

window.addEventListener("load", () => {

    hideLoader();

});

/* ===========================================
            CALCULATE WRAPPER
=========================================== */

const originalCalculate = calculateResult;

calculateResult = function () {

    showLoader();

    setTimeout(() => {

        try {

            originalCalculate();

            showToast("Report Generated Successfully");

        }

        finally {

            hideLoader();

        }

    }, 600);

};

/* ===========================================
            RESET WRAPPER
=========================================== */

const originalReset = resetAll;

resetAll = function () {

    originalReset();

    stopSpeech();

    showToast("Project Reset");

};