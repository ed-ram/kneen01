'use strict';var _ti = require('ti.map');var _ti2 = _interopRequireDefault(_ti);
var _colors = require('./colors.js');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var d = _colors.colorThemes.poop;

var win1 = Ti.UI.createWindow({
    title: 'nav window',
    backgroundColor: '#ccbb55' });


var annotationExample = _ti2.default.createAnnotation({
    latitude: 52.233335,
    longitude: 10.1132,
    title: "testo",
    subtitle: "yo yo yo",
    pincolor: _ti2.default.ANNOTATION_RED,
    myid: 1 });


var mapView = _ti2.default.createView({
    height: 350,
    mapType: _ti2.default.STANDARD_TYPE,
    region: {
        latitude: 2.233335,
        longitude: 0.113200,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25 },

    animate: true,
    regionFit: true,
    userLocation: true,
    annotations: [annotationExample] });


var circle = _ti2.default.createCircle({
    center: {
        latitude: 52.233335,
        longitude: 10.1132 },

    radius: 10000,
    fillColor: '#CCFF0000' });



mapView.addCircle(circle);

var btnView = Ti.UI.createView({
    backgroundColor: 'blue',
    top: 25,
    height: 25 });


var btn = Ti.UI.createLabel({
    text: 'jump',
    color: d.front });



btn.addEventListener('click', function () {
    /*Ti.Geolocation.purpose = 'get current location'*/ // deprecated
    Ti.Geolocation.getCurrentPosition(function (evt) {
        if (evt.error) {
            alert('geoloc error: ' + evt.error);
            return;
        }
        var lon = evt.coords.longitude;
        var lat = evt.coords.latitude;
        Ti.API.info('your location = latitude: ' + lat + ', longitude: ' + lon);
        alert('your location \n latitude: ' + lat + '\n longitude: ' + lon);
        mapView.region = {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1 };

    });
});

btnView.add(btn);

win1.add(btnView);

win1.add(mapView);
/*
                   Ti.Geolocation.getCurrentPosition(function(evt) {
                       if (evt.error) {
                           alert('geolocation not available on your device');
                           return
                       }
                       alert(evt.coords)
                       let {longitude, latitude, altitude, heading, accuracy, speed, timestamp, altitudeAccuracy} = evt.coords;
                       mapView.region = {
                           latitude: latitude,
                           longitude: longitude,
                           latitudeDelta: 0.5,
                           longitudeDelta: 0.5
                       }
                   })
                   */


win1.open();