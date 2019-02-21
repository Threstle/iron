module.exports =
{
    id: "pit1",

    description: "Above you the edge of the pit shines with sunlight that already feels like a distant memory. You lift your [torch] to scout your surroundings. You stand in a huge cave. Just below the mouth of the cave is a huge [pile of animal bones].",

    objects: [

        {
            id: "pit1_pileofanimalbones",
            currentState: 0,
            states:
                [
                    {
                        name: "pile of animal bones",
                        description: "You cringe slightly but, luckily, the corpses are all old and dry. Your kind have been throwing animales down the pit in order to appease the gods for centuries now.",
                        roomDescription: "",
                        search:
                            {
                                effects:["action room pit1 search-bones"],
                                answer:"you find nothing of interest among the remains, but as you're moving a deer skull you uncover a tiny [alcove] carven into the southern wall, previously hidden by the [pile of bones]"
                            }
                    }

                ]
        },

        {
            id: "alcove",
            currentState: 0,
            states:
            [
                {
                    name: "",
                    description: "",
                    roomDescription: ""
                },
                {
                    name: "alcove",
                    description: "You can't see it's content from here. You'll have to enter it if you want to have a better look.",
                    roomDescription: "There's a tiny [alcove] carved directly into the stone of the south wall."
                }
            ]
        }

    ],

    directions:
    [
        {

            id:"alcove",
            to:"alcove1",
            open: false,
            answer:"you enter the alcove and shine your torch in it."
        }
    ],

    actions:
        [
            {
                id:"search-bones",
                action:()=>{

                    module.exports.directions.filter((direction)=> direction.id == "alcove")[0].open = true;
                    module.exports.objects.filter((object)=> object.id == "alcove")[0].currentState = 1;


                }
            }
        ]
};