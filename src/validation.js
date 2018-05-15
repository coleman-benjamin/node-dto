const type = require("./type");

module.exports = {

    /*
        Check fields marked as required have a value (optional)
    */
    testRequired : function(dtoDefinition, input) {
        let missingRequiredFields = [];
        for (let fieldName in dtoDefinition) {
            if (dtoDefinition[fieldName].required && !input.hasOwnProperty(fieldName))
                missingRequiredFields.push(fieldName);
        }

        if (missingRequiredFields.length > 0)
            throw "Missing required fields : " + missingRequiredFields;
    },


    /*
        Check to see if there are any invalid fields names being passed in
    */
    testFieldNames : function(dtoDefinition, input) {
        for (let fieldName in input) {
            if (!dtoDefinition.hasOwnProperty(fieldName))
                throw "Invalid field name in input : " + fieldName;
        }
    },

    /*
        Iterate each input field/value to validate against the object definition
    */
    testTypes : function(dtoDefinition, input) {
        for (let fieldName in input) {
            if (dtoDefinition[fieldName].type) {
                if (type[dtoDefinition[fieldName].type]) { // ignore invalid types in definition
                    try {
                        type[dtoDefinition[fieldName].type].test(dtoDefinition[fieldName], input[fieldName]);
                    } catch (e) {
                        throw "Invalid input : " + fieldName + ". Reason : " + e;
                    }
                }
            }
        }
    }
};