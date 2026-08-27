const pageHeader = document.querySelector(".page-header");
/* ==========================================================
                    RESULT CALCULATIONS
========================================================== */

function calculateResult() {

    const data = getFormData();

    const result = processResult(data);

    updateResultUI(data, result);

}
/* ==========================================================
                    PROCESS RESULT
========================================================== */

function processResult(data) {

    let totalMarks = 0;

    let highest = -1;

    let lowest = 101;

    let pass = true;

    data.subjects.forEach(subject => {

        const marks = Number(subject.marks);

        totalMarks += marks;

        if (marks > highest) {

            highest = marks;

        }

        if (marks < lowest) {

            lowest = marks;

        }

        if (marks < 35) {

            pass = false;

        }

    });



    const percentage = totalMarks / data.subjects.length;

    const grade = calculateGrade(percentage, pass);

    return {

        totalMarks,

        percentage,

        highest,

        lowest,

        pass,

        grade,

        remark: getRemark(percentage, pass)

    };

}

/* ==========================================================
                    GRADE SYSTEM
========================================================== */

function calculateGrade(percentage, pass) {

    if (!pass) return "F";

    if (percentage >= 90) return "A+";

    if (percentage >= 80) return "A";

    if (percentage >= 70) return "B+";

    if (percentage >= 60) return "B";

    if (percentage >= 50) return "C";

    if (percentage >= 40) return "D";

    return "F";

}

/* ==========================================================
                    REMARKS
========================================================== */

function getRemark(percentage, pass) {

    if (!pass) {

        return "Needs Improvement";

    }

    if (percentage >= 90) {

        return "Outstanding Performance";

    }

    if (percentage >= 80) {

        return "Excellent Work";

    }

    if (percentage >= 70) {

        return "Very Good";

    }

    if (percentage >= 60) {

        return "Good";

    }

    if (percentage >= 50) {

        return "Satisfactory";

    }

    return "Passed";

}

/* ==========================================================
                RESULT UI ELEMENTS
========================================================== */

// const resultSection = document.getElementById("resultSection");

const resultStudentName = document.getElementById("resultStudentName");

const resultRollNumber = document.getElementById("resultRollNumber");

const resultBadge = document.getElementById("resultBadge");

const totalMarksCard = document.getElementById("totalMarks");

const percentageCard = document.getElementById("percentage");

const gradeCard = document.getElementById("grade");

const statusCard = document.getElementById("status");

const percentageRemark = document.getElementById("percentageRemark");
const gradeRemark = document.getElementById("gradeRemark");
const statusRemark = document.getElementById("statusRemark");
const performanceTitle = document.getElementById("performanceTitle");
const circleProgress = document.getElementById("progressCircle");

const circleText = document.getElementById("progressText");

/* ==========================================================
                UPDATE RESULT UI
========================================================== */

function updateResultUI(data, result) {

    resultStudentName.textContent = data.studentName;

    resultRollNumber.textContent = data.rollNumber;

    totalMarksCard.textContent = result.totalMarks;

    totalMarksOutOf.textContent =
        "/" + (data.subjects.length * 100);

    percentageCard.textContent =
        result.percentage.toFixed(2) + "%";

    gradeCard.textContent = result.grade;

    statusCard.textContent =
        result.pass ? "PASS" : "FAIL";


    /* =========================================
                    DYNAMIC REMARKS
       ========================================= */

    const remark = result.remark;

    if (percentageRemark) {
        percentageRemark.textContent = remark;
    }

    if (gradeRemark) {
        gradeRemark.textContent = remark;
    }

    if (statusRemark) {
        statusRemark.textContent =
            result.pass ? "Passed" : "Needs Improvement";
    }

    if (performanceTitle) {
        performanceTitle.textContent =
            result.pass
                ? remark + "!"
                : "Needs Improvement!";
    }


    /* =========================================
                    DYNAMIC BADGE
       ========================================= */

    updateBadge(result.pass);


    /* =========================================
                    PROGRESS
       ========================================= */

    animateProgress(result.percentage);

    updateProgressColor(result.percentage);

    checkTopper(result);

    generateSubjectTable(data.subjects);

    syncPerformanceCards();

    announceResult(data, result);

    runDashboardAnimation(result);

    showResultPanel();
}


