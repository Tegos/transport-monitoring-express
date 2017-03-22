var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes');
var Model = require('./models/model');

var app = express();


//var middleware = require('./middleware')(app);

// call socket.io to the app
app.io = require('socket.io')();

// configs
app.config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//define routes

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var bus_code = 0;

//start listen with socket.io
app.io.on('connection', function (socket) {
    console.log('new user connected');
    socket.on('new-bus', function (bus_id) {
        console.log('new-bus: ' + bus_id);
        bus_code = bus_id;
    });
});


var intervalDefaultUpdate = setInterval(function () {
    console.log('defaultUpdate');


    var routeDataProm = Model.getRoutes('C2|712989');

    routeDataProm.then(function (response) {
            var content = response.getBody();
            var routeData = JSON.parse(content);
            app.io.emit('defaultUpdate', routeData);
        }
    );


}, app.config.get('defaultUpdate'));


module.exports = app;
