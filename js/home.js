const landingSection = document.querySelector('#landing-section')
const selectionSection = document.querySelector('#selection-section')
const backBtn = document.querySelector('#backBtn')

function startExperience() {
    landingSection.classList.add('hide')
    selectionSection.classList.add('show')
    backBtn.classList.add('show')
}




function goToExperience(experienceID) {
    switch (experienceID) {
        case 1:
            document.location.href = './young-lady.html'
            break;
        case 2:
            document.location.href = './man.html'
            console.log(experienceID, 'man');
            break;
        case 3:
            document.location.href = './old-lady.html'
            console.log(experienceID, 'old lady');
            break;

        default:
            break;
    }
}

function goBack() {
    landingSection.classList.remove('hide')
    selectionSection.classList.remove('show')
    backBtn.classList.remove('show')
}

window.startExperience = startExperience
window.goToExperience = goToExperience
window.goBack = goBack