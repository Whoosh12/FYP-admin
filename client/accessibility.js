function submitChoices(){
    const fontChoice = document.querySelector('#fontChoice');
    const textColour = document.querySelector('#fontColourChoice');
    const textSize = document.querySelector('#textSize');
    const backgroundColour = document.querySelector('#backgroundColour');

    const accessibilityChoices = {
        font: 'Times New Roman',
        textColour: 'Black',
        textSize: 14,
        backgroundColour: 'Black',
    }

    accessibilityChoices.font = fontChoice.value;
    accessibilityChoices.textColour = textColour.value;
    accessibilityChoices.textSize = textSize.value;
    accessibilityChoices.backgroundColour = backgroundColour.value;

    document.cookie = `font=${fontChoice.value}; SameSite=None; Secure`;
    document.cookie = `textColour=${textColour.value}; SameSite=None; Secure`;
    document.cookie = `textSize=${textSize.value + "px"}; SameSite=None; Secure`;
    document.cookie = `backgroundColour=${backgroundColour.value}; SameSite=None; Secure`;
    console.log(document.cookie);

    applyAccessibility();
}

export function applyAccessibility(){
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
    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', submitChoices);
    applyAccessibility();
}

init();