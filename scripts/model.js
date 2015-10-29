var Model = {};

////////////////////////
// FOREST FIRE STATES //
////////////////////////

Agent.states = {

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

	// Fire
	fire: {
		icon: "🔥",
		step: function(agent){
			agent.goto("empty");
		}
	},



	// Empty
	empty: {
		icon: "",
		step: function(agent){
			if(Math.random()<Model.GROWTH_RATE){
				agent.goto("tree");
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
