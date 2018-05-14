module.exports = {
    test : function(definition, input) {
        if (!this.isInteger(input)) {
            throw "Value " + input + " is not an Integer";
        }
        if (definition.range) {
            if (!this.isWithinRange(input, definition.range)) {
                throw "Value " + input + " is outside of specified range : " + definition.range;
            }
        }
    },

    isInteger : function(i) {
        let test = Number.parseInt(i);
        return (!isNaN(test) && test === i);
    },

    isWithinRange : function(i, range) {
        return (i >= range[0] && i <= range[1]);
    }
};