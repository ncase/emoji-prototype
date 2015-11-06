(function(){

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

})();