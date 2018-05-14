const DTO = function() {
	this.map = require("./src/map");
	this.datatype = require("./src/datatype");

	// Labels for datatypes when creating a DTO definition
	this.INTEGER = "_INTEGER";
	this.FLOAT = "_FLOAT";
	this.STRING = "_STRING";
	this.BOOLEAN = "_BOOLEAN";
	this.OBJECT = "_OBJECT";
	this.SERIALIZED_OBJECT = "_SERIALIZED_OBJECT";
};

/*
    Tests input data against the DTO definition, and returns input untouched if all valid.
    Wrap this call in a try catch, and whatever is caught will be thrown
*/
DTO.prototype.create = function(definition, input) {
    try {
        this.testInput(definition, input);
        return input;
    } catch(e) {
        throw e;
    }
};

DTO.prototype.mapTo = function(domainObject, dtoDefinition, map) {
    return this.map.mapTo(domainObject, dtoDefinition, map);
};

/*
    Validate all of the input fields against the object definition
*/
DTO.prototype.testInput = function(definition, input) {

    /*
        Check fields marked as required have a value (optional)
    */
    let missingRequiredFields = [];
    for (let fieldName in definition) {
        if (definition[fieldName].required && !input.hasOwnProperty(fieldName))
            missingRequiredFields.push(fieldName);
    }

    if (missingRequiredFields.length > 0)
        throw "Missing required fields : " + missingRequiredFields; 

    /*
        Iterate each input field/value to validate against the object definition
    */
    for (let fieldName in input) {

        /*
            Verify field is defined
        */
        if (!definition.hasOwnProperty(fieldName))
            throw "Invalid field name in input : " + fieldName;

        /*
            Check datatype (optional) and constraints (optional)
        */
        if (definition[fieldName].type) {
            if (this.datatype[definition[fieldName].type]) { // ignore invalid types in definition
                try {
                    this.datatype[definition[fieldName].type].test(definition[fieldName], input[fieldName]);
                } catch (e) {
                    throw "Invalid input : " + fieldName + ". Reason : " + e;
                }
            }
        }
    }
};

module.exports = new DTO();