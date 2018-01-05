const DTO = require("../index");

const TestClassDto = {
    field1 : {
        type : DTO.datatype.INTEGER,
        required : true
    },
    field2 : {
        type : DTO.datatype.STRING,
        maxlength : 8
    },
    field3 : {
        type : DTO.datatype.FLOAT,
        range : [0, 10]
    },
    field4 : {
        type : DTO.datatype.BOOLEAN
    },
    field5 : {
        type : DTO.datatype.OBJECT
    },
    field6 : {
        type : DTO.datatype.SERIALIZED_OBJECT
    },
    field7 : {
        type : DTO.datatype.INTEGER,
        range : [0, 10]
    }
};

module.exports = function(input) {
    try {
        return DTO.create(TestClassDto, input);
    } catch(e) {
        throw e;
    }
};