var db = require('./db.js');
module.exports = {
    read: function (callback) {
        db.query("select * from polar_posters", function(err, results){
            if(err) throw err;
            callback(results);
        });},

    create: function (nom, prenom, mail, quantite, format, marges, date, fichier, callback) {
        // First, retrieve the name of the organization using the provided siren.
        db.query("INSERT INTO polar_posters (nom, prenom, mail, quantite, format, marges, date, fichier) VALUES(?,?,?,?,?,?,?,?)",
                    [nom, prenom, mail, quantite, format, marges, date, fichier],
                    function (err, insertResults) {
                        if (err) throw err;
                        callback(insertResults);
                    });
    },
    
    
}