(function(exports){

// Singleton Class
exports.Grid = {};

// Create 20x20 array
Grid.WIDTH = 20;
Grid.HEIGHT = 20;

// Initialize
Grid.initialize = function(){
	Grid.array = [];
	for(var y=0;y<Grid.HEIGHT;y++){
		Grid.array.push([]);
		for(var x=0;x<Grid.WIDTH;x++){
			Grid.array[y].push(new Agent(x,y));
		}
	}
};

// Simultaneous Step
Grid.step = function(){

	// Calculate next state
	for(var y=0;y<Grid.array.length;y++){
		for(var x=0;x<Grid.array[0].length;x++){
			Grid.array[y][x].calculateNextState();
		}
	}

	// Then go to it
	for(var y=0;y<Grid.array.length;y++){
		for(var x=0;x<Grid.array[0].length;x++){
			Grid.array[y][x].gotoNextState();
		}
	}

	// Then render, yo.
	Grid.render();

};

// Render the Emoji
Grid.dom = document.getElementById("grid");
Grid.domContainer = document.getElementById("grid_container");
Grid.css = document.getElementById("grid_style");
Grid.render = function(){

	// DIMENSIONS
	var maxWidth = Grid.domContainer.clientWidth-20;
	var maxHeight = Grid.domContainer.clientHeight-20;
	var w = Grid.array[0].length;
	var h = Grid.array.length;
	var t = Math.min(Math.floor(maxWidth/w), Math.floor(maxHeight/h));

	// STYLE - TODO: Update only if resize.
	var css = "";
	css += "#grid{ width:"+(w*t)+"px; height:"+(h*t)+"px; font-size:"+t+"px; }\n";
	css += "#grid>div{ width:"+(w*t)+"px; height:"+t+"px; }\n";
	css += "#grid>div>div{ width:"+t+"px; height:"+t+"px; }\n";
	Grid.css.innerHTML = css;

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

Grid.countNeighbors = function(agent,stateID){
	var count = 0;
	var neighbors = Grid.getNeighbors(agent);
	for(var i=0;i<neighbors.length;i++){
		if(neighbors[i].stateID==stateID) count++;
	}
	return count;
};


})(window);