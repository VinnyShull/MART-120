// x and y for the character
var characterX = 200;
var characterY = 350;

// key codes
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// obstacle 1 - moving orange circle
var obs1X = 120;
var obs1Y = 120;
var obs1SpeedX = 2;
var obs1SpeedY = 1;

// obstacle 2 
var obs2X = 380;
var obs2Y = 150;
var obs2SpeedX = 1;
var obs2SpeedY = 3;

// obstacle 3 
var obs3X = 250;
var obs3Y = 300;

// mouse placed obstacle
var mouseShapeX = -100;
var mouseShapeY = -100;

// border thickness
var borderSize = 12;

// exit gap starts here on the right wall
var exitStart = 480;

function setup()
{
    createCanvas(500, 600);
    createCharacter(200, 350);
}

function draw()
{
    background(120, 45, 78);
    stroke(0);
    fill(0);

    // draw borders
    createBorders(borderSize);

    // draw exit
    createExit();

    // draw and move obstacle 1
    drawObs1();

    // draw and move obstacle 2
    drawObs2();

    // draw stationary obstacle 3
    drawObs3();

    // draw mouse obstacle
    fill(120, 130, 140);
    circle(mouseShapeX, mouseShapeY, 25);

    // draw and move character
    drawCharacter();
    characterMovement();

    // check if character reached exit
    checkWin();
}

// creates and places the character
function createCharacter(x, y)
{
    characterX = x;
    characterY = y;
}

// draws the character
function drawCharacter()
{
    fill(23, 40, 123);
    noStroke();
    circle(characterX, characterY, 25);
}

// handles character movement with wasd
function characterMovement()
{
    if(keyIsDown(w))
    {
        characterY -= 5;
    }
    if(keyIsDown(s))
    {
        characterY += 5;
    }
    if(keyIsDown(a))
    {
        characterX -= 5;
    }
    if(keyIsDown(d))
    {
        characterX += 5;
    }
}

// draws and moves obstacle 1
function drawObs1()
{
    fill(255, 120, 0);
    noStroke();
    circle(obs1X, obs1Y, 55);

    obs1X += obs1SpeedX;
    obs1Y += obs1SpeedY;

    if(obs1X > width)
    {
        obs1X = 0;
    }
    if(obs1X < 0)
    {
        obs1X = width;
    }
    if(obs1Y > height)
    {
        obs1Y = 0;
    }
    if(obs1Y < 0)
    {
        obs1Y = height;
    }
}

// draws and moves obstacle 2
function drawObs2()
{
    fill(220, 30, 30);
    noStroke();
    rect(obs2X, obs2Y, 50, 50);

    obs2X += obs2SpeedX;
    obs2Y += obs2SpeedY;

    if(obs2X > width)
    {
        obs2X = 0;
    }
    if(obs2X < 0)
    {
        obs2X = width;
    }
    if(obs2Y > height)
    {
        obs2Y = 0;
    }
    if(obs2Y < 0)
    {
        obs2Y = height;
    }
}

// draws stationary obstacle 3
function drawObs3()
{
    fill(0, 210, 80);
    noStroke();
    circle(obs3X, obs3Y, 45);
}

// creates borders around the screen
function createBorders(thickness)
{
    fill(40, 40, 100);
    noStroke();
    // top border
    rect(0, 0, width, thickness);
    // left border
    rect(0, 0, thickness, height);
    // bottom border
    rect(0, height - thickness, width, thickness);
    // right border - stops at exitStart to leave gap
    rect(width - thickness, 0, thickness, exitStart);
}

// creates the exit label
function createExit()
{
    fill(0, 255, 150);
    noStroke();
    textSize(15);
    text("EXIT", width - 50, exitStart + 35);
}

// checks if character went through the exit
function checkWin()
{
    if(characterX > width - borderSize && characterY > exitStart)
    {
        fill(0);
        noStroke();
        textSize(32);
        text("You Win!", width / 2 - 60, height / 2 - 50);
    }
}

// places a shape where the mouse is clicked
function mouseClicked()
{
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
}

