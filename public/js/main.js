/**
 * Created by tegos on 14.03.2017.
 */

$(document).ready(function () {

    var socket = io();

    // defaultUpdate
    socket.on('defaultUpdate', function (data) {
        defaultUpdate(data);
    });

    // get new  bus
    socket.on('getNewBus', function (data) {
        getNewBus(data);
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
        var t = $(this);
        var code = t.val();
        var checked = t.prop('checked');
        if (checked) {
            socket.emit('add-bus', code);
        }else{
            socket.emit('remove-bus', code);
        }
    });


});



