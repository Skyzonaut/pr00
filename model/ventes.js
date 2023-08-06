var db = require('./db.js');
module.exports = {
    
    read: function (secteur, offset, callback) {

        db.query("SELECT DISTINCT * from polar_caisse_articles WHERE EnVente = 1 AND Secteur = ? AND (Stock > 0 OR Stock IS NULL) LIMIT 50 OFFSET ?", [secteur, (offset-1) * 30], function(err, results){
            if(err) throw err;
            callback(results);
        });
    }

}