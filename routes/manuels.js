var express = require('express');
var router = express.Router();
var manuelsModel = require('../model/manuels.js')

router.get("/", function(req, res) {
    manuelsModel.getManuels().then((resultats) => {
        res.render("manuels", {title: "Manuels", manuels: resultats, error: false});
    }).catch((err) => {
        res.render("manuels", {title: "Manuels", manuels: [], error: true});
    })
});


module.exports = router;