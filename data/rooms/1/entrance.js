module.exports =
{
    id: "entrance",

    description: "in front of you is a stone wall, behind you is a stone wall. There's a sword on the floor You get the idea. There's a passage going north",

    objects: [

        {
            id: "sword",
            description: "a rusty old sword",
            take:
            {
                effects:
                [
                    "state room entrance sword-taken"
                   // "inventory add item-sword",
                ],
                answer: "you take the sword and put it in your bag. It's rusty and smooth"
            }
        },

        {
            id: "north",
            description: "a dusty tunnel running toward north"
        }

        ],

    directions:
    [

        {
            "id":"north",
            "to":"testroom1"
        }

    ],

    states:
    [
        {
            id:"sword-taken",
            action:()=>{

                module.exports.description = "It's the room where you found the sword. In front of you is a stone wall, behind you is a stone wall. You get the idea. There's a passage going north"

                module.exports.objects = module.exports.objects.filter((objet)=>objet.id != "sword")
            }
        }
    ]
};
