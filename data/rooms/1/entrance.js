module.exports =
{
    id: "entrance",

    description: "in front of you is a stone wall, behind you is a stone wall. There's a sword on the floor You get the idea. There's a passage going north",

    objects: [

        {
            id: "sword",
            description: "a rusty old sword"
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

    interactions:
    [
        {
            id:"test",
            state:()=>{

                this.description = "in front of you is a stone wall, behind you is a stone wall. You get the idea. There's a passage going north"

                this.objects = this.objects.filter((objet)=>objet.id != "sword")
            }
        }
    ]
};
