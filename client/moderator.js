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
        row.classList.add('info');
        button.classList.add('info');
        row.classList.add('data');
        button.classList.add('edit');
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

function goToSupervisor(){
    window.location.href = '/supervisor';
}

function goToAccessibility(){
    window.location.href = '/accessibility';
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
    const supervisorSelect = document.querySelector('#supervisorPage');
    supervisorSelect.addEventListener('click', goToSupervisor);
    const accessibilityPage = document.querySelector('#accessibility');
    accessibilityPage.addEventListener('click', goToAccessibility);
    loadModerators();
}

init();