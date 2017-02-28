/*	
	Maps real-time earthquake data on the world map
*/

//Set global variables
var mapImg;
var data_csv;
var api_url = "https://api.mapbox.com";
var style_url = "/styles/v1/mapbox/light-v9/static/";
var access_token = "?access_token=pk.eyJ1Ijoiam5hdXRhIiwiYSI6ImNpenBvbW0xYTAwMG0zMnVxcTE0b2ZrcmQifQ.2bnF02OryS-cj0JF5KnoGw"

/*	Mapbox style:
	/styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}{auto}/{width}x{height}{@2x}
*/

//Preload the map upon which to draw
function preload() {
	function specifics() {
		this.lon = 0;
		this.lat = 0;
		this.zoom = 1;
		this.windowWidth = min(windowWidth, 1280);
		this.windowHeight = min(windowHeight, 1280);
		this.canvasSize = String(this.windowWidth) + "x" + String(this.windowHeight);
		return String(this.lon+","+this.lat+","+this.zoom+"/"+this.canvasSize)
	}
	var specificString = specifics();

	var mapImg_call = api_url+style_url+specificString+access_token;
	mapImg = loadImage(mapImg_call);
}

function setup() {
	//Create canvas to draw on
	createCanvas(windowWidth, windowHeight);
	//Display static image background
	image(mapImg, 0, 0);
}

function getAPI_data(data) {

}