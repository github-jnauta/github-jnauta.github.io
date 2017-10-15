/*	
	Maps real-time earthquake data on the world map
*/

//Set global variables
var mousePos;

var mapImg;
var data_csv;
var earthquakes = [];
var api_url = "https://api.mapbox.com";
var style_url = "/styles/v1/mapbox/light-v9/static/";
var access_token = "?access_token=pk.eyJ1Ijoiam5hdXRhIiwiYSI6ImNpenBvbW0xYTAwMG0zMnVxcTE0b2ZrcmQifQ.2bnF02OryS-cj0JF5KnoGw"

/*	Mapbox style:
	/styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}{auto}/{width}x{height}{@2x}
*/
var exampleURL = "https://api.mapbox.com/styles/v1/mapbox/light-v9/static/0,0,1/1161x734?access_token=pk.eyJ1Ijoiam5hdXRhIiwiYSI6ImNpenBvbW0xYTAwMG0zMnVxcTE0b2ZrcmQifQ.2bnF02OryS-cj0JF5KnoGw"

//Set mapbox parameters
var cutoffwidth;
var cutoffheight;
var centre_lon = 0;
var centre_lat = 0;
var zoom = 1;
var canvasSize;

//Preload the map upon which to draw
function preload() {
	//Set API values
	function specifics(clon, clat, zoom) {
		//Set width and height, fixed values for now (1280 is the max that mapbox provides)
		cutoffwidth = 1131;
		cutoffheight = 792;
		// cutoffwidth = min(windowWidth, 1280);
		// cutoffheight = min(windowHeight, 1280);
		canvasSize = String(cutoffwidth) + "x" + String(cutoffheight);
		return String(clon+","+clat+","+zoom+"/"+canvasSize)
	}
	var specificString = specifics(centre_lon, centre_lat, zoom);
	print(specificString);
	var mapImg_call = api_url+style_url+specificString+access_token;
	//Load image
	mapImg = loadImage(mapImg_call);

	//Load earthquakes
	earthquake_csv = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
	// print(earthquake_csv);
}


function setup() {
	//Create canvas to draw on
	createCanvas(cutoffwidth, cutoffheight);
	noLoop();
	translate(width/2, height/2);
	//Display static image background
	imageMode(CENTER);
	image(mapImg, 0, 0);

	//Generate each earthquake as an object
	nEarthquakes = earthquake_csv.length;
	for (var neq = 0; neq < nEarthquakes; neq++) {
		var quake = earthquake_csv[neq].split(/,/);
		var time = quake[0];
		var lat = quake[1];		//Latitude
		var lon = quake[2];		//Longitude
		var magn = quake[4];	//Magnitude
		earthquakes.push(new mapping(lon, lat, cutoffwidth, cutoffheight, 1, magn));
	}

	//Load earthquake data
	for (var ieq = 0; ieq < earthquakes.length; ieq++) {
		earthquakes[ieq].mercator(centre_lon, centre_lat);	
		earthquakes[ieq].show();
	}
}

function getAPI_data(data) {

}

//Set mouse button functions
var clicked = 0;
function mouseDragged() {
	if (clicked === 0) {
		var oldMousePos = [mouseX, mouseY];
	}
	loop();
	mousePos = new Mouse(mouseX, mouseY, width, height, zoom);
	print(mouseX, mouseY);
	print(mousePos.coord2lonlat(mouseX,mouseY));
	
}

//Stop looping when mouse is not pressed
function mouseReleased() {
	// centre_lon = centre_lon - oldMousePos[]
	noLoop();
}

function draw() {	
		
}
	