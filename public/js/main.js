/**
 * Created by tegos on 14.03.2017.
 */

$(document).ready(function () {

    var socket = io();

    // defaultUpdate
    socket.on('defaultUpdate', function (data, code) {
        defaultUpdate(data, code);
    });

    // get new  bus
    socket.on('getNewBus', function (data) {
        getNewBus(data);
    });

    // draw route path
    socket.on('drawRoute', function (data) {
        drawRoute(data);
    });

    $("#route_stops input").change(function () {
        var t = $(this);
        var code = t.val();
        var checked = t.prop('checked');
        if (checked) {
            socket.emit('add-bus', code);
        } else {
            socket.emit('remove-bus', code);
            eventRemoveRoute(code);
        }
    });


});



