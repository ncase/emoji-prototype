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
            "id": 1,
            "icon": "🌱",
            "name": "young tree",
            "actions": [
                {
                    "type": "if_random",
                    "probability": 0.01,
                    "actions": [
                        {
                            "type": "go_to_state",
                            "stateID": "3"
                        }
                    ]
                },
                {
                    "type": "if_neighbor",
                    "sign": ">=",
                    "num": 1,
                    "stateID": "6",
                    "actions": [
                        {
                            "type": "go_to_state",
                            "stateID": "6"
                        }
                    ]
                },
                {
                    "probability": 0.0001,
                    "actions": [
                        {
                            "stateID": "6",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                }
            ]
        },
        {
            "id": 3,
            "icon": "🌳",
            "name": "strong tree",
            "actions": [
                {
                    "sign": ">=",
                    "num": 3,
                    "stateID": "6",
                    "actions": [
                        {
                            "stateID": "6",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_neighbor"
                },
                {
                    "probability": 0.01,
                    "actions": [
                        {
                            "stateID": "5",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                },
                {
                    "probability": 0.0001,
                    "actions": [
                        {
                            "stateID": "6",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                }
            ]
        },
        {
            "id": 5,
            "icon": "💀",
            "name": "dead tree",
            "actions": [
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "6",
                    "actions": [
                        {
                            "stateID": "6",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_neighbor"
                },
                {
                    "probability": 0.0001,
                    "actions": [
                        {
                            "stateID": "6",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                }
            ]
        },
        {
            "id": 6,
            "icon": "🔥",
            "name": "fire",
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