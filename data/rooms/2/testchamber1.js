module.exports =
{
    id: "testroom1",

    description: "this is test room 1. What a wonderful place. ",

    objects: [

        {
            id: "test_pool",
            currentState: 0,
            states:
                [
                    {
                        name: "pool",
                        description: "a nice pool of clear water",
                        roomDescription: "there's a pool of water taking half of the room floor"
                    }

                ]
        },

        {
            id: "south",
            currentState: 0,
            states:
            [
                {
                    name: "dusty tunnel",
                    description: "a dusty tunnel running toward south",
                    roomDescription: "you can see a dusty tunnel running toward south"
                }
            ]
        }

    ],

    directions:
    [
        {

            id:"south",
            to:"entrance",
            open: true,
            answer:"you move down the tunnel, toward south. You can see light from the far end of the tunnel"
        }
    ],

    actions:
    [

    ]
};