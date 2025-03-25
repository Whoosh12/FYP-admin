// import { csv2json } from "./node_modules/json-2-csv";
// let converter = require('json-2-csv');

function submitFile(){
    console.log('a');
    const file = document.querySelector('#fileInput');
    const selectedFile = file.files[0];
    const reader = new FileReader();
    const importedObject = [];
    const student = {
        id: 0,
        firstName: '',
        Sirname: '',
    };

    reader.addEventListener(
        "load",
        () => {
            // console.log(reader.result);
            for(let i=0; i<reader.result.length; i++){
                const currentStudent = Object.create(student);
                if(i+1/3 != 1 && i+1/2 != 1){
                    currentStudent.id = reader.result[i];
                } else if(i/2 == 1 && i+1/3 != 1 && i+1/4 != 1){
                    currentStudent.firstName = reader.result[i];
                } else if(i+1/3 ==1);
                importedObject.append(currentStudent);
            }
            console.log(importedObject);
        },
        false,
    );

    if(selectedFile){
        reader.readAsText(selectedFile);
    }
    
}

function init(){
    const fileInput = document.querySelector('#fileInput');
    const inputButton = document.querySelector('#inputButton');
    inputButton.addEventListener('click', submitFile);
}

init();