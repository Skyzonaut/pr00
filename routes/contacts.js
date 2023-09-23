var express = require('express');
var router = express.Router();
var contactsModel = require('../model/contacts.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("contacts", {title: "Contacts"});
});


router.post('/request', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
 
    if (data.mail === "" || data.sujet === "" || data.message === "") {
        return res.redirect('/contacts');
    }

    contactsModel.create(data.mail, data.sujet, data.message, function (result) {
        res.redirect('/');
    });
});

router.get('/confirm', function(req, res, next) {
    res.render("mailConfirm", {title: "Confirm"});
});
module.exports = router;
