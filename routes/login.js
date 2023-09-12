var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js')

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' })
})

router.post('/check', function(req, res, next) {
    var data = req.body

    result = userModel.read(data.username, data.pswd, function(result) {
        if(result === "admin") {
            req.session.userType = 'admin';
        }
        else if(result === "user") {
            req.session.userType = 'user';
        }
        res.redirect('/');
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
