var mysql = require("mysql");
var pool = mysql.createPool({
host: "pr00.mysql.database.azure.com", //ou localhost
user: "polar_admin",
password: "P@ssword",
database: "pr00"
});
module.exports = pool;  