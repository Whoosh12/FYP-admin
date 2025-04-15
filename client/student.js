const getSupervisors = await fetch('/supervisors');
const supervisors = await getSupervisors.json();
console.log(supervisors);
const trainingSups = [];
for(const supervisor of supervisors){
    if(supervisor.course == 'Training'){
        trainingSups.push(supervisor);
    }
}

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
        const span = document.createElement("span");
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
        span.append(row);
        span.append(button2);
        span.append(button1);
        target.append(span);
    }
}

async function assignChoices(){
    const getStudents = await fetch('/chosen');
    const students = await getStudents.json();
    

    for(const student of students){
        if(student.course == 'Training' && student.marksup == false){
            assignPrioStudents(student);
        } else if(student.marksup == false){
            assignRemainingStudents(student);
        }
    }
    console.log(supervisors);
}

async function assignPrioStudents(student){
    let randomStaff = Math.max(Math.min(Math.round(Math.random() * trainingSups.length), trainingSups.length - 1), 1);
    const id = student.studentid;

    if(trainingSups[randomStaff].supervisorslots <= 0){
        trainingSups.splice(randomStaff, 1);
        supervisors.splice(randomStaff, 1);
        randomStaff = Math.max(Math.min(Math.round(Math.random() * trainingSups.length), trainingSups.length - 1), 1);
    }

    const payload = {
        id,
        supervisorid: trainingSups[randomStaff].supervisorid,
        slots: trainingSups[randomStaff].supervisorslots,
    };

    const response = await fetch(`assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if(response.ok){
        supervisors[randomStaff].supervisorslots -= 1;
    }
    console.log(supervisors[randomStaff]);
    // minusSlots(trainingSups[randomStaff].supervisorid);
}

async function assignRemainingStudents(student){
    let randomStaff = Math.max(Math.min(Math.round(Math.random() * supervisors.length), supervisors.length - 1), 1);
    const id = student.studentid;
    
    if(supervisors[randomStaff].supervisorslots <= 0){
        supervisors.splice(randomStaff, 1);
        randomStaff = Math.max(Math.min(Math.round(Math.random() * supervisors.length), supervisors.length - 1), 1);
    }

    const payload = {
        id,
        supervisorid: supervisors[randomStaff].supervisorid,
    };

    const response = await fetch(`assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if(response.ok){
        supervisors[randomStaff].supervisorslots -= 1;
    }
    // minusSlots(supervisors[randomStaff].supervisorid);
}

async function minusSlots(id){
    const supervisor = await fetch(`supervisor/${id}`);
    const slots = supervisor.supervisorslots - 1;
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
    const choiceAssign = document.querySelector('#choiceAssign');
    choiceAssign.addEventListener('click', assignChoices);
    loadStudents();
}

init();