var mongoose = require('../utils/apiUrl');
var config = require('../config');

module.exports = function (req, res, next) {
    console.log('reg');


    var admin = new User({
        username: 'admin',
        password: config.get('project:admin:password'),
        email: config.get('project:admin:email'),
        role: 1
    });
    admin.save(function () {
        console.log('created database ' + config.get('db:name'));
        console.log('created base admin user');

    });


    res.send('909');
    return 0;
};