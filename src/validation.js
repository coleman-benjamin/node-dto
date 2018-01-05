module.exports = {
	isInteger : function(value) {
		let test = Number.parseInt(value);
		return (!isNaN(test) && test === value);
	},
	isFloat : function(value) {
		let test = Number.parseFloat(value);
		return (!isNaN(test) && test === value);
	},
	isString : function(value) {
		return (typeof value === "string");
	},
	isBoolean : function(value) {
		return (value.toString() === "true" || value.toString() === "false");
	},
	isDate : function(value) {
		return false;
	},
	isObject : function(value) {
		return (typeof value === "object");
	},
	isSerializedObject : function(value) {
		try {
			let test = JSON.parse(value);
			return true;
		} catch (err) {
			return false;
		}
	},
	isWithinRange : function(value, range) {
		return (value >= range[0] && value <= range[1]);
	},
	isWithinMaxLength : function(value, maxlength) {
		return (value.length <= maxlength);
	}
}