const connection = require("./connection.js");
const consoleTable = require("console.table");
const server = require("../server.js");

const orm = {
  select: tableInput => {
    const queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], (err, result) => {
      if (err) throw err;
      console.table(result);
      server.init();
    });
  },
  addEmployeeInfo: (tableInput, tableCol1, tableCol2, firstName, lastName) => {
    const queryString = "INSERT INTO ??(??, ??) VALUES (?, ?)";
    connection.query(
      queryString,
      [tableInput, tableCol1, tableCol2, firstName, lastName],
      (err, result) => {
        if (err) throw err;
        console.log("Employee added successfully!")
        server.init();
      }
    );
  },
  addRole: (tableInput, tableCol1, tableCol2, tableCol3, title, salary, depId) => {
    const queryString = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)";
    connection.query(
      queryString,
      [tableInput, tableCol1, tableCol2, tableCol3, title, salary],
      (err, result) => {
        if (err) throw err;
        console.log("Role added successfully!")
        server.init();
      }
    );
  },
  addDepartment: (tableInput, tableCol, depName) => {
    const queryString = "INSERT INTO ??(??) VALUE (?)";
    connection.query(
      queryString,
      [tableInput, tableCol, depName],
      (err, result) => {
        if (err) throw err;
        console.log("Department added successfully!");
        server.init();
      }
    );
  }
};

module.exports = orm;
