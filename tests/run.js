var fs = require("fs");

fs.readdirSync("./cases").forEach(function(file) {
  require("./cases/" + file);
});

// 146 test cases
