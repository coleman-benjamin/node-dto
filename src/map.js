module.exports = {

	/*
		For storing added mappings.
	*/
	mappings : {},

	addMap : function(mapId, map) {
		this.mappings[mapId] = map;
	},

	/*
		Map a domain object to the defined DTO
	*/
    mapTo : function(mapId, domainObject, dtoDefinition) {
        let returnObj = {};

        // Check for fields in DTO definition with the same name
        for (let field in domainObject) {
            if (dtoDefinition.hasOwnProperty(field)) {
                returnObj[field] = domainObject[field];
            }
        }
		console.log(this.mappings);
        // Check for mapped fields defined in the map
		if (mapId && this.mappings[mapId]) {
			this.mappings[mapId](domainObject, returnObj);
		}

        return returnObj;
    }
};