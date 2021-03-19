const Person= require('../Person');
const constants= require('../constants');
class Family{    
    addFamilyHead(name,gender){        
        this.head=new Person(name,gender);
    }

    

    getRelationship(person,relationship){
        let relatives=[];
        const member= searchMember(person,this.head);
        if(!relationship.length){
            return constants.messages["INVALID_INPUT"];
        }
        if (member===null){
            return constants.messages["PERSON_NOT_FOUND"]
        }else{
            relatives = member.getRelationship(relationship);
            if (relatives.length){
                if (relatives===constants.messages["RELATIONSHIP_YET_TO_BE_IMPLEMENTED"]) return relatives;
                return relatives.map(x=>x.name).join(" ");
            }else{
                return constants.messages["NONE"];
            }
        };        
    }

    addChild(mother,child,gender){
        const member = searchMember(mother,this.head);
        if (member===null){
            return constants.messages["PERSON_NOT_FOUND"]
        }else if (child == null || gender == null || member.gender!="Female" || member.spouse===null) {
			return constants.messages["CHILD_ADDITION_FAILED"];
		}else{ 
            const childMember = new Person(child,gender,member.spouse,member);
            member.addChild(childMember);
            return constants.messages["CHILD_ADDITION_SUCCEEDED"];
        }
    }

    addSpouse(memberName,spouseName, genderOfSpouse){
        let response=[];
        const member = searchMember(memberName,this.head);        
        if (member===null){
            return constants.messages["PERSON_NOT_FOUND"];
        }
        const spouse = new Person(spouseName,genderOfSpouse);        
        spouse.addSpouse(member);
        member.addSpouse(spouse);        
    }


}

// equivalent of a java private method. This is used by the class but is not exported.

function searchMember(person, head){        
    const membersToCheck=[head];        
    while(membersToCheck.length){
        const member=membersToCheck.pop();
        if (member.name===person) return member;
        if (member.spouse && member.spouse.name===person) return member.spouse;
        let children=member.getChildren();        
        for(let child of children){
            membersToCheck.push(child);
        }
    }
    return null;
}

module.exports= Family;