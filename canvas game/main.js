window.onload = init;

// Declaration of global variables;
var canvas, ctx, w ,h;
var player1;


function init() {
    x = new GF();
    x.start();

}

// Start of Game Framework
var GF = function(colsBlock = 11, rowsBlock = 7, borderWidth = 20) {
    var grid = {
        x: [],
        y: []
    };
    
    var start = function(){
        canvas = document.createElement('canvas'); // create Element used for intellisense to detect canvas properties and methods
        canvas = document.querySelector('#canvas');
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        canvas.tabIndex = '1'; // the canvas cannot detect keydown event when it cannot be focused;
        
        canvas.width = ((colsBlock * 2) + 1) * 20 + borderWidth * 2;
        canvas.height = ((rowsBlock * 2) + 1) * 20 + borderWidth * 2;
        w = canvas.width;
        h = canvas.height;

        player1 = new player(20,20,'orange',20,20);
        canvas.addEventListener("keydown", e => player1.movePlayer(e, 10));

        requestAnimationFrame(mainLoop);
    }

    var mainLoop = function() {

        drawEnvironment();

        drawPlayer(player1);

        window.requestAnimationFrame(mainLoop);

    }

    
    // Functions that draw to canvas
    function drawEnvironment() {    
        
        // Environment black border
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);
        ctx.clearRect(borderWidth, borderWidth, w-borderWidth-borderWidth, h-borderWidth-borderWidth);
        ctx.restore();

        // Draw center bricks
        ctx.save();

        for (let row = borderWidth + 20; row < h - borderWidth * 2; row += 40) {
            grid.y.push(row);
            for (let col = borderWidth + 20; col < w - borderWidth * 2; col += 40) {
                grid.x.push(col);
                ctx.fillStyle = 'red';
                ctx.fillRect(col,row,20,20);
            }
        }
        ctx.restore();
    }

    // PLAYER PROTOTYPE
    function player(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    
        this.movePlayer = function(event, speed) {
            switch(event.code) {
                case 'ArrowUp':
                    this.y -= speed;
                    break;
                case 'ArrowDown':
                    this.y += speed;
                    break;
                case 'ArrowLeft':
                    this.x -= speed;
                    break;
                case 'ArrowRight':
                    this.x += speed;
                    break;
            }
        }
    }

    function drawPlayer(player) {
        ctx.save();
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.restore();
    }

    return {
        start: start
    }
}



















