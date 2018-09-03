module.exports = (function(){

    var win = Ti.UI.createWindow({
        title: 'Recipes',
        backgroundColor: '#fff'
    });
function refresh() {

    var data = [];

    var xhr = Ti.Network.createHTTPClient();

    var tblRecipes = Ti.UI.createTableView();
    win.add(tblRecipes);    

    xhr.onload = function() {
        var json = JSON.parse(this.responseText)

        for (var j in json){
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: 'recipe-row'/*,
                title: 'heres ' + */
            });
            var titleLabel = Ti.UI.createLabel({
                text: json[j].text,
                font: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                left: 70,
                top: 10,
                height: 20,
                width: 210
            })
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
            })
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
            })
            row.add(iconImage);
            data.push(row);
        };
    tblRecipes.data = data;
    };

xhr.onerror = function() {
    console.log(this.status + ' - ' + this.statusText);
};

xhr.open('GET', 'http://localhost:8080/');

xhr.send();
}

refresh();



    return win
})();