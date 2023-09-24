var express = require('express');
var router = express.Router();
var manuelsModel = require('../model/manuels.js')
const {response} = require("express");

router.get("/", function(req, res) {
    manuelsModel.getManuels().then((resultats) => {
        res.render("manuels", {title: "Manuels", manuels: resultats, error: false});
    }).catch((err) => {
        res.render("manuels", {title: "Manuels", manuels: [], error: true});
    })
});

router.get("/location/:id", function (req, res) {
    manuelsModel.verifierDispoManuel(req.params.id).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send({err: err});
    })
})

router.post("/location/valider/", function(req, res) {
    manuelsModel.validerEmprunt(req.body.id).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({err: err});
    })
})


module.exports = router;