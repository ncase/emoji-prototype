Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": [
                {
                    "type": "if_random",
                    "probability": 0,
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
            "name": "fighter",
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
                            "stateID": 0,
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
        }
    ],
    "world": {
        "update": "simultaneous",
        "neighborhood": "moore",
        "proportions": [
            {
                "stateID": 0,
                "parts": 100
            },
            {
                "stateID": 3,
                "parts": 0
            },
            {
                "stateID": 1,
                "parts": 0
            },
            {
                "stateID": 2,
                "parts": 0
            }
        ],
        "size": {
            "width": 50,
            "height": 50
        }
    }
});