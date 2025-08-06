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

        // --- Perform Calculation using eval() with error handling ---
        let expression = `${num1} ${finalOperator} ${num2}`;
        let result;

        try {
            // Using eval() as requested, but generally use dedicated math functions for security
            result = eval(expression);

            // Handle specific edge cases like division by zero if eval doesn't catch it cleanly
            if (!isFinite(result)) { // Checks for Infinity, -Infinity, NaN
                errorMessageDisplay.textContent = 'Cannot perform this calculation (e.g., division by zero).';
                resultDisplay.textContent = '';
                return;
            }

            resultDisplay.textContent = `Result: ${result}`;
            if (random <= 0.1) {
                resultDisplay.style.color = '#ff6b6b'; // Red for faulty results
                errorMessageDisplay.textContent = 'This result might be faulty!';
            } else {
                resultDisplay.style.color = '#61dafb'; // Cyan for correct results
            }

        } catch (e) {
            // Catch any errors during evaluation (e.g., syntax errors from bad operators)
            errorMessageDisplay.textContent = `Calculation error: ${e.message}. Check inputs.`;
            resultDisplay.textContent = '';
        }
    });

    // Add an event listener to the restart button
    restartBtn.addEventListener('click', resetCalculator);

    // Initialize calculator state on load
    resetCalculator();
});
