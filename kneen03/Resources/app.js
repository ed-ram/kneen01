Ti.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup();

var win1 = require("recipes");
var win2 = require("favourites");

var tab1 = Ti.UI.createTab({
    icon: 'cake.png',
    title: 'Recipes',
    window:win1
});

var tab2 = Ti.UI.createTab({
    icon: 'heart.png',
    title: 'Favorites',
    window: win2
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();
