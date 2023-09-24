var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js');


router.get('/', function(req, res, next) {
    res.render('login', {session: req.session, title: 'Login' })
})

router.post('/check', function(req, res) {
    var data = req.body

    userModel.read(data.username, data.pswd, function (result) {

        if(result[0].user_type === "admin") {
            req.session.userType = 'admin';
        }
        else if(result[0].user_type === "user") {
            req.session.userType = 'user';
        }
        req.session.username = data.username;
        req.session.pswd = data.pswd;

        return res.redirect('/');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
