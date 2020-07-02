const connection = require("./connection.js");
const consoleTable = require("console.table");

const orm = {
    select: tableInput => {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function(err, result) {
          if (err) throw err;
          console.table(result);
        });
      }
};

module.exports = orm;