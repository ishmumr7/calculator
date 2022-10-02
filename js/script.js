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
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            if (num2 === 0) {
                return;
            }
            return divide(num1, num2);
    }
}

function display() {
    let choice = this.dataset.value;
    let current = mainDisplay.innerHTML;

    if (choice === 'clear') {
        clear();
        operatorSelected = false;
    }
    else if (choice === 'backspace') {

    }
    else if (this.classList.contains('operator')) {
        selectOperator(choice);
    }
    else if (choice === '=') {
        calculate();
    }
    else if (choice === '.') {
        addDecimal();
    }
    else {
        input(choice);
    }
}

function selectOperator(choiceOperator) {
    if (choiceOperator !== null) {
        calculate();
    }
    num1 = mainDisplay.textContent;
    operator = choiceOperator;
    operatorSelected = true;
}

function calculate() {
    if (operator === null || operatorSelected) {
        //If no operator  OR  an operator selected currently
        return;
    }
    num2 = mainDisplay.textContent;
    if (num1.includes('%') || num2.includes('%')) {
        //Move to separate function
        if (num1.includes('%')) {
            mainDisplay.innerHTML = roundUp((Number(num1.replace('%', ''))/100)
                * num2);
        }
    }
    else {
        mainDisplay.innerHTML = roundUp(operate(operator, num1, num2));
    }
        operator = null;
        operatorSelected = false;
}

function operatePercent(a, b) {

}

function addDecimal() {
    if (mainDisplay.innerHTML.includes('.') && !operatorSelected) {
        return;
    }
    else if (operatorSelected || mainDisplay.innerHTML === '0') {
        mainDisplay.innerHTML = '.';
    }
    else {
        mainDisplay.innerHTML += '.';
    }
    operatorSelected = false;
}

function input(choice) {
    if (mainDisplay.innerHTML === '0' || operatorSelected) {
        mainDisplay.innerHTML = choice;
    }
    else {
        mainDisplay.innerHTML += choice;
    }
    operatorSelected = false;
}

function clear() {
    num1 = 0;
    num2 = 0;
    operator = null;
    mainDisplay.innerHTML = '0';
    subDisplay.innerHTML = '';
}

function roundUp(num) {
    return Math.round(num * 1000) / 1000;
}