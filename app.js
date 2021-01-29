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
            console.log(answer)

            //Passes answer into function
            handleChoices(answer);
        });
    

};

function handleChoices(answer) {

    //Switch is an alternative to else if statements
    //Research switch
    switch (answer.choice) {
        case "view_employee":
            return  viewEmp();
        
    
        
    }
}

function viewEmp() {
    console.log("this fucking works")
}

// Runs function
init();
