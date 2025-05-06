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
            if(key != 'marksup'){
                row.textContent += `${value}, `;
            }
        }
        
        button1.addEventListener('click', () => window.location.href = `edit#student${student.studentid}`);
        button2.addEventListener('click', () => window.location.href = `choices#${student.studentid}`);
        row.classList.add('info');
        button2.classList.add('info');
        button1.classList.add('info');
        row.classList.add('data');
        button2.classList.add('choices');
        button1.classList.add('edit');

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
    const supervisors = await getSupervisors.json(); //supervisor data stored in array accessible to the whole function

    const getModerators = await fetch('/moderators');
    const moderators = await getModerators.json(); //moderator data stored in array accessible to the whole function

    console.log(moderators);
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
        assignModerators(student);
    }

    for(const supervisor of supervisors){
        updateSupSlots(supervisor);
    }

    for(const moderator of moderators){
        updateModSlots(moderator);
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

    async function assignPrioStudents(student){ //Code created with help from Emma Kerr
        let randomTrainingStaff = Math.max(Math.min(Math.round(Math.random() * trainingSups.length), trainingSups.length - 1), 1);
        const id = student.studentid;
    
        student.supervisorid = supervisors[randomSup].supervisorid
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
        const id = student.studentid;
    
        student.supervisorid = supervisors[randomSup].supervisorid
        const payload = {
            id,
            supervisorid: supervisors[randomSup].supervisorid,
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

    async function assignModerators(student){
        let randomMod = Math.min(Math.max(Math.round(Math.random() * moderators.length), moderators.length - 1), 1);
        const id = student.studentid;

        while(student.supervisorid = randomMod){
            randomMod = Math.min(Math.max(Math.round(Math.random() * moderators.length), moderators.length - 1), 1);
        }

        const payload = {
            id,
            moderatorid: moderators[randomMod].moderatorid,
        }

        const response = await fetch('assignMod', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });

        while(supervisors[randomMod].moderatorslots <= 0){
            moderators.splice(randomMod, 1);
            randomMod = Math.min(Math.max(Math.round(Math.random() * moderators.length), moderators.length - 1), 1);
        }

        moderators[randomMod].moderatorslots -=1;
    }

    async function updateSupSlots(supervisor){
        const supID = parseInt(supervisor.supervisorid);
        const payload = {
            id: supID,
            slots: slots,
        }
    
        const response = await fetch(`supSlots`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
    }

    async function updateModSlots(moderator){
        const modID = parseInt(moderator.moderatorid);
        const payload = {
            id: modID,
            slots: slots,
        }
    
        const response = await fetch(`modSlots`, {
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
    const importButton = document.querySelector('#importPage');
    importButton.addEventListener('click', goToImport);
    const moderatorSelect = document.querySelector('#moderatorPage');
    moderatorSelect.addEventListener('click', goToModerator);
    const supervisorSelect = document.querySelector('#supervisorPage');
    supervisorSelect.addEventListener('click', goToSupervisor);
    const choiceAssign = document.querySelector('#choiceAssign');
    choiceAssign.addEventListener('click', assignmentAlgo);
    const accessibilityPage = document.querySelector('#accessibility');
    accessibilityPage.addEventListener('click', goToAccessibility);
    loadStudents();
}

init();