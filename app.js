const InputReader       = require('./inputReader');
const WorldInterface    = require('./worldInterface');
const chalk = require('chalk');

let inputReader = new InputReader();

inputReader.init((pSemanticDatas)=>{

    const answer = worldInterface.interpret(pSemanticDatas);

    console.log('----> '+ colorCodeOutput(answer));
});

let worldInterface = new WorldInterface();

worldInterface.init();


console.log('----> '+ colorCodeOutput(worldInterface.interpret({
    verb:"look",
    subjects:[]
})));

function colorCodeOutput (pOutput)
{
    output = "";

    let outputArray = pOutput.split("]");

    outputArray.map((outputSentence)=>{

        let treatedSentence = outputSentence.split("[");

        output+= treatedSentence[0] + chalk.blue(treatedSentence[1] || "");
    })

    return output;
}