function goToStudent(){
    console.log('do something');
    window.location.href = '/student';
}

function goToImport(){
    window.location.href = '/import';
}


function init(){
    const studentSelect = document.querySelector('#studentPage');
    studentSelect.addEventListener('click', goToStudent);
    const importSelect = document.querySelector('#importPage');
    importSelect.addEventListener('click', goToImport);
}

init();