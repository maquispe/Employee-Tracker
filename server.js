const inquirer = require("inquirer");
const orm = require("./config/orm.js");

const init = () => {
  inquirer
    .prompt([
      {
        name: "welcome",
        type: "input",
        message: "Welcome to the Employee Tracker!",
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
    .then(answers => {
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
    .catch(err => {
      console.log(err);
      init();
    });
}

const viewTable = () => {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "Which one of the following tables would you like to view?",
      choices: ["Employees", "Roles", "Departments"],
    })
    .then(answers => {
      if (answers.view === "Employees") {
        orm.select("employee");
        init();
      } else if (answers.view === "Roles") {
        orm.select("role");
        init();
      } else if (answers.view === "Departments") {
        orm.select("department");
        init();
      }
    })
    .catch(err => {
      console.log(err);
      init();
    });
}

 
exports.init = init;
