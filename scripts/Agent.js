function Agent(x,y){

	var self = this;

	// Space & State
	self.x = x;
	self.y = y;
	self.state = Math.random()<0.5 ? "empty" : "tree";
	self.icon = Agent.states[self.state].icon;

	// State
	self.goto = function(stateName){
		self.nextState = stateName;
	};

	// For simultaneous updating
	self.nextState = self.state;
	self.calculateNextState = function(){
		self.nextState = self.state; // stay the same by default
		Agent.states[self.state].step(self);
	};
	self.gotoNextState = function(){
		self.state = self.nextState;
		self.icon = Agent.states[self.state].icon;
	};

}