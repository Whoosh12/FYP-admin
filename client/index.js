function goToStudent(){
    console.log('do something');
    window.location.href = '/student';
}





function init(){
    const studentSelect = document.querySelector('#studentPage');
    studentSelect.addEventListener('click', goToStudent);
}

init();