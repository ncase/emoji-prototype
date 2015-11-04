(function(exports){

// Singleton Class
exports.Editor = {};

// DOM
Editor.dom = document.getElementById("editor");

// Create from model
Editor.create = function(model){

	var html = "";

	// For each state...
	var states = model.states;
	for(var i=0;i<states.length;i++){
		html += Editor.getStateUI(states[i]);
	}

	// Put in the html
	Editor.dom.innerHTML = html;

};
Editor.getStateUI = function(state){

	var html = "";
	html += state.icon + state.name.toUpperCase();

	var actions = state.actions;
	html += Editor.getActionsUI(actions);

	return html;

};
Editor.getActionsUI = function(actions){
	var html = "";
	if(actions.length>0){
		html += "<ul>";
		for(var i=0;i<actions.length;i++){
			html += "<li>"+Editor.getActionUI(actions[i])+"</li>";
		}
		html += "</ul>";
	}
	return html;
};
Editor.getActionUI = function(actionConfig){
	var action = Actions[actionConfig.type];
	return action.ui(actionConfig);
};

})(window);