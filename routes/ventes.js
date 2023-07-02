var express = require('express');
var router = express.Router();
var itemModel = require('../model/ventes.js')

/* GET users listing. */
router.get('/fournitures', function(req, res, next) {

    itemModel.read(3, function(result) {
        res.render('ventes', { title: "Catalogue", items: result });
    })

});

router.get('/informatique', function(req, res, next) {

    itemModel.read(7, function(result) {
        res.render('ventes', { title: "Catalogue", items: result });
    })

});

router.get('/services', function(req, res, next) {

    itemModel.read(1, function(result) {
        res.render('ventes', { title: "Catalogue", items: result });
    })

});

router.get('/impressions', function(req, res, next) {

    itemModel.read(5, function(result) {
        res.render('ventes', { title: "Catalogue", items: result });
    })

});

module.exports = router;
