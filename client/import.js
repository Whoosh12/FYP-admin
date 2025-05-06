// import { csv2json } from "./node_modules/json-2-csv";
// let converter = require('json-2-csv');
"use strict";


function submitStudentFile(){
    console.log('a');
    const file = document.querySelector('#fileInput');
    const selectedFile = file.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            const csvData = reader.result;
            const jsonData = csvToJson(csvData);
            saveStudents(jsonData);
        },
        false,
    );

    if(selectedFile){
        reader.readAsText(selectedFile);
    }
}

async function saveStudents(students) {
    const feedback = document.querySelector('#feedback');
    console.log(students);
    for(let i = 0; i < students.length; i++){
        const payload = {
            id: i,
            firstname: students[i].firstName,
            lastname: students[i].lastName,
            course: students[i].course,
        }
        console.log(payload);
        const response1 = await fetch('student', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const response2 = await fetch('choices', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        console.log(students[i]);
        feedback.textContent = `Imported ${i + 1} out of ${students.length} students`
    }
    window.location.href = '/student';
}

function submitStaffFile(){
    console.log('a');
    const file = document.querySelector('#fileInput');
    const selectedFile = file.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            const csvData = reader.result;
            const jsonData = csvToJson(csvData);
            saveStaff(jsonData);
        },
        false,
    );

    if(selectedFile){
        reader.readAsText(selectedFile);
    }
}

async function saveStaff(staff) {
    const feedback = document.querySelector('#feedback'); // find the element containing the feedback text
    for(let i = 0; i < staff.length; i++){
        const payload = staff[i];
        // send the HTTP requests to do the INSERT queries
        const response1 = await fetch('supervisors', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const response2 = await fetch('moderators', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        feedback.textContent = `Imported ${i + 1} out of ${staff.length} staff`
    }
    window.location.href = '/'; //returns the user to the home page
}

function csvToJson(csvString) { //code found on https://www.geeksforgeeks.org/how-to-convert-csv-to-json-in-javascript/
    const rows = csvString.split("\n");

    const headers = rows[0].split(",");

    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {

        const values = rows[i].split(",");

        const obj = {};

        for (let j = 0; j < headers.length; j++) {

            const key = headers[j].trim();
            const value = values[j];

            obj[key] = value;
        }
        jsonData.push(obj);
    }
    return jsonData;
}

function applyAccessibility(){
    const allElems = document.querySelectorAll('body > *');
    const otherElems = document.querySelectorAll('section > *');
    const cookieSplit1 = document.cookie.split("; ");
    const accessObject = {};
    for(const cookie of cookieSplit1){
        const cookieSplit2 = cookie.split("=");
        accessObject[cookieSplit2[0]] = cookieSplit2[1];
    }

    for(const elem of allElems){
        elem.style.fontFamily = accessObject.font;
        elem.style.fontSize = accessObject.textSize;
        elem.style.color = accessObject.textColour;
    }

    for(const elem of otherElems){
        elem.style.fontFamily = accessObject.font;
        elem.style.fontSize = accessObject.textSize;
        elem.style.color = accessObject.textColour;
    }
    document.body.style.backgroundColor = accessObject.backgroundColour;
}

function init(){
    const backButton = document.querySelector('#back');
    backButton.addEventListener('click', () => {
        history.back();
    });
    const importStudents = document.querySelector('#importStudents');
    const importStaff = document.querySelector('#importStaff');
    importStudents.addEventListener('click', submitStudentFile);
    importStaff.addEventListener('click', submitStaffFile);
    applyAccessibility();
}

init();