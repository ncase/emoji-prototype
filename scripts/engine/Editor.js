(function(exports){

// Singleton Class
exports.Editor = {};

// DOM
Editor.dom = document.getElementById("editor");

// Create from model
Editor.create = function(){

	//////////////////////
	///// STATES DOM /////
	//////////////////////

	Editor.statesDOM = document.createElement("div");
	Editor.dom.appendChild(Editor.statesDOM);
	Editor.createStatesUI(Editor.statesDOM, Model.data.states);

	// Button - Add a state!
	var addState = document.createElement("div");
	addState.className = "editor_fancy_button";
	addState.innerHTML = "<span>+</span>new";
	addState.onclick = function(){

		// New state config
		var newStateConfig = {
			id: Model.generateNewID(),
			icon: "💩",
			name: "chocolate",
			actions:[]
		};

		// Add to Model.data
		Model.data.states.push(newStateConfig);

		// Create new DOM & append to states container
		var stateDOM = Editor.createStateUI(newStateConfig);
		Editor.statesDOM.appendChild(stateDOM);

		// Hey y'all
		publish("/ui/addState",[newStateConfig.id]);
		publish("/ui/updateStateHeaders");

	};
	Editor.dom.appendChild(addState);

	// Divider
	var hr = document.createElement("hr");
	Editor.dom.appendChild(hr);

	/////////////////////
	///// WORLD DOM /////
	/////////////////////

	Editor.worldDOM = document.createElement("div");
	Editor.dom.appendChild(Editor.worldDOM);

	Editor.worldDOM.appendChild(Grid.createUI());

	// Divider
	var hr = document.createElement("hr");
	Editor.dom.appendChild(hr);

	//////////////////////
	///// META STUFF /////
	//////////////////////

	// Reset to original
	var undoChanges = document.createElement("div");
	undoChanges.className = "editor_fancy_button";
	undoChanges.style.marginBottom = "20px";
	undoChanges.innerHTML = "<span style='font-size:25px; line-height:40px;'>⟳</span>undo all changes";
	undoChanges.onclick = function(){
		publish("/meta/reset");
		Model.returnToBackup();
	};
	Editor.dom.appendChild(undoChanges);

	// Save your changes
	var saveChanges = document.createElement("div");
	saveChanges.className = "editor_fancy_button";
	saveChanges.id = "save_changes";
	saveChanges.innerHTML = "<span style='font-size:30px; line-height:40px'>★</span>save changes";
	saveChanges.onclick = function(){
		Save.uploadModel();
	};
	Editor.dom.appendChild(saveChanges);

	// Save your changes, label & link
	var saveLabel = Editor.createLabel("when you save your model, a new link to it will appear here:")
	saveLabel.style.display = "block";
	saveLabel.style.margin = "10px 0";
	Editor.dom.appendChild(saveLabel);
	var saveLink = document.createElement("input");
	saveLink.type = "text";
	saveLink.className = "editor_save_link";
	saveLink.onclick = function(){
		saveLink.select();
	};
	subscribe("/save/success",function(link){
		saveLabel.innerHTML = "here you go! <a href='"+link+"' target='_blank'>(open in new tab)</a>";
		saveLink.value = link;
	});
	Editor.dom.appendChild(saveLink);


};

Editor.createStatesUI = function(dom, stateConfigs){

	// For each state config...
	for(var i=0;i<stateConfigs.length;i++){
		var stateConfig = stateConfigs[i];
		var stateDOM = Editor.createStateUI(stateConfig);
		dom.appendChild(stateDOM);
	}

};

Editor.createStateUI = function(stateConfig){

	// Create DOM
	var dom = document.createElement("div");
	dom.className = "editor_state";

	// Header: Icon & Title
	var stateHeader = document.createElement("div");
	stateHeader.className = "editor_state_header";
	dom.appendChild(stateHeader);

	// Icon
	var icon = document.createElement("input");
	icon.className = "editor_icon";
	icon.type = "text";
	icon.value = stateConfig.icon;
	icon.oninput = function(){
		stateConfig.icon = icon.value;
		publish("/ui/updateStateHeaders");
	};
	stateHeader.appendChild(icon);

	// Name
	var name = document.createElement("input");
	name.className = "editor_name";
	name.type = "text";
	name.value = stateConfig.name;
	name.oninput = function(){
		stateConfig.name = name.value;
		publish("/ui/updateStateHeaders");
	};
	stateHeader.appendChild(name);

	// Delete (except 0-blank, you CAN'T delete that)
	if(stateConfig.id!=0){
		var deleteDOM = document.createElement("div");
		deleteDOM.className ="delete_state";
		deleteDOM.innerHTML = "⊗";
		(function(stateConfig){
			deleteDOM.onclick = function(){
				Model.removeStateByID(stateConfig.id); // Splice away
				publish("/ui/removeState",[stateConfig.id]); // remove state
				publish("/ui/updateStateHeaders"); // update state headers
				Editor.statesDOM.removeChild(dom); // and, remove this DOM child
			};
		})(stateConfig);
		stateHeader.appendChild(deleteDOM);
	}

	// Actions
	var actionConfigs = stateConfig.actions;
	var actionsDOM = Editor.createActionsUI(actionConfigs);
	dom.appendChild(actionsDOM);

	// Return dom
	return dom;

};

Editor.createActionsUI = function(actionConfigs, dom){

	// Reset/Create DOM
	if(dom){
		dom.innerHTML = "";
	}else{
		dom = document.createElement("div");
		dom.className = "editor_actions";
	}

	// List
	var list = document.createElement("ul");
	dom.appendChild(list);

	// All them actions
	for(var i=0;i<actionConfigs.length;i++){

		// Action
		var actionConfig = actionConfigs[i];

		// Entry
		var entry = document.createElement("li");
		list.appendChild(entry);

		// Delete button
		var deleteDOM = document.createElement("div");
		deleteDOM.className ="delete_action";
		deleteDOM.innerHTML = "⊗";

		(function(actionConfigs,actionConfig,list,entry){

			// WELL HERE'S THE PROBLEM, WE'RE DOING IT BY INDEX,
			// WHEN THE INDEX CAN FRIKKIN' CHANGE.

			deleteDOM.onclick = function(){
				var index = actionConfigs.indexOf(actionConfig);
				actionConfigs.splice(index,1); // Splice away
				list.removeChild(entry); // remove entry
			};

		})(actionConfigs,actionConfig,list,entry);

		entry.appendChild(deleteDOM);

		// The actual action
		var actionDOM = Editor.createActionUI(actionConfigs[i]);
		entry.appendChild(actionDOM);
		
	}

	// Add action?
	var entry = document.createElement("li");
	var addAction = Editor.createActionAdder(actionConfigs, dom);
	entry.appendChild(addAction);
	list.appendChild(entry);
	
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

Editor.createActionAdder = function(actionConfigs, dom){

	var keyValues = [];

	// Default: nothing. just a label.
	keyValues.push({
		name: "+new",
		value:""
	});

	// Populate with Actions
	for(var key in Actions){
		var action = Actions[key];
		var name = action.name;
		var value = key;
		keyValues.push({name:name, value:value});
	}

	// Create select (placeholder options)
	var actionConfig = {action:""};
	var propName = "action";
	var select = Editor.createSelector(keyValues,actionConfig,propName);

	// Select has new oninput
	select.oninput = function(){

		// default, nvm
		if(select.value=="") return;

		// otherwise, add new action to this array
		var key = select.value;
		var defaultProps = Actions[key].props;
		var actionConfig = JSON.parse(JSON.stringify(defaultProps)); // clone
		actionConfig.type = key;
		actionConfigs.push(actionConfig);

		// then, force that DOM to RESET
		Editor.createActionsUI(actionConfigs, dom);

	};

	// Create a better DOM
	var selectContainer = document.createElement("div");
	selectContainer.className ="editor_new_action";
	var button = document.createElement("div");
	button.innerHTML = "+new";
	selectContainer.appendChild(button);
	selectContainer.appendChild(select);

	return selectContainer;

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
		var stateConfigs = Model.data.states;
		var selectedAnOption = false;
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
				selectedAnOption = true
			}

		}

		// If none was selected, then make blank selected.
		if(!selectedAnOption){
			select.value = 0; // blank
			select.oninput();
		}

	};

	// Update the state on change
	select.oninput = function(){
		actionConfig[propName] = select.value;
	};

	// Call func
	_populateList();

	// Update to OTHERS' changes
	var _listener1 = subscribe("/ui/updateStateHeaders",_populateList);

	// KILL IT ALL
	var _listener2 = subscribe("/meta/reset",function(){
		unsubscribe(_listener1);
		unsubscribe(_listener2);
	});

	
	// Return
	return select;

};

Editor.createNumber = function(actionConfig, propName, options){

	// Options?
	options = options || {};
	options.multiplier = options.multiplier || 1;
	// future options - constraints

	// Input
	var input = document.createElement("input");
	input.type = "text";
	input.value = actionConfig[propName]*options.multiplier;
	input.className ="editor_number";

	// Decode value
	var _decodeValue = function(){
		var number;
		if(options.integer){
			number = parseInt(input.value);
		}else{
			number = parseFloat(input.value);
		}
		if(isNaN(number)) number=0; // you messed up
		return number;
	};

	// Update on change
	input.oninput = function(){
		var number = _decodeValue();
		number /= options.multiplier;
		actionConfig[propName] = number;

		// Message?
		if(options.message) publish(options.message);
		
	};

	// When move away, fix it.
	input.onchange = function(){
		input.value = _decodeValue();
	};

	// Return
	return input;

};

})(window);