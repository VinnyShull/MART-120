var W = 720, H = 500;
var px, py, pw = 18, ph = 18, pspd = 3.2, php = 5, pmaxhp = 5;
var ifr, sc, over, win;
var bullets, enemies, parts, stars;
var ex = 665, ey, ew = 45, eh = 70;

var TYPES = [
  { r:255, g:68,  b:85,  sz:16, spd:1.2, hp:1, pts:10, lbl:"A" },
  { r:255, g:153, b:0,   sz:22, spd:0.7, hp:3, pts:25, lbl:"B" },
  { r:204, g:68,  b:255, sz:12, spd:2.2, hp:1, pts:15, lbl:"C" },
];

function setup() {
  createCanvas(W, H);
  ey = H/2 - 35;
  reset();
}

function reset() {
  sc = 0; over = false; win = false; ifr = 0;
  bullets = []; enemies = []; parts = [];
  px = 60; py = H/2; php = 5;
  stars = [];
  for (var i = 0; i < 80; i++)
    stars.push({ x:random(W), y:random(H), r:random(0.3,1.8), a:random(50,200) });
  for (var i = 0; i < 8; i++) addEnemy();
}

function addEnemy() {
  var t = TYPES[floor(random(TYPES.length))];
  var side = floor(random(4));
  var x = side==1 ? W+30 : side==3 ? -30 : random(W);
  var y = side==0 ? -30  : side==2 ? H+30 : random(H);
  enemies.push({ x:x, y:y, w:t.sz, h:t.sz, r:t.r, g:t.g, b:t.b, spd:t.spd, hp:t.hp, mhp:t.hp, pts:t.pts, lbl:t.lbl });
}

function addParts(x, y, r, g, b, n, spd) {
  for (var i = 0; i < n; i++) {
    var a = random(TWO_PI), s = random(0.5, spd);
    parts.push({ x:x, y:y, vx:cos(a)*s, vy:sin(a)*s, life:random(30,50), ml:50, r:r, g:g, b:b, sz:random(1,4) });
  }
}

function mousePressed() {
  if (over && win) return;
  if (over || win) { reset(); return; }
  var cx = px+pw/2, cy = py+ph/2;
  var dx = mouseX-cx, dy = mouseY-cy;
  var d = sqrt(dx*dx+dy*dy);
  if (d == 0) return;
  bullets.push({ x:cx, y:cy, vx:dx/d*7, vy:dy/d*7, r:4, life:80, hit:false });
  addParts(cx, cy, 0, 255, 204, 3, 2);
}

