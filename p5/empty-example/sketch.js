function setup() {
	createCanvas(200,200);
	background(51);
}

// function mousePressed() {
// 	fill(0);
// 	ellipse(0,0, 100, 100);
// 	return false;
// }


function draw() {
  if (mouseIsPressed)
    ellipse(50, 50, 50, 50);
  else
    rect(25, 25, 50, 50);

  print(mouseIsPressed);
}