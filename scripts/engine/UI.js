(function(){

/////////////////////////
///// PLAY CONTROLS /////
/////////////////////////

// RESET 
var play_reset = document.getElementById("play_reset");
play_reset.onclick = function(){
	Grid.initialize();
	publish("/grid/updateAgents");
};

// PLAY/PAUSE
var play_pause = document.getElementById("play_pause");
play_pause.onclick = function(){
	Model.isPlaying = !Model.isPlaying;
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
	Grid.step();
	publish("/grid/updateAgents");
};

/////////////////////////
///// TOGGLE STATES /////
/////////////////////////

// Event Handling
Grid.dom.addEventListener("mousedown",function(event){

	// Grid X & Y
	var rx = event.clientX - Grid.dom.offsetLeft;
	var ry = event.clientY - Grid.dom.offsetTop;
	var x = Math.floor(rx/Grid.tileSize);
	var y = Math.floor(ry/Grid.tileSize);

	// Get the agent there
	var agent = Grid.array[y][x];

	// Get what the next state should be
	var state = Model.getStateFromID(agent.stateID);
	var stateIndex = Model.data.states.indexOf(state);
	var nextIndex = (stateIndex+1)%Model.data.states.length;
	var nextState = Model.data.states[nextIndex];

	// Swap agent to that state
	agent.stateID = agent.nextStateID = nextState.id;

	// Update the rendering
	publish("/grid/updateAgents");

},false);

})();