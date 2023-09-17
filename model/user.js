var db = require('./db.js');
module.exports = {

    read: function (username, pswd, callback) {
        db.query("select * from utilisateurs where username=? and pswd=?", [username, pswd], function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
}