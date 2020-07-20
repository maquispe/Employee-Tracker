const inquirer = require("inquirer");
const orm = require("./config/orm.js");
const helper = require("./config/helper.js");
const init = () => {
  inquirer
    .prompt([
      {
        name: "welcome",
        type: "input",
        message:
          "Welcome to the Employee Tracker! Press Enter/Return to continue!",
      },
      {
        name: "options",
        type: "list",
        message: "Which of the following actions would you like to perform?",
        choices: [
          "View a specific table",
          "Add a specific employee, role, or department",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      if (answers.options === "View a specific table") {
        viewTable();
      } else if (
        answers.options === "Add a specific employee, role, or department"
      ) {
        addData();
      } else if (answers.options === "Update an employee role") {
        updateRole();
      } else {
        connection.end();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewTable = () => {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "Which one of the following tables would you like to view?",
      choices: ["Employees", "Roles", "Departments"],
    })
    .then((answers) => {
      if (answers.view === "Employees") {
        orm.select("employee");
      } else if (answers.view === "Roles") {
        orm.select("role");
      } else if (answers.view === "Departments") {
        orm.select("department");
      }
    })
    .catch((err) => {
      console.log(err);
      init();
    });
};

const addData = () => {
  inquirer
    .prompt({
      name: "tables",
      type: "list",
      message: "To which of the following tables would you like to add data?",
      choices: ["Departments", "Roles", "Employees"],
    })
    .then((answers) => {
      if (answers.tables === "Employees") {
        helper.addEmployee();
      }
      if (answers.tables === "Roles") {
        helper.addRole();
      }
      if (answers.tables === "Departments") {
        helper.addDep();
      }
    })
    .catch((err) => {
      console.log(err);
      init();
    });
};

exports.init = init;
