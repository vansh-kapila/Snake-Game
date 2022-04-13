let velocity = { x: 0, y: 0 };
let snakearr = [
    { x: 5, y: 6 }
];
let food = { x: 8, y: 6 };
let speed = 6;
let score = 0;
let lastPaintTime = 0;
const music = new Audio('song.mp3');
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    Game();
}
function touches(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x > 20 || snake[0].y > 20 || snake[0].y < 0 || snake[0].x < 0) {
        return true;
    }
}
function Game() {
    if (touches(snakearr)) {
        music.pause();
        velocity = { x: 0, y: 0 };
        alert("Press any key to play again");
        snakearr = [{ x: 5, y: 6 }];
        music.play();
        score = 0;
        speed = 6;
    }
    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        snakearr.unshift({ x: snakearr[0].x + velocity.x, y: snakearr[0].y + velocity.y });
        food = { x: 2 + Math.round(17 * Math.random()), y: 2 + Math.round(17 * Math.random()) };
        speed += 0.8;
    }

    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += velocity.x;
    snakearr[0].y += velocity.y;
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake')
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    velocity = { x: 0, y: 1 };
    music.play();
    if (e.key == "ArrowUp") {
        velocity.x = 0;
        velocity.y = -1;
        document.querySelector('snake').style.margin = "5px";
    }
    if (e.key === "ArrowLeft") {
        velocity.x = -1;
        velocity.y = 0;
        document.querySelector('snake').style.margin = "5px";
    }
    if (e.key === "ArrowRight") {
        velocity.x = 1;
        velocity.y = 0;
        document.querySelector('snake').style.margin = "5px";
    }
    if (e.key === "ArrowDown") {
        velocity.x = 0;
        velocity.y = 1;
        document.querySelector('snake').style.margin = "5px";
    }
});

//swipe support
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            velocity.x = 1;
            velocity.y = 0;
            document.querySelector('snake').style.margin = "5px";
        } else {
            velocity.x = -1;
            velocity.y = 0;
            document.querySelector('snake').style.margin = "5px";
        }
    } else {
        if (yDiff > 0) {
            velocity.x = 0;
            velocity.y = 1;
            document.querySelector('snake').style.margin = "5px";
        } else {
            velocity.x = 0;
            velocity.y = -1;
            document.querySelector('snake').style.margin = "5px";
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

