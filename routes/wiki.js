var express = require('express');
var router = express.Router();
var wikiModel = require('../model/wiki.js')
const {requireAdmin} = require("../authent");

router.get('/', requireAdmin, function(req, res, next) {
    wikiModel.summary(function(result) {
        res.render('wiki-summary', {session: req.session, title: "Wiki Sommaire", content: result, session: req.session });
    })
});

router.get('/page/:page', requireAdmin, function(req, res, next) {
    wikiModel.readPage(req.params.page,function(result) {
        res.render('wiki', {session: req.session, title: "Wiki", content: result });
    })
});

router.post('/update', requireAdmin, function(req, res, next) {
    wikiModel.update(req.body.title, req.body.content, function(result) {
         return res.redirect('/wiki');
    })
}); 

module.exports = router;
