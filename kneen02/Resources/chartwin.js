module.exports = (function() {
  var chartWin = Ti.UI.createWindow({
      title: 'Loan Pie Chart'
  });
  chartWin.addEventListener("open", function(){
      var chartTitleInterest = 'Total Interest: $'+chartWin.totalInterest;
      var chartTitleRepayments = 'Total Repayments: $'+chartWin.totalRepayments;
      var chartHTML = '<html><head><title>TESTORINO</title><meta name="viewport" content="width=device-width, initial-scale=1.0" />\
      <script src="charts/raphael-min.js" type="text/javascript" charset="utf-8"></script>\
      <script src="charts/g.raphael-min.js" type="text/javascript" charset="utf-8"></script>\
      <script src="charts/g.pie-min.js" type="text/javascript" charset="utf-8"></script>\
      <script type="text/javascript" charset="utf-8">\
      window.onload = function() {\
        var r = Raphael("chartDiv"); r.text.font = "12px Verdana, Tahoma, sans-serif";\
        r.text(150,10, "';
        chartHTML = chartHTML + chartTitleInterest +
        '").attr({"font-size":14}); r.text(150, 30, "'+chartTitleRepayments+'").attr({"font-size":14});';
        chartHTML=chartHTML+'r.piechart(150, 180, 130, ['+ Math.round(chartWin.totalInterest) + ',' + Math.round(chartWin.principalRepayments) +
        ']); };\
      </script> </head><body> <div id="chartDiv" style="width:320px; height:320px;\
      margin: 0"></div><h1>whtup</h1></body></html>';
        
      var webview = Ti.UI.createWebView({
          width: Ti.UI.FILL,
          height: Ti.UI.FILL,
          top: 0,
          url:  'chart.html'
          //html: chartHTML
      });

      chartWin.add(webview);
  })

  return chartWin;
})();