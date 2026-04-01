<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Self Portrait</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
  <style>
    body { margin: 0; display: flex; justify-content: center; background: #1a1a1a; }
  </style>
</head>
<body>
<script>
function setup() {
  createCanvas(420, 620);
  noLoop();
}

function draw() {
  background(245, 235, 210);

  // Title
  fill(40); noStroke(); textAlign(CENTER); textSize(22); textStyle(BOLD);
  text("Self Portrait", 210, 35); textStyle(NORMAL);

  // Hair triangles 
  fill(25, 18, 12);
  triangle(118, 178, 148, 108, 178, 152);
  triangle(242, 152, 272, 108, 302, 178);

  // Hair rect block 
  rect(148, 92, 124, 70);

  // Head 
  fill(210, 168, 125);
  ellipse(210, 195, 145, 158);

  // Ears
  fill(200, 158, 115);
  ellipse(137, 195, 22, 28); ellipse(283, 195, 22, 28);

  // Hair overlap on forehead
  fill(25, 18, 12);
  ellipse(210, 115, 135, 50); rect(150, 103, 120, 36);

  // Eyebrows 
  stroke(25, 18, 12); strokeWeight(3.5);
  line(163, 163, 196, 159);
  line(224, 159, 257, 163);

  // Eyes 
  noStroke(); fill(255);
  ellipse(180, 178, 32, 17); ellipse(240, 178, 32, 17);
  fill(55, 32, 14);
  ellipse(180, 179, 18, 15); ellipse(240, 179, 18, 15);
  fill(10);
  ellipse(180, 179, 9, 9);   ellipse(240, 179, 9, 9);

  // Eye highlights 
  stroke(255); strokeWeight(4);
  point(183, 175); point(243, 175);

  // Nose lines
  stroke(175, 125, 85); strokeWeight(1.8);
  line(210, 190, 202, 210);
  line(210, 190, 218, 210);
  line(197, 213, 223, 213);

  // Mouth
  noStroke(); fill(190, 95, 90);
  ellipse(210, 228, 44, 16);
  fill(210, 168, 125);
  ellipse(210, 222, 42, 12);

  // Neck
  fill(210, 168, 125);
  rect(193, 268, 34, 48);

  // Shoulders 
  fill(60, 95, 160);
  rect(130, 312, 160, 160);

  // Shirt collar triangle 
  fill(245, 235, 210);
  triangle(165, 340, 210, 315, 255, 340);

  // Arms
  stroke(60, 95, 160); strokeWeight(16);
  line(130, 330, 80, 420);
  line(290, 330, 340, 420);

  // Hands
  noStroke(); fill(210, 168, 125);
  ellipse(78, 426, 24, 26); ellipse(342, 426, 24, 26);

  // Legs 
  fill(35, 38, 70);
  rect(158, 470, 36, 110); rect(226, 470, 36, 110);

  // Shoes
  fill(28, 22, 18);
  rect(149, 576, 48, 16, 4); rect(223, 576, 48, 16, 4);

  // Signature
  fill(60); noStroke(); textSize(13); textAlign(RIGHT); textStyle(ITALIC);
  text("VinnyShull", 410, 615);
}
</script>
</body>
</html>