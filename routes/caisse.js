var express = require('express');
var router = express.Router();
const caisseModel = require('../model/caisse.js')

/* GET users listing. */
router.get('/', function(req, res) {
    caisseModel.journalVentes(0).then(resultats => {
        res.render("caisse", {title: "Caisse", journalInitPage: resultats});
    }).catch(err => {
        res.render("caisse", {title: "Caisse", journalInitPage: null});
    });

});

router.get("/articles", function (req, res) {
    caisseModel.getListeArticles().then(response => res.send(response)).catch(err => res.sendStatus(500))
})

router.post("/vente", function(req, res) {
    caisseModel.payer(
        req.body.article,
        req.body.quantite,
        req.body.client,
        req.body.prix,
        req.body.moyenPairement,
        req.body.permanencier
    ).then(response => res.send(response));
})

router.get("journal/:offset", function(req, res) {
    caisseModel.journalVentes(req.params.offset).then((resultats) => res.send(resultats)).catch(res.send(null));
})

module.exports = router;
