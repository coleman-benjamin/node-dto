module.exports = {
    test : function(definition, input) {
        if (!this.isString(input)) {
            throw "Value " + input + " is not a String";
        }

        if (definition.maxlength) {
            if (!this.isWithinMaxLength(input, definition.maxlength)) {
                throw "Length of value exceeds specified max length.";
            }
        }
    },

    isString : function(i) {
        return (typeof i === "string");
    },

    isWithinMaxLength : function(i, maxlength) {
        return (i.length <= maxlength);
    }
};