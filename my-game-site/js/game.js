'use strict';
// отримуємо переміну по ід 
let canv = document.getElementById('canvas');
let context = canv.getContext('2d');

canv.width = 1000;
canv.height = 700;

//code

canv.addEventListener('mousemove', function (e) {
    context.beginPath();
    context.arc(e.clientX, e.clientY, 50, 0, Math.PI * 2);
    context.fill();
});




// let grad = context.createLinearGradient(0, 0, 500, 0)

// grad.addColorStop('0', 'magenta');
// grad.addColorStop('.50', 'blue');
// grad.addColorStop('1', 'red');

// context.fillStyle = grad;

// context.font = '40px Georgia';
// context.fillText("Hello world", 50, 70);



// context.strokeStyle = 'red';
// context.lineWidth = 5;

// context.scale(4, 4);
// context.rotate(-5 * Math.PI/180)

// context.beginPath(0,0);
// context.moveTo(50, 50);
// context.lineTo(25, 100);
// context.lineTo(75, 100);
// context.closePath();
// context.stroke();


