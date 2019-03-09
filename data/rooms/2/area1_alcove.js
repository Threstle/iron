//TODO: écrire
module.exports =
    {
        id: "area1_alcove",

        description: "smol alcove",

        objects: [
            {
                id: "floor_plank",
                itemId: "item-plank",
                currentState: 0,
                states:
                    [
                        {
                            name: "plank",
                            description: "an old plank",
                            roomDescription: "there's a dusty [plank] on the floor."
                        }

                    ]
            },

        ],

        directions:
            [
                {

                    id:"north",
                    names:["cave","north","pit"],
                    to:"area1_pit",
                    open: true,
                    answer:"You leave the alcove and go back into the cave"
                }
            ],

        actions:
            [
                {
                    id:"search-bones",
                    action:()=>{

                    }
                }
            ],

        // ------------------------------------------------------------------------------------------------------------- HOOKS

    };