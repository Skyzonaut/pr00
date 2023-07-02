let mysql = require("mysql");
let pool = mysql.createPool({
    host: "localhost:3306",
    user: "user",
    password: "user",
    database: "pr00"
});
module.exports = pool;