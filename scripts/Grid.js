(function(exports){

// Singleton Class
exports.Grid = {};

// Create 25x25 array
Grid.SIZE = 20;

// Initialize
Grid.initialize = function(){
	Grid.array = [];
	for(var y=0;y<Grid.SIZE;y++){
		Grid.array.push([]);
		for(var x=0;x<Grid.SIZE;x++){
			Grid.array[y].push(new Agent(x,y));
		}
	}
};

// Simultaneous Step
Grid.step = function(){

	// Calculate next state
	for(var y=0;y<Grid.SIZE;y++){
		for(var x=0;x<Grid.SIZE;x++){
			Grid.array[y][x].calculateNextState();
		}
	}

	// Then go to it
	for(var y=0;y<Grid.SIZE;y++){
		for(var x=0;x<Grid.SIZE;x++){
			Grid.array[y][x].gotoNextState();
		}
	}

	// Then render, yo.
	Grid.render();

};

// Render the Emoji
Grid.dom = document.getElementById("grid")
Grid.render = function(){

	var html = "";
	for(var y=0;y<Grid.SIZE;y++){
		html += "<div>";
		for(var x=0;x<Grid.SIZE;x++){
			var agent = Grid.array[y][x];
			html += "<div>"+agent.icon+"</div>";
		}
		html += "</div>";
	}

	Grid.dom.innerHTML = html;

};

/////////////////////////////
// External Helper Methods //
/////////////////////////////

Grid.getNeighbors = function(agent){

	// Oh WOW Polygon's get-neighbor code was O(n^2) what the FU--

	// First, create all possible neighbor coords
	var x = agent.x;
	var y = agent.y;
	var coords = [
		[x-1,y-1], [x,  y-1], [x+1,y-1],
		[x-1,y  ],            [x+1,y  ],
		[x-1,y+1], [x,  y+1], [x+1,y+1],
	];

	// Then, filter out ones that can't work
	coords = coords.filter(function(coord){
		var x = coord[0];
		var y = coord[1];
		if(x<0) return false;
		if(x>=Grid.SIZE) return false;
		if(y<0) return false;
		if(y>=Grid.SIZE) return false;
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

Grid.countNeighbors = function(agent,state){
	var count = 0;
	var neighbors = Grid.getNeighbors(agent);
	for(var i=0;i<neighbors.length;i++){
		if(neighbors[i].state==state) count++;
	}
	return count;
};

Grid.anyNeighbors = function(agent,state){
	var neighbors = Grid.getNeighbors(agent);
	for(var i=0;i<neighbors.length;i++){
		if(neighbors[i].state==state) return true;
	}
	return false;
};

})(window);