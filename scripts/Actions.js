/***

Agent actions! They're basically short code statements.
Actions can include other actions, like “if condition then [Other Action]”
They're also meant to be easily serializeable into JSON, like so:

states: [
	{
		id: UID_0,
		icon: " ",
		name: "empty",
		actions: []
	},
	{
		id: UID_1
		icon: "💩",
		name: "poo",
		actions:[
			{
				type: "if_neighbor",
				sign: "equal"
				num: 2,
				state: UID_1
				actions:[
					{
						type:"go_to_state",
						state: UID_0
					}
				]
			}
		]
	}
]

This translates to a 💩 state, with the action that
if exactly two of its neighbors are 💩's, it'll become empty.

This should also make it easier to make a human-facing UI for.
Probably.

***/

(function(exports){

exports.Actions = {};

// Perform Actions. Recursive.
Actions.perform = function(agent, actionConfigs){
	for(var i=0;i<actionConfigs.length;i++){
		var config = actionConfigs[i];
		var action = Actions[config.type];
		action.step(agent,config);
	}
};

// GO_TO_STATE: Simply go to that state
Actions.go_to_state = {
	step: function(agent,config){
		agent.nextStateID = config.stateID;
	}
};

// IF_NEIGHBOR: If more/less/equal X neighbors are a certain state, do a thing
Actions.if_neighbor = {
	step: function(agent,config){

		// First, get num of actual neighbors that are STATE
		var count = Grid.countNeighbors(agent, config.stateID);

		// Did condition pass?
		var pass;
		switch(config.sign){
			case "less":
				pass = (count<=config.num);
				break;
			case "more":
				pass = (count>=config.num);
				break;
			case "equal":
				pass = (count==config.num);
				break;
		}

		// If so, perform the following actions.
		if(pass){
			Actions.perform(agent, config.actions);
		}

	}
};

// IF_RANDOM: With a X% chance, do a thing
Actions.if_random = {
	step: function(agent,config){

		// If dice roll wins, perform the following actions.
		if(Math.random()<config.probability){
			Actions.perform(agent, config.actions);
		}

	}
};

})(window);
