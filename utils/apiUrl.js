var config = require('../config');


var SimpleRIDE_URL = config.get('api:url');

var apiUrl = {
    getBusUrl: function () {
        var url = SimpleRIDE_URL + 'CompositeRoute/';
        return url;
    },
    getRouteUrl: function (code) {
        return SimpleRIDE_URL + 'RouteMonitoring/?code=' + code;
    }
};


module.exports = apiUrl;