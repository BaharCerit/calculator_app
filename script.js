// this is first commit

let input = document.getElementById("input"),
  number = document.querySelectorAll(".numbers div"),
  operator = document.querySelectorAll(".operators div"),
  result = document.getElementById("result"),
  clear = document.getElementById("clear"),
  resultDisplayed = false;
decimalEntered = false;

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    if (!decimalEntered || e.target.innerHTML !== ".") {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
      if (e.target.innerHTML === ".") {
        decimalEntered = true;
      }
      } else if (
        (resultDisplayed === true && lastChar === "+") ||
        lastChar === "-" ||
        lastChar === "×" ||
        lastChar === "÷"
      ) {
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } else {
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML += e.target.innerHTML;
      }
    }
  });
}

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      input.innerHTML += e.target.innerHTML;
    }
    decimalEntered = false;
  });
}

result.addEventListener("click", function () {
  let inputString = input.innerHTML;
  let numbers = inputString.split(/\+|\-|\×|\÷/g);
  let operators = inputString.replace(/[0-9]|\./g, "").split("");
  let alert = document.getElementById("alert");

  console.log(inputString);
  console.log(numbers);
  console.log(operators);
  console.log("----------------------------");

  if (numbers.includes("") || (numbers.length < 2)) {
    console.log("Enter a valid expression");
    alert.innerHTML = "Enter a valid expression";

    return;
  }

  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0];

  resultDisplayed = true;
  alert.innerHTML = "";
});

clear.addEventListener("click", function () {
  let alert = document.getElementById("alert");
  input.innerHTML = "";
  decimalEntered = false;
  alert.innerHTML = "";
});
