const mocha = require('mocha');
const assert= require('assert');
const Family = require('../../Family')
const family= new Family();
describe('Family Class ',function(){
    it('should addFamily head correctly',function(){        
        family.addFamilyHead("Kaustuva","Male");
        assert.equal(family.head.name,'Kaustuva');
        assert.equal(family.head.gender,'Male');
    });
    it('',)
})