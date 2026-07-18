"use strict";

/* ===========================================
            CALCULATE RESULT
=========================================== */

function calculateResult() {

    getSubjects();

    if (nameInput.value.trim() === "") {

        alert("Enter Student Name");

        return;

    }

    if (rollInput.value.trim() === "") {

        alert("Enter Roll Number");

        return;

    }

    if (subjectData.length === 0) {

        alert("Please Add Subjects");

        return;

    }

    total = 0;

    let failed = 0;

    reportData = [];

    subjectData.forEach(item => {

        if (

            isNaN(item.mark) ||

            item.mark < 0 ||

            item.mark > 100

        ) {

            alert(`Invalid marks for ${item.subject}`);

            throw new Error();

        }

        total += item.mark;

        const statusText = item.mark >= 35 ? "PASS" : "FAIL";

        if (item.mark < 35) failed++;

        reportData.push({

            subject: item.subject,

            marks: item.mark,

            status: statusText

        });

    });

    percent = (total / (reportData.length * 100)) * 100;

    if (percent >= 90)

        finalGrade = "A+";

    else if (percent >= 80)

        finalGrade = "A";

    else if (percent >= 70)

        finalGrade = "B";

    else if (percent >= 60)

        finalGrade = "C";

    else if (percent >= 35)

        finalGrade = "D";

    else

        finalGrade = "F";

    finalStatus = failed === 0 ? "PASS" : "FAIL";

    updateDashboard();

}


/* ===========================================
            UPDATE DASHBOARD
=========================================== */

function updateDashboard() {

    studentNameDisplay.textContent =

        nameInput.value;

    studentRollDisplay.textContent =

        "Roll No : " + rollInput.value;

    updateAvatar(nameInput.value);

    totalMarks.textContent = total;

    percentage.textContent =

        percent.toFixed(2) + "%";

    grade.textContent = finalGrade;

    status.textContent = finalStatus;

    result.innerHTML = "";

    reportData.forEach(subject => {

        const progress = subject.marks;

        result.innerHTML += `

<div class="subject-card">

    <div class="subject-top">

        <div class="subject-name">

            <i class="bi bi-book-fill"></i>

            ${subject.subject}

        </div>

        <div class="subject-mark">

            ${subject.marks}/100

        </div>

    </div>

    <div class="progress">

        <div
            class="progress-bar"
            style="width:${progress}%">

        </div>

    </div>

    <div class="subject-footer">

        <span>

            Progress

        </span>

        <span class="${subject.status==="PASS"?"badge-pass":"badge-fail"}">

            ${subject.status}

        </span>

    </div>

</div>

`;

    });

    downloadBtn.style.display = "block";

    speakResult();

}