/* ==========================================================
                    STORAGE MODULE
========================================================== */

const STORAGE_KEY = "studentMarksManager";

/* ==========================================================
                    SAVE DATA
========================================================== */

function saveData(data){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

/* ==========================================================
                    LOAD DATA
========================================================== */

function loadData(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(!data){

        return null;

    }

    return JSON.parse(data);

}

/* ==========================================================
                    REMOVE DATA
========================================================== */

function clearData(){

    localStorage.removeItem(STORAGE_KEY);

}

/* ==========================================================
                    CHECK DATA
========================================================== */

function hasSavedData(){

    return localStorage.getItem(STORAGE_KEY) !== null;

}