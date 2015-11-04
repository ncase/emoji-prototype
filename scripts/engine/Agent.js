function Agent(x,y){

	var self = this;

	// Space & State
	self.x = x;
	self.y = y;
	self.stateID = Math.random()<0.5 ? 0 : 1;

	// For updating
	self.nextStateID = self.stateID;
	self.calculateNextState = function(){

		// Stay the same by default
		self.nextStateID = self.stateID;

		// Get actions to perform
		var state = _getStateFromID(self.stateID);
		PerformActions(self, state.actions);

	};
	self.gotoNextState = function(){
		self.stateID = self.nextStateID;
	};

}