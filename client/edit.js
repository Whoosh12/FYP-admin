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

function setInputStudent(student){
    const studentSection = document.querySelector('#editStudent');
    const fNameInput = document.querySelector('#editStudentFName');
    const lNameInput = document.querySelector('#editStudentLName');
    const courseInput = document.querySelector('#editStudentCourse');
    const supervisorFNameInput = document.querySelector('#editStudentSupervisorFName');
    const supervisorLNameInput = document.querySelector('#editStudentSupervisorLName');
    const moderatorFNameInput = document.querySelector('#editStudentModeratorFName');
    const moderatorLNameInput = document.querySelector('#editStudentModeratorLName');
    studentSection.classList.toggle('hidden');
    fNameInput.value = student.firstname;
    lNameInput.value = student.lastname;
    courseInput.value = student.course;
    supervisorFNameInput.value = student.supervisorfname;
    supervisorLNameInput.value = student.supervisorlname;
    moderatorFNameInput.value = student.moderatorfname;
    moderatorLNameInput.value = student.moderatorlname;
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
    const supervisorFNameInput = document.querySelector('#editStudentSupervisorFName');
    const supervisorLNameInput = document.querySelector('#editStudentSupervisorLName');
    const moderatorFNameInput = document.querySelector('#editStudentModeratorFName');
    const moderatorLNameInput = document.querySelector('#editStudentModeratorLName');

    const payload = {
        id,
        firstname: fNameInput.value,
        lastname: lNameInput.value,
        course: courseInput.value,
        supervisorfname: supervisorFNameInput.value,
        supervisorlname: supervisorLNameInput.value,
        moderatorfname: moderatorFNameInput.value,
        moderatorlname: moderatorLNameInput.value,
    };
    console.log(payload);

    const response = await fetch(`student/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
}

async function submitSupervisorUpdate() {
    id = window.location.hash.substring(11);
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
    id = window.location.hash.substring(10);
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
    getTarget();
}

init();