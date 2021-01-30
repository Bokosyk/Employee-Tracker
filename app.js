//Dependencies

const prompt = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");

// require("console.table");

function init() {

    // Renders art logo
    const logoText = logo ({name: "Leandros Employee Manager"}).render();
    console.log(logoText)
    
    // runs function
    loadMainMenu();

}

// Loads main menu
function loadMainMenu() {
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
        .then(function(answer) {

            //Passes answer into function
            handleChoices(answer);
        });
    

};

function handleChoices(answer) {

    //Switch is an alternative to else if statements
    //Research switch
    switch (answer.choice) {
        case "add_department":
            return  addDep();
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
    .then(function(answer) { //Adds the input to the database
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.newDepartment,
            },
            function(err) {
                if (err) throw err;
                console.log("Your department was created successfully!");
                
                //load the main menu again
                loadMainMenu();

            }
        );
    });

}

function addRole() {
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
            name: "departmentId",
            type: "rawlist",
            message: "What department does employee belong to?",
           //Not finished yet
        },
    ])
    .then(function(answer) {
        connection.query(
        "INSERT into role SET ?",
        {
            title: answer.newTitle,
            salary: answer.newSalary,
            department_id: answer.departmentId,
        },
        function(err) {
            if (err) throw err;
            console.log("Your new employee tab was created successfully!");

            loadMainMenu();
        }
        );
    })
    
}

// Runs function
init();
