(function(exports){

// Singleton Class
exports.Grid = {};

// Initialize
Grid.initialize = function(){

	// Grid size
	var WIDTH = Model.data.world.size.width;
	var HEIGHT = Model.data.world.size.height;

	// Make the 2D array
	var agents = [];
	Grid.array = [];
	for(var y=0;y<HEIGHT;y++){
		Grid.array.push([]);
		for(var x=0;x<WIDTH;x++){
			var agent = new Agent(x,y);
			agents.push(agent);
			Grid.array[y].push(agent);
		}
	}

	// Randomly set agent states based on proportion.
	for(var i=0;i<agents.length;i++){
		agents[i].forceState(_getProportionalRandom());
	}

};
var _getProportionalRandom = function(){

	var proportions = Model.data.world.proportions;

	// Get total
	var total = 0;
	for(var i=0;i<proportions.length;i++){
		total += proportions[i].parts;
	}

	// Get a random number from that, like a dart
	var random = Math.random()*total;

	// Return the state that dart hit
	var current = 0;
	for(var i=0;i<proportions.length;i++){

		// Add to current
		var proportion = proportions[i];
		current += proportion.parts;

		// If so, good! return this stateID
		if(random<current){
			return proportion.stateID;
		}
		
	}

	// Whoops
	console.error("Something messed up in the random state selector");

}

// Simultaneous Step
Grid.step = function(){

	// Update style
	var UPDATE = Model.data.world.update;

	// Shuffle update order, then do 'em all
	var all = _shuffle(Grid.getAllAgents());
	for(var i=0;i<all.length;i++) all[i].markAsNotUpdated();
	for(var i=0;i<all.length;i++) all[i].calculateNextState();
	for(var i=0;i<all.length;i++) all[i].gotoNextState();

};

var _shuffle = function(array){
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Remove agents?
subscribe("/ui/updateStateHeaders",function(){
	for(var y=0;y<Grid.array.length;y++){
		for(var x=0;x<Grid.array[0].length;x++){
			var agent = Grid.array[y][x];
			if(!Model.getStateFromID(agent.stateID)){
				agent.forceState(0); // state's gone, force delete it.
			}
		}
	}
	publish("/grid/updateAgents");
});

// Render the Emoji
Grid.dom = document.getElementById("grid");
Grid.domContainer = document.getElementById("grid_container");
Grid.css = document.getElementById("grid_style");
Grid.tileSize = 1;
Grid.updateSize = function(){

	// DIMENSIONS
	var maxWidth = Grid.domContainer.clientWidth; //-20;
	var maxHeight = Grid.domContainer.clientHeight; //-20;
	var w = Grid.array[0].length;
	var h = Grid.array.length;
	var t = Math.min(Math.floor(maxWidth/w), Math.floor(maxHeight/h));
	Grid.tileSize = t;

	// STYLE
	var css = "";
	css += "#grid{ width:"+(w*t)+"px; height:"+(h*t)+"px; font-size:"+t+"px; }\n";
	css += "#grid>div{ width:"+(w*t)+"px; height:"+t+"px; }\n";
	css += "#grid>div>div{ width:"+t+"px; height:"+t+"px; }\n";
	Grid.css.innerHTML = css;

};
window.addEventListener("resize",Grid.updateSize,false);
subscribe("/grid/updateSize",Grid.updateSize,false);
Grid.updateAgents = function(){

	// HTML - TODO: Update only if update/edit cell
	var html = "";
	for(var y=0;y<Grid.array.length;y++){
		html += "<div>";
		for(var x=0;x<Grid.array[0].length;x++){
			var agent = Grid.array[y][x];
			var icon = Model.getStateFromID(agent.stateID).icon;
			html += "<div>"+icon+"</div>";
		}
		html += "</div>";
	}

	Grid.dom.innerHTML = html;

};
subscribe("/grid/updateAgents",Grid.updateAgents);

/////////////////////////////
// External Helper Methods //
/////////////////////////////

Grid.NEIGHBORHOOD_MOORE = "moore";
Grid.NEIGHBORHOOD_NEUMANN = "neumann";
Grid.getNeighbors = function(agent){

	// Oh WOW Polygon's get-neighbor code was O(n^2) what the FU--

	// First, create all possible neighbor coords
	var x = agent.x;
	var y = agent.y;

	// What kinda neighborhood
	var coords;
	var hood = Model.data.world.neighborhood;
	if(hood==Grid.NEIGHBORHOOD_MOORE){
		coords = [
			[x-1,y-1], [x,  y-1], [x+1,y-1],
			[x-1,y  ],            [x+1,y  ],
			[x-1,y+1], [x,  y+1], [x+1,y+1],
		];
	}else if(hood==Grid.NEIGHBORHOOD_NEUMANN){
		coords = [
			[x,y-1], [x-1,y], [x+1,y], [x,y+1],
		];
	}

	// Then, filter out ones that can't work
	coords = coords.filter(function(coord){
		var x = coord[0];
		var y = coord[1];
		if(x<0) return false;
		if(x>=Grid.array[0].length) return false;
		if(y<0) return false;
		if(y>=Grid.array.length) return false;
		return true;
	});

	// Then, get all neighbors at those coords
	var neighbors = [];
	for(var i=0;i<coords.length;i++){
		var x = coords[i][0];
		var y = coords[i][1];
		neighbors.push(Grid.array[y][x]);
	}

	// Return!
	return neighbors;

};

// Get ALL agents (just collapses to a single array)
Grid.getAllAgents = function(){

	// Then, get all neighbors at those coords
	var agents = [];
	for(var y=0;y<Grid.array.length;y++){
		for(var x=0;x<Grid.array[0].length;x++){
			agents.push(Grid.array[y][x]);
		}
	}

	// Return!
	return agents;

};

// Count neighbors of a certain state
Grid.countNeighbors = function(agent,stateID){
	var count = 0;
	var neighbors = Grid.getNeighbors(agent);
	for(var i=0;i<neighbors.length;i++){
		if(neighbors[i].stateID==stateID) count++;
	}
	return count;
};

// Reset world, update the view, and resize to fit
Grid.reinitialize = function(){
	Grid.initialize();
	publish("/grid/updateAgents");
	publish("/grid/updateSize");
};
subscribe("/grid/reinitialize",Grid.reinitialize,false);

///////////////////////////
// Editor UI Shenanigans //
///////////////////////////

Grid.createUI = function(){

	var config = Model.data.world;

	// Create DOM
	var span = document.createElement("span");

	// A X x Y world...
	span.appendChild(Editor.createLabel("This world is a "));
	span.appendChild(Editor.createNumber(config.size, "width", {integer:true, message:"/grid/reinitialize"}));
	span.appendChild(Editor.createLabel(" by "));
	span.appendChild(Editor.createNumber(config.size, "height", {integer:true, message:"/grid/reinitialize"}));
	span.appendChild(Editor.createLabel(" grid."));
	span.appendChild(Editor.createLabel("<br><br>"));

	// Starting with this ratio of agents:
	span.appendChild(Editor.createLabel("We start with this ratio of agents:<br>"));
	span.appendChild(Editor.createProportions(config, "proportions"));
	span.appendChild(Editor.createLabel("<br>"));

	// And each agent considers
	// (the 4 agents to its sides|the 8 agents to its sides & diagonals)
	// to be its neighbors
	span.appendChild(Editor.createLabel("And each agent considers "));
	var wideSelector = Editor.createSelector([
		{ name:"the 4 agents to its sides", value:Grid.NEIGHBORHOOD_NEUMANN },
		{ name:"the 8 agents to its sides & corners", value:Grid.NEIGHBORHOOD_MOORE }
	],config,"neighborhood");
	wideSelector.style.maxWidth = "none";
	span.appendChild(wideSelector);
	span.appendChild(Editor.createLabel(" to be its neighbors."));

	// Return DOM
	return span;

};

})(window);