function Mouse(xpos, ypos, mapwidth, mapheight, zoom) {
	this.xpos = xpos;
	this.ypos = ypos;
	this.mapwidth = mapwidth;
	this.mapheight = mapheight;
	this.zoom = zoom;
	
	var lon;
	var lat;
	
	
	//Transform x,y to lon, lat
	this.coord2lonlat = function(xpos, ypos) {		
		//Compute lon, lat with inverse Web Mercator
		var zoomConst = this.mapwidth / pow(2, this.zoom+1);
		lon = (xpos/(pow(2, this.zoom)*zoomConst) - 1)*180;
		
		var temp = PI*(1 - ypos/(pow(2, this.zoom)*zoomConst));
		temp = exp(temp) * 180 / PI;
		temp = atan(temp);
		lat = 2*(180 / PI)*(temp - PI / 4);
		
		// print(xpos,ypos);
		
		return [lon, lat];
	}
	
}