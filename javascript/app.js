let velocity = { x: 0, y: 0 };
let snakearr = [
    { x: 5, y: 6 }
];
let food = { x: 8, y: 6 };
let speed = 12;
let score = 0;
let lastPaintTime = 0;
const music = new Audio('Resources/song.mp3');
const mediaQuery = window.matchMedia('(max-width: 480px)');
const eat = new Audio('Resources/snake-eat.wav');
if (mediaQuery.matches) {
    speed = 7;
}
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
    n = 25;
    if (mediaQuery.matches) {
        n = 15;
    }
    if (snake[0].x > n || snake[0].y > n || snake[0].y < 0 || snake[0].x < 0) {
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
        speed = 12;
        if (mediaQuery.matches) {
            speed = 7;
        }
        score = 0;
        scoreval = JSON.parse(score);
        scoreBox.innerHTML = "Score: " + score;
    }
    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        score += 1;
        scoreval = JSON.parse(score);
        scoreBox.innerHTML = "Score: " + score;
        eat.play();
        if (score > highscoreval) {
            highscore = score;
            highscoreval = JSON.parse(highscore);
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore: " + highscore;
        }
        snakearr.unshift({ x: snakearr[0].x + velocity.x, y: snakearr[0].y + velocity.y });
        var x = window.matchMedia("(max-width: 700px)");
        n = 23;
        const mediaQuery = window.matchMedia('(max-width: 480px)')
        if (mediaQuery.matches) {
            n = 13;
        }
        food = { x: 2 + Math.round(n * Math.random()), y: 2 + Math.round(n * Math.random()) };
        if (mediaQuery.matches) {
            speed += 0.5;
        }
        else {
            speed += 0.6;
        }
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

let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
    highscoreBox.innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    velocity = { x: 0, y: 1 };
    music.play();
    if (e.key == "ArrowUp") {
        velocity.x = 0;
        velocity.y = -1;
    }
    if (e.key === "ArrowLeft") {
        velocity.x = -1;
        velocity.y = 0;
    }
    if (e.key === "ArrowRight") {
        velocity.x = 1;
        velocity.y = 0;
    }
    if (e.key === "ArrowDown") {
        velocity.x = 0;
        velocity.y = 1;
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
    window.scrollTo(0, 1);
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            velocity.x = -1;
            velocity.y = 0;
        } else {
            velocity.x = 1;
            velocity.y = 0;
        }
    } else {
        if (yDiff > 0) {
            velocity.x = 0;
            velocity.y = -1;
        } else {
            velocity.x = 0;
            velocity.y = 1;
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

