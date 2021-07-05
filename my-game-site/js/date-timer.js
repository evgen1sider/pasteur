'use strict';
let date_timer_show = document.getElementById(".time-manager-fields"); 

let playSpeed = 1000;
let skipSpeed = 5000;

// Define a counter variable for the number of seconds and set it to zero.
let secondCount = 0;
// Define a counter variable for the number of Day
let dayCount = 0;
// Define a global to store the interval when it is active.
let stopWatch;
//Date
let stopDater;
// Store a reference to the display paragraph in a variable
const displayPara = document.querySelector('.clock');

const displayParagraph = document.querySelector('.counter');
// Function to calculate the current hours, minutes, and seconds, and display the count
function displayCount() {
  // Calculate current hours, minutes, and seconds
  let hours = Math.floor(secondCount/3600);
  let minutes = Math.floor((secondCount % 3600)/60);
  let seconds = Math.floor(secondCount % 60)

  // Display a leading zero if the values are less than ten
  let displayHours = (hours < 10) ? '0' + hours : hours;
  let displayMinutes = (minutes < 10) ? '0' + minutes : minutes;
  let displaySeconds = (seconds < 10) ? '0' + seconds : seconds;

  // Write the current stopwatch display time into the display paragraph
  displayPara.textContent = displayHours + ':' + displayMinutes + ':' + displaySeconds;

  // Increment the second counter by one
  secondCount++;
}
//Date
function displayCounter() {
    // Calculate current hours, minutes, and seconds
    let years = Math.floor(dayCount/360);
    let months = Math.floor((dayCount % 360)/12);
    let days = Math.floor(dayCount % 30)
  
    // Display a leading zero if the values are less than ten
    let displayYear = (years < 10) ? '200' + years : years;
    let displayMonth = (months < 10) ? '0' + months : months;
    let displayDays = (days < 10) ? '0' + days : days;
  
    // Write the current stopwatch display time into the display paragraph
    displayParagraph.textContent = displayYear + '-' + displayMonth + '-' + displayDays;
  
    // Increment the second counter by one
    dayCount++;
  }

// Store references to the buttons in constants
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

//---Date ---
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const skipBtn = document.querySelector('.skip');

// When the start button is pressed, start running displayCount() once per second using setInterval()
startBtn.addEventListener('click', () => {
  stopWatch = setInterval(displayCount, 1000);
  startBtn.disabled = true;
});

// Date

playBtn.addEventListener('click', () => {
    stopDater = setInterval(displayCounter, 1000);
    playBtn.disabled = true;
  });

// When the stop button is pressed, clear the interval to stop the count.
stopBtn.addEventListener('click', () => {
  clearInterval(stopWatch);
  startBtn.disabled = false;
});

//Date 
pauseBtn.addEventListener('click', () => {
    clearInterval(stopDater);
    playBtn.disabled = false;
  });


// When the reset button is pressed, set the counter back to zero, then immediately update the display
resetBtn.addEventListener('click', () => {
  clearInterval(stopWatch);
  startBtn.disabled = false;
  secondCount = 0;
  displayCount();
});
// Date
skipBtn.addEventListener('click', () => {
    clearInterval(stopDater);
    playBtn.disabled = false;
    dayCount = 0;
    displayCounter();
  });

// Run displayCount() once as soon as the page loads so the clock is displayed
displayCount();

//Date

displayCounter();

