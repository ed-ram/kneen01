module.exports = (function() {
    var db = {};
    db.database = Ti.Database.open('mydb');
    db.database.execute('CREATE TABLE IF NOT EXISTS favorites (ID INTEGER PRIMARY KEY AUTOINCREMENT, TITLE TEXT, LINK TEXT, DESCRIPTION TEXT);');
    db.insertFavorite = function(title, description, link) {
        let sql = `INSERT INTO favorites (title, description, link) VALUES ('${title}','${description}','${link}');`
        db.database.execute(sql);
        return db.database.lastInsertRowId;
    }
    db.deleteFavorite = function(title) {
        let sql = `DELETE FROM favorites WHERE title = '${title}'`
        db.database.execute(sql);
    };
/*
// returns an array of results from db 
*/
    db.getFavorites = function() {
        let sql = "SELECT * FROM favorites ORDER BY title ASC";
        let results = [];
        let resultSet = db.database.execute(sql);

        while (resultSet.isValidRow()) {
            results.push({
                id: resultSet.fieldByName('id'),
                title: resultSet.fieldByName('title'),
                data: {
                    title: resultSet.fieldByName('title'),
                    description: resultSet.fieldByName('description'),
                    link: resultSet.fieldByName('link'),
                    color: "#000",
                    height: 40,
                }
            })
            resultSet.next();
            }
            resultSet.close();// gotta close to avoid memory leak
            return (results);
        }
    return(db);
    }
)();
