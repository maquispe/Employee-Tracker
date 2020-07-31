INSERT INTO department(name) VALUE ("Management");
INSERT INTO department(name) VALUE ("Engineering");
INSERT INTO department(name) VALUE ("Customer Support");
INSERT INTO department(name) VALUE ("Fraud");
 
INSERT INTO role(title, salary, department_id) VALUES ("Manager", "120000", 1);
INSERT INTO role(title, salary, department_id) VALUES ("Software Engineer", "100000", 2);
INSERT INTO role(title, salary, department_id) VALUES ("Fraud Specialist", "90000", 4);
INSERT INTO role(title, salary, department_id) VALUES ("Customer Outreach", "50000", 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Canciano", "Elizarraras", 1, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jasmine", "Parker", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Cindy", "Alvarado", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Manuel", "Tirado", 4, 1);
