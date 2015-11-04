(function(exports){

// Singleton Class
exports.Editor = {};

// DOM
Editor.dom = document.getElementById("editor");

// Create from model
Editor.create = function(model){

	// Nodes
	var nodes = [];

	// For each state config...
	var stateConfigs = model.states;
	for(var i=0;i<stateConfigs.length;i++){
		var stateConfig = stateConfigs[i];
		nodes.push(Editor.createStateUI(stateConfig));
	}

	// Put in the DOM
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i];
		Editor.dom.appendChild(node);
	}

};
Editor.createStateUI = function(stateConfig){

	// Create DOM
	var dom = document.createElement("div");
	dom.setAttribute("class", "editor_state");

	// Header: Icon & Title
	var stateHeader = document.createElement("div");
	stateHeader.setAttribute("class", "editor_state_header");
	dom.appendChild(stateHeader);

	// Icon
	var icon = document.createElement("input");
	icon.setAttribute("class", "editor_icon");
	icon.type = "text";
	icon.value = stateConfig.icon;
	icon.oninput = function(){
		stateConfig.icon = icon.value;
	};
	stateHeader.appendChild(icon);

	// Name
	var name = document.createElement("input");
	name.setAttribute("class", "editor_name");
	name.type = "text";
	name.value = stateConfig.name;
	name.oninput = function(){
		stateConfig.name = name.value;
	};
	stateHeader.appendChild(name);

	// Actions
	var actionConfigs = stateConfig.actions;
	var actionsDOM = Editor.createActionsUI(actionConfigs);
	dom.appendChild(actionsDOM);

	// Return dom
	return dom;

};

Editor.createActionsUI = function(actionConfigs){

	// Create DOM
	var dom = document.createElement("div");
	dom.setAttribute("class", "editor_actions");

	// Well. Does it even have anything
	if(actionConfigs.length>0){
		var list = document.createElement("ul");
		for(var i=0;i<actionConfigs.length;i++){
			var actionConfig = actionConfigs[i];
			var actionDOM = Editor.createActionUI(actionConfig);
			var entry = document.createElement("li");
			entry.appendChild(actionDOM);
			list.appendChild(entry);
		}
		dom.appendChild(list);
	}
	
	// Return dom
	return dom;

};

Editor.createActionUI = function(actionConfig){
	var action = Actions[actionConfig.type];
	return action.ui(actionConfig);
};

})(window);