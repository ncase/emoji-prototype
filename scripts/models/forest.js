Model.init({

	//////////////////
	// AGENT STATES //
	//////////////////

	states: [

		// Empty:
		// with probability 0.02, go to "tree" state
		{
			id: 0,
			icon: "",
			name: "blank",
			actions:[
				{
					type: "if_random",
					probability: 0.005,
					actions:[
						{
							type: "go_to_state",
							stateID: 1
						}
					]
				}
			]
		},

		// Tree:
		// with probability 0.0005, go to "lightning" state
		// if >= 1 neighbor is "fire", go to "fire" state
		{
			id: 1,
			icon: "🌲",
			name: "tree",
			actions:[
				{ 
					type: "if_random",
					probability: 0.001,
					actions:[
						{
							type: "go_to_state",
							stateID: 2
						}
					]
				},
				{
					type: "if_neighbor",
					sign: ">=",
					num: 1,
					stateID: 3,
					actions:[
						{
							type:"go_to_state",
							stateID: 3
						}
					]
				}
			]
		},

		// Lightning
		// just become fire
		{
			id: 2,
			icon: "⚡️",
			name: "lightning",
			actions:[
				{
					type:"go_to_state",
					stateID: 3
				}
			]
		},

		// Fire
		// just become blank
		{
			id: 3,
			icon: "🔥",
			name: "fire",
			actions:[
				{
					type:"go_to_state",
					stateID: 0
				}
			]
		}

	],

	////////////////
	// WORLD INFO //
	////////////////

	world: {
		update: "simultaneous",
		size:{
			width:50,
			height:50
		}
	}

});