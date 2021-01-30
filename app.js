//Dependencies

const prompt = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");

// require("console.table");

//Runs app
loadMainMenu();

// Loads main menu
function loadMainMenu() {

    // Renders art logo
    const logoText = logo({ name: "Leandros Employee Manager" }).render();
    console.log(logoText)

    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    {
                        name: "Add Department",
                        value: "add_department",
                    },
                    {
                        name: "Add Role",
                        value: "add_role",
                    },
                    {
                        name: "Add Employee",
                        value: "add_employee",
                    },
                    {
                        name: "View Department",
                        value: "view_department",
                    },
                    {
                        name: "View Role",
                        value: "view_role",
                    },
                    {
                        name: "View Employee",
                        value: "view_employee",
                    },
                    {
                        name: "Update Employee Role",
                        value: "update_employee_role",
                    },
                    {
                        name: "EXIT",
                        value: "exit",
                    },
                ]

            }
        ])
        .then(function (answer) {

            //Passes answer into function
            handleChoices(answer);
        });


};

function handleChoices(answer) {

    //Switch is an alternative to else if statements
    //Research switch
    switch (answer.choice) {
        case "add_department":
            return addDep();
        case "add_role":
            return addRole();
        case "add_employee":
            return addEmp();
        case "view_department":
            return viewDep();
        case "view_role":
            return viewRole();
        case "view_employee":
            return viewEmp();
        case "update_employee_role":
            return updateEmpRole();
        case "EXIT":
            console.log("Goodbye!");
            return connection.end();



    }
}

// WORKS
function addDep() {
    //prompts user
    inquirer
        .prompt([
            {
                name: "newDepartment",
                type: "input",
                message: "What is the name of the new department you'd like to add?"
            },
        ])
        .then(function (answer) { //Adds the input to the database
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.newDepartment,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully! \n");

                    //load the main menu again
                    loadMainMenu();

                }
            );
        });

}

// **THIS IS BROKEN**
function addRole() {
    //query the database for all departments
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "newTitle",
                    type: "input",
                    message: "Enter employee title:"
                },
                {
                    name: "newSalary",
                    type: "input",
                    message: "Enter employee salary:"
                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function chooseDepartment() {

                        inquirer.prompt([
                            {
                                name: "choiceDep",
                                type: "rawlist",
                                choices: function () { 
                                        var choiceArray = [];
                                        for (var i = 0; i < results.length; i++) {
                                            choiceArray.push(results[i].name);
                                        }
                                        return choiceArray;
                                    },
                                    message: "What department does employee belong to?"
                            },
                        ])
                    }
                },
            ])
            .then(function (answer) {
                connection.query(
                    "INSERT into role SET ?",
                    {
                        title: answer.newTitle,
                        salary: answer.newSalary,
                        department_id: answer.departmentId,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your new employee tab was created successfully!");

                        loadMainMenu();
                    }
                );
            })
    });
}

// Employee role prompt needs fixing
function addEmp() {
    inquirer
    .prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employees name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the employees role?"
        },
    ])
    .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.role
            },
            function(err) {
                if (err) throw err;
                console.log("You added a new employee to the database.");

                loadMainMenu();
            }
        )
    })
}

// Works but looks a little janky
function viewDep() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;

        //Creates a table for displaying list of departments in console
        console.table(results);

        
    })

    inquirer
        .prompt([
            {
                name: "return",
                type: "confirm",
                message: "Go back to main menu?"
            }
        ])
        .then(function() {

            loadMainMenu()
        })

}

//Works but looks a little janky
function viewRole() {
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
        console.table(results);
    })

    inquirer
        .prompt([
            {
                name: "return",
                type: "confirm",
                message: "Go back to main menu?"
            }
        ])
        .then(function() {

            loadMainMenu()
        })

}
//Works but looks janky.
function viewEmp() {

    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        console.table(results);
    })

    inquirer
        .prompt([
            {
                name: "return",
                type: "confirm",
                message: "Go back to main menu?"
            }
        ])
        .then(function() {

            loadMainMenu()
        })

}

function updateEmpRole() {

}

