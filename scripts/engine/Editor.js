(function(exports){

// Singleton Class
exports.Editor = {};

// DOM
Editor.dom = document.getElementById("editor");


// Create from model
Editor.create = function(){

	// Nodes
	var nodes = [];

	// For each state config...
	var stateConfigs = MODEL.states;
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
		publish("/ui/updateStateHeaders");
	};
	stateHeader.appendChild(icon);

	// Name
	var name = document.createElement("input");
	name.setAttribute("class", "editor_name");
	name.type = "text";
	name.value = stateConfig.name;
	name.oninput = function(){
		stateConfig.name = name.value;
		publish("/ui/updateStateHeaders");
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

Editor.createLabel = function(words){
	var label = document.createElement("span");
	label.innerHTML = words;
	return label;
};

Editor.createSelector = function(keyValues, actionConfig, propName){

	// Select.
	var select = document.createElement("select");
	select.type = "select";

	// Populate options: icon + name for each state, value is the ID.
	for(var i=0;i<keyValues.length;i++){
		
		var keyValue = keyValues[i];

		// Create option
		var option = document.createElement("option");
		option.innerHTML = keyValue.name;
		option.value = keyValue.value;
		select.appendChild(option);

		// Is it selected?
		var selectedValue = actionConfig[propName];
		if(keyValue.value==selectedValue){
			option.selected = true;
		}

	}

	// Update the state on change
	select.oninput = function(){
		actionConfig[propName] = select.value;
	};
	
	// Return
	return select;

};

Editor.createStateSelector = function(actionConfig, propName){

	// Select.
	var select = document.createElement("select");
	select.type = "select";

	// Populate options: icon + name for each state, value is the ID.
	var _populateList = function(){
		select.innerHTML = "";
		var stateConfigs = MODEL.states;
		for(var i=0;i<stateConfigs.length;i++){
			
			var stateConfig = stateConfigs[i];

			// Create option
			var option = document.createElement("option");
			option.innerHTML = stateConfig.icon + ": " + stateConfig.name;
			option.value = stateConfig.id;
			select.appendChild(option);

			// Is it selected?
			var selectedID = actionConfig[propName];
			if(stateConfig.id==selectedID){
				option.selected = true;
			}

		}
	};
	_populateList();

	// Update the state on change
	select.oninput = function(){
		actionConfig[propName] = select.value;
	};

	// Update to OTHERS' changes
	subscribe("/ui/updateStateHeaders",_populateList);
	
	// Return
	return select;

};

})(window);