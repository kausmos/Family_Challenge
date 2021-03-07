//import file processor
const processFile= require ("./fileprocessor");
const Family=require("./Family");
//add this to try catch
const inputFileLocation = process.argv[2];
const seedFileLocation = process.argv[3] ? process.argv[3] : __dirname+'/seed.txt';
const family= new Family();


// console.log(seedFileLocation,family);
// console.log(inputFileLocation,family);
processFile(seedFileLocation,family,true);
processFile(inputFileLocation,family);

