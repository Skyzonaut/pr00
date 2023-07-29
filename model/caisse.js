var db = require('./db.js');
module.exports = {
    getListeArticles: function() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT CodeCaisse FROM polar_caisse_articles`;
            db.query(sql, function(err, results) {
                if (err) reject(false)
                if (results.length === 0) reject(false)
                resolve(results)
            })
        })

    }
}