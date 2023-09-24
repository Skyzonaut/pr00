var express = require('express');
var router = express.Router();
const caisseModel = require('../model/caisse.js')
const authent = require("../authent");
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

module.exports = router;
