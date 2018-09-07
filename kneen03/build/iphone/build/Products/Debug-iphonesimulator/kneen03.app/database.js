'use strict';module.exports = function () {
    var db = {};
    db.database = Ti.Database.open('mydb');
    db.database.execute('CREATE TABLE IF NOT EXISTS favorites (ID INTEGER PRIMARY KEY AUTOINCREMENT, TITLE TEXT, LINK TEXT, DESCRIPTION TEXT);');
    db.insertFavorite = function (title, description, link) {
        var sql = 'INSERT INTO favorites (title, description, link) VALUES (\'' + title + '\',\'' + description + '\',\'' + link + '\');';
        db.database.execute(sql);
        return db.database.lastInsertRowId;
    };
    db.deleteFavorite = function (title) {
        var sql = "DELETE FROM favorites WHERE title = '" + title +
        "'";
        db.database.execute(sql);
    };
    return db;
}();