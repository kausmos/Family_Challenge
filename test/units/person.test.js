const mocha = require('mocha');
const assert= require('assert');
const Person = require('../../Person')
const john= new Person("John","Male");
const constants=require('../../constants');
describe('Person Class ',function(){
    it("should be able to get its properties",()=>{        
        let response=john.getName();
        assert.equal(response,"John");
        response=john.getGender();
        assert.equal(response,"Male");
     });
    it("should not be able to add a child to a male",()=>{        
       let jim = new Person("Jim","Male");
       let response=john.addChild(jim);
       assert.equal(response,constants.messages['CHILD_ADDITION_FAILED']);
        
    });
    it("should not be able to add a child to a single female",()=>{        
        let jane = new Person("Jane","Female");
        let jim = new Person("Jim","Male");
        let response=jane.addChild(jim);
        assert.equal(response,constants.messages['CHILD_ADDITION_FAILED']);         
     });
     it("should be able to add a child to a married female",()=>{        
        let jane = new Person("Jane","Female");
        let jim = new Person("Jim","Male");
        john.addSpouse(jane);
        jane.addSpouse(john);
        let response=jane.addChild(jim);
        assert.equal(response,constants.messages['CHILD_ADDITION_SUCCEDED']);         
     });
     it("should be able to get valid relationships if they exist",()=>{
         let response=john.getRelationship(constants.relationships["SON"]);
         assert.equal(response[0].getName(),"Jim");
     });
     it('should be able to add a get all children',()=>{
        let response=john.getChildren();
        assert.equal(1,response.length);
        assert.equal(response[0].getName(),"Jim");
     });
     it('should be able to add a spouse',()=>{
        let jim = john.getChildren()[0];
        jim.addSpouse(new Person("TestFemale","Female"));
        assert.equal("TestFemale",jim.getSpouse().getName());
     });     
});