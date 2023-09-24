var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("videoprojecteur", {session: req.session,title: "videoprojecteur"});
});

router.get('/confirm', function(req, res, next) {
    res.render("reservationConfirm", {session: req.session,title: "Confirm", content: "vidéoprojecteur"});
});


module.exports = router;
