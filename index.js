const inputElement = document.getElementById('input');
const buttonElement = document.getElementById('button-submit');
const form = document.getElementById('form');
const messageBlock = document.getElementById('info-message');
const rouletteElement = document.getElementById('roulette-image');
const sectors = 10;
const valuesPerSector = 10;
const sectorAngle = 360 / sectors;
let rotations = 0;
const totalValues = sectors * valuesPerSector;
let infoMessage = '';
let totalAngle;
let randomNumber;

(function createSectorNumbers() {
    for (let sector = 0; sector < sectors; sector++) {
        const startValue = sector * valuesPerSector + 1;
        const groupAngleStart = sector * sectorAngle;
    
        for (let i = 0; i < valuesPerSector; i++) {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
    
            const value = startValue + i;
            const angleInSector = i * (sectorAngle / valuesPerSector);
            const totalAngle = groupAngleStart + angleInSector;
    
            numberElement.textContent = value;
            numberElement.style.transform = `rotate(${totalAngle}deg) translateY(-180px)`;
    
            rouletteElement.appendChild(numberElement);
        }
    }
})()


buttonElement.addEventListener('click', (event) => {
    event.preventDefault();
		
    messageBlock.classList.remove('success');
    messageBlock.classList.remove('error');
    messageBlock.innerText = 'Wheel is spinning...';
    randomNumber = generateNumber();
    
    const userNumber = getInputValue();
    if (typeof userNumber === 'number' || userNumber) {
				rotations += 5;
        checkUserNumber(userNumber, rotations);
    } else {
        messageBlock.classList.add('error'); 
    }
    
    setTimeout(() => {
        messageBlock.innerText = infoMessage;
        resetAll()
        
    }, 3000)

})


function generateNumber() {
    randomNumber = Math.floor(1 + Math.random() * totalValues);
    return randomNumber;
}

function getInputValue() {
    if (isNaN(inputElement.value)) {
        infoMessage = 'Entered data should be number!'
        return
    }

    if (inputElement.value.trim() === '' && !isNaN(Number(inputElement.value))) {
        infoMessage = 'The field is empty!';
        return
    }

    infoMessage = '';
    return parseInt(inputElement.value); 
}

function checkUserNumber(userNumber, rotations) {
    
    switch (true) {
        case (userNumber >= 1 && userNumber <= 100) && randomNumber === userNumber :
            spinRoulette(randomNumber, rotations);
            messageBlock.classList.add('success');
            infoMessage = `Wow! You won! \n Your number is ${userNumber} and \n the prize number is - ${randomNumber}`;
            break;
        case userNumber >= 1 && userNumber <= 100:
            spinRoulette(randomNumber, rotations);
            messageBlock.classList.add('success');
            infoMessage = `Number ${userNumber} is okay! \n But you didn't win. \nThe prize number was - ${randomNumber}`;
            break;
        default:
            messageBlock.classList.add('error');
            infoMessage = `Number ${userNumber} is not fit. \nYou should enter the number \n between 1 and 100. \nTry again!`;
            break;
    }
}

function spinRoulette(randomNumber, rotations) {
    const sectorIndex = Math.floor((randomNumber - 1) / valuesPerSector);
    const positionInSector = (randomNumber - 1) % valuesPerSector; 

		let fullRotations = rotations * 360;
    let sectorStartAngle = sectorIndex * sectorAngle;
    let angleInSector = (positionInSector / valuesPerSector) * sectorAngle;
    let targetAngle = sectorStartAngle + angleInSector;
    let finalRotation = fullRotations + (360 - targetAngle); 

    rouletteElement.style.transition = "transform 2.5s ease-out"; 
    rouletteElement.style.transform = `rotate(${finalRotation}deg)`;
}


function resetAll() {
    inputElement.value = '';
}


