async function getTarget() {
    const url = window.location;
    let targetTable = '';
    let id = 0;
    let result;
    if(url.href.includes('student')){
        targetTable = 'student';
        id = window.location.hash.substring(8);
        result = await editStudent(id);
        setInputStudent(result);
    } else if (url.href.includes('supervisor')){
        targetTable = 'supervisor';
        id = window.location.hash.substring(11);
        result = await editSupervisor(id);
        setInputSupervisor(result);
    } else if (url.href.includes('moderator')){
        targetTable = 'moderator';
        id = window.location.hash.substring(10);
        result = await editModerator(id);
        setInputModerator(result);
    } else {
        console.log('Something has gone terribly wrong!!!!!!!')
    }
}

async function editStudent(id){
    const response = await fetch(`student/${id}`);
    return await response.json();
}

async function editSupervisor(id){
    const response = await fetch(`supervisor/${id}`);
    return await response.json();
}

async function editModerator(id){
    const response = await fetch(`moderator/${id}`);
    return await response.json();
}

async function getSupervisors(){
    const response = await fetch('/supervisors');
    return await response.json();
}

async function getModerators(){
    const response = await fetch('/moderators');
    return await response.json();
}

async function setInputStudent(student){
    const supervisors = getSupervisors();
    const moderators = getModerators();
    const studentSection = document.querySelector('#editStudent');
    const fNameInput = document.querySelector('#editStudentFName');
    const lNameInput = document.querySelector('#editStudentLName');
    const courseInput = document.querySelector('#editStudentCourse');
    const supervisorSelect = document.querySelector('#supervisorSelect');
    const moderatorSelect = document.querySelector('#moderatorSelect');
    const currentSup = document.querySelector('#currentSup');
    const currentMod = document.querySelector('#currentMod');
    studentSection.classList.toggle('hidden');
    fNameInput.value = student.firstname;
    lNameInput.value = student.lastname;
    courseInput.value = student.course;
    currentSup.textContent = student.supervisorfname + ' ' + student.supervisorlname;
    currentSup.value = student.supervisorid;
    currentMod.textContent = student.moderatorfname + ' ' + student.moderatorlname;
    currentMod.value = student.moderatorid;
    for(const supervisor of await supervisors){
        if(supervisor.supervisorfname != student.supervisorfname && supervisor.supervisorlname != student.supervisorlname){
            const supervisorOption = document.createElement('option');
            supervisorOption.textContent = supervisor.supervisorfname + ' ' + supervisor.supervisorlname;
            supervisorOption.value = supervisor.supervisorid;
            supervisorSelect.append(supervisorOption);
        }
    }
    for(const moderator of await moderators){
        if(moderator.moderatorfname != student.moderatorfname && moderator.moderatorlname != student.moderatorlname){
            const moderatorOption = document.createElement('option');
            moderatorOption.textContent = moderator.moderatorfname + ' ' + moderator.moderatorlname;
            moderatorOption.value = moderator.moderatorid;
            moderatorSelect.append(moderatorOption);
        }
    }
}

function setInputSupervisor(supervisor){
    const supervisorSection = document.querySelector('#editSupervisor');
    const fNameInput = document.querySelector('#editSupervisorFName');
    const lNameInput = document.querySelector('#editSupervisorLName');
    const slotInput = document.querySelector('#editSupervisorSlots');
    supervisorSection.classList.toggle('hidden');
    fNameInput.value = supervisor.supervisorfname;
    lNameInput.value = supervisor.supervisorlname;
    slotInput.value = supervisor.supervisorslots;
}

function setInputModerator(moderator){
    const moderatorSection = document.querySelector('#editModerator');
    const fNameInput = document.querySelector('#editModeratorFName');
    const lNameInput = document.querySelector('#editModeratorLName');
    const slotInput = document.querySelector('#editModeratorSlots');
    moderatorSection.classList.toggle('hidden');
    fNameInput.value = moderator.moderatorfname;
    lNameInput.value = moderator.moderatorlname;
    slotInput.value = moderator.smoderatorlots;
}

async function submitStudentUpdate(){
    const id = window.location.hash.substring(8);
    const fNameInput = document.querySelector('#editStudentFName');
    const lNameInput = document.querySelector('#editStudentLName');
    const courseInput = document.querySelector('#editStudentCourse');
    const supervisorSelect = document.querySelector('#supervisorSelect');
    const moderatorSelect = document.querySelector('#moderatorSelect');
    console.log(id);

    const payload = {
        id,
        firstname: fNameInput.value,
        lastname: lNameInput.value,
        course: courseInput.value,
        supervisorid: supervisorSelect.value,
        moderatorid: moderatorSelect.value,
    };

    const response = await fetch(`student/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    // window.location.href = '/student';
}

async function submitSupervisorUpdate() {
    const id = window.location.hash.substring(11);
    const fNameInput = document.querySelector('#editSupervisorFName');
    const lNameInput = document.querySelector('#editSupervisorLName');
    const slotInput = document.querySelector('#editSupervisorSlots');

    const payload = {
        id,
        supervisorfname: fNameInput.value,
        supervisorlname: lNameInput.value,
        supervisorslots: slotInput.value,
    };

    const response = await fetch(`supervisor/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
}

async function submitModeratorUpdate(){
    const id = window.location.hash.substring(10);
    const fNameInput = document.querySelector('#editModeratorFName');
    const lNameInput = document.querySelector('#editModeratorLName');
    const slotInput = document.querySelector('#editModeratorSlots');
    
    const payload = {
        id,
        moderatorfname: fNameInput.value,
        moderatorlname: lNameInput.value,
        moderatorslots: slotInput.value,
    };

    const response = await fetch(`moderator/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
}

async function deleteStudent(){
    const id = window.location.hash.substring(8);
    const response = await fetch(`student/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
    });
}

async function deleteSupervisor(){
    const id = window.location.hash.substring(11);
    const response = await fetch(`staff/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
    });
}

async function deleteModerator(){
    const id = window.location.hash.substring(10);
    const response = await fetch(`staff/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
    });
}

// async function updateSlots(id){

// }

async function updateAssignments(supID, modID){
    const student = await fetch(`/assignedStudent/${id}`);
    console.log(student);
}

function applyAccessibility(){
    const allElems = document.querySelectorAll('section > *');
    const button = document.querySelector('#backButton');
    const cookieSplit1 = document.cookie.split("; ");
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

    button.style.fontFamily = accessObject.font;
    button.style.fontSize = accessObject.textSize;
    button.style.color = accessObject.textColour;
    document.body.style.backgroundColor = accessObject.backgroundColour;
}

function init(){
    const backButton = document.querySelector('#backButton');
    backButton.addEventListener('click', () => {
        history.back();
    });
    const updateStudent = document.querySelector('#updateStudent');
    const updateSupervisor = document.querySelector('#updateSupervisor');
    const updateModerator = document.querySelector('#updateModerator');
    updateStudent.addEventListener('click', submitStudentUpdate);
    updateSupervisor.addEventListener('click', submitSupervisorUpdate);
    updateModerator.addEventListener('click', submitModeratorUpdate);
    const deleteStud = document.querySelector('#deleteStudent');
    deleteStud.addEventListener('click', deleteStudent());
    const deleteSup = document.querySelector('#deleteSupervisor');
    deleteSup.addEventListener('click', deleteSupervisor());
    deleteSup.addEventListener('click', deleteModerator());
    const deleteMod = document.querySelector('#deleteModerator');
    deleteMod.addEventListener('click', deleteSupervisor());
    deleteMod.addEventListener('click', deleteModerator());
    getTarget();
    applyAccessibility();
}

init();