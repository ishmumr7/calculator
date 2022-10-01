const mainDisplay = document.getElementById("display-value");
const subDisplay = document.getElementById("display-string");
const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".button.operator");

var num1 = 0, num2 = 0, operator;
var operatorSelected = false;

buttons.forEach(button => {
    button.addEventListener('click', display);
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, num1, num2) => {
    switch(operator) {
        case '+':
            return add(num1, num2);
        
        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);
    }
}

function display() {
    let choice = this.dataset.value;
    let current = mainDisplay.innerHTML;
    if (choice === 'clear') {
        clear();
    }
    else if (choice === 'backspace') {
        
    }
    else if (this.classList.contains('operator')) {
        // console.log('operator!');
        operatorSelected = true;
    }
    else if(choice === '=') {

    }
    else {
        if (current === '0' || operatorSelected) {
            mainDisplay.innerHTML = choice;
        }
        else {
            mainDisplay.innerHTML += choice;
        }
    }
}

const clear = () => {
    mainDisplay.innerHTML = '0';
    subDisplay.innerHTML = '';
}