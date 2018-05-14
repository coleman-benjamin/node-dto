/*
    A mapping between the domain and DTO objects.
    Fields in the domain that are not found in the DTO definition will be omitted from the returned object,
    and fields that have specific mappings can be mapped as demonstrated below.
*/

module.exports = function(testClassDomain, testClassDto) {
    testClassDto.field2 = testClassDomain.name;
    testClassDto.field7 = testClassDomain.boot_size;
};