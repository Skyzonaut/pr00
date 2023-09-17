var express = require('express');
var router = express.Router();
var wikiModel = require('../model/wiki.js')

router.get('/', function(req, res, next) {
    wikiModel.readAll(function(result) {
        res.render('wiki', { title: "Wiki", content: result, userType: req.session.userType });
    })
});

router.post('/update', function(req, res, next) {
    wikiModel.update(req.body.title, req.body.content, function(result) {
         return res.redirect('/wiki');
    })
}); 

module.exports = router;
