let currentInput = '';
let operatorStack = [];
let numberStack = [];

const conclusion = document.querySelector(".conclusion");

function updateConclusion() {
    conclusion.innerText = currentInput;
}

function calculator() {
    if (currentInput) {
        numberStack.push(parseFloat(currentInput)); 
    }

    while (operatorStack.length > 0) {
        let operationIndex = -1;
        for (let i = 0; i < operatorStack.length; i++) {
            if (operatorStack[i] === "×" || operatorStack[i] === "÷") {
                operationIndex = i;
                break;
            }
        }

        if (operationIndex !== -1) {
            let result;
            const a = numberStack[operationIndex];
            const b = numberStack[operationIndex + 1];
            if (operatorStack[operationIndex] === "×") {
                result = a * b;
            } else {
                if (b === 0) {
                    alert("Ошибка: деление на ноль!");
                    return;
                }
                result = a / b;
            }
            numberStack.splice(operationIndex, 2, result);
            operatorStack.splice(operationIndex, 1);
        } else {
            break; 
        }
    }
    

    let total = numberStack[0];
    for (let i = 0; i < operatorStack.length; i++) {
        if (operatorStack[i] === "+") {
            total += numberStack[i + 1];
        } else if (operatorStack[i] === "-") {
            total -= numberStack[i + 1];
        }
    }

    currentInput = total.toString();
    operatorStack = [];
    numberStack = [];
}

document.querySelectorAll(".number, .operator").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (button.classList.contains("number") || (button === point)) {
            if (value === ".") {
                if (currentInput === "") {
                    currentInput += "0.";
                } else if (currentInput.endsWith(".") || currentInput.includes(".")) {
                    return;
                } else {
                    currentInput += value;
                }
            } else {
                currentInput += value;
            }
        } 
        
        else if (button.classList.contains("operator")) {
            if (value === "C") {
                currentInput = '';
                operatorStack = [];
                numberStack = [];
            } else if (value === "←") {
                currentInput = currentInput.slice(0, -1);
            } else if (value === "=") {
                if (currentInput) {
                    numberStack.push(parseFloat(currentInput));
                }
                calculator();
            } else {
                if (currentInput) {
                    numberStack.push(parseFloat(currentInput)); 
                    operatorStack.push(value);
                    currentInput = ""; 
                }
            }
        }
        updateConclusion(); 
    });
});
