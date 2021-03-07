const constants=require('../constants');
class Person{
    constructor(name,gender,father=null,mother=null){
        this.name=name;
        this.gender=gender;
        this.spouse=null;
        this.father=father;
        this.mother=mother;
        if(gender==="Female") this.children=[];
    }

    addChild(child){
        if(this.gender==="Female" && this.spouse!==null){
            child.mother=this;
            child.fater=this.spouse;
            this.children.push(child);
           
        }else{
            return(constants.messages["CHILD_ADDITION_FAILED"]);
        }        
    }

    getRelationship(relationship){

        let response=null;
        
        switch (relationship) {

            case constants.relationships["DAUGHTER"]:
                response = this.searchChildren("Female");
                break;
    
            case constants.relationships["SON"]:
                response = this.searchChildren("Male");
                break;
    
            case constants.relationships["SIBLINGS"]:
                response = this.searchSiblings();
                break;
    
            case constants.relationships["SISTER_IN_LAW"]:
                response = this.searchInLaws("Female");
                break;
    
            case constants.relationships["BROTHER_IN_LAW"]:
                response = this.searchInLaws("Male");
                break;
    
            case constants.relationships["MATERNAL_AUNT"]:
                if (this.mother=== null) return null;
                response = this.mother.searchSiblings("Female");
                break;
    
            case constants.relationships["PATERNAL_AUNT"]:
                if (this.father === null) return null;
                response = this.father.searchSiblings("Female");
                break;
    
            case constants.relationships["MATERNAL_UNCLE"]:
                if (this.mother=== null) return null;
                response = this.mother.searchSiblings("Male");
                break;
    
            case constants.relationships["PATERNAL_UNCLE"]:
                if (this.father === null) return null;
                response = this.father.searchSiblings("Male");
                break;

            default:
                response = constants.messages["RELATIONSHIP_YET_TO_BE_IMPLEMENTED"];
                break;
            }
        return response;
    }

    searchChildren(gender=null){
        let response=[];
        let wife=null;
        if (this.spouse!==null){
            if(this.gender==="Female"){
                wife=this;
            }else{wife=this.spouse}
        }
        for(let child of wife.children){
            if (gender!==null && child.gender==gender){
                response.push(child);
            }
        }
        return response;
    }

    searchSiblings(gender=null){
        //the gender parameter can be used later for implementation of finding brother and sister
        let response=[];
        if (this.mother===null)return response;
        for (let sibling of this.mother.children){
            if(sibling!==this && (gender===null || sibling.gender===gender)){
                response.push(sibling);
            }
        }
        return response;
    }

    searchInLaws(gender){
        let response=[];
        if(this.spouse===null) return response;
        response=this.spouse.searchSiblings(gender);
        return response;
    }
    
    addSpouse(spouse){
        this.spouse=spouse;
    }
    
}
module.exports=Person;