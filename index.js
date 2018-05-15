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
*/

DTO.prototype.test = function(input, dtoDefinition, callback) {
    try {
        validation.testFieldNames(dtoDefinition, input);
        validation.testRequired(dtoDefinition, input);
        validation.testTypes(dtoDefinition, input);
        callback(null, input);
    } catch(e) {
        callback(e);
    }
};

/*
    Maps
 */
DTO.prototype.mapTo = function(domainObject, dtoDefinition, map, callback) {
    try {
        let mappedDto = mapper.mapTo(domainObject, dtoDefinition, map);
        callback(null, mappedDto);
    } catch(e) {
        callback(e);
    }
};

module.exports = new DTO();