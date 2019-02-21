const readline      = require('readline');
const verbs         = require('./data/verbs');


class InputReader{

    constructor (){

    };

    init (pOnLine = ()=>{})
    {

        this.reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.reader.on('line',(line)=>{
            this.analyse(line,pOnLine);
        });
    };

    analyse (pLine,pOnLine)
    {
        // On transforme l'input en tableau de mots
        let inputArray = pLine.split(" ");

        // On récupère les infos du verbe, toujours en première partie de la phrase
        const verb = this.getVerbByName(inputArray[0]);

        let semanticDatas = {
            verb : verb.verb
        };

        if(verb.subjects == 1)
        {
            inputArray.shift();
            semanticDatas.subjects = [inputArray.join(" ")];
        }
        else if(verb.subjects == 2)
        {
            const separator = inputArray.indexOf(verb.preposition);

            if(separator != -1)
            {
                const firstWord = inputArray.slice(1, separator).join(" ");
                const lastWord = inputArray.slice(separator+1,inputArray.length).join(" ");
                semanticDatas.subjects = [firstWord,lastWord];
            }
            else
            {
                inputArray.shift();
                semanticDatas.subjects = [inputArray.join(" ")];
            }


        }


        pOnLine(semanticDatas);
    };


    // ----------------------------------------------------------------------------------------------------------------- GETTERS

    getVerbByName (pVerb)
    {
        return verbs.list.filter((verb)=> verb.verb == pVerb)[0];
    }


};

module.exports = InputReader;
