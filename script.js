let subjectsAdded = false;

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
                    <input type="text" class="form-control" placeholder="Subject ${i} Name">
                </div>
                <div class="col">
                    <input type="number" class="form-control mark" placeholder="Marks" min="0" max="100">
                </div>
            </div>
        `;
    }

    subjectsAdded = true;
}

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

    // while loop (exam important)
    while (i < marks.length) {
        const value = Number(marks[i].value);

        if (marks[i].value === "" || value < 0 || value > 100) {
            alert("Enter valid marks");
            return;
        }

        if (value < 30) failed = true;

        total += value;
        i++;
    }

    const percentage = total / marks.length;
    let grade = "Fail";
    let status = "Fail ❌";
    let alertType = "danger";

    if (!failed) {
        status = "Pass ✅";
        alertType = "success";

        if (percentage >= 90) grade = "A";
        else if (percentage >= 75) grade = "B";
        else if (percentage >= 60) grade = "C";
        else if (percentage >= 40) grade = "D";
        else status = "Fail ❌";
    }

    // Local Storage
    localStorage.setItem("studentResult", JSON.stringify({
        name, roll, total, percentage, grade, status
    }));

    resultDiv.innerHTML = `
        <div class="alert alert-${alertType}">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Roll No:</strong> ${roll}</p>
            <p><strong>Total Marks:</strong> ${total}</p>
            <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Grade:</strong> ${grade}</p>
        </div>
    `;
}

function resetAll() {
    localStorage.clear();
    location.reload();
}
