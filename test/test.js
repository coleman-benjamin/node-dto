const chai = require('chai');
const assert = chai.assert;

const DTO = require("../index");
const TestClassDto = require("./testClassDto");
const TestClassDomain = require("./testClassDomain");
const TestClassMap = require("./testClassMap");

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
		let result;
		try {
			result = DTO.test(TestClassDto, testInput);
		} catch(e) {
			result = e;
		}
		assert.equal(result, testInput);
	});

	it("should validate required fields", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field2 : "whatever"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Missing required fields : field1");
	});

	it("should catch invalid field names", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				bort : "whatever"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid field name in input : bort");
	});

	it("should test Integer type", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : "not an int"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field1. Reason : Value not an int is not an Integer");
	});

	it("should test String type", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field2 : 2
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field2. Reason : Value 2 is not a String");
	});

	it("should test Float type", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field3 : "not a float"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field3. Reason : Value not a float is not a Float");
	});

	it("should test Boolean type", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field4 : 42
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field4. Reason : Value 42 is not a Boolean");
	});

	it("should test Object type", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field5 : true
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field5. Reason : Value true is not an Object");
	});

	it("should test Serialized Object type", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field6 : {}
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field6. Reason : Value [object Object] is not a Serialized Object");
	});

	it("should test range specification for Integer", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field7 : -1
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field7. Reason : Value -1 is outside of specified range : 0,12");
	});

	it("should test range specification for Float", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field3 : 10.1
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field3. Reason : Value 10.1 is outside of specified range : 0,10");
	});

	it("should test max length for String", () => {
        let result;
		try {
			result = DTO.test(TestClassDto, {
				field1 : 1,
				field2 : "123456789"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field2. Reason : Length of value exceeds specified max length.");
	});

	it("should map a domain object to a DTO object", () => {
		let result;
		try {
			result = DTO.mapTo(TestClassDomain, TestClassDto, TestClassMap);
		} catch(e) {
			result = e;
		}
		assert.equal(JSON.stringify(result), "{\"field4\":false,\"field2\":\"The Name\",\"field7\":12}");
	})
});