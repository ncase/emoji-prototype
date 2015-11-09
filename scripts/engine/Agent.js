function Agent(x,y){

	var self = this;

	// Space & State
	self.x = x;
	self.y = y;
	self.stateID = 0;

	// For updating
	self.nextStateID = self.stateID;
	self.calculateNextState = function(){

		// Stay the same by default
		self.nextStateID = self.stateID;

		// Get actions to perform
		var state = Model.getStateFromID(self.stateID);
		if(state){
			PerformActions(self, state.actions);
		}else{
			// state has been deleted. become a zero.
			self.forceState(0);
		}
		

	};
	self.gotoNextState = function(){
		self.stateID = self.nextStateID;
	};
	self.forceState = function(stateID){
		stateID = stateID || 0;
		self.stateID = self.nextStateID = stateID;
	};

}