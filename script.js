let subjectsAdded = false;

/* ===== CREATE SUBJECT INPUTS ===== */
function createInputs() {

    const count = Number(document.getElementById("subjects").value);
    const container = document.getElementById("marksContainer");

    container.innerHTML = "";
    subjectsAdded = false;

    if (!count || count <= 0) {
        alert("Enter valid number of subjects");
        return;
    }

    // for loop (exam important)
    for (let i = 1; i <= count; i++) {

        container.innerHTML += `
            <div class="row mb-2">

                <div class="col">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Subject ${i} Name"
                    >
                </div>

                <div class="col">
                    <input 
                        type="number" 
                        class="form-control mark" 
                        placeholder="Marks" 
                        min="0" 
                        max="100"
                    >
                </div>

            </div>
        `;
    }

    subjectsAdded = true;
}

/* ===== CALCULATE RESULT ===== */
function calculateResult() {

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const marks = document.querySelectorAll(".mark");
    const resultDiv = document.getElementById("result");

    if (!name || !roll || !subjectsAdded) {
        alert("Please fill all details");
        return;
    }

    let total = 0;
    let failed = false;
    let i = 0;
    let subjectResults = "";

    // while loop (exam important)
    while (i < marks.length) {


        const subjectName =
    document.querySelectorAll("#marksContainer input[type='text']")[i].value
    || `Subject ${i + 1}`;

        const value = Number(marks[i].value);

        if (
            marks[i].value === "" ||
            value < 0 ||
            value > 100
        ) {
            alert("Enter valid marks");
            return;
        }

        if (value < 30) {
            failed = true;
        }

        total += value;
        subjectResults += `
    <div class="result-item">
        <span>${subjectName}</span>
        <strong>${value}</strong>
    </div>
`;
        i++;
    }

    const percentage = total / marks.length;

    let grade = "Fail";
    let status = "Fail ❌";
    let alertType = "danger";

    if (!failed) {

        status = "Pass ✅";
        alertType = "success";

        if (percentage >= 90) {
            grade = "A";
        }

        else if (percentage >= 75) {
            grade = "B";
        }

        else if (percentage >= 60) {
            grade = "C";
        }

        else if (percentage >= 40) {
            grade = "D";
        }

        else {
            status = "Fail ❌";
        }
    }

    /* ===== LOCAL STORAGE ===== */
    localStorage.setItem(
        "studentResult",

        JSON.stringify({
            name,
            roll,
            total,
            percentage,
            grade,
            status
        })
    );

    /* ===== RESULT UI ===== */
    resultDiv.innerHTML = `
    <div class="modern-result-card">

        <div class="result-header">
            🎓 Student Result
        </div>

        <div class="result-body">

            <div class="result-item">
                <span>Name</span>
                <strong>${name}</strong>
            </div>

            <div class="result-item">
                <span>Roll No</span>
                <strong>${roll}</strong>
            </div>

            <div class="result-item">
                <span>Total Marks</span>
                <strong>${total}</strong>
            </div>
            ${subjectResults}

            <div class="result-item">
                <span>Percentage</span>
                <strong>${percentage.toFixed(2)}%</strong>
            </div>

            <div class="result-item">
                <span>Status</span>
                <strong class="${failed ? 'fail-text' : 'pass-text'}">
                    ${status}
                </strong>
            </div>

            <div class="result-item">
                <span>Grade</span>
                <strong>${grade}</strong>
            </div>

        </div>

    </div>
`;
}

/* ===== RESET FUNCTION ===== */
function resetAll() {

    localStorage.clear();
    location.reload();
}

/* ===== INPUT VALIDATION ===== */

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const subjectsInput = document.getElementById("subjects");

/* ===== NAME VALIDATION ===== */
/* Allow only letters and spaces */

nameInput.addEventListener("keydown", e => {

    if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
    ) {
        return;
    }

    if (!/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
    }
});

/* ===== ROLL NUMBER VALIDATION ===== */
/* Allow only numbers */

rollInput.addEventListener("keydown", e => {

    if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
    ) {
        return;
    }

    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
});

/* ===== SUBJECT COUNT VALIDATION ===== */
/* Allow only numbers */

subjectsInput.addEventListener("keydown", e => {

    if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
    ) {
        return;
    }

    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
});