"use strict";
const calcBtns = document.querySelector(".keys");
const display = document.querySelector(".display__lcd");
const operators = ["*", "/", "+", "-"];
let displayValue = "";
let lastDigitOnDisplay;
let operator;
let numbers;
let firstNum;
let secondNum;

function calc(x, operator, y) {
  switch (operator) {
    case "+":
      return +x + +y;
    case "-":
      return +x - +y;
    case "*":
      return +x * +y;
    case "/":
      return +x / +y;
  }
}

calcBtns.addEventListener("click", (e) => {
  let target;
  let value;

  //! setting event.target variables to work with
  if (e.target.tagName === "INPUT") {
    target = e.target;
    value = target.value;
    if (operators.includes(value)) {
      operator = value;
    }
  } else return;

  //! clearing
  if (value === "C") {
    displayValue = "";
    display.value = displayValue;
    return;
  }

  //! declaring auxiliary variables to make the code more readeble
  lastDigitOnDisplay = displayValue.split("")[displayValue.length - 1];
  numbers = displayValue.split(operator);
  firstNum = numbers[0];
  secondNum = numbers[1];

  if (
    operators.includes(value) &&
    display.value.split("").find((item) => {
      if (operators.includes(item)) {
        if (
          display.value.split(item).length === 2 &&
          display.value.split(item)[0] &&
          display.value.split(item)[1]
        ) {
          return true;
        }
      }
    })
  ) {
    console.log("adding");
    displayValue.split("").forEach((elem, index) => {
      if (operators.includes(elem)) {
        displayValue = String(
          calc(
            displayValue.split(displayValue[index])[0],
            displayValue[index],
            displayValue.split(displayValue[index])[1]
          )
        );
        if (displayValue.split("").length > 10) {
          displayValue = Number(displayValue).toFixed(10);
        }
        display.value = displayValue;
      }
    });
    return;
  }

  //! making sure that you can't type two commas in one number or in wrong place, and more than one zero at the start or in wrong place
  if (
    (value === "=" && !secondNum) ||
    (value === "0" && displayValue === "0") ||
    (value === "0" && secondNum === "0") ||
    (value === "." && displayValue === "") ||
    (operators.includes(lastDigitOnDisplay) && value === ".") ||
    (operators.includes(value) && displayValue === "-") ||
    (lastDigitOnDisplay === "." && operators.includes(value)) ||
    (numbers.length < 2 && firstNum.split("").includes(".") && value === ".") ||
    (numbers.length === 2 && secondNum.split("").includes(".") && value === ".")
  ) {
    return;
  }

  //! changing the operator if the second number was not entered yet, and making sure that you can only type one operator
  if (operators.includes(lastDigitOnDisplay) && operators.includes(value)) {
    displayValue =
      displayValue
        .split("")
        .splice(0, displayValue.length - 1)
        .join("") + value;
    display.value = displayValue;
    return;
  }

  //! making sure that you can't type "*" "/" "+" first, but can type "-"
  if (
    (!displayValue && operators.includes(value) && !(value === "-")) ||
    (operators.includes(displayValue) && operators.includes(value))
  ) {
    return;
  }

  //! calculation, by pressing "=" or another operator if entered two numbers
  //! typing on display
  if (value === "=" && secondNum) {
    displayValue = String(calc(firstNum, operator, secondNum));
    if (displayValue.split("").length > 10) {
      displayValue = Number(displayValue).toFixed(10);
    }
    display.value = displayValue;
  } else {
    displayValue += target.value;
    display.value = displayValue;
  }
});
