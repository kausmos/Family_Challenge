const constants={
    commands:{
        ADD_CHILD: "ADD_CHILD",
        GET_RELATIONSHIP:"GET_RELATIONSHIP",
        ADD_SPOUSE: "ADD_SPOUSE",
        ADD_FAMILY_HEAD:"ADD_FAMILY_HEAD",
    },
    messages:{
        CHILD_ADDITION_FAILED:"CHILD_ADDITION_FAILED",
        CHILD_ADDITION_SUCCEEDED:"CHILD_ADDITION_SUCCEEDED",
        PERSON_NOT_FOUND:"PERSON_NOT_FOUND",
        NONE:"NONE",
        INVALID_INPUT:"INVALID_INPUT",
        RELATIONSHIP_YET_TO_BE_IMPLEMENTED:"RELATIONSHIP_YET_TO_BE_IMPLEMENTED",
    },
    relationships:{
        PATERNAL_UNCLE:"Paternal-Uncle",
        MATERNAL_UNCLE:"Maternal-Uncle",
        PATERNAL_AUNT:"Paternal-Aunt",
        MATERNAL_AUNT:"Maternal-Aunt",
        SISTER_IN_LAW:"Sister-In-Law",
        BROTHER_IN_LAW:"Brother-In-Law",
        SON:"Son",
        DAUGHTER:"Daughter",
        SIBLINGS:"Siblings",
    }
}

module.exports=constants;