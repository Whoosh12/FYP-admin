async function loadStudents(){
    let result;
    const target = document.querySelector('#studentTarget');
    const response = await fetch('/students');
    if(response.ok){
        result = await response.json();
    } else {
        console.log('No students');
    }

    for(const student of result){
        const row = document.createElement("p");
        const button1 = document.createElement("button");
        const button2 = document.createElement("button");
        button1.textContent = '>';
        button2.textContent = 'Edit Choices';
        for(const [key, value] of Object.entries(student)){
            row.textContent += `${value}, `;
        }
        
        button1.addEventListener('click', () => window.location.href = `edit#student${student.studentid}`);
        button2.addEventListener('click', () => window.location.href = `choices#${student.studentid}`);
        target.append(row);
        target.append(button2);
        target.append(button1);
    }
    
    applyAccessibility();
}

async function assignmentAlgo(){
    const getStudents = await fetch('/chosen');
    const students = await getStudents.json();

    const getSupervisors = await fetch('/supervisors');
    const supervisors = await getSupervisors.json();

    const getModerators = await fetch('/moderators');
    const moderators = await getModerators.json();

    const trainingSups = [];
    assignRandomChoices();
    for(const supervisor of supervisors){
        if(supervisor.course == 'Training'){
            trainingSups.push(supervisor);
        }
    }
    

    for(const student of students){
        if(student.choice1 != 1 && student.choice2 != 1 && student.choice3 != 1 && student.marksup == false){
            assignChoices(student);
        } else if(student.course == 'Training' && student.marksup == false){
            assignPrioStudents(student);
        } else if(student.marksup == false){
            assignRemainingStudents(student);
        }
    }

    for(const supervisor of supervisors){
        updateSlots(supervisor);
    }

    async function assignRandomChoices(){
        for(const student of students){
            if(Math.random() > 0.55){
                for(let i = 0; i > 3; i++){
                    let randStaff = Math.max(Math.min(Math.round(Math.random() * supervisors.length), supervisors.length + 1), 1);
                    while(randStaff == student.choice1 || randStaff == student.choice2){
                        randStaff == Math.max(Math.min(Math.round(Math.random() * supervisors.length), supervisors.length + 1), 1);
                    }
                    if(i == 0){
                        student.choice1 == randStaff;
                    } else if(i == 1){
                        student.choice2 == randStaff;
                    } else {
                        student.choice3 == randStaff;
                    }
                }
            }
            console.log(student);
            const payload = {
                id: student.studentid,
                choice1: student.choice1,
                choice2: student.choice2,
                choice3: student.choice3,
            }

            const response = await fetch(`choices`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        }
    }

    async function assignChoices(student){
        const payload = {
            id,
            supervisorid: trainingSups[randomTrainingStaff].supervisorid,
            slots: trainingSups[randomTrainingStaff].supervisorslots,
        };
    
        const response = await fetch(`assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }

    async function assignPrioStudents(student){
        let randomTrainingStaff = Math.max(Math.min(Math.round(Math.random() * trainingSups.length), trainingSups.length - 1), 1);
        const id = student.studentid;
    
        const payload = {
            id,
            supervisorid: trainingSups[randomTrainingStaff].supervisorid,
            slots: trainingSups[randomTrainingStaff].supervisorslots,
        };
    
        const response = await fetch(`assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        while(trainingSups[randomTrainingStaff].supervisorslots <= 0){
            trainingSups.splice(randomTrainingStaff, 1);
            supervisors.splice(randomTrainingStaff, 1);
            randomTrainingStaff == Math.min(Math.round(Math.random() * trainingSups.length), trainingSups.length - 1);
        }
        
        trainingSups[randomTrainingStaff].supervisorslots -= 1;
        
    }

    async function assignRemainingStudents(student){
        let randomSup = Math.max(Math.min(Math.round(Math.random() * supervisors.length), supervisors.length - 1), 1);
        let randomMod = Math.max(Math.min(Math.round(Math.random() * moderators.length), moderators.length - 1), 1);
        const id = student.studentid;
    
        const payload = {
            id,
            supervisorid: supervisors[randomSup].supervisorid,
            moderatorid: moderators[randomMod].moderatorid,
        };
    
        const response = await fetch(`assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        while(supervisors[randomStaff].supervisorslots <= 0){
            supervisors.splice(randomStaff, 1);
            randomStaff = Math.max(Math.min(Math.round(Math.random() * supervisors.length), supervisors.length - 1), 1);
        } 
        
        supervisors[randomStaff].supervisorslots -= 1;
    }

    async function updateSlots(supervisor){
        const supID = parseInt(supervisor.supervisorid);
        const payload = {
            id: supID,
            slots: slots,
        }
    
        const response = await fetch(`slots`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
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
    const importButton = document.querySelector('#importPage');
    importButton.addEventListener('click', goToImport);
    const moderatorSelect = document.querySelector('#moderatorPage');
    moderatorSelect.addEventListener('click', goToModerator);
    const supervisorSelect = document.querySelector('#supervisorPage');
    supervisorSelect.addEventListener('click', goToSupervisor);
    const choiceAssign = document.querySelector('#choiceAssign');
    choiceAssign.addEventListener('click', assignmentAlgo);
    loadStudents();
}

init();