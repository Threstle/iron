const rooms             = require('./data/rooms/rooms');
const events            = require('./data/events/events');
const items             = require('./data/items');
const dictionnary       = require('./data/dictionnary');
const Character 	    = require('./character');
const characterData     = require('./data/character');

class WorldInterface{

    constructor (){
    };

    init ()
    {
        this.character = new Character(characterData.defaultStats);

        this.rooms = rooms;
        this.events = events;
        this.currentRoom = 0;
        this.currentEvent = null;
    };

    interpret (pSemanticDatas)
    {

        const verb = pSemanticDatas.verb;
        const subjects = pSemanticDatas.subjects;

        // En premier on vérifie si il y a un event en cours
        if(this.currentEvent)
        {
            let answer = "";

            const escapeWords = this.currentEvent.escapeWords;

            // En cas de victoire
            if(escapeWords.includes(verb))
            {
                const effectAnswer = this.applyEffect(this.currentEvent.successEffect);
                answer = this.currentEvent.successDescription + " " + effectAnswer;
                this.currentEvent = null;

                return answer;
            }

            // On passe au step suivant
            this.currentEvent.currentStep++;

            // En cas d'échec
            if(this.currentEvent.currentStep >= this.currentEvent.steps.length)
            {
                const effectAnswer = this.applyEffect(this.currentEvent.failEffect);
                answer = this.currentEvent.failDescription +" "+ effectAnswer;
                this.currentEvent = null;

                return answer;
            }

            answer = "@"+this.currentEvent.steps[this.currentEvent.currentStep]+"#";



            return answer;
        }
        else if(this[verb])
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
                let effectsAnswer = "";

                mainSubjectState[verb].effects.map((effect)=>{
                    effectsAnswer+= " "+this.applyEffect(effect);
                });

                return mainSubjectState[verb].answer + effectsAnswer;
            }
            else
            {
                //TODO : erreur
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

        if(mainObject != undefined && mainObject.use)
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

        // On récupère la direction voulue par le joueur
        const direction = this.getDirectionFromRoom(subject);

        // Si la direction existe et qu'elle ouverte
        if(direction && direction.open)
        {
            // On lance l'event de la room sortante si il y en a un
            answer = this.launchRoomEvent(this.currentRoom,"onLeave");

            // On met à jour currentRoom
            this.currentRoom = this.getRoomNumberFromId(direction.to);

            // On construit la réponse
            answer+= direction.answer + "\n\n" + this.rooms[this.currentRoom].description;

            // On lance l'event de la room entrante si il y en a un
            answer += this.launchRoomEvent(this.currentRoom,"onEnter");


        }

        return answer;
    }

    launchRoomEvent (pRoomNumber,pEvent)
    {
        let answer = "";

        let room = this.rooms[pRoomNumber];

        if(!room[pEvent])return answer;

        // Si l'event est sensé se répéter, où qu'il n'a pas été encore déclenché
        if(room[pEvent].repeat || !room[pEvent].done )
        {
            // On lance l'event de sortie de la room en court
            answer = " "+this.applyEffect(room[pEvent].event);

            room[pEvent].done = true;
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
        else if(group == "user")
        {
            const effect = effectArray[1];

            if(effect == "die")
            {
                answer = this.die();
            }
        }
        else if(group == "event")
        {
            const event = effectArray[1];

            this.currentEvent = this.getEventFromId(event);

            answer = "@"+this.currentEvent.steps[this.currentEvent.currentStep]+"#";
        }
        return answer;

    }

    applyRoomAction (pRoomId,pActionId)
    {
        this.getRoomActionFromId(pActionId,pRoomId).action();
    }

    checkEvent (pEvent)
    {

    }

    // ----------------------------------------------------------------------------------------------------------------- USER

    die ()
    {
        return "\n \n"+dictionnary.images.death;
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
        let directionChosen;

        this.rooms[this.currentRoom].directions.map((direction)=>{

            direction.names.map((name)=>{
                if(name == pDirection)
                {
                    directionChosen = direction;
                }
            });

        });

        return directionChosen;
    }

    getRoomActionFromId (pActionId, pRoomId)
    {
        return this.rooms[this.getRoomNumberFromId(pRoomId)].actions.filter((action)=> action.id == pActionId)[0];
    }

    getEventFromId (pEventID)
    {
        return this.events.filter((event)=> event.id == pEventID)[0];
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
