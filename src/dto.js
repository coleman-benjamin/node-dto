const datatype = require("./datatype");
const validation = require("./validation");

const DTO = function(definition, input) {
    this.definition = definition;
    this.input = input;
    this.getResult = null;
};

/*
    Call this to validate the input, and then return the input as is if successful
*/
DTO.prototype.get = function() {
    try {
        this.validateFields();
        return this.input;
    } catch(e) {
        throw e;
    }
};

/*
    Validate all of the input fields against the object definition
*/
DTO.prototype.validateFields = function() /* throws validation exception */ {

    /*
        Check fields marked as required have a value (optional)
    */
    for (let fieldName in this.definition) {
        if (this.definition[fieldName].required && !this.input[fieldName])
            throw "Missing required field : " + fieldName; 
    }

    /*
        Iterate each input field/value to validate against the object definition
    */
    for (let fieldName in this.input) {

        /*
            Verify field is defined
        */
        if (!this.definition[fieldName])
            throw "Invalid field name in input : " + fieldName;

        /*
            Check datatype (optional) and constraints (optional)
        */
        if (this.definition[fieldName].type) {
            switch(this.definition[fieldName].type) {
                case datatype.INTEGER :
                    if (!validation.isInteger(this.input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Integer value";
                    break;
                case datatype.FLOAT :
                    if (!validation.isFloat(this.input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Float value";
                    break;
                case datatype.STRING :
                    if (!validation.isString(this.input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected String value";
                    break;
                case datatype.BOOLEAN :
                    if (!validation.isBoolean(this.input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Boolean value";
                    break;
                case datatype.OBJECT :
                    if (!validation.isObject(this.input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Object value";
                    break;
                case datatype.SERIALIZED_OBJECT :
                    if (!validation.isSerializedObject(this.input[fieldName]))
                        throw "Invalid input : " + fieldName + ". Expected Serialized Object value";
                    break;
            }
        }
    }
};

module.exports = DTO;