// character position
var characterX = 60;
var characterY = 300;
 
// key codes
var w = 87;
var s = 83;
var a = 65;
var d = 68;
 
// star background arrays
var starXs = [];
var starYs = [];
var starSizes = [];
 
// asteroid obstacle arrays
var rockXs = [];
var rockYs = [];
var rockSizes = [];
var rockXSpeeds = [];
var rockYSpeeds = [];
var rockAngles = [];
 
// mouse-placed shield
var shieldX = -100;
var shieldY = -100;
 
var won = false;
var score = 0;
 
function setup() {
  createCanvas(500, 600);
  angleMode(DEGREES);
 
  // background stars
  for (var i = 0; i < 80; i++) {
    starXs[i] = random(width);
    starYs[i] = random(height);
    starSizes[i] = random(1, 3);
  }
 
  // asteroids
  for (var i = 0; i < 50; i++) {
    rockXs[i] = getRandomNumber(500);
    rockYs[i] = getRandomNumber(600);
    rockSizes[i] = getRandomNumber(25) + 8;
    rockXSpeeds[i] = randomSpeed();
    rockYSpeeds[i] = randomSpeed();
    rockAngles[i] = random(360);
  }
 
  createCharacter(60, 300);
}
 
function draw() {
  background(5, 5, 20);
 
  // draw star field
  for (var i = 0; i < starXs.length; i++) {
    fill(255, 255, 255, 180);
    noStroke();
    ellipse(starXs[i], starYs[i], starSizes[i]);
  }
 
  drawBorders(10);
 
  // portal (exit) at top-right gap
  fill(0, 220, 255);
  noStroke();
  textSize(13);
  textAlign(CENTER);
  text("PORTAL", width - 30, 35);
  textAlign(LEFT);
 
  // draw asteroids
  for (var i = 0; i < rockXs.length; i++) {
    fill(160, 100, 50);
    stroke(200, 140, 80);
    strokeWeight(1);
    drawAsteroid(rockXs[i], rockYs[i], rockSizes[i], rockAngles[i]);
 
    rockAngles[i] += 1;
    rockXSpeeds[i] = randomSpeed();
    rockYSpeeds[i] = randomSpeed();
    rockXs[i] += rockXSpeeds[i];
    rockYs[i] += rockYSpeeds[i];
 
    if (rockXs[i] > width)  rockXs[i] = 0;
    if (rockXs[i] < 0)      rockXs[i] = width;
    if (rockYs[i] > height) rockYs[i] = 0;
    if (rockYs[i] < 0)      rockYs[i] = height;
  }
 
  // mouse-placed shield (non-moving)
  noStroke();
  fill(0, 180, 255, 120);
  ellipse(shieldX, shieldY, 40, 40);
  fill(0, 220, 255, 200);
  ellipse(shieldX, shieldY, 20, 20);
 
  drawCharacter();
  characterMovement();
 
  // score display
  fill(255);
  noStroke();
  textSize(13);
  text("Score: " + score, 18, 25);
  score++;
 
  // win check — portal is top-right gap
  if (characterX > width - 10 && characterY < 60) {
    won = true;
  }
 
  if (won) {
    fill(0, 220, 255);
    textSize(36);
    textAlign(CENTER);
    text("You Escaped!", width / 2, height / 2 - 10);
    textSize(16);
    fill(255);
    text("Score: " + score, width / 2, height / 2 + 30);
    textAlign(LEFT);
    noLoop();
  }
}
 
function drawAsteroid(x, y, r, angle) {
  push();
  translate(x, y);
  rotate(angle);
  beginShape();
  for (var i = 0; i < 8; i++) {
    var a = i * 45;
    var jitter = random(0.7, 1.3);
    vertex(cos(a) * r * jitter, sin(a) * r * jitter);
  }
  endShape(CLOSE);
  pop();
}
 
function characterMovement() {
  if (won) return;
  if (keyIsDown(w)) characterY -= 4;
  if (keyIsDown(s)) characterY += 4;
  if (keyIsDown(a)) characterX -= 4;
  if (keyIsDown(d)) characterX += 4;
}
 
function createCharacter(x, y) {
  characterX = x;
  characterY = y;
}
 
function drawCharacter() {
  // rocket ship triangle
  push();
  translate(characterX, characterY);
  fill(255, 80, 80);
  noStroke();
  triangle(0, -18, -12, 14, 12, 14);
  fill(255, 200, 50);
  ellipse(0, 10, 10, 8);
  pop();
}
 
function drawBorders(t) {
  fill(0, 80, 160);
  noStroke();
  rect(0, 0, width, t);           // top
  rect(0, 0, t, height);          // left
  rect(0, height - t, width, t);  // bottom
  rect(width - t, 60, t, height); // right (gap at top for portal)
}
 
function mouseClicked() {
  shieldX = mouseX;
  shieldY = mouseY;
}
 
function getRandomNumber(n) {
  return Math.floor(Math.random() * n) + 5;
}
 
function randomSpeed() {
  return Math.floor(Math.random() * 3) + 1;
}