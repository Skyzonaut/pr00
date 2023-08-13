var express = require('express');
var router = express.Router();
var itemModel = require('../model/ventes.js')

router.get('/', function(req, res, next) {
    itemModel.read(req.query.title, function(result) {
        res.render('wiki', { title: "Wiki", content: result });
    })
});

router.get('/update', function(req, res, next) {
    itemModel.update(req.body.title, req.body.content, function(result) {
         res.render('wiki', { title: "Wiki", content: result});
    })
}); 

module.exports = router;
