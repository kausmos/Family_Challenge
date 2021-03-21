const Person= require('../Person');
const constants= require('../constants');
class Family{    
    addFamilyHead(name,gender){
        try{
            this.head=new Person(name,gender);
        }catch(e){
            return e.message;
        }        
        
    } 
    addChild(mother,child,gender){
        const member = searchMember(mother,this.head);
        
        if (member===null){
            return constants.messages["PERSON_NOT_FOUND"]
        }else if (child == null || !(gender == "Male"|| gender == "Female") || member.getGender()!="Female" || !member.getSpouse) {
			
            return constants.messages["CHILD_ADDITION_FAILED"];
		}else{ 
            const childMember = new Person(child,gender,member.getSpouse(),member);
            member.addChild(childMember);
            return constants.messages["CHILD_ADDITION_SUCCEEDED"];
        }
    }

    addSpouse(memberName,spouseName, genderOfSpouse){
        
        const member = searchMember(memberName,this.head);        
        if (member===null){
            return constants.messages["PERSON_NOT_FOUND"];
        }
        if(member.getGender()===genderOfSpouse || (member.getSpouse&& member.getSpouse()!=null)) return constants.messages['SPOUSE_ADDITION_FAILED']
        const spouse = new Person(spouseName,genderOfSpouse);        
        spouse.addSpouse(member);
        member.addSpouse(spouse);
        return constants.messages["SPOUSE_ADDITION_SUCCEEDED"];
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
                return relatives.map(x=>x.getName()).join(" ");
            }else{
                return constants.messages["NONE"];
            }
        };        
    }
}

// equivalent of a java private method. This is used by the class but is not exported.

function searchMember(person, head){        
    const membersToCheck=[head];        
    while(membersToCheck.length){
        const member=membersToCheck.pop();
        if (member.getName()===person) return member;
        if (member.getSpouse && member.getSpouse().getName()===person) return member.getSpouse();
        let children=member.getChildren();        
        for(let child of children){
            membersToCheck.push(child);
        }
    }
    return null;
}

module.exports= Family;