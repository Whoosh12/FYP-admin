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
        const span = document.createElement("span");
        const row = document.createElement("p");
        const button = document.createElement("button");
        button.textContent = '>';
        for(const [key, value] of Object.entries(student)){
            row.textContent += `${value}, `;
        }
        button.addEventListener('click', () => window.location.href = `edit#student${student.studentid}`);
        span.append(row);
        span.append(button);
        // target.append(button);
        // target.append(row);
        target.append(span);
    }
}

function goToImport(){
    window.location.href = '/import';
}

function goToSupervisor(){
    window.location.href = '/supervisor';
}

function goToModerator(){
    window.location.href = '/moderator';
}

function init(){
    const importButton = document.querySelector('#importPage');
    importButton.addEventListener('click', goToImport);
    const moderatorSelect = document.querySelector('#moderatorPage');
    moderatorSelect.addEventListener('click', goToModerator);
    const supervisorSelect = document.querySelector('#supervisorPage');
    supervisorSelect.addEventListener('click', goToSupervisor);
    loadStudents();
}

init();