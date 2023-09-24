var express = require('express');
var router = express.Router();
var itemModel = require('../model/ventes.js')

router.get('/fournitures', function(req, res, next) {

    var index = parseInt(req.query.index);
    itemModel.read(3, index, function(result) {
        res.render('ventes', { title: "Catalogue", items: result, current: index, from: index -3, to: index +4, userType: req.session.userType });
    })

});

router.get('/informatique', function(req, res, next) {

    var index = parseInt(req.query.index);
    itemModel.read(7, index, function(result) {
        res.render('ventes', { title: "Catalogue", items: result, current: index,from: index -3, to: index +4, userType: req.session.userType });
    })
});

router.get('/services', function(req, res, next) {

    var index = parseInt(req.query.index);
    itemModel.read(1, index, function(result) {
        res.render('ventes', { title: "Catalogue", items: result, current: index, from: index -3, to: index +4, userType: req.session.userType });
    })
});

router.get('/impressions', function(req, res, next) {

    var index = parseInt(req.query.index);
    itemModel.read(5, index, function(result) {
        res.render('ventes', { title: "Catalogue", items: result, current: index, from: index -3, to: index +4, userType: req.session.userType });
    })
});

module.exports = router;
