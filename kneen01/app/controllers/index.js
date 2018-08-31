var win1 = Ti.UI.createWindow({
    backgroundColor:"#BBB"
});

var view = Ti.UI.createView({
    top: 20,
    bottom: 10,
    left:10,
    right:10,
    backgroundColor:"#FFF",
    borderRadius:2
});

var logo = Ti.UI.createImageView({
    image: "logo.png",
    width: 253,
    height:96,
    top:10
});

win1.add(view);

win1.open();