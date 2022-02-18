//Invoking the DOM
const calculatorDisplay = document.querySelector('h1')
const buttons = document.querySelectorAll("button")
const clearBtn = document.querySelector("#clear-btn")

//Calculation constants
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber
}

//Initializing the calculation variables
let firstValue = 0
let currentOperator = ""
let awaitingNextValue = false

//Clearing the display on the screen
const removeDisplay = () => {
  firstValue = 0
  currentOperator = ""
  awaitingNextValue = false
  calculatorDisplay.textContent = "0"
}

//Adding the decimal value only if there is no decimal value on the screen
const addDecimal = () => {
  //if there is no text on the screen don't put in a decimal
  if(awaitingNextValue)
    return;
  if(!calculatorDisplay.textContent.includes(".")){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
  }
}

//Adding the Operator Function
const useOperator = (operator) => {
  //Turning the currentvalue from the display into a number
  const currentValue = Number(calculatorDisplay.textContent)
  //if there is an operator and a value already exit the function
  if(currentOperator && awaitingNextValue){
    currentOperator = operator
    return
  }
  // if there is no value yet assign a current value
  if(!firstValue){
    firstValue = currentValue
  }else{
    const calculation = calculate[currentOperator](firstValue, currentValue)
    calculatorDisplay.textContent = calculation
    firstValue = calculation
  }
  awaitingNextValue = true
  currentOperator = operator
  console.log(firstValue, currentOperator)
}

//Putting a value on the display screen
const sendValue = (number) => {
  //checking to see if there is a current value already
  if(awaitingNextValue){
    calculatorDisplay.textContent = number
    awaitingNextValue = false
  }else if(calculatorDisplay.textContent === "0"){
    calculatorDisplay.textContent = number
  }else{
    calculatorDisplay.textContent += number
  }
}

  buttons.forEach((button) =>{
    //Collecting the number, operator and decimal buttons when clicked
    if(button.classList.length === 0){
      button.addEventListener("click", () => sendValue(button.value))
    }else if(button.classList.contains("operator")){
      button.addEventListener("click", () => useOperator(button.value))
    }else if(button.classList.contains("decimal")){
      button.addEventListener("click", () => addDecimal())
    }
  })

clearBtn.addEventListener("click", removeDisplay)
