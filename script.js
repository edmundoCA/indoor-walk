let hundredths = 0;
let seconds = 0;
let minutes = 0;
let timespanHundreths = 0;
let interval = null;
let isRunning = false;
let stage = null;
let speed = null;
let incline = null;
const stagesMap = new Map([
    ["Warm-up", {"speed": 3.5, "incline": 0}],
    ["Brisk walk", {"speed": 5.5, "incline": 2}],
    ["High Intensity", {"speed": 6, "incline": 3}],
    ["Recovery", {"speed": 4, "incline": 1}],
    ["Steady walk", {"speed": 5, "incline": 2}],
    ["Cool-down", {"speed": 3.5, "incline": 0}]
]);
const stagesArray = Array.from(stagesMap.keys()); 

function mintuesToHundreds(minutes) {
    return minutes * 60 * 100;
}

function updateUi() {
    updateDisplay();
    timespanHundreths++;
    if (timespanHundreths < mintuesToHundreds(5))
    {
        stage = stagesArray[0];
    }
    else if (timespanHundreths < mintuesToHundreds(10))
    {
        stage = stagesArray[1];
    }
    else if (timespanHundreths < mintuesToHundreds(11))
    {
        stage = stagesArray[2];
    }
    else if (timespanHundreths < mintuesToHundreds(13))
    {
        stage = stagesArray[3];
    }
    else if (timespanHundreths < mintuesToHundreds(14))
    {
        stage = stagesArray[2];
    }
    else if (timespanHundreths < mintuesToHundreds(16))
    {
        stage = stagesArray[3];
    }
    else if (timespanHundreths < mintuesToHundreds(17))
    {
        stage = stagesArray[2];
    }
    else if (timespanHundreths < mintuesToHundreds(19))
    {
        stage = stagesArray[3];
    }
    else if (timespanHundreths < mintuesToHundreds(20))
    {
        stage = stagesArray[2];
    }
    else if (timespanHundreths < mintuesToHundreds(22))
    {
        stage = stagesArray[3];
    }
    else if (timespanHundreths < mintuesToHundreds(25))
    {
        stage = stagesArray[4];
    }
    else if (timespanHundreths < mintuesToHundreds(30))
    {
        stage = stagesArray[5];
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
    timespanHundreths = 0;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startPause").innerText = "Start";
}