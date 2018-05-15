module.exports = {

	/*
		Map a domain object to the defined DTO
	*/
    mapTo : function(domainObject, dtoDefinition, map) {
        let returnObj = {};

        // Check for fields in DTO definition with the same name
        for (let field in domainObject) {
            if (dtoDefinition.hasOwnProperty(field)) {
                returnObj[field] = domainObject[field];
            }
        }

        // Check for mapped fields defined in the map
        if (map) {
            map(domainObject, returnObj);
        }

        return returnObj;
    }
};