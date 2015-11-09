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
            "icon": "▲",
            "name": "triangle",
            "actions": [
                {
                    "sign": "<",
                    "num": 1,
                    "stateID": "1",
                    "actions": [
                        {
                            "space": 0,
                            "spotStateID": 0,
                            "leaveStateID": 0,
                            "type": "move_to"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        },
        {
            "id": 2,
            "icon": "▦",
            "name": "square",
            "actions": [
                {
                    "sign": "<",
                    "num": 1,
                    "stateID": "2",
                    "actions": [
                        {
                            "space": 0,
                            "spotStateID": 0,
                            "leaveStateID": 0,
                            "type": "move_to"
                        }
                    ],
                    "type": "if_neighbor"
                }
            ]
        }
    ],
    "world": {

        "size": {
            "width": 50,
            "height": 50
        },

        "proportions":[
            {stateID:0, ratio:0.8},
            {stateID:1, ratio:0.1},
            {stateID:2, ratio:0.2}
        ],

        "update": "sequential",
        "neighborhood": "moore"

    }
});