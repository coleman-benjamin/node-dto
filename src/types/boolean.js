module.exports = {
    test : function(definition, input) {
        if (!this.isBoolean(input)) {
            throw "Value " + input + " is not a Boolean";
        }
    },

    isBoolean : function(value) {
        return (value.toString() === "true" || value.toString() === "false");
    }
};