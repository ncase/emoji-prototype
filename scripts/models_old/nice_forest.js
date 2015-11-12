Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": [
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "1",
                    "actions": [
                        {
                            "probability": 0.02,
                            "actions": [
                                {
                                    "stateID": "1",
                                    "type": "go_to_state"
                                }
                            ],
                            "type": "if_random"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        },
        {
            "id": 1,
            "icon": "🌲",
            "name": "tree",
            "actions": [
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "2",
                    "actions": [
                        {
                            "probability": 0.9,
                            "actions": [
                                {
                                    "stateID": "2",
                                    "type": "go_to_state"
                                }
                            ],
                            "type": "if_random"
                        }
                    ],
                    "type": "if_neighbor"
                },
                {
                    "probability": 0.0001,
                    "actions": [
                        {
                            "stateID": "2",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
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
                "parts": 99
            },
            {
                "stateID": 1,
                "parts": 1
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