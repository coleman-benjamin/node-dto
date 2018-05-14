module.exports = {
    test : function(definition, input) {
        if (!this.isFloat(input)) {
            throw "Value " + input + " is not a Float";
        }
        if (definition.range) {
            if (!this.isWithinRange(input, definition.range)) {
                throw "Value " + input + " is outside of specified range : " + definition.range;
            }
        }
    },

    isFloat : function(i) {
        let test = Number.parseFloat(i);
        return (!isNaN(test) && test === i);
    },

    isWithinRange : function(i, range) {
        return (i >= range[0] && i <= range[1]);
    }
};