Model.init({
    "states": [
        {
            "id": 0,
            "icon": "",
            "name": "blank",
            "actions": []
        },
        {
            "id": 1,
            "icon": "😺",
            "name": "cat",
            "actions": [
                {
                    "space": 0,
                    "spotStateID": "0",
                    "leaveStateID": "2",
                    "type": "move_to"
                }
            ]
        },
        {
            "id": 2,
            "icon": "💩",
            "name": "chocolate",
            "actions": [
                {
                    "probability": 0.1,
                    "actions": [
                        {
                            "stateID": 0,
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                }
            ]
        },
        {
            "id": 3,
            "icon": "🐶",
            "name": "dog",
            "actions": [
                {
                    "space": 0,
                    "spotStateID": 0,
                    "leaveStateID": "4",
                    "type": "move_to"
                }
            ]
        },
        {
            "id": 4,
            "icon": "💦",
            "name": "splash",
            "actions": [
                {
                    "probability": 0.1,
                    "actions": [
                        {
                            "stateID": 0,
                            "type": "go_to_state"
                        }
                    ],
                    "type": "if_random"
                }
            ]
        }
    ],
    "world": {
        "neighborhood": "moore",
        "proportions":[
            {stateID:0, ratio:1}
        ],
        "size": {
            "width": 50,
            "height": 50
        }
    }
});