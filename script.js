let hundredths = 0;
let seconds = 0;
let minutes = 0;
let elapsedTimeInMilliseconds = 0;
let currentStageIndex = 0;
let accumulatedStagesDuration = 0;
let interval = null;
let isRunning = false;
let stage = null;
let speed = null;
let incline = null;
let workoutStartDate = null;

const NUMBER_OF_INTERVALS = 6;
const STAGES = {
    WARM_UP: "Warm-up",
    BRISK_WALK: "Brisk walk",
    HIGH_INTENSITY: "High Intensity",
    RECOVERY: "Recovery",
    STEADY_WALK: "Steady walk",
    COOL_DOWN: "Cool-down"
};
const STAGES_MAP = new Map([
    [STAGES.WARM_UP, {"speed": 4, "incline": 0, "duration": 5}],
    [STAGES.BRISK_WALK, {"speed": 6, "incline": 3, "duration": 5}],
    [STAGES.HIGH_INTENSITY, {"speed": 6.5, "incline": 5, "duration": 1}],
    [STAGES.RECOVERY, {"speed": 4, "incline": 1, "duration": 1}],
    [STAGES.STEADY_WALK, {"speed": 6, "incline": 3, "duration": 3}],
    [STAGES.COOL_DOWN, {"speed": 3.5, "incline": 0, "duration": 5}]
]);

const PREP = [STAGES.WARM_UP, STAGES.BRISK_WALK];
const INTERVALS = [STAGES.HIGH_INTENSITY, STAGES.RECOVERY];
const WIND_DOWN = [STAGES.STEADY_WALK, STAGES.COOL_DOWN];
const ROUTINE = [];
ROUTINE.push(...PREP);
for (let i = 0; i < NUMBER_OF_INTERVALS; i++) {
    ROUTINE.push(...INTERVALS);
}
ROUTINE.push(...WIND_DOWN);

Number.prototype.minutesToMilliseconds = function() {
    return this * 60 * 1000;
}

function updateUi() {
    updateDisplay();
    updateStageInfo();
}

function updateStageInfo() {
    elapsedTimeInMilliseconds = new Date() - workoutStartDate;
    const currentStageDuration = STAGES_MAP.get(ROUTINE[currentStageIndex]).duration.minutesToMilliseconds();
    if (elapsedTimeInMilliseconds >= accumulatedStagesDuration + currentStageDuration) {
        accumulatedStagesDuration += currentStageDuration;
        currentStageIndex++;
    }
    stage = ROUTINE[currentStageIndex];
    ({ speed, incline } = STAGES_MAP.get(stage));
    document.getElementById("stage").innerText = stage;
    document.getElementById("speed").innerText = speed;
    document.getElementById("incline").innerText = incline;
}

function updateDisplay() {
    seconds = Math.floor((elapsedTimeInMilliseconds / 1000) % 60);
    minutes = Math.floor((elapsedTimeInMilliseconds / 60000) % 60);
    hundredths = Math.floor((elapsedTimeInMilliseconds / 10) % 100);
    document.getElementById("display").innerText =
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (hundredths < 10 ? "0" : "") + hundredths;
}

function startPause() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startPause").innerText = "Start";
        // TODO: Handle how the pause impacts the current timer logic.
    } else {
        workoutStartDate ??= new Date();
        interval = setInterval(updateUi, 10);
        document.getElementById("startPause").innerText = "Pause";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    workoutStartDate = null;
    isRunning = false;
    hundredths = 0;
    seconds = 0;
    minutes = 0;
    elapsedTimeInMilliseconds = 0;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startPause").innerText = "Start";
}