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
        const span = document.createElement("span");
        const row = document.createElement("p");
        const button = document.createElement("button");
        button.textContent = '>';
        for(const [key, value] of Object.entries(moderator)){
            row.textContent += `${value}, `;
        }
        button.addEventListener('click', () => window.location.href = `edit#moderator${moderator.moderatorid}`);
        span.append(row);
        span.append(button);
        target.append(span);
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