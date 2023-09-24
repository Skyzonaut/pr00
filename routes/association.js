var express = require('express');
var router = express.Router();
var associationModel = require('../model/association.js')

router.get('/', function(req, res, next) {
    res.render("association", {session: req.session, title: "Association"});
});

router.post('/request', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
 
    if (data.mailAsso === "" || data.asso === "" || data.president === "" || data.mailPresident === "" || data.telPresident === "" || data.tresorier === "" || data.mailTresorier === "" || data.telTresorier === "" || data.motDePasse === "") {
        return res.redirect('/association');
    }

    associationModel.create(data.mailAsso, data.asso, data.president, data.mailPresident, data.telPresident, data.tresorier, data.mailTresorier, data.telTresorier, data.motDePasse, dateTime, function (result) {
        res.redirect('/');
    });
});

module.exports = router;
