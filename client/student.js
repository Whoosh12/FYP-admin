async function loadStudents(){
    let result;
    const target = document.querySelector('#studentTarget');
    const response = await fetch('/student');
    if(response.ok){
        result = await response.json();
        console.log(result);
    } else {
        console.log('No students');
    }

    for(const student of result){
        const row = document.createElement("p");
        row.textContent = student;
        target.append(student);
    }
}

function init(){
    loadStudents();
}