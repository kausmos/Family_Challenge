const fs = require('fs');
const readline = require('readline');
const constants=require('../constants');

function processFile(filepath,family,isSeed=false){
    const file = readline.createInterface({
        input: fs.createReadStream(filepath),
        output: process.stdout,
        terminal: false
    });
    file.on('line', (line) => { 
        processLine(line,family,isSeed); 
    });
}

function processLine(line,family,isSeed=false){
    const lineArray=line.split(" ");
    const command=lineArray[0];
    let response=null;
    
    switch(command) {
        case constants.commands['ADD_CHILD']:
            response=family.addChild(lineArray[1],lineArray[2],lineArray[3]);
            break;
        case constants.commands['GET_RELATIONSHIP']:
            response=family.getRelationship(lineArray[1],lineArray[2]);
            break;
        case constants.commands['ADD_FAMILY_HEAD']:
            response=family.addFamilyHead(lineArray[1],lineArray[2]);
            break;
        case constants.commands['ADD_SPOUSE']:
            //console.log(lineArray);
            response=family.addSpouse(lineArray[1],lineArray[2],lineArray[3]);
            break;
        default:
            // code block
        }
        if(!isSeed)console.log(response);
}

module.exports = processFile;