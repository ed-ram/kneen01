module.exports = (function(){
    var win = Ti.UI.createWindow({
        title: 'Recipes',
        backgroundColor: '#fff'
    });
    var db = require('./database');
    
    function refresh(cb) {
    var data = [];
    var xhr = Ti.Network.createHTTPClient();
    var searchBar = Ti.UI.createSearchBar({
        showCancel: true,
        height: 55,
        top: 5
    });
    searchBar.addEventListener('change', function(e){
        e.schnerp = 'derp';
        console.log('user search: '+JSON.stringify(e));
    });
    searchBar.addEventListener('return', function(e){
        console.log('search bar return event: '+JSON.stringify(e))
        searchBar.blur();
    });
    searchBar.addEventListener('cancel', function(e){
        console.log('search bar cancel event: '+JSON.stringify(e))
        searchBar.blur();
    });

    var tblRecipes = Ti.UI.createTableView({
        rowHeight:70,
        search: searchBar,
        filterAttribute: 'filter'
    });

    
    if (Ti.Platform.name === "iOS") {
        let pullToRefresh = Ti.UI.createRefreshControl({
            tintColor: "#cc0953"
        });
        tblRecipes.refreshControl = pullToRefresh;

        pullToRefresh.addEventListener('refreshstart', function(evt){
            refresh(function() {
                console.log('pullToRefresh objects refreshstart event handler')
                pullToRefresh.endRefreshing();
            })
        })
    } else if (Ti.Platform.name === "android") {
            win.addEventListener("focus", refresh);
    }
    win.add(tblRecipes);    
    xhr.onload = function() {
        const json = JSON.parse(this.responseText)
        console.log(`here\'s yr json: ${JSON.stringify(json)}`);
        for (var j in json){
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: 'recipe-row',
                filter: [json[j].text1],
                data: {title: json[j].text2,
                        link: json[j].link,
                        description: json[j].description}
            });
            var titleLabel = Ti.UI.createLabel({
                text: json[j].text1+' : '+json[j].text2,
                font: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                left: 70,
                top: 10,
                height: 20,
                width: 210
            });
            row.add(titleLabel);
            var pubDateLabel = Ti.UI.createLabel({
                text: json[j].pubDate,
                font: {
                    fontSize: 10,
                    fontWeight: 'normal'
                },
                left: 70,
                top: 25,
                height: 40,
                width: 200
            });
            row.add(pubDateLabel);
            var iconImage = Ti.UI.createImageView({
                image: 'images/tab2.png',
                width:50,
                height:50,
                length: 10,
                top: 10,
                bottom: 10,
                left: 5,
                backgroundColor: 'green'
            });
            row.add(iconImage);
            data.push(row);
        };
    tblRecipes.addEventListener('click', function(evt) {
        var data = evt.row.data;
        //console.log('data var from the click event callback: '+JSON.stringify(data));*/
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
    })
    tblRecipes.data = data;
    
    };
xhr.onerror = function() {
    console.log(this.status + ' - ' + this.statusText);
};
xhr.open('GET', 'http://localhost:8080/');
xhr.send();

if (typeof cb === 'function') {
    cb();
}
};
refresh();
    return win
})();