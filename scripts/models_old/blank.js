Model.init({

	//////////////////
	// AGENT STATES //
	//////////////////

	states: [

		{
			id: 0,
			icon: "",
			name: "blank",
			actions:[]
		}

	],

	////////////////
	// WORLD INFO //
	////////////////

	world: {
		update: "simultaneous",
		neighborhood: "moore",
		proportions:[
            {stateID:0, parts:1}
        ],
		size:{
			width:20,
			height:20
		}
	}

});