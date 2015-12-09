var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password);
    res.render('login');
});

module.exports = router;