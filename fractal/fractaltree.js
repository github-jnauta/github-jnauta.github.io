//Generates fractal tree with physics

var tree = [];					//Array which will hold all branches and thus is the tree
var thickness = [];				//Array which will hold thickness of the branches
var leaves = [];				//Array which will hold all leaf particles
var angle = Math.PI / 4;		//Angle at which branches will branch out
var gravity;
var force;

var multfactor = 2/3;
var nLevels = 7;				//Number of levels

//Setup the canvas and the tree
function setup () {
	createCanvas(windowWidth, windowHeight);

	var rootSize = windowHeight/3;

	//Define the root and initialize tree
	var begin = createVector(width/2, height);		
	var end = createVector(width/2, height - rootSize);
	var root = new branch(begin, end, angle, multfactor);
	tree[0] = root;
	thickness[0] = nLevels;

	//Add branches
	var difference = 1;	//Initialize the iterator
	for (var n = 0; n<nLevels; n++){
		if (n === nLevels-1){
			var nakedBranches = tree.length;		//Leafs should be drawn at last tree element
		}
		for (var t = (tree.length-1); t>=0; t--) {
			//Add branches if there are no 2 branches yet
			if(!tree[t].finished){
				
				tree.push(tree[t].next_branch(1));
				thickness.push(nLevels-n);
				tree.push(tree[t].next_branch(2));
				thickness.push(nLevels-n);
				tree[t].finished = true;			//Tell loop that there are 2 branches				
			}
		}
}
	//Add leaves at last branches
	print(tree.length, tree.length-nakedBranches);
	for (t = tree.length-1; t>(tree.length-nakedBranches-2); t--) {
		tree[t].leafs = true;
	}


	//Add falling leaves
	gravity = createVector(0,0.0002);		//Gravitational force that points downward
	var leaf = new particle(gravity);
	leaves[0] = leaf;
}

//Draw the tree
function draw () {
	// noLoop()
	background(46,139,87);	

	//Set `wind'-force
	force = 0;

	//Draw tree and leaves
	for (var i = 0; i<tree.length; i++) {		
		tree[i].apply_force(force);
		tree[i].show(thickness[i], i);
		if (tree[i].leafs) {
			tree[i].add_leaves();
		}
	}

	//Create new leaves
	if (random(0,1) < 0.05){
		leaves.push(new particle(gravity));
		//Assign amplitude, phase and frequency at creation
		leaves[(leaves.length-1)].freq = random(0.005,0.1);
		leaves[(leaves.length-1)].ampl = random(0, 6);
		leaves[(leaves.length-1)].phase = random(0,1);
	}

	//Draw the leaves if they are within bounds
	for (var ileaf = 0; ileaf<leaves.length; ileaf++){
		leaves[ileaf].apply_force(gravity.add(force), frameCount);
		if (leaves[ileaf].remove()) {
			leaves.splice(ileaf, 1);
		}
		if (leaves.length > 0){
			leaves[ileaf].show();
		}
	}
}