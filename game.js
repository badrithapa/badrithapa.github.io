let c;
let ctx;

let ballX = 400;
let ballY = 300;

let ballSpeedX = 10;
let ballSpeedY = 5;

let paddle1Y = 240;
let paddle2Y = 240;

const paddleH = 100;
const paddle_thickness = 10;

let player1Score = 0;
let player2Score = 0;
const max_Score = 5;

let winScreen = false;

function mousePosition(e) {
	// move the position of the paddle wrt to mouse
    let rect = c.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rect.left - root.scrollLeft;
    let mouseY = e.clientY - rect.top - root.scrollTop;
    // here e.clientX and client y are mouse position inside viewport
    // rect.left and top are posiiotn of element from lef t and top
    // root scroll lef tand top are position from root element like html and scrolled position are left and top...
    // console.log(rect.left);

    return {
        x: mouseX, /*this returns x and y as properties of object mousePosition whose value are mouseX and mouseY we got from calculation which is used to move the paddle wth respect to mouse*/
        y: mouseY
    }
}

window.onload = function() {
    c = document.getElementById('gc');
    ctx = c.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    c.addEventListener('mousemove', (evt) => {
        let mousePos = mousePosition(evt);
        paddle1Y = mousePos.y - (paddleH / 2);
    }); /*move the paddle with the mouse*/
    c.addEventListener('mousedown', () => {
            if (winScreen) {
                player2Score = 0;
                player1Score = 0;
                winScreen = false;
            }
        }
    );
}

function ballReset() {
    if (player1Score >= max_Score) {
        player1Score = 0;
        player2Score = 0;
        winScreen = 'BLUE WINS';
    } else if (player2Score >= max_Score) {
        player1Score = 0;
        player2Score = 0;
        winScreen = 'RED WINS';
    }
    ballX = c.width / 2;
    ballY = c.height / 2;
    ballSpeedX = -ballSpeedX;
}

function moveEverything() {
    if (winScreen) {
    	// pauses the games if winScreen is true i.e somebody already won the game
        return;
    }
    ballX = ballX + ballSpeedX;
    if (ballX + 20 > c.width) {
    	// further the ball hits the paddle from the center of the paddle faster the vertical speed.
        if (ballY > paddle2Y && ballY < paddle2Y + paddleH) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle2Y + paddleH / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    }
    if (ballX - 13 < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleH) {
            ballSpeedX = -ballSpeedX;
            // further the ball hits the paddle from the center of the paddle faster the vertical speed.
            let deltaY = ballY - (paddle1Y + paddleH / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballReset();
        }

    }
    ballY = ballY + ballSpeedY;
    if (ballY + 7.5 > c.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY - 7.5 < 0) { ballSpeedY = -ballSpeedY; }
}

function redPaddleMove() {
    let paddle2Ycenter = paddle2Y + (paddleH / 2) /*moving the paddle by center not the top*/
    // moving the paddle withing 70px range
    if (paddle2Ycenter < ballY - 35) { 
        paddle2Y += 6;
    } else if (paddle2Ycenter > ballY + 35) {
        paddle2Y -= 6;
    }
}

function drawEverything() {
    redPaddleMove();
    colorRect(0, 0, c.width, c.height,
        'black');
    if(winScreen){
    if (winScreen=='BLUE WINS') {
        ctx.fillStyle = 'Blue';
        ctx.font = '32px serif';
        ctx.fillText(winScreen, 375, 100);
    }
    else if(winScreen=='RED WINS'){
    	ctx.fillStyle = 'red';
        ctx.font = '32px serif';
        ctx.fillText(winScreen, 375, 100);
    }

        ctx.fillStyle='white';
        ctx.font = '20px serif';
        ctx.fillText('\n\nClick to Continue...', 370, 500);
        return;
    }
  
    colorCircle(ballX, ballY, 7.5, 'white');
    colorRect(0,
        paddle1Y, paddle_thickness, paddleH, 'blue');
    colorRect(c.width - paddle_thickness, paddle2Y, paddle_thickness, paddleH,
        'red');
    // player score at two side;
    ctx.fillStyle = '#05ff05';
    ctx.font = '12px serif'
    ctx.fillText(player1Score, 100, 100);
    ctx.fillText(player2Score, c.width - 100, 100);
    // DRAW the net in the middle
    for(let i=0; i<c.height;i+=40){
    	colorRect(c.width/2-1,i,2,20,'yellow');
    }
}

function colorCircle(centerX, centerY, radius, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
}