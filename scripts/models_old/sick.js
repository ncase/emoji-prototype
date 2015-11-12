Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": [
                {
                    "type": "if_random",
                    "probability": 1,
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
            "icon": "😊",
            "name": "person",
            "actions": [
                {
                    "type": "if_neighbor",
                    "sign": ">=",
                    "num": 1,
                    "stateID": 3,
                    "actions": [
                        {
                            "probability": 0.1,
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
                            "stateID": "1",
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
            "actions": [
                {
                    "stateID": "5",
                    "type": "go_to_state"
                }
            ]
        },
        {
            "id": 5,
            "icon": " ",
            "name": "another blank",
            "actions": []
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