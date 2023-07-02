var express = require('express');
var router = express.Router();
var postersModel = require('../model/posters.js')

router.get('/', function(req, res, next) {
    res.render("posters", {title: "Posters"});
});

router.post('/request', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client

 
    if (data.nom === "" || data.prenom === "" || data.mail === "" || data.quantite === "" || data.format === "" || data.marges === "") {
        return res.redirect('/posters');
    }

    postersModel.create(data.nom, data.prenom, data.mail, data.quantite, data.format, data.marges, data.date, data.fichier, function (result) {
        res.redirect('/');
    });
});

module.exports = router;
