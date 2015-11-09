Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": []
        },
        {
            "id": 2,
            "icon": "▲",
            "name": "0",
            "actions": [
                {
                    "sign": ">=",
                    "num": 1,
                    "stateID": "3",
                    "actions": [
                        {
                            "stateID": "3",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        },
        {
            "id": 3,
            "icon": "🍎",
            "name": "1",
            "actions": [
                {
                    "stateID": "4",
                    "type": "go_to_state"
                }
            ]
        },
        {
            "id": 4,
            "icon": "💩",
            "name": "-1",
            "actions": [
                {
                    "stateID": "2",
                    "type": "go_to_state"
                }
            ]
        },
        {
            "id": 5,
            "icon": "👻",
            "name": "AND",
            "actions": [
                {
                    "sign": ">=",
                    "num": 2,
                    "stateID": "3",
                    "actions": [
                        {
                            "stateID": "3",
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        }
    ],
    "world": {
        "size": {
            "width": 25,
            "height": 25
        },
        "proportions": [
            {
                "stateID": 0,
                "ratio": 1
            },
            {
                "stateID": 1,
                "ratio": 0.1
            },
            {
                "stateID": 2,
                "ratio": 0.2
            }
        ],
        "neighborhood": "neumann"
    }
});