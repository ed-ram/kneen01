var timerStarted = false;
var intTimer = 0;
var points = [];
var route = {};
var distanceTravelled = 0;

import tiMap from 'ti.map';
import {colorThemes} from './colors.js';


let win1 = Ti.UI.createWindow({
    title: 'nav window',
    backgroundColor: '#ccbb55'
});

const annotationExample = tiMap.createAnnotation({
    latitude: 52.233335,
    longitude: 10.1132,
    title: "testo",
    subtitle: "yo yo yo",
    pincolor: tiMap.ANNOTATION_RED,
    myid:1
})

let mapView = tiMap.createView({
    height: 350,
    mapType: tiMap.STANDARD_TYPE,
    region: {
        latitude:   2.233335,
        longitude: 0.113200,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
    },
    animate: true,
    regionFit: true,
    userLocation: true,
    annotations: [annotationExample]
});

var circle = tiMap.createCircle({
    center: {
        latitude: 52.233335,
        longitude: 10.1132,
    },
    radius: 10000,
    fillColor: '#CCFF0000'
});


mapView.addCircle(circle);

/*
let btnView = Ti.UI.createView({
    backgroundColor: 'blue',
    top: 25,
    height: 25
});

let btn = Ti.UI.createLabel({
    text: 'jump',
    color: 'red',

});

btn.addEventListener('click', function(){
    //Ti.Geolocation.purpose = 'get current location'// deprecated
    Ti.Geolocation.getCurrentPosition(function(evt){
        if (evt.error) {
            alert('geoloc error: '+evt.error);
            return;
        }
        var lon = evt.coords.longitude;
        var lat = evt.coords.latitude;
        Ti.API.info(`your location = latitude: ${lat}, longitude: ${lon}`);
        alert(`your location \n latitude: ${lat}\n longitude: ${lon}`)
        mapView.region = {
            latitude:   lat,
            longitude: lon,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }
    })
})

btnView.add(btn)

win1.add(btnView);
*/

const recordCurrentLocation = () => {
    Ti.API.info('getting next position');
    Ti.Geolocation.getCurrentPosition((evt) => {
        Ti.API.info(evt);
        let currentLongitude = evt.coords.longitude;
        let currentLatitude = evt.coords.latitude;
        points.push({
            latitude: currentLatitude, longitude: currentLongitude
        });
        mapView.addRoute(tiMap.createRoute({
            points: points,
            color: 'blue',
            width: 2
        }));
    });
    if(points.length > 1) {
       let url = `http://maps.googleapis.com/maps/api/directions/json?travelMode=Walking&origin=${points[points.length-2].latitude},${points[points.length-2].longitude}&destination=${points[points.length-1].latitude},${points[points.length-1].longitude}&sensor=false`;
       const req = Ti.Network.createHTTPClient();
       req.open('GET', url);
       req.setRequestHeader('Content-Type','application/json; charset=utf-8');
       req.onreadystate = function(){};
       req.onload = function(){
           Ti.API.info(req.responseText);
           let data = JSON.parse(req.responseText);
           Ti.API.info(`distance.text ${data.routes[0].legs[0].distance.text}`)
           Ti.API.info(`distance.value ${data.routes[0].legs[0].distance.value}`)
           distanceTravelled = distanceTravelled + data.routes[0].legs[0].distance.value
       };
       req.send();
    }
}

mapView.addEventListener('click', (evt) => {
    Ti.API.info(`annotation id tapped: ${evt.annotation.id}`)
    Ti.API.info(`annotation button source tapped: ${evt.clicksource}`)
    Ti.API.info(`annotation button title tapped: ${evt.title}`);
    if(timerStarted === false && 
    (evt.clicksource === 'rightButton' && evt.title === 'start location')){
        Ti.API.info('timer will start...');
        points = [];

        Ti.Geolocation.forwardGeocoder(txtStartLocation.value, (evt) => {
            points.push({latitude: evt.latitude,
                        longitude: evt.longitude});
            mapView.addRoute(tiMap.createRoute({
                points: points,
                color: 'blue',
                width: 2
            }));

            timerStarted = true;

            intTimer = setInterval(recordCurrentLocation, 30000)
        });
    } else {
        if(timerStarted === true && 
        (evt.clicksource === 'rightButton' && evt.title === 'end location')){
            clearInterval(intTimer);
            timerStarted = false;
            alert(`you traveled ${distanceTravelled} meters!`);
        }
    }
})

win1.add(mapView)
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

const searchView = Ti.UI.createView({
    top: 0,
    left: 0,
    width: 320,
    height: 110,
    backgroundImage: 'images/gradient.png'
});

const bottomBorder = Ti.UI.createView({
    height: 1,
    width: 320,
    left: 0,
    bottom: 0,
    backgroundColor: '#ccc'
});

searchView.add(bottomBorder);

const txtStartLocation = Ti.UI.createTextField({
    backgroundColor: '#234',
    left: 10,
    top: 20,
    width: 200,
    height: 30,
    borderColor: '#000',
    borderRadius: 5,
    hintText: 'current location',
    padding: {left: 10}
});

searchView.add(txtStartLocation);

const txtEndLocation = Ti.UI.createTextField({
    backgroundColor: '#fff',
    left: 10,
    top: 60,
    width: 200,
    height: 30,
    borderColor: '#000',
    borderRadius: 5,
    hintText: 'end location',
    padding: {left: 10}
});

searchView.add(txtEndLocation);

const btnSearch = Ti.UI.createButton({
    width: 80,
    height: 30,
    top: 60,
    right: 10,
    color: '#ff00bfff',
    title: 'search',
    borderRadius: 3
})

btnSearch.addEventListener('click', function(e) {
    if(txtStartLocation.value !== '') {
        Ti.Geolocation.forwardGeocoder(txtStartLocation.value, (e) => {
            mapView.region = {
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            };
            Ti.API.info(`start location\nlat: ${e.latitude}\nlong: ${e.longitude}`);
            const annotation = tiMap.createAnnotation({
                latitude: e.latitude,
                longitude: e.longitude,
                title: 'start location',
                subtitle: txtStartLocation.value,
                animate: true,
                id: 1,
                pincolor: tiMap.ANNOTATION_GREEN
            });
            annotation.leftButton = 'assets/images/tab2.png';
            annotation.rightButton = 'assets/images/tab1.png';
            mapView.addAnnotation(annotation);
        })
    } else {
        alert('enter a start address!')
    }
    if(txtEndLocation.value !== '') {
        Ti.Geolocation.forwardGeocoder(txtEndLocation.value, function(e) {
            Ti.API.info(`end location\nlat: ${e.latitude}\nlong: ${e.longitude}`);
            const annotation = tiMap.createAnnotation({
                latitude: e.latitude,
                longitude: e.longitude,
                title: 'end location',
                subtitle: txtEndLocation.value,
                animate: true,
                id: 2,
                pincolor: tiMap.ANNOTATION_RED
            });
            annotation.leftButton = 'assets/images/tab2.png';
            annotation.rightButton = 'assets/images/tab1.png';
            mapView.addAnnotation(annotation);
        })
    } else {
        alert('enter an end address!')
    }
})  

searchView.add(btnSearch);

win1.add(searchView)

win1.open();