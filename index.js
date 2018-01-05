const DTO = function() {
	this.map = require("./src/map");
	this.datatype = require("./src/datatype");
	this.validation = require("./src/validation");
}

/*
    Tests input data against the DTO definition, and returns input untouched if all valid
*/
DTO.prototype.create = function(definition, input) {
    try {
        this.validateInput(definition, input);
        return input;
    } catch(e) {
        throw e;
    }
}

/*
    Validate all of the input fields against the object definition
*/
DTO.prototype.validateInput = function(definition, input) {

    /*
        Check fields marked as required have a value (optional)
    */
    let missingRequiredFields = [];
    for (let fieldName in definition) {
        if (definition[fieldName].required && !input[fieldName])
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
        if (!definition[fieldName])
            throw "Invalid field name in input : " + fieldName;

        /*
            Check datatype (optional) and constraints (optional)
        */
        if (definition[fieldName].type) {
            switch(definition[fieldName].type) {
                /*
                    TEST INTEGER
                */
                case this.datatype.INTEGER :
                    if (!this.validation.isInteger(input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Integer value";
                    if (definition[fieldName].range)
                        if (!this.validation.isWithinRange(input[fieldName], definition[fieldName].range))
                            throw "Invalid input : " + fieldName + ". Out of specified range : " + definition[fieldName].range;
                    break;

                /*
                    TEST FLOAT
                */
                case this.datatype.FLOAT :
                    if (!this.validation.isFloat(input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Float value";
                    if (definition[fieldName].range)
                        if (!this.validation.isWithinRange(input[fieldName], definition[fieldName].range))
                            throw "Invalid input : " + fieldName + ". Out of specified range : " + definition[fieldName].range;
                    break;

                /*
                    TEST STRING
                */
                case this.datatype.STRING :
                    if (!this.validation.isString(input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected String value";
                    if (definition[fieldName].maxlength)
                        if (!this.validation.isWithinMaxLength(input[fieldName], definition[fieldName].maxlength))
                            throw "Invalid input : " + fieldName + ". Length of value exceeds specified max length.";
                    break;

                /*
                    TEST BOOLEAN
                */
                case this.datatype.BOOLEAN :
                    if (!this.validation.isBoolean(input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Boolean value";
                    break;

                /*
                    TEST OBJECT
                */
                case this.datatype.OBJECT :
                    if (!this.validation.isObject(input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Object value";
                    break;

                /*
                    TEST SERIALIZED OBJECT
                */
                case this.datatype.SERIALIZED_OBJECT :
                    if (!this.validation.isSerializedObject(input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Serialized Object value";
                    break;
            }
        }
    }
}

module.exports = new DTO();