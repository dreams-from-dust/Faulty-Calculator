document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const num1Input = document.getElementById('num1');
    const operatorInput = document.getElementById('operator');
    const num2Input = document.getElementById('num2');
    const calculateBtn = document.getElementById('calculateBtn');
    const restartBtn = document.getElementById('restartBtn'); // Get reference to the restart button
    const resultDisplay = document.getElementById('result');
    const errorMessageDisplay = document.getElementById('error-message');

    // Define the object for faulty operators
    const faultyOperators = {
        "+": "-",
        "*": "+",
        "-": "/",
        "/": "**", // Exponentiation for division, to make it faulty
    };

    // Function to reset the calculator state
    const resetCalculator = () => {
        num1Input.value = ''; // Clear first number input
        operatorInput.value = ''; // Clear operator input
        num2Input.value = ''; // Clear second number input
        resultDisplay.textContent = 'Result will appear here.'; // Reset result text
        resultDisplay.style.color = '#e0e0e0'; // Reset result color to default
        errorMessageDisplay.textContent = ''; // Clear error message
    };

    // Add an event listener to the calculate button
    calculateBtn.addEventListener('click', () => {
        // Clear previous error messages
        errorMessageDisplay.textContent = '';
        resultDisplay.textContent = 'Calculating...';
        resultDisplay.style.color = '#ffffff'; // Reset result color

        // Get the values from the input fields
        let num1 = parseFloat(num1Input.value);
        let operator = operatorInput.value.trim();
        let num2 = parseFloat(num2Input.value);

        // --- Input Validation ---
        if (isNaN(num1) || isNaN(num2)) {
            errorMessageDisplay.textContent = 'Please enter valid numbers.';
            resultDisplay.textContent = '';
            return; // Stop execution if inputs are not numbers
        }

        if (!['+', '-', '*', '/'].includes(operator)) {
            errorMessageDisplay.textContent = 'Invalid operator. Use +, -, *, or /';
            resultDisplay.textContent = '';
            return; // Stop execution if operator is invalid
        }

        // --- Faulty Logic Implementation ---
        let random = Math.random(); // Generate a random number between 0 and 1
        let finalOperator = operator; // Assume correct operator by default

        if (random <= 0.5) { // 10% chance of being faulty
            finalOperator = faultyOperators[operator];
            console.log(`Faulty mode activated! Original: ${operator}, Faulty: ${finalOperator}`);
        } else {
            console.log(`Normal mode. Operator: ${operator}`);
        }

        // --- Perform Calculation without eval() ---
        let result;

        switch (finalOperator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    errorMessageDisplay.textContent = 'Cannot divide by zero.';
                    resultDisplay.textContent = '';
                    return;
                }
                result = num1 / num2;
                break;
            default: // Handle faulty operators that might not be valid math symbols
                // For example, faulty operator might be "**" or some other string
                // We'll treat this as a calculation error
                errorMessageDisplay.textContent = 'Calculation error due to faulty logic.';
                resultDisplay.textContent = '';
                return;
        }

        // Handle specific edge cases like division by zero if not caught by the switch
        if (!isFinite(result)) { // Checks for Infinity, -Infinity, NaN
            errorMessageDisplay.textContent = 'Cannot perform this calculation.';
            resultDisplay.textContent = '';
            return;
        }

        resultDisplay.textContent = `Result: ${result}`;
        if (random <= 0.5) {
            resultDisplay.style.color = '#ff6b6b'; // Red for faulty results
            errorMessageDisplay.textContent = 'This result might be faulty!';
        } else {
            resultDisplay.style.color = '#61dafb'; // Cyan for correct results
        }
    });

    // Add an event listener to the restart button
    restartBtn.addEventListener('click', resetCalculator);

    // Initialize calculator state on load
    resetCalculator();
});
