# Family_Challenge
Contains code for Family Codiing Challenge on Geektrust

# How to Run

npm start --silent <input_file_path> [<seed_file_path>]

The seed file initializes the memory with the family tree.
Passing the path to seed file is optional.
If not mentioned, the seed.txt file from the root folder of the project is automatically picked up.
Relative or absolute paths both work for the above.

the input file input.txt may be used for testing. For this run the command:

*npm start --silent ./input.txt* or
*npm start --silent ./input.txt <path_to_custom_seed_file>*


# Overview of Classes:
    - Family Class : Responsible for maintaining the family tree and the head of the family.
    Responsible for adding the family head. Responsible for creating and passing the spouse to a family member.
    Responsible for finding a family member with a given name. Responsible for apssing on getRelationship parameter to member.
    -Person  Class: Responsible for finding a relative according to parameter string passed to it by Family class. Responsible for adding spouse(created and passed by Famly class) to its object
