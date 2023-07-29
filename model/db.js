var mysql = require("mysql");
var pool = mysql.createPool({
host: "localhost", //ou localhost
user: "user",
password: "user",
database: "pr00"
});
module.exports = pool;  