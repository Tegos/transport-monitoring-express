/**
 * Created by tegos on 10.03.2017.
 */

const requestify = require('requestify');
const apiUrl = require('../utils/apiUrl');

const Model = {
    getBuses: function () {
        const urlBus = apiUrl.getBusUrl();

        return requestify.get(urlBus);
    },
    getRoutes: function (code) {
        const urlRoute = apiUrl.getRouteUrl(code);
        return requestify.get(urlRoute);
    },
    getPathData: function (code) {
        const urlRoute = apiUrl.getPathUrl(code);
        return requestify.get(urlRoute);
    }
};

module.exports = Model;