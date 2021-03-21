const fs = require('fs');
const readline = require('readline');
const constants=require('../constants');

function processFile(filepath,family,isSeed=false){    
              
        
            const inputStream=fs.createReadStream(filepath);
            inputStream.on("error",(err)=>{
                if(err.code==='ENOENT'){
                    console.log("!!!Incorrect input file location, you may use ./input.txt if you wish!!!");
                }
                });
            const file = readline.createInterface({
                input: inputStream,
                output: process.stdout,
                terminal: false
            });
            file.on('error',(e)=>{console.log("Error while reading from file. Error Code:"+e.code)});
            file.on('line', (line) => {
                try{
                    processLine(line,family,isSeed); 
                } catch(e){
                    console.log("Following error ocurred during operations: "+e.message);                    
                }             
                
            });
    
}
    
    

//private function, not exported/exposed outside.
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
        if(!isSeed && response!==null)console.log(response);
}

module.exports = processFile;