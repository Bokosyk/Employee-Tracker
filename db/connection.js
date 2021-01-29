//Dependencies
const util = require('util');
const mysql = require("mysql");

// Establishes connection to database in DBeaver
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "rootroot",
    database: "employees"
})

//Runs connection
connection.connect()


// connection.connect(function(err) {
//     if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
// });


// Runs asyn function
connection.query = util.promisify(connection.query, console.log(""))


// Exports module
module.exports = connection;

