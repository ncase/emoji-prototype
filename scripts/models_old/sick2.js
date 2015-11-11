Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": [
                {
                    "type": "if_random",
                    "probability": 0.5,
                    "actions": [
                        {
                            "type": "go_to_state",
                            "stateID": 1
                        }
                    ]
                },
                {
                    "probability": 0.8,
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
            "id": 1,
            "icon": "😊",
            "name": "healthy",
            "actions": [
                {
                    "type": "if_neighbor",
                    "sign": ">=",
                    "num": 1,
                    "stateID": 3,
                    "actions": [
                        {
                            "probability": 0.5,
                            "actions": [
                                {
                                    "stateID": "3",
                                    "type": "go_to_state"
                                }
                            ],
                            "type": "if_random"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "icon": "😰",
            "name": "sick",
            "actions": [
                {
                    "probability": 0.1,
                    "actions": [
                        {
                            "stateID": "4",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                },
                {
                    "probability": 0.1,
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
            "id": 4,
            "icon": "💀",
            "name": "dead",
            "actions": []
        },
        {
            "id": 6,
            "icon": "😘",
            "name": "immune",
            "actions": [
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "3",
                    "actions": [
                        {
                            "probability": 0.05,
                            "actions": [
                                {
                                    "stateID": "3",
                                    "type": "go_to_state"
                                }
                            ],
                            "type": "if_random"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        }
    ],
    "world": {
        "update": "simultaneous",
        "neighborhood": "moore",
        "size": {
            "width": 20,
            "height": 20
        }
    }
});