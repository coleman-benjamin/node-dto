const fs = require("fs");
const path = require("path");

module.exports = {
    loadFunctionsListByPath : function(dir) {
        if (dir.charAt(dir.length - 1) !== "/" || dir.charAt(dir.length - 1) !== "\\") {
            dir += "/";
        }

        let filenames = fs.readdirSync(dir);
        let functionsList = {};

        for(let name in filenames){
            if (path.extname(filenames[name]) === ".js") {
                let className = path.basename(filenames[name], ".js");
                functionsList[className] = require(dir + filenames[name]);
            }
        }

        return functionsList;
    }
};