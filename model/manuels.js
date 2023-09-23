var db = require('./db.js');

module.exports = {
    getManuels: function() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM polar_manuels;'
            db.query(sql, (err, results) => {
                if(err) reject(err);
                resolve(results);
            })
        })
    },
    verifierDispoManuel: function(id) {
        return new Promise((resolve, reject) => {
            const sql = "select * from polar_manuels_flotte where Manuel = ? AND Etat = 'stock'"
            db.query(sql, id, (err, results) => {
                if(err) reject(err);
                resolve(results);
            })
        })
    }
}