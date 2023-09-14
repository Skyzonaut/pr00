var db = require('./db.js');

module.exports = {
    readAll: function (callback) {
        db.query("SELECT * FROM polar_wiki_content", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    read: function (name, callback) {
        db.query("SELECT * FROM polar_wiki_content WHERE Name = ?", [name], function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    update: function (name, description, callback) {
        db.query("UPDATE polar_wiki_content SET Description = ? WHERE Name = ?;", [description, name], function(err, results){
            if(err) throw err;
            callback(results);
        });
    }
}