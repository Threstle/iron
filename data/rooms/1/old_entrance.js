module.exports =
{
    id: "entrance",

    description: "You're in the entrance of the dungeon. You can still see the light of day behind you. The room is carved into stone.",

    objects: [

        {
            id: "floor_sword",
            itemId: "item-rusty-sword",
            currentState: 0,
            states:
            [
                {
                    name: "sword",
                    description: "a rusty old sword",
                    roomDescription: "there's a rusty old [sword] on the floor."
                }

            ]
        },

        {
            id:"door-north",
            currentState: 0,
            states:
            [
                {
                    name: "metal door",
                    description: "a metal door. It looks sturdy. You can see a keylock",
                    roomDescription: "there's a [metal door] on the north wall."
                },
                {
                    name: "tunnel",
                    description: "a dusty tunnel running toward north",
                    roomDescription: "there's a dusty [tunnel] running toward north.",
                }
            ]
        },

        {
            id: "floor_key",
            itemId: "item-rusty-key",
            currentState: 0,
            states:
            [
                {
                    name:"rusty key",
                    description: "a rusty key. You wonder what it's for...",
                    roomDescription: "there's a [rusty key] on the floor."
                }
            ]

        }

        ],

    directions:
    [

        {
            "id":"north",
            "to":"testroom1",
            "open":false,
            "answer":"you stride along the tunnel carefully. You emerge shortly in another room"
        }

    ],

    actions:
    [
        {
            id:"open-door",
            action:()=>{

                module.exports.directions.filter((direction)=> direction.id == "north")[0].open = true;
                module.exports.objects.filter((object)=> object.id == "door-north")[0].currentState = 1;


            }
        }
    ]

};
