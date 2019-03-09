module.exports =
    {
        id: "area2_river",

        description: "You're standing in front of a subterranean [river]. The noise of the [water] is deafening. On the other side, you can see a [massive gate] directly carved into the wall. The bank you're standing on goes on along the river [east] and [west].",

        objects: [
            {
                id: "river1_river",
                currentState: 0,
                states:
                    [
                        {
                            name: "river",
                            description: "It's about height feet wide and six deep. The [water] is rushing, there's no way you will be able to swim your way across. You could try jumping across it, but it seems risky.",
                            roomDescription: "",
                            jump:
                                {
                                    effects:["user die"],
                                    answer:"You take some step back in order to gain momentum, and after a few agile strides, you push on your leg and jump as high as you can. For a few seconds it look like you're gonna make it. You feel the stony floor on your foot, but it slips, and you plunge into the icy water below. You can't fight against the mighty speeds. Soon, you're no better than a lifeless ragdoll on it's way to the center of the earth through the dark submerged tunnels under the catacombs."
                                },

                        }
                    ]
            },
            {
                id: "river1_bridge",
                currentState: 0,
                states:
                    [
                        {
                            name: "",
                            description: "",
                            roomDescription: ""
                        },
                        {
                            name: "bridge",
                            description: "It doesn't look safe but it's your only option.",
                            roomDescription: "The plank you put over the [river] will have to do as a bridge.",
                            cross:
                                {
                                    effects:["move north"],
                                    answer:""
                                },

                        }
                    ]
            },
            {
                id: "river1_water",
                currentState: 0,
                states:
                    [
                        {
                            name: "water",
                            description: "The [water] is crystal clear and cold as ice. It must come directly from the heart of the mountain.",
                            roomDescription: ""
                        }
                    ]
            },
            {
                id: "river1_gate",
                currentState: 0,
                states:
                    [
                        {
                            name: "massive gate",
                            description: "From where you're standing, you can see the shape of a huge gate, maybe height or nine feet tall. The door seems to be gleaming with dark metal, but that's really all you can see from there.",
                            roomDescription: ""
                        }
                    ]
            },
            {
                id: "river1_east",
                currentState: 0,
                states:
                    [
                        {
                            name: "east",
                            description: "The bank continues for a few meters, but it's as far as your torch can light",
                            roomDescription: ""
                        }
                    ]
            },
            {
                id: "river1_west",
                currentState: 0,
                states:
                    [
                        {
                            name: "west",
                            description: "The bank continues for a few meters, but it's as far as your torch can light",
                            roomDescription: ""
                        }
                    ]
            }

        ],

        directions:
            [
                {
                    id:"north",
                    names:["north","other bank"],
                    to:"area2_gate",
                    open: false,
                    answer:"You cross the river, wary that your makeshift bridge will fail you. It creaks and bends but you manage to reach the other bank without any harm. As you set foot on the solid black rock, you hear a loud noise behind you. You turn just in time to see the remains of your bridge carried in the watery tunnels below by the furious water. The way is now cut."
                },
                {
                    id:"south",
                    names:["south","tunnel"],
                    to:"area1_pit",
                    open: true,
                    answer:"You crouch and enter the tunnel."
                },
                {
                    id:"east",
                    names:["east"],
                    to:"area2_east",
                    open: true,
                    answer:"You follow east along the bank for a few minutes"
                },
                {
                    id:"west",
                    names:["west"],
                    to:"area2_west",
                    open: true,
                    answer:"You follow west along the bank for a few minutes"
                },
            ],

        actions:
            [
                {
                    id:"bridge-water",
                    action:()=>{

                        module.exports.directions.filter((direction)=> direction.id == "north")[0].open = true;
                        module.exports.objects.filter((object)=> object.id == "river1_bridge")[0].currentState = 1;


                    }
                }
            ],

        onEnter:"",
        onLeave:""
    };