/* ==========================================================
                    DOM ELEMENTS
========================================================== */

const studentForm = document.getElementById("studentForm");

const studentName = document.getElementById("studentName");

const rollNumber = document.getElementById("rollNumber");

const subjectCount = document.getElementById("subjectCount");

const subjectsContainer = document.getElementById("subjectsContainer");

const subjectTemplate = document.getElementById("subjectTemplate");

const addSubjectBtn = document.getElementById("addSubjectBtn");

const calculateBtn = document.getElementById("calculateBtn");

const resetBtn = document.getElementById("resetBtn");


/* ==========================================================
                    SUBJECT DATA
========================================================== */

let subjects = [];


/* ==========================================================
                DEFAULT SUBJECTS
========================================================== */

function createDefaultSubjects() {

    subjects = [];

    for (let i = 1; i <= 5; i++) {

        subjects.push({

            name: "",

            marks: ""

        });

    }

}


/* ==========================================================
                CREATE SUBJECT ROW
========================================================== */

function createSubjectRow(index, data = {}) {

    const template = subjectTemplate.content.cloneNode(true);

    const row = template.querySelector(".subject-row");

    const nameInput = row.querySelector(".subject-name");

    const marksInput = row.querySelector(".subject-mark");

    const deleteBtn = row.querySelector(".delete-subject");

    nameInput.value = data.name || "";

    marksInput.value = data.marks || "";

    nameInput.dataset.index = index;

    marksInput.dataset.index = index;

    deleteBtn.dataset.index = index;

    subjectsContainer.appendChild(row);

}


/* ==========================================================
                    RENDER SUBJECTS
========================================================== */

function renderSubjects() {

    subjectsContainer.innerHTML = "";

    subjects.forEach((subject, index) => {

        createSubjectRow(index, subject);

    });

}


/* ==========================================================
                    INITIALIZE
========================================================== */

createDefaultSubjects();

renderSubjects();

/* ==========================================================
                UPDATE SUBJECT COUNT
========================================================== */

function updateSubjectCount() {

    subjectCount.value = subjects.length;

}

/* ==========================================================
                ADD SUBJECT
========================================================== */

function addSubject() {

    if (subjects.length >= 15) {

        alert("Maximum 15 subjects allowed.");

        return;

    }

    subjects.push({

        name: "",

        marks: ""

    });

    renderSubjects();

    updateSubjectCount();

}

/* ==========================================================
                DELETE SUBJECT
========================================================== */

function deleteSubject(index) {

    if (subjects.length <= 1) {

        alert("At least one subject is required.");

        return;

    }

    subjects.splice(index, 1);

    renderSubjects();

    updateSubjectCount();

}

/* ==========================================================
                BUTTON EVENTS
========================================================== */

addSubjectBtn.addEventListener("click", addSubject);

/* Small + button near subject count */

document.getElementById("addSubject").addEventListener("click", addSubject);

/* ==========================================================
                DELETE BUTTON EVENT
========================================================== */

subjectsContainer.addEventListener("click", function (event) {

    if (!event.target.closest(".delete-subject")) {

        return;

    }

    const button = event.target.closest(".delete-subject");

    const index = Number(button.dataset.index);

    deleteSubject(index);

});

/* ==========================================================
                SUBJECT COUNT INPUT
========================================================== */

subjectCount.addEventListener("change", function () {

    let total = Number(this.value);

    if (isNaN(total)) {

        total = 5;

    }

    if (total < 1) {

        total = 1;

    }

    if (total > 15) {

        total = 15;

    }

    while (subjects.length < total) {

        subjects.push({

            name: "",

            marks: ""

        });

    }

    while (subjects.length > total) {

        subjects.pop();

    }

    renderSubjects();

});

/* ==========================================================
                UPDATE SUBJECT DATA
========================================================== */

subjectsContainer.addEventListener("input", function () {

    const rows = document.querySelectorAll(".subject-row");

    subjects = [];

    rows.forEach((row) => {

        const subjectName = row.querySelector(".subject-name").value.trim();

        const subjectMarks = row.querySelector(".subject-mark").value.trim();

        subjects.push({

            name: subjectName,

            marks: subjectMarks

        });

    });

});

/* ==========================================================
                GET FORM DATA
========================================================== */

function getFormData() {

    return {

        studentName: studentName.value.trim(),

        rollNumber: rollNumber.value.trim(),

        subjects: subjects

    };

}

/* ==========================================================
                VALIDATE FORM
========================================================== */

function validateForm() {

    if (studentName.value.trim() === "") {

        alert("Please enter Student Name.");

        studentName.focus();

        return false;

    }

    if (rollNumber.value.trim() === "") {

        alert("Please enter Roll Number.");

        rollNumber.focus();

        return false;

    }

    for (let i = 0; i < subjects.length; i++) {

        if (subjects[i].name === "") {

            alert(`Enter Subject ${i + 1} Name.`);

            return false;

        }

        if (subjects[i].marks === "") {

            alert(`Enter marks for ${subjects[i].name}.`);

            return false;

        }

        const marks = Number(subjects[i].marks);

        if (marks < 0 || marks > 100) {

            alert(`${subjects[i].name} marks must be between 0 and 100.`);

            return false;

        }

    }

    return true;

}

/* ==========================================================
                SAVE FORM
========================================================== */

function saveForm() {

    const formData = getFormData();

    saveData(formData);

}

/* ==========================================================
                AUTO SAVE
========================================================== */

studentName.addEventListener("input", saveForm);

rollNumber.addEventListener("input", saveForm);

subjectsContainer.addEventListener("input", saveForm);

/* ==========================================================
                LOAD SAVED DATA
========================================================== */

function loadSavedForm() {

    const data = loadData();

    if (!data) return;

    studentName.value = data.studentName || "";

    rollNumber.value = data.rollNumber || "";

    if (data.subjects && data.subjects.length) {

        subjects = data.subjects;

    } else {

        createDefaultSubjects();

    }

    updateSubjectCount();

    renderSubjects();

}

loadSavedForm();

/* ==========================================================
                RESET FORM
========================================================== */

function resetForm() {

    if (!confirm("Reset all student data?")) {

        return;

    }

    studentName.value = "";

    rollNumber.value = "";

    createDefaultSubjects();

    updateSubjectCount();

    renderSubjects();

    clearData();

}

resetBtn.addEventListener("click", resetForm);

/* ==========================================================
                CALCULATE BUTTON
========================================================== */

calculateBtn.addEventListener("click", function () {

    if (!validateForm()) {

        return;

    }

    saveForm();

    /* Show Loader */

    showLoader();

    /* Wait for animation */

    setTimeout(function () {

        hideLoader();

        /* Generate Result */

        calculateResult();

    }, 2800);

});

/* ==========================================================
                ENTER KEY SUPPORT
========================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        calculateBtn.click();

    }

});

