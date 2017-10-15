//Constructor function for creation, addition and movement of branches
function branch(begin, end, angle, multfactor) {
	this.begin = begin;
	this.end = end;
	this.angle = angle;
	this.multfactor = multfactor+random(-0.03,0.03);
	this.leafs = false;
	this.finished = false;

	//Draw the branch
	this.show = function(thickness) {		
		stroke(139,69,19);			//Brown color code
		strokeWeight(thickness);	//The smaller the branch, the thinner
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	//Add new branch
	this.next_branch = function(ind) {
		var dir = p5.Vector.sub(this.end, this.begin);
		this.angle = pow(-1, ind)*angle*random(0.9,1.1);
		dir.rotate(this.angle);
		newBranchEnd = p5.Vector.add(this.end, dir.mult(this.multfactor));
		newBranch = new branch(this.end, newBranchEnd, this.angle, this.multfactor);
		return newBranch;
	}

	//Add leaves
	this.add_leaves = function(){
		fill(153, 77, 150);
		stroke(153, 0, 0);
		ellipse(this.end.x, this.end.y, 5, 10);
		ellipse(this.end.x, this.end.y, 10, 5);
	}

	//Applies force to branches
	this.apply_force = function(force){
		// var len = this.end.dist(this.begin);
		// this.end.x += force
		// print(this.end.x-this.begin.x);
		// print(len*len, (this.end.x-this.begin.x)*(this.end.x-this.begin.x));
		// this.end.x += force;
		// print(len*len, (this.end.x-this.begin.x)*(this.end.x-this.begin.x));
		// print(this.begin.y - Math.sqrt(pow(len,2) - pow(this.end.x-this.begin.x,2)))
		// this.end.y = this.begin.y - Math.sqrt(pow(len,2) - pow(this.end.x-this.begin.x,2));

		// print(len, this.end.dist(this.begin));
	}
}