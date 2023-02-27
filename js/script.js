"use strict";
const calcBtns = document.querySelector(".keys");
const display = document.querySelector(".disp");
const operators = ["*", "/", "+", "-"];
let displayValue = "";
let operator;

const calc = (x, operator, y) => {
  switch (operator) {
    case "+": return +x + +y;
    case "-": return +x - +y;
    case "*": return +x * +y;
    case "/": return +x / +y;
  }
};

calcBtns.addEventListener("click", (e) => {
  let target;
  let value;

  // setting event.target variables to work with
  if (e.target.tagName === "INPUT") {
    target = e.target;
    value = target.value;
    if (operators.includes(value)) {
      operator = value;
    }
  } else return;

  // declaring auxiliary variables to make the code more readeble
  const lastDigitOnDisplay = displayValue.split("")[displayValue.length - 1];
  const numbers = displayValue.split(operator);
  const firstNum = displayValue.split(operator)[0];
  const secondNum = displayValue.split(operator)[1];

  // clearing
  if (value === "C") {
    displayValue = "";
    display.value = displayValue;
    return;
  }

  //making sure that you can't type "*" "/" "+" first, but can type "-"
  if (
    (!displayValue && operators.includes(value) && !(value === "-")) ||
    operators.includes(displayValue) && operators.includes(value)
  ) {
    return;
  }

  // making sure that you can't type two commas in one number or in wrong place
  if (
    (value === "." && displayValue === "") ||
    (operators.includes(lastDigitOnDisplay) && value === ".") ||
    (lastDigitOnDisplay === "." && operators.includes(value)) ||
    (numbers.length < 2 && firstNum.split("").includes(".") && value === ".") ||
    (numbers.length === 2 && secondNum.split("").includes(".") && value === ".")
  ) {
    return;
  }

  // changing the operator if the second number was not entered yet, and making sure that you can only type one operator
  if (operators.includes(lastDigitOnDisplay) && operators.includes(value)) {
    displayValue = displayValue.split("").splice(0, displayValue.length - 1).join("") + value;
    display.value = displayValue;
    return;
  }

  // calculation, by pressing "=" or another operator if entered two numbers
  // typing on display
  if (value === "=" && numbers[1]) {
    displayValue = String(calc(numbers[0], operator, numbers[1]));
    display.value = displayValue;
  } else if (value === "=" && !numbers[1]) {
    return;
  } else {
    displayValue += target.value;
    display.value = displayValue;
  }
});
