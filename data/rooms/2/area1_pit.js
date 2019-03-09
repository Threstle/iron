module.exports =
{
    id: "area1_pit",

    description: "Above you the edge of the pit shines with sunlight that already feels like a distant memory. You lift your [torch] to scout your surroundings. You stand in a huge cave. Just below the mouth of the cave is a [pile of animal bones]. On the [north] wall you can see the opening of a [tunnel] dug in the black stone. You hear a faint sound of [running water] coming from it.",

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
                                effects:["action room area1_pit search-bones"],
                                answer:"you find nothing of interest among the remains, but as you're moving a deer skull you uncover a tiny [alcove] carven into the southern wall, previously hidden by the [pile of animal bones]"
                            }
                    }

                ]
        },

        {
            id: "pit1_north",
            currentState: 0,
            states:
                [
                    {
                        name: "north",
                        description: "A tall wall of black stone, smooth, except for the opening of a [tunnel]",
                        roomDescription: "",
                    }

                ]
        },

        {
            id: "pit1_tunnel",
            currentState: 0,
            states:
                [
                    {
                        name: "tunnel",
                        description: "A dark opening into the wall. It's high enough for you to go through without bowing your head. You hear a faint sound of [running water] coming from it",
                        roomDescription: "",
                    }

                ]
        },

        {
            id: "pit1_runningwater",
            currentState: 0,
            states:
                [
                    {
                        name: "running water",
                        description: "It's very low, but it sounds like a river.",
                        roomDescription: "",
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
            names:["south","alcove"],
            to:"area1_alcove",
            open: false,
            answer:"You enter the alcove and shine your torch in it."
        },
        {
            id:"tunnel",
            names:["north","tunnel"],
            to:"area2_river",
            open: true,
            answer:"You enter the tunnel. As you walk, the sound of water grows louder. After a few minutes you enter a vast cavern."
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
        ],

    // ------------------------------------------------------------------------------------------------------------- HOOKS

    onEnter:{
        repeat:false,
        done:false,
        event:"event puzzle-blade"
    }
};