function particle(force){
	this.position = createVector(random(width,0));
	this.vel = createVector(0,random(0,1));
	this.acc = createVector(0,0);

	this.freq = 0;
	this.ampl = 0;
	this.phase = 0;	

	//Apply force to the particle
	this.apply_force = function(force, t) {
		this.acc.add(force);
		this.vel.add(this.acc);
		this.position.add(this.vel);
		//Add self-swirling
		this.position.x += this.ampl*sin(this.freq*t + this.phase);

	}

	//Draw the particles
	this.show = function() {
		fill(153, 0, 0);
		stroke(153, 0, 0);
		for (i = 0; i<3; i++) {		
			// push();
			ellipse(this.position.x, this.position.y, 8, 16);
			ellipse(this.position.x, this.position.y, 16, 8);
			// pop();
		}


	}

	//Removes particles which are out of bounds
	this.remove = function() {
		if (this.position.y > height){
			return true;
		}
	}
}