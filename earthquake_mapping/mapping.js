//Transforms longitude and latitude to 2D plane using the Web Mercator projection

function mapping(lon, lat, mapwidth, mapheight, zoom, magn) {
	//Set up constructor
	this.lon = lon;
	this.lat = lat;
	this.zoom = zoom;
	this.mapwidth = mapwidth;
	this.mapheight = mapheight;
	this.magn = magn;

	this.sign = function(x) {
		return x/abs(x)
	}

	//Displays earthquake at position with certain size
	this.show = function() {
		var size = this.scale_magn();
		stroke(51, 51, 51, 100);
		fill(131, 0, 51);
		ellipse(this.xcoord, this.ycoord, size, size);
	}

	//Scales size of circle w.r.t. magnitude
	this.scale_magn = function() {
		this.magn = pow(10, this.magn/2);
		var maxmagn = pow(10,4);
		var scale = map(this.magn, 0, maxmagn, 0, 180);
		return scale
	}

	//Transforms Richter scale to radius
	this.eq_richter = function(value) {
		var temp;
	}

	//Transforms lon and lat values to 2D plane
	this.mercator = function(clon, clat) {
		var clon = radians(clon);
		var clat = radians(clat);	
		var rad_lon = radians(this.lon);
		var rad_lat = radians(this.lat);
		// print(rad_lon, rad_lat);

		//Use Web Mercator map equations to get x,y
		function mercator_map(lon, lat, mapwidth, zoom) {
			var zoomConst = mapwidth / pow(2, zoom+1);
			var prefix = (zoomConst / PI) * pow(2, zoom);
			var tanpart = tan(PI/4 + lat/2);
			var logpart = log(tanpart);
			var tempx = prefix*(PI + lon);
			var tempy = prefix*(PI - logpart);	
			return [tempx, tempy];
		}

		//Centre to used origin
		coord = mercator_map(rad_lon, rad_lat, this.mapwidth, this.zoom);
		centre_coord = mercator_map(clon, clat, this.mapwidth, this.zoom);
		this.xcoord = coord[0] - centre_coord[0];
		this.ycoord = coord[1] - centre_coord[1];
		//Rescale if out of bounds
		if (abs(this.xcoord) > 0.5*this.mapwidth) {
			this.xcoord = this.xcoord - this.sign(this.xcoord)*this.mapwidth;
		}
		if (abs(this.ycoord) > 0.5*this.mapheight) {
			this.ycoord = this.ycoord - this.sign(this.ycoord)*this.mapheight;
		}
		return [this.xcoord, this.ycoord]		
	}
}