const arrayLetters = [];
const main = document.querySelector('.main');
const inputField = document.getElementById('inputField');
const btnEnter = document.getElementById('btnEnter');
const btnShuffle = document.getElementById('btnShuffle');
const section = document.getElementsByTagName('section')[0];


let numberOfCards = 0;
let isInitialized = false;

btnEnter.setAttribute('disabled', 'true');
btnShuffle.setAttribute('disabled', 'true');

function onShuffle() {
    onSelectCards(numberOfCards);
}

function onSelectCards(value) {
    numberOfCards = value;
    deleteContainers();
    for(let i = 0; i < value; i++) {
        createArrayLetters();
    }

    isInitialized = true;
    btnEnter.removeAttribute('disabled');
    btnShuffle.removeAttribute('disabled');
}

function deleteContainers() {
    main.querySelectorAll('*').forEach(item => item.remove());
}

function onKeyDownInput(event) {
    if(event.keyCode == 13) {
        selectItem();
    }
}

btnEnter.addEventListener('click', () => {
    selectItem();
});

function selectItem() {
    btnShuffle.setAttribute('disabled', 'true');

    if(!isInitialized) return;
    if(inputField.value == '' || inputField.value == null) return;
    const containers = document.getElementsByClassName('container');
    const containerArray = [...containers];

    for(let container of containerArray) {
        const nodes = container.querySelectorAll('div');
        const arrayNodes = [...nodes];
        for(node of arrayNodes) {
            if(node.innerText === inputField.value.trim()) {
                node.setAttribute('class', 'selected');
            }
        }
    }

    const span = document.createElement('span');
    span.innerHTML = `${inputField.value.trim()}`;
    span.addEventListener('click', () => {
        deleteItem(span);
    })
    section.appendChild(span);

    inputField.value = '';
}

function deleteItem(el) {
    const valueText = el.innerText;

    const containers = document.getElementsByClassName('container');
    const containerArray = [...containers];

    for(let container of containerArray) {
        const nodes = container.querySelectorAll('div');
        const arrayNodes = [...nodes];
        for(node of arrayNodes) {
            if(node.innerText === valueText) {
                node.removeAttribute('class');
            }
        }
    }

    el.remove();
}

function createArrayLetters() {
    const arrayB = [];
    const arrayI = [];
    const arrayN = [];
    const arrayG = [];
    const arrayO = [];

    for(let i = 1; i <= 75; i++) {
        if(i <= 15) {
            arrayB.push(i);
        }else if(i > 15  && i <= 30) {
            arrayI.push(i);
        }else if(i > 30  && i <= 45) {
            arrayN.push(i);
        }else if(i > 45  && i <= 60) {
            arrayG.push(i);
        }else if(i > 60  && i <= 75) {
            arrayO.push(i);
        }
    }

    arrayLetters.push(arrayB);
    arrayLetters.push(arrayI);
    arrayLetters.push(arrayN);
    arrayLetters.push(arrayG);
    arrayLetters.push(arrayO);

    const listB = randomGenerator(arrayLetters[0]);
    const listI = randomGenerator(arrayLetters[1]);
    const listN = randomGenerator(arrayLetters[2]);
    const listG = randomGenerator(arrayLetters[3]);
    const listO = randomGenerator(arrayLetters[4]);

    listN[2] = 'Free';

    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    container.appendChild(displayView(listB, 'B'));
    container.appendChild(displayView(listI, 'I'));
    container.appendChild(displayView(listN, 'N'));
    container.appendChild(displayView(listG, 'G'));
    container.appendChild(displayView(listO, 'O'));

    main.appendChild(container);
}

function randomGenerator(array) {
    const sorted = array.sort((a, b) => .5 - Math.random());
    const newArray = [];
    for(let i = 0; i < 5; i++) {
        newArray.push(sorted[i]);
    }

    return newArray;
}

function displayView(array, title) {
    const parentDiv = document.createElement('div');
    const heading = document.createElement('div');
    heading.innerHTML = title;
    parentDiv.appendChild(heading);

    for(let item of array) {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = item;
        parentDiv.appendChild(itemDiv);
    }

    return parentDiv;
}