const validation = require("./src/validation");
const mapper = require("./src/map");
const load = require("./src/load");

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
    mapTo : function(mapId, domainObject, dtoDefinition, callback) {
        try {
            let mappedDto = mapper.mapTo(mapId, domainObject, dtoDefinition);
            callback(null, mappedDto);
        } catch(e) {
            callback(e);
        }
    },

    /*
        Maps DTO object to domain object
    */
    mapFrom : function(mapId, dtoObject, dtoDefinition, callback) {
        try {
            this.test(dtoObject, dtoDefinition, (err, result) => {
                if (err) callback(err);
                else {
                    let mappedDomain = mapper.mapFrom(mapId, result);
                    callback(null, mappedDomain);
                }
            });
        } catch(e) {
            callback(e);
        }
    },

    /*
        Register a mapping
    */
    addMap : function(mapId, map) {
        mapper.addMap(mapId, map);
    },

    /*
        Register all mappings within a directory
    */
    registerMappings : function(mappingDir) {
        let exportList = load.loadByPath(mappingDir);
        for (let e in exportList) {
            mapper.addMap(e, exportList[e]);
        }
    }
};