module.exports =
    {
        id: "entrance",

        description: "The [sun] is shining high in the sky, but already, you can feel the cold chill of the pit below your feet. None would contest that the fate chosen for you is a cruel one, nonetheless you accepted it with resignation : each solstice a warrior has to penetrate the [catacombs] of [Yoh Vombis] and try to appease the gods. Winter has been brutal this year and, as you are lowered down into the black pit, you can see familiar eyes gazing at you with desesparate hope. You will succeed, or die trying for the sake of [Blokmor].",

        objects: [



            {
                id: "entrance_sun",
                currentState: 0,
                states:
                    [
                        {
                            name:"sun",
                            description: "the sweet light of the sun. You hope to see it again someday.",
                            roomDescription: ""
                        }
                    ]

            },
            {
                id: "entrance_catacombs",
                currentState: 0,
                states:
                    [
                        {
                            name:"catacombs",
                            description: "Not much is known about the catacombs : the pit and the eldritch ruins surrounding it were here before the people of [Blokmor] settled in the region. Even the name [Yoh Vombis] is a mysterious one.",
                            roomDescription: ""
                        }
                    ]

            },
            {
                id: "entrance_yohvombis",
                currentState: 0,
                states:
                    [
                        {
                            name:"yoh vombis",
                            description: "Many think it's an old god, some think it's a local demon. The name has been known forever and is tangled with so many legends that it's impossible to tell truth from myth.",
                            roomDescription: ""
                        }
                    ]

            },
            {
                id: "entrance_blokmor",
                currentState: 0,
                states:
                    [
                        {
                            name:"blokmor",
                            description: "It's the place you've known all your life : a peaceful village resting under the protection of the blue mountains.",
                            roomDescription: ""
                        }
                    ]

            },
            {
                id: "entrance_down",
                currentState: 0,
                states:
                    [
                        {
                            name:"down",
                            description: "The black pit of the catacombs opens like a huge hungry mouth below the hills. You've waited long enough, you should go.",
                            roomDescription: "Only one way to go now : [down]"
                        }
                    ]

            },

        ],

        directions:
            [

                {
                    id:"down",
                    "names":["down"],
                    "to":"pit1",
                    "open":true,
                    "answer":"you nod toward the man handling the mechanism and, as he begin to work the crank, the basket you're standing in is lowered inside the dark hole. After a some time, you feel a light shock as it touches the ground. You step outside, ready to face the dangers of the catacombs."
                }

            ],

        actions:
            [

            ]

    };
