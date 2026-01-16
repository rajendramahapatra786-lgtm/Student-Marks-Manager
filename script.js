let subjectsAdded = false;

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

    for (let i = 1; i <= count; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `Marks for Subject ${i}`;
        input.className = "mark";
        input.min = "0";
        input.max = "100";
        container.appendChild(input);
    }

    subjectsAdded = true;
}

function calculateResult() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const marks = document.querySelectorAll(".mark");
    const resultDiv = document.getElementById("result");

    if (!name || !roll) {
        alert("Please enter student name and roll number");
        return;
    }

    if (!subjectsAdded || marks.length === 0) {
        alert("Please add subjects first");
        return;
    }

    let total = 0;
    let failedSubjects = [];

    for (let i = 0; i < marks.length; i++) {
        const value = Number(marks[i].value);

        if (marks[i].value === "") {
            alert(`Please enter marks for Subject ${i + 1}`);
            return;
        }

        if (value < 0 || value > 100) {
            alert(`Marks must be between 0 and 100 (Subject ${i + 1})`);
            return;
        }

        if (value < 30) {
            failedSubjects.push(`Subject ${i + 1}`);
        }

        total += value;
    }

    const average = total / marks.length;
    let grade = "";

    if (failedSubjects.length > 0) {
        grade = "Fail";
    } else if (average >= 90) {
        grade = "A";
    } else if (average >= 75) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 40) {
        grade = "D";
    } else {
        grade = "Fail";
    }

    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Roll No:</strong> ${roll}</p>
        <p><strong>Total:</strong> ${total}</p>
        <p><strong>Average:</strong> ${average.toFixed(2)}</p>
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
