
var headX = 250;
var headDirX = 2.5;       
 
var leftArmX = 150;
var leftArmDirX = 1.8;    
 

var bodyY = 185;
var bodyDirY = 1.5;        
 
var legsY = 335;
var legsDirY = 2.0;       
 

var circleX = 250;
var circleY = 270;
var circleDirX = 2.2;
var circleDirY = 1.7;
 

var textSz = 22;
var textDir = 4;
var textSteps = 0;
 
function setup() {
  createCanvas(500, 600);
}
 
function draw() {
  background(30, 90, 140);
 

  fill(255);
  textSize(textSz);
  text("Hello there!", 10, 80);
 
  if (frameCount % 20 === 0) {
    textSz += textDir;
    textSteps++;
    if (textSteps >= 5) {
      textDir *= -1;
      textSteps = 0;
    }
  }
 
 
  fill(255, 180, 180);
  noStroke();
  circle(headX, 100, 175);
 
  headX += headDirX;
  if (headX >= 418 || headX <= 82) {
    headDirX *= -1;
  }
 
  
  fill(0);
  circle(headX - 50, 75, 15);
  circle(headX + 35, 75, 15);
 
  
  circle(headX - 5, 90, 8);
 
 
  noFill();
  stroke(0);
  ellipse(headX - 5, 135, 40, 25);
 
 
  stroke(80, 40, 0);
  strokeWeight(3);
  line(headX - 120, 175, headX - 75, 50);
  line(headX + 75, 50,  headX + 110, 175);
  strokeWeight(1);
  noStroke();
 
  
  fill(200, 50, 50);
  noStroke();
  rect(200, bodyY, 100, 150);
 
  bodyY += bodyDirY;
  if (bodyY >= 300 || bodyY <= 100) {
    bodyDirY *= -1;
  }
 
 
  fill(255, 220, 0);
  triangle(215, 335, 230, 300, 245, 335);
  triangle(255, 335, 270, 300, 285, 335);
 
  
  fill(255, 220, 0);
  circle(circleX, circleY, 50);
 
  circleX += circleDirX;
  circleY += circleDirY;
  if (circleX >= 460 || circleX <= 40)  circleDirX *= -1;
  if (circleY >= 560 || circleY <= 40)  circleDirY *= -1;
 
  
  fill(200, 50, 50);
 
 
  rect(300, 195, 50, 10);
 
  
  rect(leftArmX, 195, 50, 10);
  leftArmX += leftArmDirX;
  if (leftArmX >= 200 || leftArmX <= 80) {
    leftArmDirX *= -1;
  }
 
  
  fill(50, 50, 50);
  rect(200, legsY, 10, 50);
  rect(290, legsY, 10, 50);
 
  legsY += legsDirY;
  if (legsY >= 420 || legsY <= 300) {
    legsDirY *= -1;
  }
 
  
  noStroke();
  fill(255);
  textSize(22);
  text("Vinny Shull", 270, 500);
}
