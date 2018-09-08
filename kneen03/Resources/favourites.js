const db = require('./database');

module.exports = (function(){
    
    let win = Ti.UI.createWindow({
        title: 'favourites',
        backgroundColor: '#fff'
    });
    
    let tblFavorites = Ti.UI.createTableView();
    
    win.add(tblFavorites);
    
    function loadFavorites() {
        let data = [];
        data = db.getFavorites();// returns an array of row objects
        tblFavorites.data = data;// a table view can be populated \
        //by replacing its data with this array
    };
    
    win.addEventListener('focus', loadFavorites);

    return win
})();