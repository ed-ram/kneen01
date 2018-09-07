'use strict';module.exports = function () {
    var win = Ti.UI.createWindow({
        title: 'favourites',
        backgroundColor: '#fff' });

    var db = require('./database');
    return win;
}();