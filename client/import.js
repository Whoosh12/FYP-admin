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
    const randomNum = Math.round(Math.random() * 6);
    const feedback = document.querySelector('#feedback');
    for(let i = 0; i < staff.length; i++){
        const payload = staff[i];
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
        console.log(staff[i]);
        feedback.textContent = `Imported ${i + 1} out of ${staff.length} staff`
    }
    window.location.href = '/';
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
        // console.log(obj);
        jsonData.push(obj);
    }
    // console.log(jsonData);
    return jsonData;
}

function init(){
    const importStudents = document.querySelector('#importStudents');
    const importStaff = document.querySelector('#importStaff');
    importStudents.addEventListener('click', submitStudentFile);
    importStaff.addEventListener('click', submitStaffFile);
}

init();