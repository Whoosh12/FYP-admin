async function loadStudents(){
    let result;
    const target = document.querySelector('#studentTarget');
    const response = await fetch('/students');
    if(response.ok){
        result = await response.json();
        // console.log(result);
    } else {
        console.log('No students');
    }

    for(const student of result){
        const row = document.createElement("p");
        console.log(student);
        for(const [key, value] of Object.entries(student)){
            row.textContent += `${value}, `;
        }
        // row.textContent += student.firstname;
        target.append(row);
    }
}

function goToImport(){
    window.location.href = '/import';
}

function init(){
    const importButton = document.querySelector('#importPage');
    importButton.addEventListener('click', goToImport);
    loadStudents();
}

init();