/**
 * Created by tegos on 14.03.2017.
 */

var map;

$(document).ready(function () {

    //Google Maps JS
    function initialize() {
        var myLatlng = new google.maps.LatLng(53.3333, -3.08333);
        var imagePath = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png'
        var mapOptions = {
            zoom: 11,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //Callout Content
        var contentString = 'Some address here..';
        //Set window width + content
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500
        });

        //Add Marker
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: imagePath,
            title: 'image title'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        //Resize Function
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        google.maps.Map.prototype.markers = new Array();

        google.maps.Map.prototype.addMarker = function (marker) {
            this.markers[this.markers.length] = marker;
        };

        google.maps.Map.prototype.getMarkers = function () {
            return this.markers
        };

        google.maps.Map.prototype.clearMarkers = function () {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = new Array();
        };
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    var socket = io();
    //define functions socket.emit sending to server (app.js) and socket.on receiving
    // 'new message' is for the id of the socket and $('#new-message') is for the button
    function sendFunction() {

        $('#new-message').val('');
    }

    // defaultUpdate
    socket.on('defaultUpdate', function (data) {
        defaultUpdate(data);
    });

    $('#send-button').click(function () {
        sendFunction();
    });

    $("#route_stops").justifiedGallery({
        selector: 'div',
        rowHeight: 30,
        maxRowHeight: 30,
        lastRow: 'justify',
        margins: 3,
        caption: true
    });

    $("#route_stops input").change(function () {
        var code = $(this).val();
        socket.emit('new-bus', code);
    });


});

