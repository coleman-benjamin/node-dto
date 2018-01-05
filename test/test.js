var chai = require('chai');  
var assert = chai.assert;

var TestClassDto = require("./testClassDto");

describe('Input Validation Summary', () => {

	it("should successfully accept input with correct values", () => {
		var testInput = {
			field1 : 1,
			field2 : "string",
			field3 : 1.1,
			field4 : false,
			field5 : {},
			field6 : "{}"		
		}
		try {
			result = new TestClassDto(testInput);
		} catch(e) {
			result = e;
		}
		assert.equal(result, testInput);
	});

	it("should validate required fields", () => {
		try {
			result = new TestClassDto({
				field2 : "whatever"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Missing required field : field1");
	});

	it("should catch invalid field names", () => {
		try {
			result = new TestClassDto({
				field1 : 1,
				bort : "whatever"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid field name in input : bort");
	});

	it("should test Integer type", () => {
		try {
			result = new TestClassDto({
				field1 : "not an int"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field1. Expected Integer value");
	});

	it("should test String type", () => {
		try {
			result = new TestClassDto({
				field1 : 1,
				field2 : 2
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field2. Expected String value");
	});

	it("should test Float type", () => {
		try {
			result = new TestClassDto({
				field1 : 1,
				field3 : "not a float"
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field3. Expected Float value");
	});

	it("should test Boolean type", () => {
		try {
			result = new TestClassDto({
				field1 : 1,
				field4 : 42
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field4. Expected Boolean value");
	});

	it("should test Object type", () => {
		try {
			result = new TestClassDto({
				field1 : 1,
				field5 : true
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field5. Expected Object value");
	});

	it("should test Serialized Object type", () => {
		try {
			result = new TestClassDto({
				field1 : 1,
				field6 : {}
			});
		} catch(e) {
			result = e;
		}
		assert.equal(result, "Invalid input : field6. Expected Serialized Object value");
	});
});