let hundredths = 0;
let seconds = 0;
let minutes = 0;
let timespanHundreths = 0;
let interval = null;
let isRunning = false;
let stage = null;
let speed = null;
let incline = null;

function mintuesToHundreds(minutes) {
    return minutes * 60 * 100;
}

function updateUi() {
    timespanHundreths++;
    updateDisplay();
    if (timespanHundreths < mintuesToHundreds(5))
    {
        stage = "Warm-up";
        speed = 3.5;
        incline = 0;
    }
    else if (timespanHundreths < mintuesToHundreds(10))
    {
        stage = "Brisk walk";
        speed = 5.5;
        incline = 2;
    }
    else if (timespanHundreths < mintuesToHundreds(11))
    {
        stage = "High Intensity";
        speed = 6;
        incline = 3;
    }
    else if (timespanHundreths < mintuesToHundreds(13))
    {
        stage = "Recovery";
        speed = 4;
        incline = 1;
    }
    else if (timespanHundreths < mintuesToHundreds(14))
    {
        stage = "High Intensity";
        speed = 6;
        incline = 3;
    }
    else if (timespanHundreths < mintuesToHundreds(16))
    {
        stage = "Recovery";
        speed = 4;
        incline = 1;
    }
    else if (timespanHundreths < mintuesToHundreds(17))
    {
        stage = "High Intensity";
        speed = 6;
        incline = 3;
    }
    else if (timespanHundreths < mintuesToHundreds(19))
    {
        stage = "Recovery";
        speed = 4;
        incline = 1;
    }
    else if (timespanHundreths < mintuesToHundreds(20))
    {
        stage = "High Intensity";
        speed = 6;
        incline = 3;
    }
    else if (timespanHundreths < mintuesToHundreds(22))
    {
        stage = "Recovery";
        speed = 4;
        incline = 1;
    }
    else if (timespanHundreths < mintuesToHundreds(25))
    {
        stage = "Steady walk";
        speed = 5;
        incline = 2;
    }
    else if (timespanHundreths < mintuesToHundreds(30))
    {
        stage = "Cool-down";
        speed = 3.5;
        incline = 0;
    }
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