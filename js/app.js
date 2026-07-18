"use strict";

/* ==========================
        ELEMENTS
========================== */

const nameInput = document.getElementById("name");

const rollInput = document.getElementById("roll");

const subjectsInput = document.getElementById("subjects");

const marksContainer = document.getElementById("marksContainer");

const result = document.getElementById("result");

const totalMarks = document.getElementById("totalMarks");

const percentage = document.getElementById("percentage");

const grade = document.getElementById("grade");

const status = document.getElementById("status");

const studentNameDisplay = document.getElementById("studentNameDisplay");

const studentRollDisplay = document.getElementById("studentRollDisplay");

const studentAvatar = document.getElementById("studentAvatar");

const downloadBtn = document.getElementById("downloadPdf");


/* ==========================
        GLOBAL DATA
========================== */

let subjectData = [];

let reportData = [];

let total = 0;

let percent = 0;

let finalGrade = "";

let finalStatus = "";


/* ==========================
        INIT
========================== */

window.onload = () => {

    if(downloadBtn){

        downloadBtn.style.display = "none";

    }

};