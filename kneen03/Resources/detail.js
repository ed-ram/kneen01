module.exports = function() {
    var module = {};

    module.detail = function(evt){
        
    var data = evt.row.data;
    /*console.log('data var from the click event callback: '+JSON.stringify(data));*/
    var detailWindow = Ti.UI.createWindow({
        title: data.title,
        link: data.link,
        backgroundColor: '#fff'
    });
    var favButton = Ti.UI.createButton({
        title: 'Add Fave',
        color: '#000',
        right: 10,
        top: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    favButton.addEventListener('click', function(evt){
        let newId = db.insertFavorite(data.title, data.description, data.link);
        console.log(`Newly created favourite id = '+${newId}`)
        detailWindow.id = newId;
        alert('added to favs');
    })
    detailWindow.add(favButton);

    var deleteButton = Ti.UI.createButton({
        title: 'Remove Fave',
        color: '#000',
        left: 10,
        top: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }); 
    deleteButton.addEventListener('click', function(evt) {
        db.deleteFavorite(data.title);
        console.log(`Deleted ${db.database.rowsAffected} fav records\
        (id ${data.id})`);
        alert('Removed');
    });
    detailWindow.add(deleteButton);
    var lblDescription = Ti.UI.createWebView({
        left: 10,
        top: 60,
        width: 300,
        height: Ti.UI.FILL,
        color: '#5ff',
        html: data.description
    });
    detailWindow.add(lblDescription)
    win.tab.open(detailWindow);
    }
    return module
};
