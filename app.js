const InputReader       = require('./inputReader');
const WorldInterface    = require('./worldInterface');

let inputReader = new InputReader();

inputReader.init((pSemanticDatas)=>{

    const answer = worldInterface.interpret(pSemanticDatas);
//
    console.log('----> '+ answer);
});

let worldInterface = new WorldInterface();

worldInterface.init();


console.log('----> '+ worldInterface.interpret({
    verb:"look",
    subjects:[]
}));