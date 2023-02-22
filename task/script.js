const calcBtns = document.querySelector(".keys");
const display = document.querySelector(".disp");
let displayValue = "";
calcBtns.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName === "INPUT") {
    if (target.value === "C") {
      displayValue = "";
      display.value = displayValue;
      return;
    }
    if (target.value === "=") {
      return;
    }

    displayValue += target.value;
    display.value = displayValue;
  }
});
