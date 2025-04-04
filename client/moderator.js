async function loadModerators(){
    let result;
    const target = document.querySelector('#moderatorTarget');
    const response = await fetch('/moderators');
    if(response.ok){
        result = await response.json();
        // console.log(result);
    } else {
        console.log('No moderators');
    }

    for(const moderator of result){
        const row = document.createElement("p");
        console.log(moderator);
        for(const [key, value] of Object.entries(moderator)){
            row.textContent += `${value}, `;
        }
        target.append(row);
    }
}


function goToStudent(){
    console.log('do something');
    window.location.href = '/student';
}

function goToImport(){
    window.location.href = '/import';
}

function goToSupervisor(){
    window.location.href = '/supervisor';
}

function init(){
    const studentSelect = document.querySelector('#studentPage');
    studentSelect.addEventListener('click', goToStudent);
    const importSelect = document.querySelector('#importPage');
    importSelect.addEventListener('click', goToImport);
    const supervisorSelect = document.querySelector('#supervisorPage');
    supervisorSelect.addEventListener('click', goToSupervisor);
    loadModerators();
}

init();