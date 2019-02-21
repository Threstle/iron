const rooms          = require('./data/rooms/rooms');
const items          = require('./data/items');
const dictionnary    = require('./data/dictionnary');
const Character 	    = require('./character');
const characterData     = require('./data/character');

class WorldInterface{

    constructor (){
    };

    init ()
    {
        this.character = new Character(characterData.defaultStats);

        this.rooms = rooms;
        this.currentRoom = 0;
    };

    interpret (pSemanticDatas)
    {

        const verb = pSemanticDatas.verb;
        const subjects = pSemanticDatas.subjects;
        if(this[verb])
        {
            return this[verb](subjects);
        }
        // Si pas de fonction définie on va en chercher une sur l'objet
        else
        {
            let mainSubject = this.getObjectFromRoom(subjects[0]) || this.getObjectFromBag(subjects[1]);

            let mainSubjectState = mainSubject.states[mainSubject.currentState];

            if(mainSubjectState[verb])
            {
                mainSubjectState[verb].effects.map((effect)=>{
                    this.applyEffect(effect);
                })

                return mainSubjectState[verb].answer;
            }
            else
            {
                //TODO : erreur
                console.log(mainSubject);
                return "sseffe";
            }
        }

    }

    // ----------------------------------------------------------------------------------------------------------------- ACTIONS

    look (pSubjects)
    {
        const errors = dictionnary.errors;
        const game = dictionnary.game;

        let answer = "";
        let subject = pSubjects[0];

        if(subject == undefined ||
           subject == "room" ||
           subject == "around"
        )
        {
            const room = this.rooms[this.currentRoom];

            answer = room.description;

            room.objects.map((object)=>{

                let objectDescription = object.states[object.currentState].roomDescription;

                if(objectDescription.length>0)
                {
                    answer+= " "+ object.states[object.currentState].roomDescription;
                }


            });

        }
        else if(
            subject == "bag" ||
            subject == "inventory"
        )
        {
            answer = game.inventory;

            if(this.character.bagIsEmpty())answer = game.emptyInventory;

            this.character.inventory.map((item,index)=>{
                answer += "["+item.states[item.currentState].name +"]";

                if(index!=this.character.inventory.length-1)answer+=", "
            });

        }
        else
        {
            let object = this.getObjectFromRoom(subject) || this.getObjectFromBag(subject);

            if(!object){answer = errors.invalidLook; return answer;}

            answer = object.states[object.currentState].description || errors.invalidLook;
        }

        return answer;
    }

    take (pSubjects)
    {

        const errors = dictionnary.errors;
        const game = dictionnary.game;
        const subject = pSubjects[0];

        let answer = errors.invalidTake;

        if(this.getObjectFromRoom(subject))
        {
            let object = this.getObjectFromRoom(subject);

            if(object.itemId)
            {
                answer = game.take + object.states[object.currentState].name;
                this.removeFromRoom(object.states[object.currentState].name);
                this.addToInventory(object.itemId);
            }
        }


        return answer;
    }

    use (pSubjects)
    {
        const errors = dictionnary.errors;
        const subject = pSubjects[0];

        let answer = errors.invalidUse;

        let mainObject = this.getObjectFromRoom(subject) || this.getObjectFromBag(subject);


        if(mainObject.use)
        {
            let useConditions = mainObject.use;

            if(this.rooms[this.currentRoom].id == useConditions.requiredRoom &&
               pSubjects[1] == useConditions.requiredSubject
            )
            {
                useConditions.effects.map((effect)=>{
                    this.applyEffect(effect);
                });

                answer = useConditions.answer;
            }

        }

        return answer;
    }

    move (pSubjects)
    {
        const errors = dictionnary.errors;
        const subject = pSubjects[0];

        let answer = errors.invalidDirection;


        const direction = this.getDirectionFromRoom(subject);

        if(direction && direction.open)
        {
            this.currentRoom = this.getRoomNumberFromId(direction.to);

            answer = direction.answer;
        }

        return answer;
    }


    // ----------------------------------------------------------------------------------------------------------------- EFFECTS

    addToInventory (pItemId)
    {
        this.character.inventory.push(this.getItemFromId(pItemId));
    }

    removeFromInventory (pItemId)
    {
        this.character.inventory = this.character.inventory.filter((item)=> item.id != pItemId);
    }

    removeFromRoom (pObjectId)
    {
        const room = this.rooms[this.currentRoom];

        room.objects = room.objects.filter((objet)=>objet.states[objet.currentState].name != pObjectId);
    }

    applyEffect (pEffect)
    {
        let answer = "";

        let effectArray = pEffect.split(" ");

        const group = effectArray[0];

        if(group == "action")
        {
            const type = effectArray[1];
            const target = effectArray[2];
            const action = effectArray[3];

            if(type == "room")
            {

                this.applyRoomAction(target,action);
            }
        }
        else if(group == "inventory")
        {
            const effect = effectArray[1];
            const target = effectArray[2];

            if(effect == "add")
            {

            }
            else if(effect == "remove")
            {
                this.removeFromInventory(target);
            }
        }

        return answer;

    }

    applyRoomAction (pRoomId,pActionId)
    {
        this.getRoomActionFromId(pActionId,pRoomId).action();
    }


    // ----------------------------------------------------------------------------------------------------------------- GETTERS

    getObjectFromRoom (pItemId)
    {
        return this.rooms[this.currentRoom].objects.filter((item)=> item.states[item.currentState].name == pItemId)[0];
    }

    getObjectFromBag (pItemId)
    {
        return this.character.inventory.filter((item)=> item.states[item.currentState].name == pItemId)[0];
    }

    getDirectionFromRoom (pDirection)
    {
        return this.rooms[this.currentRoom].directions.filter((direction)=> direction.id == pDirection)[0];
    }

    getRoomActionFromId (pActionId, pRoomId)
    {
        return this.rooms[this.getRoomNumberFromId(pRoomId)].actions.filter((action)=> action.id == pActionId)[0];
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

    getItemFromId (pId)
    {
        return items.items.filter((item)=> item.id == pId)[0];
    }
}

module.exports = WorldInterface;
