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
        const row = document.createElement("p");
        console.log(supervisor);
        for(const [key, value] of Object.entries(supervisor)){
            row.textContent += `${value}, `;
        }
        // row.textContent += student.firstname;
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