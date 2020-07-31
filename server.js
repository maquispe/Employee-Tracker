const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  init();
});

connection.query = util.promisify(connection.query);

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
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Roles",
          "Delete Employee",
          "Delete Role",
          "Delete Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.options) {
        case "View Departments":
          viewDepartment();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Roles":
          updateEmployeeRole();
          break;

        case "Delete Employee":
          deleteEmployee();
          break;

        case "Delete Role":
          deleteRole();
          break;

        case "Delete Department":
          deleteDepartment();
          break;

        case "Exit":
          connection.end();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const viewEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the name of the new department",
    })
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.department,
        },
        (err) => {
          if (err) throw err;
        }
      );
      init();
    });
};

const addRole = () => {
  let departmentArr = [];
  connection.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    res.map((department) =>
      departmentArr.push(department.id + " " + department.name)
    );
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the title of the role?",
        },
        {
          name: "salary",
          type: "number",
          message: "What is the salary for this role?",
        },
        {
          name: "depId",
          type: "list",
          message: "In what department is this role?",
          choices: departmentArr,
        },
      ])
      .then((answers) => {
        let deptChoice = answers.depId.split(" ");

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answers.roleTitle,
            salary: answers.salary,
            department_id: deptChoice[0],
          },
          (err) => {
            if (err) throw err;
          }
        );
        init();
      });
  });
};

const addEmployee = () => {
  let rolesArr = [];
  connection.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    res.map((role) => rolesArr.push(role.id + " " + role.title));
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter the employee's first name",
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter the employee's last name",
        },
        {
          name: "role",
          type: "list",
          message: "Enter the employee's role",
          choices: rolesArr,
        },
      ])
      .then((answers) => {
        let roleChoice = answers.role.split(" ");
        if (roleChoice[0] === "1") {
          connection.query(
            "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
            [answers.firstName, answers.lastName, roleChoice[0]],
            (err) => {
              if (err) throw err;
              console.log("Successfully Inserted!");
              init();
            }
          );
        } else {
          let managerArr = [];
          connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE role_id = 1",
            (err, res) => {
              if (err) throw err;
              res.map((manager) =>
                managerArr.push(
                  manager.id +
                    " " +
                    manager.first_name +
                    " " +
                    manager.last_name
                )
              );
              inquirer
                .prompt({
                  name: "managerId",
                  type: "list",
                  message: "Who is this employee's manager?",
                  choices: managerArr,
                })
                .then((answer) => {
                  let managerChoice = answer.managerId.split(" ");
                  connection.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [
                      answers.firstName,
                      answers.lastName,
                      roleChoice[0],
                      managerChoice[0],
                    ],
                    (err) => {
                      if (err) throw err;
                      console.log("Succesfully Added!");
                      init();
                    }
                  );
                });
            }
          );
        }
      });
  });
};

const updateEmployeeRole = () => {
  let employeeId;
  let roleId;
  let employeeArr = [];
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    (err, res) => {
      if (err) throw err;
      res.map((employee) =>
        employeeArr.push(
          employee.id + " " + employee.first_name + " " + employee.last_name
        )
      );
      inquirer
        .prompt({
          name: "empName",
          type: "list",
          message: "Which employee's role would you like to update?",
          choices: employeeArr,
        })
        .then((answer) => {
          let employeeTemp = answer.empName.split(" ");
          employeeId = employeeTemp[0];
          let roleArr = [];
          connection.query("SELECT id, title FROM role", (err, response) => {
            if (err) throw err;
            response.map((role) => roleArr.push(role.id + " " + role.title));
            inquirer
              .prompt({
                name: "role",
                type: "list",
                message: "Select the employee's new role",
                choices: roleArr,
              })
              .then((data) => {
                let roleTemp = data.role.split(" ");
                roleId = roleTemp[0];
                connection.query(
                  "UPDATE employee SET role_id=? WHERE id = ?",
                  [roleId, employeeId],
                  (err) => {
                    if (err) throw err;
                    console.log("Role successfully updated!");
                    init();
                  }
                );
              });
          });
        });
    }
  );
};

const deleteEmployee = () => {
  let employeeArray = [];
  connection.query("SELECT id, first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    res.map(employee => employeeArray.push(employee.id + " " + employee.first_name + " " + employee.last_name));
    inquirer
      .prompt({
        name: "empName",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employeeArray
      })
      .then(answer => {
        let empChoice = answer.empName.split(" ");
        connection.query("DELETE FROM employee WHERE id= ?", [empChoice[0]], (err, response) => {
          if(err) throw err;
          console.log("Employee successfully eliminated!")
          init();
        })
      });
  });
};

const deleteRole = () => {

};

const deleteDepartment = () => {

};