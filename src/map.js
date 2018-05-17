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

        this.mapCommonFields(domainObject, dtoDefinition, returnObj);

		if (this.hasMap(mapId)) {
		    for (let mapField in this.mappings[mapId]) {
		        returnObj[this.mappings[mapId][mapField]] = domainObject[mapField];
            }
		}

        return returnObj;
    },

    /*
        Map a DTO object to a domain object
    */
    mapFrom : function(mapId, dtoObject) {
        let returnObj = {};

        if (this.hasMap(mapId)) {
            for (let mapField in this.mappings[mapId]) {
                returnObj[mapField] = dtoObject[this.mappings[mapId][mapField]];
            }

            for (let dtoField in dtoObject) {
                if (!this.hasFieldMapping(mapId, dtoField)) {
                    returnObj[dtoField] = dtoObject[dtoField];
                }
            }
        } else {
            returnObj = dtoObject;
        }

        return returnObj;
    },

    mapCommonFields : function(a, b, mapped) {
        for (let field in a) {
            if (b.hasOwnProperty(field)) {
                mapped[field] = a[field];
            }
        }
    },

    hasMap : function(mapId) {
        return mapId && this.mappings[mapId];
    },

    hasFieldMapping : function(mapId, field) {
        for (let mapField in this.mappings[mapId]) {
            if (mapField === field) return true;
            else if(this.mappings[mapId][mapField] === field) return true;
        }
        return false;
    }
};