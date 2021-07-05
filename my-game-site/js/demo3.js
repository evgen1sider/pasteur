'use strict'

const srcGreenPlay = "/my-game-site/image/botstrap-image/play-green.svg";
const srcGreyPlay = "/my-game-site/image/botstrap-image/play-grey.svg";

const srcGreyStop = "/my-game-site/image/botstrap-image/stop-grey.svg";
const srcRedStop = "/my-game-site/image/botstrap-image/stop.svg";

const srcGreySkip = "/my-game-site/image/botstrap-image/faste-play-grey.svg";
const srcGreenSkip = "/my-game-site/image/botstrap-image/faste-play-green.svg";

const playButtonId = document.getElementById("play-button");

const skipButtonId = document.getElementById("skip-button");

const stopButtonId = document.getElementById("stop-button");

let date_timer_show = document.getElementById("date-timer"); 

let playSpeed = 1000;
let skipSpeed = 5000;



// date counter
let dayCount = 0;

let stopDater;

const displayParagraph = document.querySelector('.counter');

//Date
function displayCounter() {
    // Calculate current years, month, and days
    let years = Math.floor(dayCount/360);
    let months = Math.floor((dayCount % 360)/12);
    let days = Math.floor(dayCount % 30)
  
    // Display a leading zero if the values are less than ten
    let displayYear = (years < 10) ? '200' + years : years;
    let displayMonth = (months < 10) ? '0' + months : months;
    let displayDays = (days < 10) ? '0' + days : days;
  
    // Write the current stopwatch display time into the display paragraph
    displayParagraph.textContent = displayYear + '-' + displayMonth + '-' + displayDays;
  
    // Increment the day counter by one
    dayCount++;
}

const playBtn = playButtonId;
const pauseBtn = stopButtonId;
const skipBtn = skipButtonId;

playBtn.addEventListener('click', () => {
    stopDater = setInterval(displayCounter, playSpeed);
    playBtn.disabled = true;
    skipBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    clearInterval(stopDater);
    playBtn.disabled = false;
    skipBtn.disabled = false;
});

skipBtn.addEventListener('click', () => {
    // stopDater = setInterval(displayCounter, skipSpeed);
    // skipBtn.disabled = true;
    clearInterval(stopDater);
    playBtn.disabled = false;
    dayCount = 0;
    displayCounter();
});


// Time maneger button block
playButtonId.onclick = function() {
    
    playButtonId.src = srcGreenPlay;
    skipButtonId.src = srcGreySkip;
    stopButtonId.src = srcGreyStop;    
    
}

skipButtonId.onclick = function() {
    
    skipButtonId.src = srcGreenSkip;
    playButtonId.src = srcGreyPlay;
    stopButtonId.src = srcGreyStop;  
    
}

stopButtonId.onclick = function() { 
    stopButtonId.src = srcRedStop;
    playButtonId.src = srcGreyPlay;
    skipButtonId.src = srcGreySkip;  
}

displayCounter();



