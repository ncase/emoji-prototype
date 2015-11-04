/***

Agent actions! They're basically short code statements.
Actions can include other actions, like “if condition then [Other Action]”
Also it uses an external JSON object, so it's easier to make
a realtime for-human-consumption UI.

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
			Actions.perform(agent, config.actions);
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
		span.appendChild(
			Editor.createLabel(" "+config.num+" neighbors are ")
		);

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
	step: function(agent,config){

		// If dice roll wins, perform the following actions.
		if(Math.random()<config.probability){
			Actions.perform(agent, config.actions);
		}

	},
	ui: function(config){

		// Create DOM
		var span = document.createElement("span");

		// Fill in DOM
		var html = "With a ";
		html += (config.probability*100)+"% chance,";
		span.innerHTML = html;

		// And then, add actions
		var actionsDOM = Editor.createActionsUI(config.actions);
		span.appendChild(actionsDOM);
		
		// Return DOM
		return span;

	}
};

})(window);
