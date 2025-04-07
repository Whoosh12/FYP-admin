async function loadSupervisors(){
    let result;
    const target = document.querySelector('#supervisorTarget');
    const response = await fetch('/supervisors');
    if(response.ok){
        result = await response.json();
        // console.log(result);
    } else {
        console.log('No supervisors');
    }

    for(const supervisor of result){
        const span = document.createElement("span");
        const row = document.createElement("p");
        const button = document.createElement("button");
        button.textContent = '>';
        for(const [key, value] of Object.entries(supervisor)){
            row.textContent += `${value}, `;
        }
        button.addEventListener('click', () => window.location.href = `edit#supervisor${supervisor.supervisorid}`);
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

function goToModerator(){
    window.location.href = '/moderator';
}

function init(){
    const studentSelect = document.querySelector('#studentPage');
    studentSelect.addEventListener('click', goToStudent);
    const importSelect = document.querySelector('#importPage');
    importSelect.addEventListener('click', goToImport);
    const moderatorSelect = document.querySelector('#moderatorPage');
    moderatorSelect.addEventListener('click', goToModerator);
    loadSupervisors();
}

init();