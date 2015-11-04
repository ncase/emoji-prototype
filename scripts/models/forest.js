

////////////////////////
// FOREST FIRE STATES //
////////////////////////

Agent.states = {

	// Empty
	empty: {
		icon: "",
		step: function(agent){
			if(Math.random()<Model.GROWTH_RATE){
				agent.goto("tree");
			}
		}
	},

	// Tree
	tree: {
		icon: "🌲",
		step: function(agent){
			if(Math.random()<Model.LIGHTNING_RATE){
				agent.goto("lightning");
			}else if(Grid.anyNeighbors(agent,"fire")){
				agent.goto("fire");
			}
		}
	},

	// Lightning
	lightning: {
		icon: "⚡️",
		step: function(agent){
			agent.goto("fire");
		}
	},

	// Fire
	fire: {
		icon: "🔥",
		step: function(agent){
			agent.goto("empty");
		}
	}

};

/////////////////
// CREATE GRID //
/////////////////

Grid.initialize();

Model.GROWTH_RATE = 0.02;
Model.LIGHTNING_RATE = 0.0005;

setInterval(function(){
	Grid.step();
},100);
