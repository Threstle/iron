const chalk = require('chalk');

const InputReader       = require('./inputReader');
const WorldInterface    = require('./worldInterface');

const dictionnary = require('./data/dictionnary');

let inputReader = new InputReader();

inputReader.init((pSemanticDatas)=>{

    const answer = worldInterface.interpret(pSemanticDatas);

    console.log('----> '+

        colorCodeAllOutput(

            decodeImages(
                answer
            )

    ));
});

let worldInterface = new WorldInterface();

worldInterface.init();


console.log('----> '+ colorCodeAllOutput(worldInterface.interpret({
    verb:"look",
    subjects:[]
})));

function decodeImages (pOutput)
{
    output = "";

    let outputArray = pOutput.split(">");

    outputArray.map((outputSentence)=>{

        let treatedSentence = outputSentence.split("<");

        output+= treatedSentence[0] + (dictionnary.images[treatedSentence[1]] || "");
    });

    return output;
}

function colorCodeAllOutput(pInput) {

    colorCodes = [
        {
            start:"[",
            stop:"]",
            color:chalk.blue
        },
        {
            start:"@",
            stop:"#",
            color:chalk.red
        }
    ].map(
        (color)=>{
            pInput = colorCode(pInput,color);
        }
    );

    return pInput;

}

function colorCode (pInput,pColor)
{

    let output = "";

    let outputArray = pInput.split(pColor.stop);

    outputArray.map((outputSentence)=>{

        let treatedSentence = outputSentence.split(pColor.start);

        output+= treatedSentence[0] + pColor.color(treatedSentence[1] || "");
    });


    return output;


}