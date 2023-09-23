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
                if(results.length > 0) resolve(true)
                else resolve(false)
            })
        })
    },
    validerEmprunt: function(id) {
        return new Promise((resolve, reject) => {
            console.log(id)
            const sql = "select Numero from polar_manuels_flotte where Manuel = ? AND Etat = 'stock' LIMIT 1"
            db.query(sql, id, (err, results) => {
                if(!err) {
                    const modSql = `UPDATE polar_manuels_flotte SET Etat = 'location' WHERE Numero = ${results[0].Numero};`
                    db.query(modSql, (modErr, modResults) => {
                        if(modErr) reject(modErr)
                        resolve(results)
                    })
                } else {
                    reject(err)
                }
            })
        })
    }
}