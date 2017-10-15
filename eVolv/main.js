/*
	Displays amoeba-like creature that wobbles randomly
*/

/* Initialize & allocate */
const rOut = 75;
const rIn = 50;
const rDif = rOut - rIn;
const nPoints = 100;
const fps = 30;
const T = 5*60;
const nAmoebas = 4;
var amoeba = [];
var initCentres = [];

/* Initizalize the system */
function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(fps);
	/* Create amoeba object and call setup */
	for (var n=0; n<nAmoebas; n++) {
		iCoord = [random(rOut, windowWidth-rOut), random(rOut, windowHeight-rOut)];
		amoeba.push(new draw_movement(rOut, rDif, nPoints, iCoord));
		amoeba[n].setup();
	}
}

/* Draw the amoeba(s) */
f = fps/T;			// Compute frequency
var t = 0;
function draw(){
	//noLoop();
	background(255);	
	
	for (var n=0; n<nAmoebas; n++){
		amoeba[n].draw(f, t);
	}
	t = (t+1)%(T*fps);
}