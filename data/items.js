module.exports =
{
  items: [
    {
      id:"item-rusty-sword",
      type:"weapon",
      currentState:0,
      damage:3,
      states:[
        {
          name: "sword",
          description: "a rusty sword. Probably not very efficient",
        }
      ]
    },
    {
      id:"item-plank",
      type:"item",
      currentState: 0,
      states:[
        {
          name: "plank",
          description: "an old plank. Could be used as a bridge...",
        }
      ],
      use:
      {
        requiredSubject:"river",
        requiredRoom:"area2_river",
        effects:["action room area2_river bridge-water","inventory remove item-plank"],
        answer:"you put the plank on the water"
      }

    }
  ]
};