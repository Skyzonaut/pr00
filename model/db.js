var mysql = require("mysql");
var pool = mysql.createPool({
host: "localhost", //ou localhost
user: "root",
password: "",
database: "pr00"
});
module.exports = pool;  