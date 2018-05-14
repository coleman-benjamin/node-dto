const Map = function() {};

Map.prototype.mapTo = function(domainObject, dtoDefinition, map) {
	let returnObj = {};
	for (let field in domainObject) {
		if (dtoDefinition.hasOwnProperty(field)) {
			returnObj[field] = domainObject[field];
		}
	}

	if (map) {
        map(domainObject, returnObj);
	}

	return returnObj;
};

module.exports =  new Map();