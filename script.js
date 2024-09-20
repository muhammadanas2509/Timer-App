let timer;
let seconds = 0;

const timeDisplay = document.getElementById('time');
const inputTime = document.getElementById('inputTime');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Function to format the time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to update the displayed time
function updateTime() {
    if (seconds > 0) {
        timeDisplay.textContent = formatTime(seconds);
        seconds--;
    } else {
        clearInterval(timer);
        timeDisplay.textContent = formatTime(0); // Set display to 00:00 when time is up
        alert("Time's up!"); // Optional: Alert when the timer reaches zero
        resetButton.disabled = true; // Disable reset button when done
        inputTime.disabled = false; // Re-enable the input field
        inputTime.value = ''; // Clear the input field when the timer ends
    }
}

// Initial button states
stopButton.disabled = true;
resetButton.disabled = true;
startButton.disabled = true;

inputTime.addEventListener('input', () => {
    const inputValue = parseInt(inputTime.value);
    if (!isNaN(inputValue) && inputValue > 0) {
        seconds = inputValue;  // Set the timer to user-defined value
        timeDisplay.textContent = formatTime(seconds);
        startButton.disabled = false;  // Enable the start button
    } else {
        startButton.disabled = true;    // Disable if input is invalid
    }
});

startButton.addEventListener('click', () => {
    clearInterval(timer);
    inputTime.disabled = true;  // Disable the input field when the timer starts
    timer = setInterval(updateTime, 1000);
    startButton.disabled = true;   // Disable the start button
    stopButton.disabled = false;    // Enable the stop button
    resetButton.disabled = false;    // Enable the reset button
    timeDisplay.textContent = formatTime(seconds); // Display the initial time
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    startButton.disabled = false;   // Enable the start button
    stopButton.disabled = true;      // Disable the stop button
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    seconds = 0;
    timeDisplay.textContent = formatTime(seconds);
    inputTime.value = '';            // Clear the input field
    inputTime.disabled = false;      // Re-enable the input field on reset
    startButton.disabled = true;     // Disable the start button
    stopButton.disabled = true;      // Disable the stop button
    resetButton.disabled = true;     // Disable the reset button
});
