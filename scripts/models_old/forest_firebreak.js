Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": [
                {
                    "type": "if_random",
                    "probability": 0.01,
                    "actions": [
                        {
                            "type": "go_to_state",
                            "stateID": 1
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "icon": "💩",
            "name": "firebreak",
            "actions": []
        },
        {
            "id": 1,
            "icon": "🌲",
            "name": "tree",
            "actions": [
                {
                    "type": "if_random",
                    "probability": 0.0001,
                    "actions": [
                        {
                            "type": "go_to_state",
                            "stateID": 2
                        }
                    ]
                },
                {
                    "type": "if_neighbor",
                    "sign": ">=",
                    "num": 1,
                    "stateID": 2,
                    "actions": [
                        {
                            "type": "go_to_state",
                            "stateID": 2
                        }
                    ]
                },
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "3",
                    "actions": [
                        {
                            "stateID": "4",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        },
        {
            "id": 2,
            "icon": "🔥",
            "name": "fire",
            "actions": [
                {
                    "type": "go_to_state",
                    "stateID": 0
                }
            ]
        },
        {
            "id": 4,
            "icon": "✨",
            "name": "controlled",
            "actions": [
                {
                    "stateID": 0,
                    "type": "go_to_state"
                }
            ]
        }
    ],
    "world": {
        "update": "simultaneous",
        "neighborhood": "moore",
        "size": {
            "width": 50,
            "height": 50
        }
    }
});