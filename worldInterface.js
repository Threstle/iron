const rooms          = require('./data/rooms/rooms');
const dictionnary    = require('./data/dictionnary');

class WorldInterface{

    constructor (){
    };

    init ()
    {
        this.rooms = rooms;
        this.currentRoom = 0;
    };

    interpret (pVerb,pObject1,pObject2)
    {
        const errors = dictionnary.errors;
        const verbs = dictionnary.verbs;
        const system = dictionnary.system;

        let answer = errors.invalid;
        let object2 = this.getObjectFromRoom(pObject2);

        if(dictionnary.verbs.filter((verb)=> verb == pVerb).length == 0)
        {
            answer = errors.invalid;
        }

        if(pVerb == "look")
        {
            // Cas particulier : le joueur regarde la pièce
            if(
                pObject1 == "room" ||
                pObject1 == "around" ||
                pObject1 == undefined
            )
            {
                answer = this.rooms[this.currentRoom].description;
            }
            else
            {
                let object1 = this.getObjectFromRoom(pObject1);

                if(!object1){answer = errors.invalidLook; return answer;}

                answer = object1.description || errors.invalidLook;
            }
        }
        else if(
            pVerb == "move" ||
            pVerb == "go"   ||
            pVerb == "walk"
        )
        {
            const direction = this.getDirectionFromRoom(pObject1);

            // Si la direction est fausse on quitte
            if(!direction){answer = errors.invalidDirection; return answer;}

            // Sinon on update la room en cours
            this.currentRoom = this.getRoomNumberFromId(direction.to);

            answer = this.rooms[this.currentRoom].description;


        }
        else if(this.getObjectFromRoom(pObject1)[pVerb])
        {
            let action = this.getObjectFromRoom(pObject1)[pVerb];


            action.effects.map((effect,i)=>{
                this.applyEffect(effect);
            });

            answer = action.answer;
        }
        else if(system[pVerb])
        {
            answer = system[pVerb];
        }


        return answer;
    }

    applyEffect (pEffect)
    {

        let effectArray = pEffect.split(" ");

        if(effectArray[0] == "state")
        {
            const type = effectArray[1];
            const target = effectArray[2];
            const state = effectArray[3];

            this.changeState(type,target,state);

        }
    }

    changeState (pType,pTarget,pState)
    {
        if(pType == "room")
        {
            const room = this.rooms[this.getRoomNumberFromId(pTarget)];

            const state  =

            this.getStateFromId(room,pState).action();
        }
        else
        {
            //TODO: objets
        }
    }

    // ----------------------------------------------------------------------------------------------------------------- GETTERS

    getObjectFromRoom (pObject)
    {
        return this.rooms[this.currentRoom].objects.filter((object)=> object.id == pObject)[0];
    }

    getDirectionFromRoom (pDirection)
    {

        return this.rooms[this.currentRoom].directions.filter((direction)=> direction.id == pDirection)[0];
    }

    getRoomNumberFromId (pId)
    {
        const room = this.rooms.filter((room)=> room.id == pId)[0];

        return this.rooms.indexOf(room);
    }

    getStateFromId (pTarget,pStateId)
    {
        return pTarget.states.filter((state)=> state.id == pStateId)[0];
    }

}

module.exports = WorldInterface;
