/**
 * Created by tegos on 14.03.2017.
 */



var defaultUpdate = function (data) {

    //mapUtil.deleteMarkers();
    var markers = mapUtil.getMarkers();

    var newPositionMarker = [];

    data.forEach(function (route) {
        //console.log(route);
        var x = route.X;
        var y = route.Y;
        var busId = route.VehicleId;

        var nameRoute = route.RouteName;

        var BusNumber = route.VehicleName;

        var positionBus = new google.maps.LatLng(y, x);

        console.log(busId);
        console.log(mapUtil.isMarkerOnMap(busId));
        // exist on map -> need move
        if (mapUtil.isMarkerOnMap(busId)) {
            var marker = mapUtil.getMarkerById(busId);
            mapUtil.moveMarker(marker, positionBus);

        } else { // need create

            var contentString = 'Маршрут: <b>' + nameRoute + '</b><br/>' + 'ТЗ: <b>' + BusNumber + '</b>';
            //Set window width + content
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 500
            });

            mapUtil.addMarker(positionBus, busId, infowindow);
            // //Add Marker
            // var marker = new google.maps.Marker({
            //     position: myLatlng,
            //     map: map,
            //     icon: imagePath,
            //     title: 'image title'
            // });

            // google.maps.event.addListener(marker, 'click', function () {
            //     infowindow.open(map, marker);
            // });
        }

        //console.dir(data);
    });

};

var getNewBus = function (data) {

    data.forEach(function (route) {
        var x = route.X;
        var y = route.Y;

        var positionBus = new google.maps.LatLng(y, x);

        //Callout Content
        var contentString = 'Some address here..';
        //Set window width + content
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500
        });

        mapUtil.addMarker(positionBus);
        // //Add Marker
        // var marker = new google.maps.Marker({
        //     position: myLatlng,
        //     map: map,
        //     icon: imagePath,
        //     title: 'image title'
        // });

        // google.maps.event.addListener(marker, 'click', function () {
        //     infowindow.open(map, marker);
        // });

        //console.dir(data);
    });

};