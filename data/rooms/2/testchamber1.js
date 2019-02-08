module.exports =
{
    id: "testroom1",

    description: "this is test room 1. What a wonderful place. There's a pool of water in the middle of the room. There's a passage to the south.",

    objects: [

        {
            id: "pool",
            description: "a nice pool of clear water"
        },

        {
            id: "south",
            description: "a dusty tunnel running toward south"
        }

    ],

    directions:
    [
        {

            id:"south",
            to:"entrance"
        }
    ]
};