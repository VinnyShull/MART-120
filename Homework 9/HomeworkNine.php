function setup()
{
    createCanvas(500, 600);
}

function draw()
{
    background(30, 90, 140);

    textSize(22);
    fill(255);
    text("Hello there!", 10, 80);

    // head
    fill(255, 180, 180);
    noStroke();
    circle(250,100,175);
   
    // eyes (now actual circles)
    fill(0);
    circle(200,75,15);
    circle(285,75,15);

    // nose
    circle(245,90,8);
    
    // mouth
    noFill();
    stroke(0);
    ellipse(245, 135, 40, 25);

    // body
    noStroke();
    fill(200, 50, 50);
    rect(200,185,100,150);
    
    // circle on shirt (instead of triangle)
    fill(255, 220, 0);
    circle(250,270,50);

    // arms
    fill(200, 50, 50);
    rect(300,195,50,10);
    rect(150,195,50,10);

    // legs
    fill(50, 50, 50);
    rect(200,335,10,50);
    rect(290,335,10,50);
    
    // name text
    fill(255);
    textSize(22);
    text("Vinny Shull", 270, 500);
}