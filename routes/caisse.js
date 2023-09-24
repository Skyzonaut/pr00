var express = require('express');
var router = express.Router();
const caisseModel = require('../model/caisse.js')
const authent = require("../authent");
var data_exporter = require('json2csv').Parser;
/* GET users listing. */

router.get('/', authent.requireAdmin, function(req, res) {
    caisseModel.journalVentes().then(resultats => {
        res.render("caisse", {session: req.session, title: "Caisse", journalInitPage: resultats});
    }).catch(err => {
        res.render("caisse", {session: req.session, title: "Caisse", journalInitPage: null});
    });

});

router.get("/articles", authent.requireAdmin,function (req, res) {
    caisseModel.getListeArticles().then(response => res.send(response)).catch(err => res.sendStatus(500))
})

router.post("/vente", authent.requireAdmin, function(req, res) {
    caisseModel.payer(
        req.body.article,
        req.body.quantite,
        req.body.client,
        req.body.prix,
        req.body.moyenPairement,
        req.body.permanencier
    ).then(response => res.send(response));
})

router.get("journal/:offset", authent.requireAdmin,function(req, res) {
    caisseModel.journalVentes(req.params.offset).then((resultats) => res.send(resultats)).catch(res.send(null));
})

router.get('/export', function(req, res, next){
    caisseModel.journalVentes().then(data => {
        var mysql_data = JSON.parse(JSON.stringify(data));

        //convert JSON to CSV Data

        var file_header = ['First Name', 'Last Name', 'Age', 'Gender'];

        var json_data = new data_exporter({file_header});

        var csv_data = json_data.parse(mysql_data);

        res.setHeader("Content-Type", "text/csv");

        res.setHeader("Content-Disposition", "attachment; filename=export_journal_ventes_"+Date.now()+".csv");

        res.status(200).end(csv_data);
    })
});

module.exports = router;
