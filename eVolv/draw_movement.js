/* Draws amoebic-like movement */
function draw_movement(rOut, rWidth, nPoints, iCoord) {
	// Set up constructor
	this.rOut = rOut;
	this.rWidth = rWidth;
	this.nPoints = nPoints;
	this.iCoord = iCoord;
	var rIn = rOut-rWidth;
	var inOffset = 0.01;
	var smoothness = 0.1;

	// Set up drawing
	var deg = 0;
	var nAmoebic = 5;
	var pointArr = [];
	var circArr = [];
	this.setup = function() {
		for (var n=0; n < this.nPoints; n++) {
			pointArr.push(2*PI*n/this.nPoints);
			circArr.push(nAmoebic*2*PI*n/nPoints);
		}
	}

	// Draw outer shape
	this.draw = function(w, t) {
		push();
		translate(this.iCoord[0], this.iCoord[1]);
		beginShape();
		for (var i=0; i<nPoints; i++) {
			deg = pointArr[i];
			var r = rOut - smoothness*this.rOut*sin(w*t + circArr[i]);
			var x = r*cos(deg);
			var y = r*sin(deg);
			vertex(x, y);
		}
		endShape(CLOSE);
		beginShape();
		for (var i=0; i<nPoints; i++) {
			deg = pointArr[i];
			var r = rIn - smoothness*rIn*sin((w+inOffset)*t + circArr[i]);
			var x = r*cos(deg);
			var y = r*sin(deg);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}
}	