/**** 
 * This is a Behaviour Driven Development styled test suite.
 * This is not a true unit test for Family unit, which would require stubbing/mocking of the Person class dependency methods
 * A library such as Sinon will be used for the mocking/stubbing in the next commits
 * This may be considered as a joint testing of (Family+Person) class
*/
const mocha = require('mocha');
const assert= require('assert');
const Family = require('../../Family')
const family= new Family();
const constants=require('../../constants');
describe('Family Class ',function(){
    it("should not be able to add family head when data on name or gender is missing",()=>{        
       family.addFamilyHead("Kaustuva");
        assert.equal(family.head,null);
        family.addFamilyHead(null,"Male");
        assert.equal(family.head,null);
    });
    it('should addFamily head correctly when given gender and name',()=>{        
        family.addFamilyHead("Kaustuva","Male");
        assert.equal(family.head.getName(),'Kaustuva');
        assert.equal(family.head.getGender(),'Male');
    });    
    it('should add a spouse to family head correctly',function(){
        family.addSpouse(family.head.getName(),"Test","Female");
        assert.equal(family.head.getSpouse().getName(),"Test");
    });
    it('should not be able to add a child without its name or valid gender',function(){
        let response = family.addChild("Test","TestChild");
        assert.equal(response,constants.messages["CHILD_ADDITION_FAILED"]);
        response = family.addChild("Test",null,"Male");
        assert.equal(response,constants.messages["CHILD_ADDITION_FAILED"]);
        response = family.addChild("Test","TestChild","xyz");
        assert.equal(response,constants.messages["CHILD_ADDITION_FAILED"]);
    });
    it('should not be able to add a child to a male member',function(){
        let response = family.addChild("Kaustuva","TestChild","Male");
        assert.equal(response,constants.messages["CHILD_ADDITION_FAILED"]);        
    });    
    it("should not be able to add a child if mother does not exist or is null",function(){
        let response = family.addChild("Gal","Test","TestChild");
        assert.equal(response,constants.messages["PERSON_NOT_FOUND"]);
        response = family.addChild(null,"TestChild","Male");
        assert.equal(response,constants.messages["PERSON_NOT_FOUND"]);
    });
    it("should be able to add a child to a married female",function(){
        
        let response = family.addChild("Test","TestChild","Female");
        assert.equal(response,constants.messages["CHILD_ADDITION_SUCCEEDED"]);
        
    });
    it("should not be able to add a child to a single female",function(){
        
        let response = family.addChild("TestChild","TestGrandson","Male");
        assert.equal(response,constants.messages["CHILD_ADDITION_FAILED"]);
        
    });
    it('should not be able to add a spouse to family member of same gender',function(){
        let response=family.addSpouse("TestChild","Test","Female");
        assert.equal(response,constants.messages['SPOUSE_ADDITION_FAILED']);
    });
    it('should add a spouse to family member correctly',function(){
        let response=family.addSpouse("TestChild","Test","Male");
        assert.equal(response,constants.messages['SPOUSE_ADDITION_SUCCEEDED']);
    });
    it('should not be able to add a spouse to already married member',function(){
        let response=family.addSpouse("TestChild","Test","Male");
        assert.equal(response,constants.messages['SPOUSE_ADDITION_FAILED']);
    });
    it('should not be able to get valid relationships',function(){
        let response=family.getRelationship("Test","Daughter");
        assert.equal(response,"TestChild");
        response=family.getRelationship("Kaustuva","Daughter");
        assert.equal(response,"TestChild");
    });
    it('should be able handle relationships yet to be implemented',function(){
        let response=family.getRelationship("Test","Great-grandson");
        assert.equal(response,constants.messages["RELATIONSHIP_YET_TO_BE_IMPLEMENTED"]);
    });
    it('should be able to handle no persons of said relationship found',function(){
        let response=family.getRelationship("Test",constants.relationships["BROTHER_IN_LAW"]);
        assert.equal(response,constants.messages["NONE"]);
    });
})