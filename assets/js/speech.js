/* ==========================================================
                    SPEECH SETTINGS
========================================================== */

let speechEnabled = true;

let selectedVoice = null;

/* ==========================================================
                    LOAD VOICES
========================================================== */

function loadVoices() {

    const voices = speechSynthesis.getVoices();

    selectedVoice =
        voices.find(voice => voice.lang.startsWith("en")) ||
        voices[0];

}

loadVoices();

speechSynthesis.onvoiceschanged = loadVoices;

/* ==========================================================
                    SPEAK RESULT
========================================================== */

function speakResult(text) {

    if (!speechEnabled) return;

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.voice = selectedVoice;

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);

}

/* ==========================================================
                    STOP SPEECH
========================================================== */

function stopSpeech() {

    speechSynthesis.cancel();

}

/* ==========================================================
                    TOGGLE SPEECH
========================================================== */

const speechToggle = document.getElementById("speechToggle");

speechToggle.addEventListener("click", () => {

    speechEnabled = !speechEnabled;

    if (!speechEnabled) {

        stopSpeech();

        speechToggle.innerHTML = "🔇";

    } else {

        speechToggle.innerHTML = "🔊";

    }

});

