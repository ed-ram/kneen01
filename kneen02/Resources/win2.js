module.exports = (function(){
    var win = Ti.UI.createWindow({
        backgroundColor:'#234',
        title: 'Settings'
    });
    var view = Ti.UI.createView({
        width: 300,
        height: 70,
        left: 10,
        top: 10,
        backgroundColor: '#fff',
        borderRadius: 5
    })
    var labelSwitch = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 30,
        top: 20,
        left: 20,
        font: {
            fontSize:14,
            fontFamily: 'Helvetica',
            fontWeight: 'bold'
        },
        text: 'Auto Show Chart?'
    });
    view.add(labelSwitch);

    var switchChartOption = Ti.UI.createSwitch({
        right: 20,
        top: 20,
        value: false
    });

    switchChartOption.addEventListener('change', function(e) {
        win.autoShowChart = switchChartOption.value;
    })

    view.add(switchChartOption);

    win.add(view);

    return win

})();
