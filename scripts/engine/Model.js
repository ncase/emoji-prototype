/**********************

All agents, objects and such should be shallow shells.
That is, this ONE JSON file should control ALL the behavior.
This way, it's really easy to change it at runtime,
as well as serialize & deserialize.

***********************/

(function(exports){

	// Singleton
	window.Model = {};

	// Data
	Model.data = {};

	// Init
	Model.init = function(data){
		Model.data = data;

		// Initialize crap
		Grid.initialize();
		Editor.create(Model.data);

		// Update the emoji
		publish("/grid/updateSize");
		setInterval(function(){
			Grid.step();
			publish("/grid/updateAgents");
		},100);
		
	};

	// Helper Functions
	Model.getStateFromID = function(id){
		for(var i=0;i<Model.data.states.length;i++){
			var state = Model.data.states[i];
			if(state.id==id) return state;
		}
		return null;
	};
	Model.removeStateByID = function(id){
		for(var i=0;i<Model.data.states.length;i++){
			var state = Model.data.states[i];
			if(state.id==id){
				Model.data.states.splice(i,1);
				return;
			}
		}
	};
	Model.generateNewID = function(){
		var highestID = -1;
		for(var i=0;i<Model.data.states.length;i++){
			var state = Model.data.states[i];
			if(highestID < state.id){
				highestID = state.id;
			}
		}
		return highestID+1;
	};

})(window);