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
      id:"item-rusty-key",
      type:"item",
      currentState: 0,
      states:[
        {
          name: "rusty key",
          description: "a rusty old key. You wonder what it's for...",
        }
      ],
      use:
      {
        requiredSubject:"metal door",
        requiredRoom:"entrance",
        effects:["action room entrance open-door","inventory remove item-rusty-key"],
        answer:"the key turns into the lock. You hear a click and the door opens"
      }

    }
  ]
};