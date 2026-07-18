"use strict";

/* ==========================
        CREATE INPUTS
========================== */

function createInputs() {

    const totalSubjects = parseInt(subjectsInput.value);

    marksContainer.innerHTML = "";

    subjectData = [];

    if (isNaN(totalSubjects) || totalSubjects <= 0) {

        alert("Enter a valid number of subjects.");

        return;

    }

    for (let i = 1; i <= totalSubjects; i++) {

        const row = document.createElement("div");

        row.className = "subject-row";

        row.innerHTML = `

            <input
                type="text"
                class="subject-name"
                placeholder="Subject ${i}">

            <input
                type="number"
                class="subject-mark"
                placeholder="Marks"
                min="0"
                max="100">

            <button
                class="delete-btn"
                type="button">

                <i class="bi bi-trash-fill"></i>

            </button>

        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {

            row.remove();

        });

        marksContainer.appendChild(row);

    }

}

/* ==========================
        GET SUBJECTS
========================== */

function getSubjects() {

    subjectData = [];

    const rows = document.querySelectorAll(".subject-row");

    rows.forEach(row => {

        const subject = row.querySelector(".subject-name").value.trim();

        const mark = Number(row.querySelector(".subject-mark").value);

        if(subject !== ""){

            subjectData.push({

                subject,

                mark

            });

        }

    });

}

/* ==========================
        RESET
========================== */

function resetAll() {

    nameInput.value = "";

    rollInput.value = "";

    subjectsInput.value = "";

    marksContainer.innerHTML = "";

    result.innerHTML = "";

    totalMarks.textContent = "0";

    percentage.textContent = "0%";

    grade.textContent = "-";

    status.textContent = "--";

    studentNameDisplay.textContent = "Student Name";

    studentRollDisplay.textContent = "Roll Number";

    studentAvatar.textContent = "RM";

    downloadBtn.style.display = "none";

    subjectData = [];

    reportData = [];

}

/* ==========================
        AVATAR
========================== */

function updateAvatar(name){

    const words = name.trim().split(" ");

    if(words.length === 1){

        studentAvatar.textContent = words[0][0].toUpperCase();

    }

    else{

        studentAvatar.textContent =
        words[0][0].toUpperCase() +
        words[1][0].toUpperCase();

    }

}