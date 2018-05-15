/*
    An example DTO definition
*/

const DTO = require("../index");

module.exports = {
    field1 : {
        type : DTO.INTEGER,
        required : true
    },
    field2 : {
        type : DTO.STRING,
        maxlength : 8,
        minlength : 2
    },
    field3 : {
        type : DTO.FLOAT,
        range : [0, 10]
    },
    field4 : {
        type : DTO.BOOLEAN
    },
    field5 : {
        type : DTO.OBJECT
    },
    field6 : {
        type : DTO.SERIALIZED_OBJECT
    },
    field7 : {
        type : DTO.INTEGER,
        range : [0, 12]
    }
};