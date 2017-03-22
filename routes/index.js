var express = require('express');
var router = express.Router();
var requestify = require('requestify');
var config = require('../config');

var Model = require('../models/model');

var register = require('./register');

/* GET users listing. */
router.get('/about', function (req, res, next) {
    res.render('test',
        {test: 909, title: 'test'}
    );
});

/* GET home page. */
router.get('/', function (req, res, next) {
    var view_data = {title: 'ExpressRouteMap Lviv'};
    var buses = Model.getBuses();

    buses.then(function (response) {
            var content = response.getBody();
            view_data.stops = JSON.parse(content);

            res.render('pages/index',
                view_data
            );
        }
    );


});

/* GET Json Data */
router.get('/json', function (req, res, next) {
    console.log('get json');

    var buses = Model.getBuses();

    buses.then(function (response) {
            var content = response.getBody();
            var json = JSON.parse(content);
            res.send(json);
        }
    );

    console.log(buses);

});


router.get('/register', register);


module.exports = router;
