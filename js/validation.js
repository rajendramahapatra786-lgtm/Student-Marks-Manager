"use strict";

/* ===========================================
            NAME VALIDATION
=========================================== */

nameInput.addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

});

/* ===========================================
            ROLL VALIDATION
=========================================== */

rollInput.addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z0-9]/g, "");

});

/* ===========================================
            SUBJECT VALIDATION
=========================================== */

subjectsInput.addEventListener("input", function () {

    if (this.value < 1) this.value = "";

    if (this.value > 20) this.value = 20;

});

/* ===========================================
            MARK VALIDATION
=========================================== */

document.addEventListener("input", function (e) {

    if (e.target.classList.contains("subject-mark")) {

        let value = Number(e.target.value);

        if (value > 100) {

            e.target.value = 100;

        }

        if (value < 0) {

            e.target.value = 0;

        }

    }

});

/* ===========================================
            CHECK EMPTY
=========================================== */

function validateForm() {

    if (nameInput.value.trim() === "") {

        alert("Please Enter Student Name");

        nameInput.focus();

        return false;

    }

    if (rollInput.value.trim() === "") {

        alert("Please Enter Roll Number");

        rollInput.focus();

        return false;

    }

    if (subjectsInput.value.trim() === "") {

        alert("Enter Number of Subjects");

        subjectsInput.focus();

        return false;

    }

    const rows = document.querySelectorAll(".subject-row");

    if (rows.length === 0) {

        alert("Please Add Subjects");

        return false;

    }

    for (const row of rows) {

        const subject = row.querySelector(".subject-name");

        const mark = row.querySelector(".subject-mark");

        if (subject.value.trim() === "") {

            alert("Subject Name Required");

            subject.focus();

            return false;

        }

        if (mark.value.trim() === "") {

            alert("Marks Required");

            mark.focus();

            return false;

        }

    }

    return true;

}