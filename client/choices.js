async function getSupervisors(){
    let result;
    const sup1Select = document.querySelector('#supervisor1Select');
    const sup2Select = document.querySelector('#supervisor2Select');
    const sup3Select = document.querySelector('#supervisor3Select');
    const response = await fetch('/supervisors');
    if(response.ok){
        result = await response.json();
    } else {
        console.log('No supervisors');
    }
    for(let i = 0; i < 3; i++){
        for(const supervisor of await result){
            const supervisorOption = document.createElement('option');
            supervisorOption.textContent = supervisor.supervisorfname + ' ' + supervisor.supervisorlname;
            supervisorOption.value = supervisor.supervisorid;
            if(i == 0){
                sup1Select.append(supervisorOption);
            } else if(i == 1){
                sup2Select.append(supervisorOption);
            } else if(i == 2){
                sup3Select.append(supervisorOption);
            }
        }
    }
    
}

async function submitChoices(){
    const id = window.location.hash.substring(1);
    const sup1Select = document.querySelector('#supervisor1Select');
    const sup2Select = document.querySelector('#supervisor2Select');
    const sup3Select = document.querySelector('#supervisor3Select');
    
    const payload = {
        id,
        choice1: sup1Select.value,
        choice2: sup2Select.value,
        choice3: sup3Select.value,
    };

    const response = await fetch(`choices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    window.location.href = '/student';
}

function applyAccessibility(){
    const allElems = document.querySelectorAll('body > *');
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
    document.body.style.backgroundColor = accessObject.backgroundColour;
}

function init(){
    const backButton = document.querySelector('#backButton');
    backButton.addEventListener('click', () => {
        history.back();
    });
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', submitChoices);
    getSupervisors();
    applyAccessibility();
}

init();