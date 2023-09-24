var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('mentions', { title: 'Mentions' });
});

module.exports = router;
