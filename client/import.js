// import { csv2json } from "./node_modules/json-2-csv";
// let converter = require('json-2-csv');
"use strict";


function submitFile(){
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
    console.log(students);
    for(const student of students){
        const payload = student;
        const response = await fetch('student', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        console.log(student);
    }
    window.location.href = '/student';
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
    const fileInput = document.querySelector('#fileInput');
    const inputButton = document.querySelector('#inputButton');
    inputButton.addEventListener('click', submitFile);
}

init();