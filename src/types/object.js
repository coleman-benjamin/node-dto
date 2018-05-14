module.exports = {
    test : function(definition, input) {
        if (!this.isObject(input)) {
            throw "Value " + input + " is not an Object";
        }
    },

    isObject : function(value) {
        return (typeof value === "object");
    }
};