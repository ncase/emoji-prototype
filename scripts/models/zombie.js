// made by joel
// ZOMBIELAND
// all or nothing

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
                }
            ]
        },
        {
            "id": 1,
            "icon": "😔",
            "name": "survivor",
            "actions": [
                {
                    "type": "if_neighbor",
                    "sign": ">=",
                    "num": 1,
                    "stateID": "4",
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
            "name": "infected",
            "actions": [
                {
                    "probability": 0.2,
                    "actions": [
                        {
                            "stateID": "4",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                },
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "1",
                    "actions": [
                        {
                            "probability": 0.05,
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
            "id": 4,
            "icon": "💀",
            "name": "bitey",
            "actions": [
                {
                    "sign": ">=",
                    "num": 3,
                    "stateID": "1",
                    "actions": [
                        {
                            "probability": 0.5,
                            "actions": [
                                {
                                    "stateID": "5",
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