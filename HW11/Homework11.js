// --- Player ---
var playerX = 60;
var playerY = 300;
var playerSpeed = 5;
 
// --- Key codes ---
var W = 87;
var S = 83;
var A = 65;
var D = 68;
 
// --- Moving obstacle 1 (orange square) ---
var obs1X = 150;
var obs1Y = 100;
var obs1SpeedX;
var obs1SpeedY;
 
// --- Moving obstacle 2 (yellow big circle) ---
var obs2X = 300;
var obs2Y = 400;
var obs2SpeedX;
var obs2SpeedY;
 
// --- Moving obstacle 3 (teal small circle) ---
var obs3X = 400;
var obs3Y = 200;
var obs3SpeedX;
var obs3SpeedY;
 
// --- Moving obstacle 4 (pink small rect) ---
var obs4X = 250;
var obs4Y = 500;
var obs4SpeedX;
var obs4SpeedY;
 
// --- Mouse placed obstacle ---
var mouseObsX = -100;
var mouseObsY = -100;
var mouseObsPlaced = false;
 
// --- Game state ---
var gameWon = false;
 
// --- Border thickness ---
var border = 12;
 
// --- Exit zone: bottom of the RIGHT wall ---
// gap starts at exitTop and goes to bottom of canvas
var exitTop = 480;
 
function setup()
{
    createCanvas(500, 600);
 
    // set random speeds once in setup
    obs1SpeedX = Math.floor(Math.random() * 4) + 1;
    obs1SpeedY = Math.floor(Math.random() * 4) + 1;
 
    obs2SpeedX = Math.floor(Math.random() * 3) + 2;
    obs2SpeedY = Math.floor(Math.random() * 3) + 2;
 
    obs3SpeedX = Math.floor(Math.random() * 5) + 1;
    obs3SpeedY = Math.floor(Math.random() * 5) + 1;
 
    obs4SpeedX = Math.floor(Math.random() * 2) + 3;
    obs4SpeedY = Math.floor(Math.random() * 2) + 3;
}
 
function draw()
{
    background(15, 20, 60);
 
    // draw borders first
    drawBorders();
 
    // --- Obstacle 1: orange square ---
    fill(255, 140, 0);
    noStroke();
    rect(obs1X, obs1Y, 22, 22);
    obs1X = wrapX(obs1X + obs1SpeedX);
    obs1Y = wrapY(obs1Y + obs1SpeedY);
 
    // --- Obstacle 2: yellow big circle ---
    fill(255, 220, 0);
    noStroke();
    circle(obs2X, obs2Y, 35);
    obs2X = wrapX(obs2X + obs2SpeedX);
    obs2Y = wrapY(obs2Y + obs2SpeedY);
 
    // --- Obstacle 3: teal small circle ---
    fill(0, 200, 200);
    noStroke();
    circle(obs3X, obs3Y, 18);
    obs3X = wrapX(obs3X + obs3SpeedX);
    obs3Y = wrapY(obs3Y + obs3SpeedY);
 
    // --- Obstacle 4: pink small rect ---
    fill(255, 100, 180);
    noStroke();
    rect(obs4X, obs4Y, 30, 14);
    obs4X = wrapX(obs4X + obs4SpeedX);
    obs4Y = wrapY(obs4Y + obs4SpeedY);
 
    // --- Mouse placed obstacle ---
    if (mouseObsPlaced)
    {
        fill(180, 0, 255);
        noStroke();
        rect(mouseObsX - 15, mouseObsY - 15, 30, 30);
    }
    else
    {
        fill(180, 180, 180);
        noStroke();
        textSize(13);
        textAlign(CENTER);
        text("Click anywhere to place an obstacle", width / 2, height - 8);
    }
 
    // --- Draw player ---
    fill(100, 180, 255);
    noStroke();
    circle(playerX, playerY, 25);
 
    // --- Move player if game not won ---
    if (!gameWon)
    {
        movePlayer();
    }
 
    // --- Win check ---
    // logical operator: player x is past the right wall AND player y is in the exit zone
    if (playerX > width - border && playerY > exitTop)
    {
        gameWon = true;
    }
 
    // --- Show win screen ---
    if (gameWon)
    {
        fill(0, 0, 0, 180);
        noStroke();
        rect(0, 0, width, height);
 
        fill(0, 255, 150);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("You Win!", width / 2, height / 2 - 20);
 
        fill(220, 220, 220);
        textSize(20);
        text("You made it through the exit!", width / 2, height / 2 + 35);
    }
}
 
// --- Move player with WASD ---
function movePlayer()
{
    if (keyIsDown(W))
    {
        playerY -= playerSpeed;
    }
    else if (keyIsDown(S))
    {
        playerY += playerSpeed;
    }
 
    if (keyIsDown(A))
    {
        playerX -= playerSpeed;
    }
    else if (keyIsDown(D))
    {
        playerX += playerSpeed;
    }
}
 
// --- Wrap x ---
function wrapX(x)
{
    if (x > width)
    {
        return 0;
    }
    else if (x < 0)
    {
        return width;
    }
    else
    {
        return x;
    }
}
 
// --- Wrap y ---
function wrapY(y)
{
    if (y > height)
    {
        return 0;
    }
    else if (y < 0)
    {
        return height;
    }
    else
    {
        return y;
    }
}
 
// --- Borders with exit gap on right side ---
function drawBorders()
{
    fill(40, 40, 100);
    noStroke();
 
    // top border
    rect(0, 0, width, border);
 
    // left border
    rect(0, 0, border, height);
 
    // bottom border
    rect(0, height - border, width, border);
 
    // right border — only draws down to exitTop, leaving a gap
    rect(width - border, 0, border, exitTop);
 
    // green EXIT sign inside the gap
    fill(0, 255, 150);
    textSize(15);
    textAlign(RIGHT);
    text("EXIT", width - 16, exitTop + 30);
}
 
// --- Place obstacle on click ---
function mouseClicked()
{
    mouseObsX = mouseX;
    mouseObsY = mouseY;
    mouseObsPlaced = true;
}