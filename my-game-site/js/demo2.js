'use strict'

var contex = null;
var tileWidth = 40, tileHeight = 40;
var mapWidth = 10, mapHeight = 10;

var currentSecond = 0, frameCount = 0, framesLastSecond = 0;

var gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 1, 1, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    
];

window.onload = function () {
    contex = document.getElementById('canvas-demo2').getContext('2d');
    requestAnimationFrame(drawGame);
    contex.font = "bold 10pt sans-serif";
};

function drawGame() {
    if (contex == null) { return; }
    
    var sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond)
    {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    }
    else { frameCount++; }
    
    for (var y = 0; y < mapHeight; y++)
    {
        for (var x = 0; x < mapWidth; x++)
        {
            switch (gameMap[((y * mapWidth) + x)])
            {
                case 0:
                    contex.fillStyle = "#999999";
                    break;
                default:
                    contex.fillStyle = "#eeeeee";
            }

            contex.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
        
    }

    contex.fillStyle = "#ff0000";
    contex.fillText("FPS: " + framesLastSecond, 10, 20);
    requestAnimationFrame(drawGame);
    
}
