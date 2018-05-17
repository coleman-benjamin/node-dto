const chai = require('chai');
const assert = chai.assert;

const DTO = require("../index");
const TestClassDto = require("./TestClassDto");

DTO.registerMappings(__dirname + "/map");

describe('Input Validation Summary', () => {

	it("should successfully accept input with correct values", () => {
		let testInput = {
			field1 : 1,	// See TestClass.js for expected field types, required, and additional rules
			field2 : "string",
			field3 : 1.1,
			field4 : false,
			field5 : {},
			field6 : "{}",
			field7 : 10
		};
		DTO.test(testInput, TestClassDto, (err, result) => {
            assert.equal(result, testInput);
		});
	});

	it("should validate required fields", () => {
		let testInput = {
			field2 : "whatever"
		};
		DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Missing required fields : field1");
		});
	});

	it("should catch invalid field names", () => {
        let testInput = {
            field1 : 1,
            bort : "whatever"
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid field name in input : bort");
        });
	});

	it("should test Integer type", () => {
        let testInput = {
            field1 : "not an int"
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field1. Reason : Value not an int is not an Integer");
        });
	});

	it("should test String type", () => {
        let testInput = {
            field1 : 1,
            field2 : 2
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field2. Reason : Value 2 is not a String");
        });
	});

	it("should test Float type", () => {
        let testInput = {
            field1 : 1,
            field3 : "not a float"
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field3. Reason : Value not a float is not a Float");
        });
	});

	it("should test Boolean type", () => {
        let testInput = {
            field1 : 1,
            field4 : 42
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field4. Reason : Value 42 is not a Boolean");
        });
	});

	it("should test Object type", () => {
        let testInput = {
            field1 : 1,
            field5 : true
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field5. Reason : Value true is not an Object");
        });
	});

	it("should test Serialized Object type", () => {
        let testInput = {
            field1 : 1,
            field6 : {}
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field6. Reason : Value [object Object] is not a Serialized Object");
        });
	});

	it("should test range specification for Integer", () => {
        let testInput = {
            field1 : 1,
            field7 : -1
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field7. Reason : Value -1 is outside of specified range : 0,12");
        });
	});

	it("should test range specification for Float", () => {
        let testInput = {
            field1 : 1,
            field3 : 10.1
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field3. Reason : Value 10.1 is outside of specified range : 0,10");
        });
	});

	it("should test max length for String", () => {
        let testInput = {
            field1 : 1,
            field2 : "123456789"
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field2. Reason : Length of value exceeds specified max length.");
        });
	});

    it("should test min length for String", () => {
        let testInput = {
            field1 : 1,
            field2 : "1"
        };
        DTO.test(testInput, TestClassDto, (err) => {
            assert.equal(err, "Invalid input : field2. Reason : Length of value less than specified min length.");
        });
    });

	it("should map a domain object to a DTO object", () => {
	    let testInput = {
            id : 1,
            name : "The Name",
            password : "Super Secret lolz",
            boot_size : 12,
            field4 : false
        };
        DTO.mapTo("TestClassMap", testInput, TestClassDto, (err, result) => {
            assert.equal(JSON.stringify(result), "{\"field4\":false,\"field2\":\"The Name\",\"field7\":12}");
        });
	});

    it("should map a DTO object to a domain object", () => {
        let testInput = {
            field4 : false,
            field2 : "The Name",
            field7 : 12
        };
       DTO.mapFrom("TestClassMap", testInput, (err, result) => {
           assert.equal(JSON.stringify(result), "{\"name\":\"The Name\",\"boot_size\":12,\"field4\":false}",);
       });
    });
});