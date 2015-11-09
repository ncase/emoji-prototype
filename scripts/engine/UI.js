(function(){

/////////////////////////
///// PLAY CONTROLS /////
/////////////////////////

// RESET 
var play_reset = document.getElementById("play_reset");
play_reset.onclick = function(){
	Grid.reinitialize();
};

// PLAY/PAUSE
var play_pause = document.getElementById("play_pause");
play_pause.onclick = function(){
	Model.isPlaying = !Model.isPlaying;
	updatePauseUI();
};
var updatePauseUI = function(){
	if(Model.isPlaying){
		play_pause.innerHTML = "pause";
	}else{
		play_pause.innerHTML = "play";
	}
};

// STEP
var play_step = document.getElementById("play_step");
play_step.onclick = function(){
	Model.pause();
	updatePauseUI();
	Grid.step();
	publish("/grid/updateAgents");
};

/////////////////////////
///// TOGGLE STATES /////
/////////////////////////

// Mouse down
var Mouse = { x:0, y:0, pressed:false };
var getMousePosition = function(event){

	var rx = event.clientX - Grid.dom.offsetLeft;
	var ry = event.clientY - Grid.dom.offsetTop;
	var x = Math.floor(rx/Grid.tileSize);
	var y = Math.floor(ry/Grid.tileSize);

	if(x<0) x=0;
	if(x>=Grid.array[0].length) x=Grid.array[0].length-1;
	if(y<0) y=0;
	if(y>=Grid.array.length) y=Grid.array.length-1;

	return {x:x, y:y};

};
Grid.dom.addEventListener("mousedown",function(event){
	Mouse.pressed = true;
	var pos = getMousePosition(event);
	Mouse.x = pos.x;
	Mouse.y = pos.y;
	changeCell();
},false);
Grid.dom.addEventListener("mousemove",function(event){

	if(!Mouse.pressed) return;
	
	var pos = getMousePosition(event);

	// New position
	if(pos.x!=Mouse.x || pos.y!=Mouse.y){
		Mouse.x = pos.x;
		Mouse.y = pos.y;
		changeCell();
	}
	
},false);
window.addEventListener("mouseup",function(event){
	Mouse.pressed = false;
},false);

// Change state of cell
var changeCell = function(){

	var x = Mouse.x;
	var y = Mouse.y;

	// Get the agent there
	var agent = Grid.array[y][x];

	// Get what the next state should be
	var state = Model.getStateFromID(agent.stateID);
	var stateIndex = Model.data.states.indexOf(state);
	var nextIndex = (stateIndex+1)%Model.data.states.length;
	var nextState = Model.data.states[nextIndex];

	// Swap agent to that state
	agent.forceState(nextState.id);

	// Update the rendering
	publish("/grid/updateAgents");

};

})();