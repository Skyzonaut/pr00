var mysql = require("mysql");
var pool = mysql.createPool({
host: "polardb.mysql.database.azure.com", //ou localhost
user: "polar_admin",
password: "P@ssword",
database: "pr00",
ssl:{ca:fs.readFileSync("{ca-cert filename}")}
});
module.exports = pool;  
