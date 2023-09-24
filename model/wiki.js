var db = require('./db.js');

module.exports = {
    readAll: function (callback) {
        db.query("SELECT * FROM polar_wiki ORDER BY Page ASC", function(err, results){
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

    summary: function(callback) {
        db.query("SELECT Page, Titre FROM polar_wiki GROUP BY Page, Categorie ORDER BY Page;", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readPage: function (page, callback) {
        db.query("SELECT * FROM polar_wiki WHERE Page = ? GROUP BY Page, Categorie", [page], function(err, results){
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