/**
 * Created by tegos on 10.03.2017.
 */

var requestify = require('requestify');
var apiUrl = require('../utils/apiUrl');

var Model = {
    getBuses: function () {
        var urlBus = apiUrl.getBusUrl();

        return requestify.get(urlBus);
    },
    getRoutes: function (code) {
        var urlRoute = apiUrl.getRouteUrl(code);

        return requestify.get(urlRoute);
    }
};


module.exports = Model;

