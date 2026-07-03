let subjectsAdded = false;
let pdfData = {};

function speak(message) {

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance();

    speech.text = message;
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

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
    let subjectList = [];

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

        if (value < 33) {
            failed = true;
        }

        total += value;

        subjectList.push({
            subject: subjectName,
            marks: value
        });

        subjectResults += `
<div class="result-item">
    <span>${subjectName}</span>

    <strong>
        ${value}
        ${value >= 33 ? "✅" : "❌"}
    </strong>
</div>
`;
        i++;
    }

    const percentage = total / marks.length;

    let grade = "Fail";
    let status = "Fail ❌";
    let alertType = "danger";
    let gradeClass = "grade-fail";



    if (!failed) {

        speak(
            `Congratulations ${name}, you have passed successfully`
        );

        status = "Pass ✅";

        if (percentage >= 90) {
            grade = "A";
            gradeClass = "grade-a";
        }

        else if (percentage >= 75) {
            grade = "B";
            gradeClass = "grade-b";
        }

        else if (percentage >= 60) {
            grade = "C";
            gradeClass = "grade-c";
        }

        else if (percentage >= 40) {
            grade = "D";
            gradeClass = "grade-c";
        }

        else {
            grade = "Fail";
            gradeClass = "grade-fail";
        }

    } else {

        speak(
            `Sorry ${name}, you failed. Better luck next year`
        );
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

    pdfData = {
        name,
        roll,
        total,
        percentage,
        grade,
        status,
        subjects: subjectList
    };

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
    <strong class="${gradeClass}">
        ${grade}
    </strong>
</div>

        </div>

    </div>
`;

    document.getElementById("downloadPdf").style.display = "block";

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

/* ===== DOWNLOAD PDF ===== */

function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("Student Report Card", 20, y);

    y += 15;

    doc.setFontSize(12);

    doc.text(`Student Name: ${pdfData.name}`, 20, y);
    y += 10;

    doc.text(`Roll Number: ${pdfData.roll}`, 20, y);
    y += 10;

    doc.text(`Total Marks: ${pdfData.total}`, 20, y);
    y += 10;

    doc.text(
        `Percentage: ${pdfData.percentage.toFixed(2)}%`,
        20,
        y
    );

    y += 10;

    doc.text(`Grade: ${pdfData.grade}`, 20, y);

    y += 10;

    doc.text(`Status: ${pdfData.status}`, 20, y);

    y += 20;

    doc.text("Subjects:", 20, y);

    y += 10;

    pdfData.subjects.forEach((item) => {

        doc.text(
            `${item.subject} : ${item.marks}`,
            25,
            y
        );

        y += 10;
    });

    doc.save("Student_Report_Card.pdf");
}