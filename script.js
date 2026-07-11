/* ==========================================
   STUDENT MARKS MANAGER V2
   PART 1
========================================== */

let subjectsAdded = false;
let pdfData = {};

/* ==========================================
            SPEECH
========================================== */

function speak(message){

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();

    speech.text = message;

    speech.lang = "en-US";

    speech.rate = .9;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

}

/* ==========================================
            CREATE SUBJECTS
========================================== */

function createInputs(){

    const count =
    Number(
    document.getElementById("subjects").value
    );

    const container =
    document.getElementById("marksContainer");

    container.innerHTML="";

    subjectsAdded=false;

    if(!count || count<1){

        alert("Enter valid number of subjects");

        return;

    }

    for(let i=1;i<=count;i++){

        container.innerHTML+=`

        <div
        class="row subject-row"
        style="animation-delay:${i*.12}s">

            <div class="col">

                <input
                type="text"
                class="form-control"

                placeholder="Subject ${i}">

            </div>

            <div class="col">

                <input
                type="number"

                class="form-control mark"

                placeholder="Marks"

                min="0"

                max="100">

            </div>

        </div>

        `;

    }

    subjectsAdded=true;

}

/* ==========================================
            OPEN RESULT PANEL
========================================== */

function openResultPanel(){

    document

    .getElementById("studentCard")

    .classList.add("active");

}

/* ==========================================
            CLOSE RESULT PANEL
========================================== */

function closeResult(){

    document

    .getElementById("studentCard")

    .classList.remove("active");

    document

    .getElementById("downloadPdf")

    .style.display="none";

}

/* ==========================================
            SHOW LOADER
========================================== */

function showLoader(){

    document

    .getElementById("loadingScreen")

    .classList.remove("hide");

    document

    .getElementById("resultContent")

    .style.display="none";

}

/* ==========================================
            HIDE LOADER
========================================== */

function hideLoader(){

    document

    .getElementById("loadingScreen")

    .classList.add("hide");

    document

    .getElementById("resultContent")

    .style.display="block";

}

/* ==========================================
        CALCULATE RESULT
========================================== */

