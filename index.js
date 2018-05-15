const validation = require("./src/validation");
const mapper = require("./src/map");

const DTO = function() {

	// Labels for datatypes when creating a DTO definition - see /src/datatype.js for mappings
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

DTO.prototype.test = function(definition, input) {
    try {
        validation.testFieldNames(definition, input);
        validation.testRequired(definition, input);
        validation.testTypes(definition, input);
        return input;
    } catch(e) {
        throw e;
    }
};

/*
    Maps
 */
DTO.prototype.mapTo = function(domainObject, dtoDefinition, map) {
    try {
        return mapper.mapTo(domainObject, dtoDefinition, map);
    } catch(e) {
        throw e;
    }
};

module.exports = new DTO();