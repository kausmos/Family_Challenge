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
                response = searchChildren(this,"Female");
                break;
    
            case constants.relationships["SON"]:
                response = searchChildren(this,"Male");
                break;
    
            case constants.relationships["SIBLINGS"]:
                response = searchSiblings(this);
                break;
    
            case constants.relationships["SISTER_IN_LAW"]:
                response = searchInLaws(this,"Female");
                break;
    
            case constants.relationships["BROTHER_IN_LAW"]:
                response = searchInLaws(this,"Male");
                break;
    
            case constants.relationships["MATERNAL_AUNT"]:
                if (this.mother=== null) return null;
                response = searchSiblings(this.mother,"Female");
                break;
    
            case constants.relationships["PATERNAL_AUNT"]:
                if (this.father === null) return null;
                response = searchSiblings(this.father,"Female");
                break;
    
            case constants.relationships["MATERNAL_UNCLE"]:
                if (this.mother=== null) return null;
                response = searchSiblings(this.mother,"Male");
                break;
    
            case constants.relationships["PATERNAL_UNCLE"]:
                if (this.father === null) return null;
                response = searchSiblings(this.father,"Male");
                break;

            default:
                response = constants.messages["RELATIONSHIP_YET_TO_BE_IMPLEMENTED"];
                break;
            }
        return response;
    }        
    
    addSpouse(spouse){
        this.spouse=spouse;
    }

    getChildren(){
        if (this.spouse===null) return [];
        else if (this.gender==="Male"){
            return this.spouse.children;
        }
        return this.children;
    }
    
}

//Private methods for use by the Class only
function searchSiblings(member,gender=null){
    //the gender parameter can be used later for implementation of finding brother and sister
    let response=[];
    if (member==null || !member.mother)return response;
    for (let sibling of member.mother.children){
        if(sibling!==member && (gender===null || sibling.gender===gender)){
            response.push(sibling);
        }
    }
    return response;
}

function searchInLaws(member,gender){
    let response=[];
    if(member && member.spouse!==null) {
        response=response.concat(searchSiblings(member.spouse,gender));
    }
    let siblings=searchSiblings(member);
    for(let sibling of siblings){
        if(sibling.spouse!=null && sibling.spouse.gender==gender){
            response.push(sibling.spouse);
        }
    }
    return response;
}

function searchChildren(parent,gender=null){
    let response=[];
    let wife=null;
    if (parent && parent.spouse!==null){
        if(parent.gender==="Female"){
            response = parent.children
        }else{response= parent.spouse.children}
    }
    return response;
}
module.exports=Person;