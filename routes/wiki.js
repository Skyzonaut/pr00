var express = require('express');
var router = express.Router();
var wikiModel = require('../model/wiki.js')

router.get('/', function(req, res, next) {
    wikiModel.summary(function(result) {
        res.render('wiki-summary', { title: "Wiki Sommaire", content: result, userType: req.session.userType });
    })
});

router.get('/page/:page', function(req, res, next) {
    wikiModel.readPage(req.params.page,function(result) {
        res.render('wiki', { title: "Wiki", content: result });
    })
});

router.post('/update', function(req, res, next) {
    wikiModel.update(req.body.title, req.body.content, function(result) {
         return res.redirect('/wiki');
    })
}); 

module.exports = router;
