function setup() {
  createCanvas(480, 540);
  // Set the background to transparent
  background(0, 0, 0, 1);
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw() {
  // Calculate the radius of the octagon
  let r = 200;

  // Set the fill color of the octagon and the small blue circles to white
  fill(255);

  // Set the outline color of the octagon to black
  stroke(0);

  // Set the outline thickness of the octagon to 2 pixels
  strokeWeight(2);

  // Set the fill color of the ground to white
  fill(255);

  // Translate the coordinate system to a position that is slightly offset from the center of the canvas
  translate(250, 250);

  // Rotate the coordinate system by pi/8
  rotate(PI / 8);

  // Draw the octagon
  polygon(0, 0, r, 8);

  // Iterate over the eight sides of the octagon
  for (let i = 0; i < 8; i++) {
    // Set the fill color of the small blue circles to blue
    fill(0, 0, 255);
    stroke(0, 0, 255);

    // Calculate the x and y coordinates of each side
    let x = r * cos(i * TWO_PI / 8);
    let y = r * sin(i * TWO_PI / 8);

    // Draw a small blue circle at each of these coordinates
    strokeWeight(0);
    ellipse(x, y, 40, 40);
  }
}