/* ==========================================================
                PASS / FAIL BADGE
========================================================== */

function updateBadge(pass) {

    const resultStatusBadge =
        document.getElementById("resultStatusBadge");

    if (pass) {

        resultBadge.textContent = "PASS";

        resultBadge.classList.remove("fail");
        resultBadge.classList.add("pass");

        if (resultStatusBadge) {
            resultStatusBadge.textContent = "PASS";

            resultStatusBadge.classList.remove("fail");
            resultStatusBadge.classList.add("pass");
        }

    } else {

        resultBadge.textContent = "FAIL";

        resultBadge.classList.remove("pass");
        resultBadge.classList.add("fail");

        if (resultStatusBadge) {
            resultStatusBadge.textContent = "FAIL";

            resultStatusBadge.classList.remove("pass");
            resultStatusBadge.classList.add("fail");
        }
    }
}

/* ==========================================================
                SHOW RESULT PANEL
========================================================== */

function showResultPanel() {

    const resultSection = document.getElementById("resultSection");

    if (!resultSection) return;

    resultSection.classList.remove("hidden");

    document
        .querySelector(".app-container")
        .classList.add("show-result");

    if (pageHeader) {
        pageHeader.classList.add("show");
    }

}

/* ==========================================================
                HIDE RESULT PANEL
========================================================== */

function hideResultPanel() {

    const resultSection = document.getElementById("resultSection");

    if (!resultSection) return;

    resultSection.classList.add("hidden");

    document
        .querySelector(".app-container")
        .classList.remove("show-result");

    if (pageHeader) {
        pageHeader.classList.remove("show");
    }

}

/* ==========================================================
                REFRESH ANIMATION
========================================================== */

function refreshResultAnimation() {

    resultSection.classList.remove("animate");

    void resultSection.offsetWidth;

    resultSection.classList.add("animate");

}

/* ==========================================================
                SUBJECT RESULT TABLE
========================================================== */

const subjectPerformanceList = document.getElementById("subjectPerformanceList");

function generateSubjectTable(subjects) {

    subjectPerformanceList.innerHTML = "";

    subjects.forEach(subject => {

        const marks = Number(subject.marks);
        const isFail = marks < 35;

        subjectPerformanceList.innerHTML += `
            <div class="subject-row">

                <div class="subject-name">

                    <div class="subject-icon">
                        <i class="fa-solid fa-book"></i>
                    </div>

                    <span>${subject.name}</span>

                </div>

                <div class="subject-marks">
                    ${marks} / 100
                </div>

                <div class="subject-progress">

                    <div class="progress-track">

                        <div
                            class="progress-fill ${isFail ? "fail" : ""}"
                            style="width:${marks}%">
                        </div>

                    </div>

                </div>

                <div class="subject-percent">
                    ${marks}%
                </div>

            </div>
        `;
    });

}



/* ==========================================================
                CIRCULAR PROGRESS
========================================================== */

function animateProgress(percentage) {

    const radius = circleProgress.r.baseVal.value;

    const circumference = 2 * Math.PI * radius;

    circleProgress.style.strokeDasharray = circumference;

    let current = 0;

    const animation = setInterval(() => {

        current++;

        if (current >= percentage) {

            current = percentage;

            clearInterval(animation);

        }

        const offset = circumference - (current / 100) * circumference;

        circleProgress.style.strokeDashoffset = offset;

        circleText.textContent = current.toFixed(0) + "%";

    }, 15);

}

/* ==========================================================
                RESULT COLORS
========================================================== */

function updateProgressColor(percentage) {

    circleProgress.classList.remove(
        "excellent",
        "good",
        "average",
        "poor"
    );

    if (percentage >= 90) {

        circleProgress.classList.add("excellent");

    } else if (percentage >= 70) {

        circleProgress.classList.add("good");

    } else if (percentage >= 50) {

        circleProgress.classList.add("average");

    } else {

        circleProgress.classList.add("poor");

    }

}

