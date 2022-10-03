const mainDisplay = document.getElementById("display-value");
const subDisplay = document.getElementById("display-string");
const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".button.operator");
const body = document.querySelector("body");

mainDisplay.innerHTML = 0;

var num1 = '0', num2 = '0', operator = null;
var operatorSelected = false;

buttons.forEach(button => {
    button.addEventListener('click', display);
});

body.addEventListener('keydown', handleKeyboard);

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
    }
    else if (choice === 'backspace') {
        backspace();
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
    else if (choice === '%') {
        addPercent();
    }
    else {
        input(choice);
    }
}

function handleKeyboard(e) {
    if (e.key === 'Escape') {
        clear();
    }
    else if (e.key === 'Backspace') {
        backspace();
    }
    else if (e.key === '+' ||
        e.key === '-' ||
        e.key === '*' ||
        e.key === '/') {
        selectOperator(e.key);
    }
    else if (e.key === 'Enter') {
        calculate();
    }
    else if (e.key === '.') {
        addDecimal();
    }
    else if (e.key === '%') {
        addPercent();
    }
    else if (e.key >= 0 && e.key <= 9) {
        input(e.key);
    }
    else return;
}

function selectOperator(choiceOperator) {
    if (operator !== null) {
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
    if (operator === '/' && mainDisplay.textContent === '0') {
        alert("Cannot divide by zero!");
        // operator = null;
        // operatorSelected = false;
        // return;
    }
    else {
        num2 = mainDisplay.textContent;
        if (num1.includes('%') || num2.includes('%')) {
            operatePercent(num1, num2)
        }
        else {
            mainDisplay.innerHTML = roundUp(operate(operator, num1, num2));
        }
    }
    operator = null;
    operatorSelected = false;
}

function operatePercent(a, b) {
    if (a.includes('%') && b.includes('%')) {
        a = Number(a.replace('%', '')) / 100;
        b = (Number(b.replace('%', '')) / 100);
    }
    else if (a.includes('%')) {
        a = (Number(a.replace('%', '')) / 100);
    }
    else if (b.includes('%')) {
        b = (Number(b.replace('%', '')) / 100);
    }
    mainDisplay.innerHTML = roundUp(operate(operator, a, b));
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

function addPercent() {
    if (mainDisplay.innerHTML.includes('%') ||
        mainDisplay.innerHTML === '' ||
        operatorSelected) {
        return;
    }
    else {
        mainDisplay.innerHTML += '%';
    }
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
    num1 = '0';
    num2 = '0';
    operator = null;
    mainDisplay.innerHTML = '0';
    subDisplay.innerHTML = '';
    operatorSelected = false;
}

function backspace() {
    if (mainDisplay.innerHTML === '0') {
        return;
    }
    else if (mainDisplay.innerHTML.length === 1) {
        mainDisplay.innerHTML = '0';
    }
    else {
        mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0, -1);
    }
}

function roundUp(num) {
    return Math.round(num * 1000) / 1000;
}