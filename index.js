const validation = require("./src/validation");
const mapper = require("./src/map");

module.exports = {
    /*
        Labels for types when creating a DTO definition - see /src/type.js for mappings
    */
    INTEGER : "_INTEGER",
    FLOAT : "_FLOAT",
    STRING : "_STRING",
    BOOLEAN : "_BOOLEAN",
    OBJECT : "_OBJECT",
    SERIALIZED_OBJECT : "_SERIALIZED_OBJECT",

    /*
        Tests input data against the DTO definition, and returns input untouched if all valid.
    */
    test : function(input, dtoDefinition, callback) {
        try {
            validation.testFieldNames(dtoDefinition, input);
            validation.testRequired(dtoDefinition, input);
            validation.testTypes(dtoDefinition, input);
            callback(null, input);
        } catch(e) {
            callback(e);
        }
    },

    /*
        Maps domain object to DTO object
    */
    mapTo : function(domainObject, dtoDefinition, map, callback) {
        try {
            let mappedDto = mapper.mapTo(domainObject, dtoDefinition, map);
            callback(null, mappedDto);
        } catch(e) {
            callback(e);
        }
    }
};