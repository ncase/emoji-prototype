/***

Agent actions! They're basically short code statements.
Actions can include other actions, like “if condition then [Other Action]”
Also it uses an external JSON object, so it's easier to make
a realtime for-human-consumption UI.

***/

(function(exports){

exports.Actions = {};

// Perform Actions. Recursive.
exports.PerformActions = function(agent, actionConfigs){
	
	// To tell if the agent's switched states.
	// As soon as it does that, STOP DOING ACTIONS
	var initialNextState = agent.nextStateID;

	// Go through all actions until it switches states.
	for(var i=0;i<actionConfigs.length;i++){
		var config = actionConfigs[i];
		var action = Actions[config.type];
		action.step(agent,config);
		if(agent.nextStateID!=initialNextState) return;
	}
	
};

// GO_TO_STATE: Simply go to that state
Actions.go_to_state = {
	
	name: "Turn into...",

	props: {stateID:0},
	
	step: function(agent,config){
		agent.nextStateID = config.stateID;
	},

	ui: function(config){

		// Create DOM
		var span = document.createElement("span");

		// Label
		span.appendChild(Editor.createLabel("Turn into "));

		// State selector
		var select = Editor.createStateSelector(config, "stateID");
		span.appendChild(select);

		// Return DOM
		return span;

	}

};

// IF_NEIGHBOR: If more/less/equal X neighbors are a certain state, do a thing
Actions.if_neighbor = {
	
	name: "If certain number of certain neighbors...",

	props: {
		sign: ">=",
		num: 3,
		stateID: 0,
		actions:[]
	},

	step: function(agent,config){

		// First, get num of actual neighbors that are STATE
		var count = Grid.countNeighbors(agent, config.stateID);

		// Did condition pass?
		var pass;
		switch(config.sign){
			case "<":
				pass = (count<config.num);
				break;
			case "<=":
				pass = (count<=config.num);
				break;
			case ">":
				pass = (count>config.num);
				break
			case ">=":
				pass = (count>=config.num);
				break;
			case "=":
				pass = (count==config.num);
				break;
		}

		// If so, perform the following actions.
		if(pass){
			PerformActions(agent, config.actions);
		}

	},

	ui: function(config){

		// Create DOM
		var span = document.createElement("span");

		// Label
		span.appendChild(Editor.createLabel("If "));

		// Sign Selector
		span.appendChild(
			Editor.createSelector([
				{ name:"less than (<)", value:"<" },
				{ name:"up to (<=)", value:"<=" },
				{ name:"more than (>)", value:">" },
				{ name:"at least (>=)", value:">=" },
				{ name:"exactly (=)", value:"=" }
			],config,"sign")
		);

		// Label
		span.appendChild(Editor.createLabel(" "));

		// Number
		span.appendChild(
			Editor.createNumber(config, "num", {integer:true})
		);

		// Label
		span.appendChild(Editor.createLabel(" neighbors are "));

		// State selector
		var select = Editor.createStateSelector(config, "stateID");
		span.appendChild(select);

		// And then, add actions
		var actionsDOM = Editor.createActionsUI(config.actions);
		span.appendChild(actionsDOM);

		// Return DOM
		return span;

	}

};

// IF_RANDOM: With a X% chance, do a thing
Actions.if_random = {
	
	name: "With a X% chance...",

	props: {
		probability: 0.5,
		actions:[]
	},

	step: function(agent,config){

		// If dice roll wins, perform the following actions.
		if(Math.random()<config.probability){
			PerformActions(agent, config.actions);
		}

	},

	ui: function(config){

		// Create DOM
		var span = document.createElement("span");

		// Label
		span.appendChild(Editor.createLabel("With a "));

		// Number
		span.appendChild(
			Editor.createNumber(config, "probability", {multiplier:100})
		);

		// Label
		span.appendChild(Editor.createLabel("% chance,"));

		// And then, add actions
		var actionsDOM = Editor.createActionsUI(config.actions);
		span.appendChild(actionsDOM);
		
		// Return DOM
		return span;

	}

};

// MOVE_TO: Move to a (nearby|global) (state) spot in and leave behind (state) 
Actions.move_to = {
	
	name: "Move to...",

	props: {
		space: 0,
		spotStateID: 0,
		leaveStateID: 0,
	},

	step: function(agent,config){

		// Get possible spots
		var spots;
		if(config.space==0){ // local
			spots = Grid.getNeighbors(agent);
		}else if(config.space==1){ // global
			spots = Grid.getAllAgents();
		}

		// Filter for only those whose states == spotStateID
		var eligible = spots.filter(function(agent){
			return(agent.stateID==config.spotStateID);
		});

		// If no eligible spots, WELP.
		if(eligible.length==0){
			return;
		}

		// Randomly pick one
		var chosenSpot = eligible[Math.floor(Math.random()*eligible.length)];

		// Force that agent to my state
		chosenSpot.forceState(agent.stateID);

		// Turn my state to leaveState
		agent.nextStateID = config.leaveStateID;

	},

	ui: function(config){

		// Create DOM
		var span = document.createElement("span");

		// Label
		span.appendChild(Editor.createLabel("Move to a "));

		// Sign Selector
		span.appendChild(
			Editor.createSelector([
				{ name:"neighboring", value:0 },
				{ name:"global", value:1 }
			],config,"space")
		);

		// State selector
		span.appendChild(
			Editor.createStateSelector(config, "spotStateID")
		);

		// Label
		span.appendChild(Editor.createLabel(" spot & leave behind "));

		// State selector
		span.appendChild(
			Editor.createStateSelector(config, "leaveStateID")
		);
		
		// Return DOM
		return span;

	}

}; 

})(window);
