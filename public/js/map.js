/**
 * Created by tegos on 14.03.2017.
 */

var map;
var mapUtil;
var mapCanvas;

$.fn.googleMap = function (options) {
    var _this = this;

    var map;

    var settings = $.extend({}, {
        zoom: 5
    }, options);

    this.initialize = function () {

        map = new google.maps.Map(_this.get(0), settings);

        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();

            console.log("Lat=" + lat + "; Lng=" + lng);
        });


        //Resize Function
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });


        _this.data('map', map);

        return _this;
    };


    return this;
};

function MapUtil(map) {
    var _this = this;
    this.map = map;
    var markers = [];

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function (event) {
        _this.addMarker(event.latLng);
    });

    this.deleteMarkers = function () {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    };

    // Adds a marker to the map and push to the array.
    this.addMarker = function (location, id, infoWindow) {
        var marker = new google.maps.Marker({
            id: id,
            position: location,
            icon: 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png',
            map: map
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });


        markers.push(marker);
        //console.log(markers);
    };

    this.getMarkers = function () {
        return markers;
    };

    this.isMarkerOnMap = function (id) {
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            var id_marker = marker.id;
            if (id_marker == id) {
                return true;
            }
        }
        return false;
    };

    this.getMarkerById = function (id) {
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            var id_marker = marker.id;
            if (id_marker == id) {
                return marker;
            }
        }
        return 0;
    };

    this.moveMarker = function (marker, newPosition) {
        marker.animateTo(newPosition);
    };

    return this;
}


window.initMap = function () {
    mapCanvas = $('#map');
    map = mapCanvas.googleMap({
        zoom: 11,
        center: {lat: 49.83709673926922, lng: 24.093017578125},
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    map.initialize();
    mapUtil = new MapUtil(mapCanvas.data('map'));


    $(".clear-marker").click(function () {
        mapUtil.deleteMarkers();
    });

};

