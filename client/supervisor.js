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
        const button = document.createElement("button");
        button.textContent = '>';
        for(const [key, value] of Object.entries(supervisor)){
            row.textContent += `${value}, `;
        }
        button.addEventListener('click', () => window.location.href = `edit#supervisor${supervisor.supervisorid}`);
        target.append(row);
        target.append(button);
    }

    applyAccessibility();
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

function applyAccessibility(){
    const allElems = document.querySelectorAll('body > *');
    const otherElems = document.querySelectorAll('section > *');
    const cookieSplit1 = document.cookie.split("; ");
    const cookieValue = [];
    const accessObject = {};
    for(const cookie of cookieSplit1){
        const cookieSplit2 = cookie.split("=");
        accessObject[cookieSplit2[0]] = cookieSplit2[1];
    }

    for(const elem of allElems){
        elem.style.fontFamily = accessObject.font;
        elem.style.fontSize = accessObject.textSize;
        elem.style.color = accessObject.textColour;
    }

    for(const elem of otherElems){
        elem.style.fontFamily = accessObject.font;
        elem.style.fontSize = accessObject.textSize;
        elem.style.color = accessObject.textColour;
    }
    document.body.style.backgroundColor = accessObject.backgroundColour;
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