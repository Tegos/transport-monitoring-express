/**
 * Created by tegos on 10.03.2017.
 */

const requestify = require('requestify');
const apiUrl = require('../utils/apiUrl');

const config = {};
config.timeout = 60000; // 1min

const Model = {
    getBuses: function () {
        const urlBus = apiUrl.getBusUrl();

        return requestify.get(urlBus, config);
    },
    getRoutes: function (code) {
        const urlRoute = apiUrl.getRouteUrl(code);
        return requestify.get(urlRoute, config);
    },
    getPathData: function (code) {
        const urlRoute = apiUrl.getPathUrl(code);
        return requestify.get(urlRoute, config);
    }
};

module.exports = Model;