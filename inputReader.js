const readline = require('readline');

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

        let inputArray = pLine.split(" ");

        pOnLine(inputArray);
    }


};

module.exports = InputReader;