/* ==========================================================
                TOPPER EFFECT
========================================================== */

function checkTopper(result) {

    if (result.percentage >= 90) {

        if (typeof startConfetti === "function") {

            startConfetti();

        }

    }

}

/* ==========================================================
                RESULT ACTION BUTTONS
========================================================== */

const homeBtn = document.getElementById("homeBtn");
const pdfBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

/* ==========================================================
                SPEECH RESULT
========================================================== */

function announceResult(data, result) {

    if (typeof speakResult !== "function") {

        return;

    }

    const message = `
        Hello ${data.studentName}.
        Your result has been generated.
        You scored ${result.percentage.toFixed(2)} percent.
        Your grade is ${result.grade}.
        You are ${result.pass ? "Pass" : "Fail"}.
        ${result.remark}.
    `;

    speakResult(message);

}

/* ==========================================================
                HOME BUTTON
========================================================== */

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

/* ==========================================================
                DOWNLOAD PDF
========================================================== */

pdfBtn.addEventListener("click", () => {

    window.print();

});

/* ==========================================================
                SHARE RESULT
========================================================== */

shareBtn.addEventListener("click", async () => {

    const text = `
Student Result

Name : ${resultStudentName.textContent}
Roll : ${resultRollNumber.textContent}
Percentage : ${percentageCard.textContent}
Grade : ${gradeCard.textContent}
Status : ${statusCard.textContent}
`;

    if (navigator.share) {

        try {

            await navigator.share({

                title: "Student Result",

                text

            });

        } catch (error) {

            console.log(error);

        }

    } else {

        navigator.clipboard.writeText(text);

        alert("Result copied to clipboard.");

    }

});

/* ==========================================================
                RESET RESULT
========================================================== */

function clearResultUI() {

    resultStudentName.textContent = "-";

    resultRollNumber.textContent = "-";

    totalMarksCard.textContent = "-";

    percentageCard.textContent = "0%";

    gradeCard.textContent = "-";

    statusCard.textContent = "-";


    if (percentageRemark) {
        percentageRemark.textContent = "-";
    }

    if (gradeRemark) {
        gradeRemark.textContent = "-";
    }

    if (statusRemark) {
        statusRemark.textContent = "-";
    }

    if (performanceTitle) {
        performanceTitle.textContent =
            "Performance Overview";
    }


    /* Reset top PASS/FAIL badge */

    if (resultBadge) {
        resultBadge.textContent = "PASS";

        resultBadge.classList.remove("pass");
        resultBadge.classList.remove("fail");
    }


    /* Reset profile status badge */

    const resultStatusBadge =
        document.getElementById("resultStatusBadge");

    if (resultStatusBadge) {

        resultStatusBadge.textContent = "PASS";

        resultStatusBadge.classList.remove("pass");
        resultStatusBadge.classList.remove("fail");
    }


    /* Reset progress */

    circleText.textContent = "0%";

    circleProgress.classList.remove(
        "excellent",
        "good",
        "average",
        "poor"
    );


    /* Reset subject performance */

    if (subjectPerformanceList) {
        subjectPerformanceList.innerHTML = "";
    }
}

// ==========================================================
// Sync Performance Cards Height
// ==========================================================

const performanceCard = document.querySelector(".performance-card");
const percentageCardElement = document.querySelector(".percentage-card");

function syncPerformanceCards() {
    if (!performanceCard || !percentageCardElement) return;

    // Mobile layout
    if (window.innerWidth <= 768) {
        percentageCardElement.style.height = "auto";
        return;
    }

    percentageCardElement.style.height = `${performanceCard.getBoundingClientRect().height}px`;
}

// Watch for any height change in the left card
if (performanceCard && percentageCardElement) {
    const observer = new ResizeObserver(syncPerformanceCards);
    observer.observe(performanceCard);
}

// Window resize
window.addEventListener("resize", syncPerformanceCards);