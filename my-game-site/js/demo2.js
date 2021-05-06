'use strict'

var contex = null;
var tileWidth = 40, tileHeight = 40;
var mapWidth = 20, mapHeight = 20;

var currentSecond = 0, frameCount = 0, framesLastSecond = 0;
var LastFrameTime = 0;

var keysDown = {
    37: false,
    38: false,
    39: false,
    40: false
};

var player = new Character();

var gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0,
    0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,    
    
];
// viewport - область огляду
var viewport = {
    screen: [0, 0],
    startTile: [0, 0],
    endTile: [0, 0],
    // offset - зміщення
    offset: [0, 0],
    update: function (px, py)
    {
        this.offset[0] = Math.floor((this.screen[0] / 2) - px);
        this.offset[1] = Math.floor((this.screen[1] / 2) - py);

        var tile = [
            Math.floor(px / tileWidth),
            Math.floor(py/ tileHeight)
        ];

        this.startTile[0] = tile[0] - 1 -
            Math.ceil((this.screen[0] / 2) / tileWidth);
        this.startTile[1] = tile[1] - 1 -
            Math.ceil((this.screen[1] / 2) / tileHeight);
        
        if (this.startTile[0] < 0) { this.startTile[0] = 0; }
        if (this.startTile[1] < 0) { this.startTile[1] = 0; }
        
        this.endTile[0] = tile[0] + 1 +
            Math.ceil((this.screen[0] / 2) / tileWidth);
        this.endTile[1] = tile[1] + 1 +
            Math.ceil((this.screen[1] / 2) / tileHeight);
        if (this.endTile[0] >= mapWidth) { this.endTile[0] = mapWidth-1; }
        if (this.endTile[1] >= mapHeight) { this.endTile[1] = mapHeight - 1; }
        
        
        
        
        
    }

    

}

function Character() {
    this.tileFrom = [1, 1];
    this.tileTo = [1, 1];
    this.timeMoved = 0;
    // dimensions - розміри 
    this.dimensions = [30, 30];
    this.position = [45, 45];
    this.deleyMove = 700;

}

Character.prototype.placeAt = function (x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];
    this.position = [
        ((tileWidth * x) + ((tileWidth - this.dimensions[0]) / 2)),
        ((tileHeight * y) + ((tileHeight - this.dimensions[1]) / 2))
    ];
    
};

Character.prototype.processMovement = function (t) {
    if (this.tileFrom[0] == this.tileTo[0] &&
        this.tileFrom[1] == this.tileTo[1])
    {    
        return false;
    }
    if ((t - this.timeMoved) >= this.deleyMove) {
        this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else {
        this.position[0] = (this.tileFrom[0] * tileWidth) +
            ((tileWidth - this.dimensions[0]) / 2);
        this.position[1] = (this.tileFrom[1] * tileHeight) +
            ((tileHeight - this.dimensions[1]) / 2);
        
        if (this.tileTo[0] != this.tileFrom[0]) {
            // diff is distance moves in pexels between curent and destination of X value
            var diff = (tileWidth / this.deleyMove) *
                (t - this.timeMoved);
            this.position[0] += (this.tileTo[0] < this.tileFrom[0] ?
                0 - diff : diff);
        }
        if (this.tileTo[1] != this.tileFrom[1]) {
            // diff is distance moves in pexels between curent and destination of Y value
            var diff = (tileHeight / this.deleyMove) *
                (t - this.timeMoved);
            this.position[1] += (this.tileTo[1] < this.tileFrom[1] ?
                0 - diff : diff);
        }

        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
    }
    return true;
}

function toIndex(x, y) {
    
    return ((y * mapWidth) + x);

}




window.onload = function () {
    contex = document.getElementById('canvas-demo2').getContext('2d');
    requestAnimationFrame(drawGame);
    contex.font = "bold 10pt sans-serif";

    window.addEventListener("keydown", function (e) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            keysDown[e.keyCode] = true;
            
        }
        
    });
    window.addEventListener("keyup", function (e) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            keysDown[e.keyCode] = false;
        }
        console.log(e.keyCode)
    });
    // розмір камери
    viewport.screen = [
        document.getElementById('canvas-demo2').width,
        document.getElementById('canvas-demo2').height
    ]
    
    
};

function drawGame() {
    if (contex == null) { return; }

    var curentFrameTime = Date.now();
    var timeElapsed = curentFrameTime - LastFrameTime;
    
    var sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond)
    {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    }
    else { frameCount++; }

    if (!player.processMovement(curentFrameTime)) {
        if (keysDown[38] && player.tileFrom[1] > 0 &&
            gameMap[toIndex(player.tileFrom[0],
                player.tileFrom[1] - 1)] == 1)
        {
            player.tileTo[1] -= 1;
            
        }
        else if (keysDown[40] && player.tileFrom[1] < (mapHeight - 1) &&
            gameMap[toIndex(player.tileFrom[0],
                player.tileFrom[1] + 1)] == 1)
        {
            player.tileTo[1] += 1;
            
        }
        else if (keysDown[37] && player.tileFrom[0] > 0 &&
            gameMap[toIndex(player.tileFrom[0] - 1,
                player.tileFrom[1])] == 1)
        {
            player.tileTo[0] -= 1;
            
        }
        else if (keysDown[39] && player.tileFrom[0] < (mapWidth - 1) &&
            gameMap[toIndex(player.tileFrom[0]+1,
                player.tileFrom[1])] == 1)
        {
            player.tileTo[0] += 1;
            
        }
        if (player.tileFrom[0] != player.tileTo[0] ||
            player.tileFrom[1] != player.tileTo[1])
        {
            player.timeMoved = curentFrameTime;


        }

    }
    //метод оновлення центрування камери
    viewport.update(
        player.position[0] + (player.dimensions[0] / 2),
        player.position[1] + (player.dimensions[1] / 2)
    );

    contex.fillStyle = "#000000";
    contex.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
    
    for (var y = viewport.startTile[1]; y <= viewport.endTile[1]; y++)
    {
        for (var x = viewport.startTile[0]; x <= viewport.endTile[0]; x++)
        {
            switch (gameMap[((y * mapWidth) + x)])
            {
                case 0:
                    contex.fillStyle = "#999999";
                    break;
                default:
                    contex.fillStyle = "#eeeeee";
            }

            contex.fillRect(viewport.offset[0] + x * tileWidth,
                viewport.offset[1] + y * tileHeight, tileWidth, tileHeight);
        }
        
    }

    contex.fillStyle = "#0000ff";
    contex.fillRect(viewport.offset[0] + player.position[0],
        viewport.offset[1] + player.position[1],
        player.dimensions[0], player.dimensions[1]
    );




    contex.fillStyle = "#ff0000";
    contex.fillText("FPS: " + framesLastSecond, 10, 20);

    LastFrameTime = curentFrameTime;
    requestAnimationFrame(drawGame);
    
}
