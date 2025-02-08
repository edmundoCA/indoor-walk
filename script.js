let hundredths = 0;
let seconds = 0;
let minutes = 0;
let timespanInHundreths = 0;
let currentStageIndex = 0;
let accumulatedTimeInHundreths = 0;
let interval = null;
let isRunning = false;
let stage = null;
let speed = null;
let incline = null;
const stagesMap = new Map([
    ["Warm-up", {"speed": 3.5, "incline": 0, "duration": 5}],
    ["Brisk walk", {"speed": 5.5, "incline": 2, "duration": 5}],
    ["High Intensity", {"speed": 6, "incline": 3, "duration": 1}],
    ["Recovery", {"speed": 4, "incline": 1, "duration": 2}],
    ["High Intensity", {"speed": 6, "incline": 3, "duration": 1}],
    ["Recovery", {"speed": 4, "incline": 1, "duration": 2}],
    ["High Intensity", {"speed": 6, "incline": 3, "duration": 1}],
    ["Recovery", {"speed": 4, "incline": 1, "duration": 2}],
    ["High Intensity", {"speed": 6, "incline": 3, "duration": 1}],
    ["Recovery", {"speed": 4, "incline": 1, "duration": 2}],
    ["Steady walk", {"speed": 5, "incline": 2, "duration": 3}],
    ["Cool-down", {"speed": 3.5, "incline": 0, "duration": 5}]
]);
const stagesArray = Array.from(stagesMap.keys()); 

Number.prototype.mintuesToHundreds = function() {
    return this * 60 * 100;
}

function updateUi() {
    updateDisplay();
    updateStageInfo();
}

function updateStageInfo() {
    timespanInHundreths++;
    if (timespanInHundreths < accumulatedTimeInHundreths + stagesMap.get(stagesArray[currentStageIndex]).duration.mintuesToHundreds()) {
        stage = stagesArray[currentStageIndex];
    }
    else {
        accumulatedTimeInHundreths += stagesMap.get(stagesArray[currentStageIndex]).duration.mintuesToHundreds();
        currentStageIndex++;
    }
    ({ speed, incline } = stagesMap.get(stage));
    document.getElementById("stage").innerText = stage;
    document.getElementById("speed").innerText = speed;
    document.getElementById("incline").innerText = incline;
}

function updateDisplay() {
    hundredths++;
    if (hundredths === 100) {
        hundredths = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById("display").innerText =
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (hundredths < 10 ? "0" : "") + hundredths;
}

function startPause() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startPause").innerText = "Start";
    } else {
        interval = setInterval(updateUi, 10);
        document.getElementById("startPause").innerText = "Pause";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    hundredths = 0;
    seconds = 0;
    minutes = 0;
    timespanInHundreths = 0;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startPause").innerText = "Start";
}