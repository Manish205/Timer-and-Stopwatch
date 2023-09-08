// Timer variables
let timerInterval;
let timerRunning = false;
let timerStartTime;

// Stopwatch variables
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchStartTime;

// Function to update timer display
function updateTimerDisplay() {
    const now = Date.now();
    const remainingTime = timerStartTime - now;

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('timerDisplay').textContent = '00:00';
        return;
    }

    const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((remainingTime / 60000) % 60)).padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
}

// Function to start the timer
function startTimer() {
    const timerInput = document.getElementById('timerInput').value;
    if (!timerInput || isNaN(timerInput) || timerInput <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    if (!timerRunning) {
        const now = Date.now();
        timerStartTime = now + timerInput * 1000;
        timerRunning = true;
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerDisplay').textContent = '00:00';
}

// Function to update stopwatch display
function updateStopwatchDisplay() {
    const now = Date.now();
    const elapsed = now - stopwatchStartTime;
    const milliseconds = String(elapsed % 1000).padStart(3, '0');
    const seconds = String(Math.floor((elapsed / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((elapsed / 60000) % 60)).padStart(2, '0');
    document.getElementById('stopwatchDisplay').textContent = `${minutes}:${seconds}:${milliseconds}`;
}

// Function to start the stopwatch
function startStopwatch() {
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');

    if (!stopwatchRunning) {
        stopwatchStartTime = Date.now() - (stopwatchInterval || 0);
        stopwatchRunning = true;
        stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
        stopwatchDisplay.classList.add('running'); // Add the 'running' class for animation
    }
}

// Function to stop the stopwatch
function stopStopwatch() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        const stopwatchDisplay = document.getElementById('stopwatchDisplay');
        stopwatchDisplay.classList.remove('running'); // Remove the 'running' class to stop animation
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    stopwatchDisplay.textContent = '00:00:00';
    stopwatchDisplay.classList.remove('running'); // Remove the 'running' class
}

// Event listeners
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', stopTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);

document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('stopStopwatch').addEventListener('click', stopStopwatch);
document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);

