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

  // declaration of variables to work with
  if (e.target.tagName === "INPUT") {
    target = e.target;
    value = target.value;
    if (operators.includes(value)) {
      operator = value;
    }
  } else return;

  // clearing 
  if (value === "C") {
    displayValue = "";
    display.value = displayValue;
    return;
  }

  // making sure that you can't type two commas in one number or in wrong place
  if (
    (value === "." && displayValue === "") ||
    (operators.includes(displayValue.split("")[displayValue.length - 1]) && value === ".") ||
    (displayValue.split("")[displayValue.length - 1] === "." && operators.includes(value)) ||
    (displayValue.split(operator).length < 2 && displayValue.split(operator)[0].split("").includes(".") && value === ".") ||
    (displayValue.split(operator).length === 2 && displayValue.split(operator)[1].split("").includes(".") && value === ".")
  ) {
    return;
  }

  // changing the operator if the second number was not entered yet, and making sure that you can only type one operator 
  if (
    operators.includes(displayValue.split("")[displayValue.length - 1]) && operators.includes(value)
  ) {
    displayValue = displayValue.split("").splice(0, displayValue.length - 1).join("") + value;
    display.value = displayValue;
    return;
  }

  // calculation if pressed "=" or another operator
  // typing on display
  if (value === "=" && displayValue.split(operator)[1]) {
    const numbers = displayValue.split(operator);
    displayValue = String(calc(numbers[0], operator, numbers[1]));
    display.value = displayValue;
  } else if (value === "=" && !displayValue.split(operator)[1]) {
    return;
  } else {
    displayValue += target.value;
    display.value = displayValue;
  }

  // declaring auxiliary variables to make the code more readeble
});
