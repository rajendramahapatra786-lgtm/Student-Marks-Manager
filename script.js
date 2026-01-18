let subjectsAdded = false;

/*Create Subject Inputs */

function createInputs() {
    const count = Number(document.getElementById("subjects").value);
    const container = document.getElementById("marksContainer");
    const resultDiv = document.getElementById("result");

    container.innerHTML = "";
    resultDiv.innerHTML = "";
    subjectsAdded = false;

    if (!count || count <= 0) {
        alert("Please enter a valid number of subjects");
        return;
    }

    // for-loop to create inputs (exam important)

    for (let i = 1; i <= count; i++) {
        const subjectInput = document.createElement("input");
        subjectInput.type = "text";
        subjectInput.placeholder = `Subject ${i} Name`;

        const markInput = document.createElement("input");
        markInput.type = "number";
        markInput.placeholder = `Marks for Subject ${i}`;
        markInput.className = "mark";
        markInput.min = "0";
        markInput.max = "100";

        container.appendChild(subjectInput);
        container.appendChild(markInput);
    }

    subjectsAdded = true;
}

/* Calculate Result */

function calculateResult() {
    const name = document.getElementById("name").value.trim();
    const rollInput = document.getElementById("roll");
    const roll = rollInput.value.trim();
    const marks = document.querySelectorAll(".mark");
    const subjects = document.querySelectorAll("#marksContainer input[type='text']");
    const resultDiv = document.getElementById("result");

    // Student name validation

    if (!name) {
        alert("Please enter student name");
        return;
    }

    // Roll number validation (numeric only)

    if (!roll || isNaN(roll) || Number(roll) <= 0) {
        alert("Please enter a valid numeric roll number");
        rollInput.focus();
        return;
    }

    if (!subjectsAdded || marks.length === 0) {
        alert("Please add subjects first");
        return;
    }

    let total = 0;
    let failedSubjects = [];

    // for-loop for calculation (exam important)

    for (let i = 0; i < marks.length; i++) {
        const subjectName = subjects[i].value.trim();
        const value = Number(marks[i].value);

        if (!subjectName) {
            alert(`Please enter name for Subject ${i + 1}`);
            return;
        }

        if (marks[i].value === "") {
            alert(`Please enter marks for ${subjectName}`);
            return;
        }

        if (value < 0 || value > 100) {
            alert(`Marks must be between 0 and 100 (${subjectName})`);
            return;
        }

        if (value < 30) {
            failedSubjects.push(subjectName);
        }

        total += value;
    }

    const percentage = total / marks.length;
    let grade = "";

    if (failedSubjects.length > 0) {
        grade = "Fail";
    } else if (percentage >= 90) {
        grade = "A";
    } else if (percentage >= 75) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 40) {
        grade = "D";
    } else {
        grade = "Fail";
    }

    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Roll No:</strong> ${roll}</p>
        <p><strong>Total Marks:</strong> ${total}</p>
        <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
        <p><strong>Grade:</strong> ${grade}</p>
        ${
            failedSubjects.length > 0
                ? `<p style="color:red;">
                    Failed in: ${failedSubjects.join(", ")}
                   </p>`
                : `<p style="color:green;">Passed all subjects 🎉</p>`
        }
    `;
}

/* Reset All Data */

function resetAll() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("subjects").value = "";
    document.getElementById("marksContainer").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    subjectsAdded = false;
}
