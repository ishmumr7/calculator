const mainDisplay = document.getElementById("display-value");
const subDisplay = document.getElementById("display-string");
const buttons = document.querySelectorAll(".button");

var num1, num2, operator, previous;

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
    if (choice === 'clear') {
        clear();
    }
}

const clear = () => {
    mainDisplay.innerHTML = '0';
    subDisplay.innerHTML = '';
}