var db = require('./db.js');
module.exports = {
    read: function (callback) {
        db.query("select * from polar_assos", function(err, results){
            if(err) throw err;
            callback(results);
        });},

    create: function (mailAsso, asso, president, mailPresident, telPresident, tresorier, mailTresorier, telTresorier, motDePasse, dateTime, callback) {
        // First, retrieve the name of the organization using the provided siren.
        db.query("INSERT INTO polar_assos (mailAsso, asso, president, mailPresident, telPresident, tresorier, mailTresorier, telTresorier, motDePasse, DateCreation) VALUES(?,?,?,?,?,?,?,?,?,?)",
                    [mailAsso, asso, president, mailPresident, telPresident, tresorier, mailTresorier, telTresorier, motDePasse, dateTime],
                    function (err, insertResults) {
                        if (err) throw err;
                        callback(insertResults);
                    });
    },
    
    
}