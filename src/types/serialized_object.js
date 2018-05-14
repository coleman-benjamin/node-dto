module.exports = {
    test : function(definition, input) {
        if (!this.isSerializedObject(input)) {
            throw "Value " + input + " is not a Serialized Object";
        }
    },

    isSerializedObject : function(value) {
        try {
            let test = JSON.parse(value);
            return true;
        } catch (err) {
            return false;
        }
    }
};