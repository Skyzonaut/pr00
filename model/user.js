var db = require('./db.js');
module.exports = {

    read: function (username, pswd, callback) {
        db.query("select userType from Utilisateurs where username = ? and password = ?", username, pswd, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
}