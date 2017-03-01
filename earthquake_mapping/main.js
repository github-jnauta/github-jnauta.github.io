/*	
	Maps real-time earthquake data on the world map
*/

//Set global variables
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

var cutoffwidth;
var cutoffheight;
var centre_lon;
var centre_lat;

//Preload the map upon which to draw
function preload() {
	//Set API values
	function specifics() {
		centre_lon = 0;
		centre_lat = 0;
		this.zoom = 1;
		//Set width and height, fixed values for now
		cutoffwidth = 1131;
		cutoffheight = 792;
		// cutoffwidth = min(windowWidth, 1280);
		// cutoffheight = min(windowHeight, 1280);
		this.canvasSize = String(cutoffwidth) + "x" + String(cutoffheight);
		return String(centre_lon+","+centre_lat+","+this.zoom+"/"+this.canvasSize)
	}
	var specificString = specifics();
	var mapImg_call = api_url+style_url+specificString+access_token;
	//Load image
	mapImg = loadImage(mapImg_call);

	//Load earthquakes
	earthquake_csv = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
}


function setup() {
	//Create canvas to draw on
	createCanvas(cutoffwidth, cutoffheight);
	translate(width/2, height/2);
	//Display static image background
	imageMode(CENTER);
	image(mapImg, 0, 0);

	//Load city
	// var exampleCity = createVector(-74.0059, 40.7128);
	// earthquakes[0] = new mapping(exampleCity.x, exampleCity.y, cutoffwidth, cutoffheight, 1);

	nEarthquakes = earthquake_csv.length;
	for (var neq = 0; neq < nEarthquakes; neq++) {
		var quake = earthquake_csv[neq].split(/,/);
		var lat = quake[1];		//Latitude
		var lon = quake[2];		//Longitude
		var magn = quake[4];	//Magnitude
		earthquakes.push(new mapping(lon, lat, cutoffwidth, cutoffheight, 1, magn));
	}

	//Load earthquake data
	for (var ieq = 0; ieq < earthquakes.length; ieq++) {
		earthquakes[ieq].mercator();	
		earthquakes[ieq].show();
	}
}

function getAPI_data(data) {

}

function draw() {
	noLoop();
}