function calculateResult(){

    const name=document.getElementById("name").value.trim();

    const roll=document.getElementById("roll").value.trim();

    const marks=document.querySelectorAll(".mark");

    const resultDiv=document.getElementById("result");

    if(!name || !roll || !subjectsAdded){

        alert("Please fill all details");

        return;

    }

    let total=0;

    let failed=false;

    let subjectResults="";

    let subjectList=[];

    const subjectInputs=document.querySelectorAll(
        "#marksContainer input[type='text']"
    );

    for(let i=0;i<marks.length;i++){

        const subjectName=
        subjectInputs[i].value ||

        `Subject ${i+1}`;

        const value=Number(marks[i].value);

        if(

            marks[i].value==="" ||

            value<0 ||

            value>100

        ){

            alert("Enter valid marks");

            return;

        }

        total+=value;

        if(value<33){

            failed=true;

        }

        subjectList.push({

            subject:subjectName,

            marks:value

        });

        subjectResults+=`

        <div class="result-item">

            <span>${subjectName}</span>

            <strong>

                ${value}

                ${value>=33 ? "✅":"❌"}

            </strong>

        </div>

        `;

    }

    const percentage=

    total/marks.length;

    let grade="Fail";

    let gradeClass="grade-fail";

    let status="Fail ❌";

    if(!failed){

        status="Pass ✅";

        if(percentage>=90){

            grade="A";

            gradeClass="grade-a";

        }

        else if(percentage>=75){

            grade="B";

            gradeClass="grade-b";

        }

        else if(percentage>=60){

            grade="C";

            gradeClass="grade-c";

        }

        else{

            grade="D";

            gradeClass="grade-c";

        }

    }

    pdfData={

        name,

        roll,

        total,

        percentage,

        grade,

        status,

        subjects:subjectList

    };

    localStorage.setItem(

        "studentResult",

        JSON.stringify(pdfData)

    );

    openResultPanel();

    showLoader();
    
    setTimeout(()=>{

        hideLoader();

        if(failed){

            speak(

            `Sorry ${name}, you failed.

            Better luck next time.`

            );

        }

        else{

            speak(

            `Congratulations ${name},

            you have passed successfully.`

            );

        }

        resultDiv.innerHTML=`

        <div class="modern-result-card fade-in">

            <div class="result-header">

                🎓 Student Report

            </div>

            <div class="result-body">

                <div class="result-item">

                    <span>Student Name</span>

                    <strong>${name}</strong>

                </div>

                <div class="result-item">

                    <span>Roll Number</span>

                    <strong>${roll}</strong>

                </div>

                ${subjectResults}

                <div class="result-item">

                    <span>Total Marks</span>

                    <strong>${total}</strong>

                </div>

                <div class="result-item">

                    <span>Percentage</span>

                    <strong>

                        ${percentage.toFixed(2)}%

                    </strong>

                </div>

                <div class="result-item">

                    <span>Status</span>

                    <strong class="${
                        failed
                        ?"fail-text"
                        :"pass-text"
                    }">

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

        document

        .getElementById("downloadPdf")

        .style.display="block";

    },1200);

}

/* ==========================================
            RESET
========================================== */

function resetAll(){

    window.speechSynthesis.cancel();

    localStorage.removeItem("studentResult");

    document.getElementById("name").value="";

    document.getElementById("roll").value="";

    document.getElementById("subjects").value="";

    document.getElementById("marksContainer").innerHTML="";

    document.getElementById("result").innerHTML="";

    document.getElementById("downloadPdf").style.display="none";

    subjectsAdded=false;

    closeResult();

}

/* ==========================================
        NAME VALIDATION
========================================== */

const nameInput=document.getElementById("name");

nameInput.addEventListener("keydown",e=>{

    if(

        e.key==="Backspace" ||

        e.key==="Delete" ||

        e.key==="ArrowLeft" ||

        e.key==="ArrowRight" ||

        e.key==="Tab"

    ){

        return;

    }

    if(!/^[a-zA-Z\s]$/.test(e.key)){

        e.preventDefault();

    }

});

/* ==========================================
        ROLL VALIDATION
========================================== */

const rollInput=document.getElementById("roll");

rollInput.addEventListener("keydown",e=>{

    if(

        e.key==="Backspace" ||

        e.key==="Delete" ||

        e.key==="ArrowLeft" ||

        e.key==="ArrowRight" ||

        e.key==="Tab"

    ){

        return;

    }

    if(!/^[0-9]$/.test(e.key)){

        e.preventDefault();

    }

});

/* ==========================================
        SUBJECT COUNT
========================================== */

const subjectInput=document.getElementById("subjects");

subjectInput.addEventListener("keydown",e=>{

    if(

        e.key==="Backspace" ||

        e.key==="Delete" ||

        e.key==="ArrowLeft" ||

        e.key==="ArrowRight" ||

        e.key==="Tab"

    ){

        return;

    }

    if(!/^[0-9]$/.test(e.key)){

        e.preventDefault();

    }

});

/* ==========================================
        DOWNLOAD PDF
========================================== */

function downloadPDF(){

    const {jsPDF}=window.jspdf;

    const doc=new jsPDF();

    let y=20;

    doc.setFontSize(20);

    doc.text("Student Report Card",20,y);

    y+=18;

    doc.setFontSize(12);

    doc.text(`Student : ${pdfData.name}`,20,y);

    y+=10;

    doc.text(`Roll No : ${pdfData.roll}`,20,y);

    y+=10;

    doc.text(`Total Marks : ${pdfData.total}`,20,y);

    y+=10;

    doc.text(`Percentage : ${pdfData.percentage.toFixed(2)}%`,20,y);

    y+=10;

    doc.text(`Grade : ${pdfData.grade}`,20,y);

    y+=10;

    doc.text(`Status : ${pdfData.status}`,20,y);

    y+=18;

    doc.setFontSize(14);

    doc.text("Subjects",20,y);

    y+=10;

    pdfData.subjects.forEach(item=>{

        doc.text(

            `${item.subject} : ${item.marks}`,

            25,

            y

        );

        y+=10;

    });

    y+=10;

    doc.setFontSize(11);

    doc.text(

        "Generated by Student Marks Manager",

        20,

        y

    );

    doc.save("Student_Report_Card.pdf");

}

/* ==========================================
        PAGE READY
========================================== */

window.onload=()=>{

    document

    .getElementById("downloadPdf")

    .style.display="none";

}