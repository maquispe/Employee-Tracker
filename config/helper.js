const orm = require("./orm.js");
const inquirer = require("inquirer");
const server = require("../server.js");

const helper = {
  addEmployee: () => {
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is this employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new employee's last name?",
        },
      ])
      .then((answers) => {
        orm.addEmployeeInfo(
          "employee",
          "first_name",
          "last_name",
          answers.firstName,
          answers.lastName
        );
      })
      .catch(err => {
        console.log(err);
        server.init();
      });
  },
  addRole: () => {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the role title for the employee",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        },
        {
          name: "department",
          type: "checkbox",
          message: "What department does this role belong to?",
          choices: ["Management", "Engineering", "Customer Support", "Fraud"]
        }
      ])
      .then((answers) => {
        for (let i = 0; i < choices.length; i++) {
          if (answers.department === "Management") {
            orm.addRole("role", "title", "salary", "department_id", answers.title, answers.salary, 1);
          }
          if(answers.department === "Engineering") {
            orm.addRole("role", "title", "salary", "department_id", answers.title, answers.salary, 2);
          }
          if (answers.department === "Customer Support") {
            orm.addRole("role", "title", "salary", "department_id", answers.title, answers.salary, 3);
          }
          if (answers.department === "Fraud") {
            orm.addRole("role", "title", "salary", "department_id", answers.title, answers.salary, 4);
          } 
        }
      })
      .catch(err => {
        console.log(err);
        server.init();
      });
  },
  addDep: () => {
    inquirer.prompt({
      name: "depName",
      type: "input",
      message: "Enter the new department's name",
    })
    .then(answers => {
        orm.addDepartment("department", "name", answers.depName)
    })
    .catch(err => {
        console.log(err);
        server.init();
    })
  },
};

module.exports = helper;
