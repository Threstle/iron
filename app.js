const InputReader       = require('./inputReader');
const WorldInterface   = require('./worldInterface');

let inputReader = new InputReader();

inputReader.init((pInput)=>{

    const answer = worldInterface.interpret(pInput[0],pInput[1],pInput[2]);

    console.log('----> '+ answer);
});

let worldInterface = new WorldInterface();

worldInterface.init();

console.log('----> '+ worldInterface.interpret("look","room"));