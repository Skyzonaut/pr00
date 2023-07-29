var express = require('express');
var router = express.Router();
const caisseModel = require('../model/caisse.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("caisse", {title: "Caisse"});
});

router.get("/articles", function (req, res) {
    caisseModel.getListeArticles().then(response => res.send(response)).catch(err => res.sendStatus(500))
})

module.exports = router;
