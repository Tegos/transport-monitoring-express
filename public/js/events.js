/**
 * Created by tegos on 14.03.2017.
 */


var defaultUpdate = function (data) {

    map.clearMarkers();

    data.forEach(function (route) {
        var x = route.X;
        var y = route.Y;
        var imagePath = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png';
        var myLatlng = new google.maps.LatLng(y, x);

        //Add Marker
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: imagePath,
            title: 'image title'
        });

        console.log(data);
        console.log(y);
    });

};

$(document).ready(function () {

    //Google Maps JS
    //Set Map
    function initialize909() {


        var mapOptions = {
            zoom: 11,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


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
    }
});