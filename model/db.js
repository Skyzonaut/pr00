var mysql = require("mysql");
var pool = mysql.createPool({
/*host: "polardb.mysql.database.azure.com", //ou localhost
user: "polar_admin",
password: "P@ssword",
database: "pr00",
ssl:{ca:fs.readFileSync("{ca-cert filename}")}
});*/
    host: "localhost", //ou localhost
    user: "root",
    password: "",
    database: "pr00",
    port:3306
});
module.exports = pool;  
