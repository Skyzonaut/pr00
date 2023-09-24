var db = require('./db.js');
const {DATETIME} = require("mysql/lib/protocol/constants/types");
module.exports = {
    getListeArticles: function() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT CodeCaisse FROM polar_caisse_articles`;
            db.query(sql, function(err, results) {
                if (err) reject(err)
                if (results === null) reject(err)
                if (results.length === 0) reject(err)
                resolve(results)
            })
        })

    },
    ajouterCheque: function(numVente, emetteur, montant, raison, numero) {
        return new Promise((resolve, reject) => {
            if(raison === "" || raison == null) raison = "Le Polar";
            const sql = "INSERT INTO polar_caisse_cheques (NumVente, Date, Numero, Banque, Montant, Emetteur, Ordre, PEC, DateEncaissement, Motif) VALUES "+
                `(?,NOW(),?,'Banque',?,?,?,1,NOW(),null)`;
            db.query(sql, [numVente, numero, montant, emetteur, raison], function(err, results) {
                if(err) reject(err)
                resolve(results);
            })
        })
    },
    payer: function(article, quantite, client, prix, moyenPairement, permanencier) {
        return new Promise((resolve, reject) => {
            let idVente = Math.floor(Math.random() * 100000);
            let tva = (prix/100)*10;
            const sql = "INSERT INTO polar_caisse_ventes (IDVente, Article, Quantite, Date, Finalise, Asso, Client, Facture, PrixFacture, MontantTVA, Tarif, MoyenPaiement, Permanencier) VALUES " +
                `(?,?,?,NOW(),1,null,?,0,?,?,'normal',?,?)`
            db.query(sql, [idVente, article, quantite, client, prix, tva, moyenPairement, permanencier], (err, results) => {
                if(err) reject(err)
                resolve(true)
            })
        })
    },
    journalVentes: function() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT IDVente, Article, Quantite, DATE_FORMAT(Date,'%Y/%m/%d %H:%i:%s') as Date, Client, PrixFacture, MontantTVA, MoyenPaiement, Permanencier FROM polar_caisse_ventes ORDER BY Date DESC`;
            db.query(sql, (err, results) => {
                if(err) reject(false)
                resolve(results)
            });
        })
    }
}