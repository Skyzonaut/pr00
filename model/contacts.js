var db = require('./db.js');
module.exports = {
    read: function (callback) {
        db.query("select * from polar_contacts", function(err, results){
            if(err) throw err;
            callback(results);
        });},

    create: function (mail, sujet, message, callback) {
        // First, retrieve the name of the organization using the provided siren.
        db.query("INSERT INTO polar_contacts (mail, sujet, message) VALUES(?,?,?)",
                    [mail, sujet, message],
                    function (err, insertResults) {
                        if (err) throw err;
                        callback(insertResults);
                    });
    },
    
    
}