function draw() {
  background(8, 8, 16);

  // stars
  noStroke();
  for (var i = 0; i < stars.length; i++) {
    fill(255, 255, 255, stars[i].a);
    ellipse(stars[i].x, stars[i].y, stars[i].r*2);
  }

  // grid
  stroke(0, 255, 204, 10);
  strokeWeight(1);
  for (var gx = 0; gx < W; gx+=40) line(gx,0,gx,H);
  for (var gy = 0; gy < H; gy+=40) line(0,gy,W,gy);

  // exit
  var pulse = 0.6 + 0.4*sin(millis()/200);
  noStroke();
  fill(0, 255, 204, 40*pulse);
  rect(ex, ey, ew, eh);
  stroke(0, 255, 204, 255*pulse);
  strokeWeight(2);
  noFill();
  rect(ex, ey, ew, eh);
  noStroke();
  fill(0, 255, 204);
  textAlign(CENTER);
  textSize(11);
  text("EXIT", ex+ew/2, ey+eh/2+4);
  textAlign(LEFT);

  // particles
  for (var i = parts.length-1; i >= 0; i--) {
    var p = parts[i];
    fill(p.r, p.g, p.b, (p.life/p.ml)*255);
    noStroke();
    ellipse(p.x, p.y, p.sz*2);
    p.x += p.vx; p.y += p.vy; p.life--; p.sz *= 0.95;
    if (p.life <= 0) parts.splice(i, 1);
  }

  // enemies
  noStroke();
  for (var i = 0; i < enemies.length; i++) {
    var e = enemies[i];
    fill(e.r, e.g, e.b);
    textAlign(CENTER);
    textSize(e.w);
    text(e.lbl, e.x, e.y + e.w/3);
    if (e.mhp > 1) {
      var bw = e.w * 1.5;
      fill(50); rect(e.x-bw/2, e.y+e.h/2+4, bw, 4);
      fill(e.r, e.g, e.b); rect(e.x-bw/2, e.y+e.h/2+4, bw*(e.hp/e.mhp), 4);
    }
    textAlign(LEFT);
  }

  // bullets
  fill(0, 255, 204);
  noStroke();
  for (var i = 0; i < bullets.length; i++)
    ellipse(bullets[i].x, bullets[i].y, bullets[i].r*2);

  // player
  if (!(ifr > 0 && floor(ifr/4) % 2 == 0)) {
    fill(0, 255, 204);
    noStroke();
    rect(px, py, pw, ph);
    fill(8, 8, 16);
    textAlign(CENTER);
    textSize(10);
    text("U", px+pw/2, py+ph/2+4);
    textAlign(LEFT);
  }

  // HP bar
  noStroke();
  fill(34); rect(10, H-22, 100, 8);
  if (php > 2) fill(0, 255, 204); else fill(255, 68, 85);
  rect(10, H-22, 100*(php/pmaxhp), 8);
  stroke(68); strokeWeight(1); noFill(); rect(10, H-22, 100, 8);

  // score + controls
  noStroke();
  fill(0, 255, 204);
  textSize(13);
  text("SCORE: " + sc, 10, 20);
  text("HP: " + php, 10, 36);
  fill(100);
  textSize(11);
  text("WASD/ARROWS move | CLICK shoot | reach EXIT to win | click after game over to restart", 10, H-8);

  // game logic
  if (!over && !win) game();

  // overlays
  if (over || win) {
    fill(0, 0, 0, 190);
    noStroke();
    rect(0, 0, W, H);
    if (over) fill(255, 68, 85); else fill(0, 255, 204);
    textAlign(CENTER);
    textSize(48);
    text(over ? "GAME OVER" : "YOU WIN", W/2, H/2-20);
    fill(170);
    textSize(16);
    text("SCORE: " + sc, W/2, H/2+20);
    text("CLICK TO RESTART", W/2, H/2+50);
    textAlign(LEFT);
  }
}

function game() {
  if (keyIsDown(LEFT_ARROW)  || keyIsDown(65)) px -= pspd;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) px += pspd;
  if (keyIsDown(UP_ARROW)    || keyIsDown(87)) py -= pspd;
  if (keyIsDown(DOWN_ARROW)  || keyIsDown(83)) py += pspd;
  px = constrain(px, 0, W-pw);
  py = constrain(py, 0, H-ph);
  if (ifr > 0) ifr--;

  for (var i = bullets.length-1; i >= 0; i--) {
    var b = bullets[i];
    b.x += b.vx; b.y += b.vy; b.life--;
    if (b.hit || b.life<=0 || b.x<0 || b.x>W || b.y<0 || b.y>H)
      bullets.splice(i, 1);
  }

  for (var i = enemies.length-1; i >= 0; i--) {
    var e = enemies[i];
    var dx = px-e.x, dy = py-e.y;
    var d = sqrt(dx*dx + dy*dy);
    if (d > 0) { e.x += dx/d*e.spd; e.y += dy/d*e.spd; }

    for (var j = 0; j < bullets.length; j++) {
      var b = bullets[j];
      if (!b.hit && b.x>e.x-e.w/2 && b.x<e.x+e.w/2 && b.y>e.y-e.h/2 && b.y<e.y+e.h/2) {
        e.hp--; b.hit = true;
        addParts(e.x, e.y, e.r, e.g, e.b, 5, 3);
      }
    }

    var cpx = px+pw/2, cpy = py+ph/2;
    if (ifr==0 && abs(e.x-cpx)<e.w/2+pw/2 && abs(e.y-cpy)<e.h/2+ph/2) {
      php--; ifr = 60;
      addParts(cpx, cpy, 255, 68, 85, 10, 4);
      if (php <= 0) { over = true; return; }
    }

    if (e.hp <= 0) {
      sc += e.pts;
      addParts(e.x, e.y, e.r, e.g, e.b, 12, 4);
      enemies.splice(i, 1);
      setTimeout(addEnemy, 2000);
    }
  }

  var cpx = px+pw/2, cpy = py+ph/2;
  if (cpx>ex && cpx<ex+ew && cpy>ey && cpy<ey+eh) win = true;
}
