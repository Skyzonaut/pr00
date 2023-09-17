var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js');


router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' })
})

router.post('/check', function(req, res) {
    var data = req.body

    result = userModel.read(data.username, data.pswd, function (result) {

        if(result.userType === "admin") {
            req.session.userType = 'admin';
        }
        else if(result.userType === "user") {
            req.session.userType = 'user';
        }
        req.session.username = data.username;
        req.session.pswd = data.pswd;
        res.locals.userType = req.session.userType;
        return res.redirect('/');

    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
