var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("raclette", {session: req.session,title: "Raclette"});
});

router.get('/confirm', function(req, res, next) {
    res.render("reservationConfirm", {title: "Confirm", content: "raclette"});
});
module.exports = router;
