"use strict";

/* ===========================================
            SPEAK RESULT
=========================================== */

function speakResult() {

    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const message = `

Student ${nameInput.value}.

Your total marks are ${total}.

Percentage is ${percent.toFixed(2)} percent.

Your grade is ${finalGrade}.

You are ${finalStatus}.

`;

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "en-US";

    speech.rate = 0.95;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);

}

/* ===========================================
            STOP SPEECH
=========================================== */

function stopSpeech() {

    speechSynthesis.cancel();

}

/* ===========================================
            STOP ON RESET
=========================================== */

window.addEventListener("beforeunload", stopSpeech);