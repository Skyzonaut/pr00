var db = require('./db.js');

module.exports = {
    readAll: function (callback) {
        db.query("SELECT * FROM polar_wiki", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    read: function (name, callback) {
        db.query("SELECT * FROM polar_wiki WHERE Titre = ?", [name], function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    update: function (name, description, callback) {
        db.query("UPDATE polar_wiki SET Contenu = ? WHERE Titre = ?;", [description, name], function(err, results){
            if(err) throw err;
            callback(results);
        });
    }
}