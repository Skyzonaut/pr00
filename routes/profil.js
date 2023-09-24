var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('profil', {session: req.session, title: 'Profil' });
});

module.exports = router;