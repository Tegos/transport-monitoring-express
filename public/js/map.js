/**
 * Created by tegos on 14.03.2017.
 */

$.fn.googleMap = function (options) {
    var _this = this;

    var settings = $.extend({}, {
        zoom: 5,
        centerLat: 0,
        centerLon: 0
    }, options);

    this.initialize = function () {
        var mapOptions = {
            zoom: settings.zoom
        };

        var map = new google.maps.Map(_this.get(0), mapOptions);
        // do anything with your map object here,
        // eg: centering map, adding markers' events

        /********************************************
         * This is the trick!
         * set map object to element's data attribute
         ********************************************/
        _this.data('map', map);

        return _this;
    };
    // ... more methods

    return this;
};

