const constants=require('../constants');
class Person{
    constructor(name,gender,father=null,mother=null){
       if(name===null || gender==null) throw new Error(constants.messages['INVALID_INPUT']);
        this.getName=()=>{return name};        
        this.getGender=()=>{return gender};        
        this.getFather=()=>{return father};        
        this.getMother=()=>{return mother};        
        if(gender==="Female"){
            this.children=[];                      
        }       
    }

    addChild(child){
        if(this.getGender()==="Female" && this.getSpouse()!==null){
            child.setMother(this);
            child.setFather(this.getSpouse());
            //Choosing not to use setter below since getters pass around actual reference
            //of reference types
            this.getChildren().push(child);
           
        }else{
            return(constants.messages["CHILD_ADDITION_FAILED"]);
        }        
    }

    setMother(mother){
        this.getMother=()=>{return mother};        
    }

    setFather(father){
        this.getFather=()=>{return father};        
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
                if (this.getMother()=== null) return null;
                response = searchSiblings(this.getMother(),"Female");
                break;
    
            case constants.relationships["PATERNAL_AUNT"]:
                if (this.getFather() === null) return null;
                response = searchSiblings(this.getFather(),"Female");
                break;
    
            case constants.relationships["MATERNAL_UNCLE"]:
                if (this.getMother()=== null) return null;
                response = searchSiblings(this.getMother(),"Male");
                break;
    
            case constants.relationships["PATERNAL_UNCLE"]:
                if (this.getFather() === null) return null;
                response = searchSiblings(this.getFather(),"Male");
                break;

            default:
                response = constants.messages["RELATIONSHIP_YET_TO_BE_IMPLEMENTED"];
                break;
            }
        return response;
    }        
    
    addSpouse(spouse){        
        this.getSpouse=()=>spouse;        
    }

    getChildren(){
        if (this.getSpouse===undefined || this.getSpouse()===null) return [];
        else if (this.getGender()==="Male"){
            return this.getSpouse().children;
        }
        return this.children;
    }
    
}

//Private methods for use by the Class only
function searchSiblings(member,gender=null){
    //the gender parameter can be used later for implementation of finding brother and sister
    let response=[];
    if (member===null || member.getMother()===null)return response;
    for (let sibling of member.getMother().getChildren()){
        if(sibling!==member && (gender===null || sibling.getGender()===gender)){
            response.push(sibling);
        }
    }
    return response;
}

function searchInLaws(member,gender){
    let response=[];
    if(member && member.getSpouse) {
        response=response.concat(searchSiblings(member.getSpouse(),gender));
    }
    let siblings=searchSiblings(member);
    for(let sibling of siblings){
        if(sibling.getSpouse && sibling.getSpouse().getGender()==gender){
            response.push(sibling.getSpouse());
        }
    }
    return response;
}

function searchChildren(parent,gender=null){
    let response=[];    
    if (parent && parent.getSpouse){
        response= parent.getChildren();
    }
    return response;
}

module.exports=Person;