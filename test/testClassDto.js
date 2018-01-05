var DTO = require("../index");

var TestClassDto = {
    field1 : {
        type : DTO.datatype.INTEGER,
        required : true
    },
    field2 : {
        type : DTO.datatype.STRING
    },
    field3 : {
        type : DTO.datatype.FLOAT
    },
    field4 : {
        type : DTO.datatype.BOOLEAN
    },
    field5 : {
        type : DTO.datatype.OBJECT
    },
    field6 : {
        type : DTO.datatype.SERIALIZED_OBJECT
    }
};

module.exports = function(input) {
    try {
        return new DTO.dto(TestClassDto, input).get();
    } catch(e) {
        throw e;
    }
};