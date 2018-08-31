var tabGroup = Ti.UI.createTabGroup();

var numberOfMonths = 36,
    interestRate = 7.0;

var win1 = Ti.UI.createWindow({
    backgroundColor:"#FFF",
    title:"calculator"
});

var view = Ti.UI.createView({
    top:20, 
    bottom:20,
    left:20,
    right:20,
    backgroundColor:"#AAA",
    borderRadius:2,
    layout:"vertical"
});

var ammountRow = Ti.UI.createView({
    top:10,
    left:0,
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE
});

var labelAmmount = Ti.UI.createLabel({
    width:Ti.UI.SIZE,
    height:30,
    top:0,
    left:20,
    font:{
        fontSize:14,
        fontFamily:'Helvetica',
        fontWeight:'bold'
    },
    text:'Loan ammount   $'
});

/* BUTTON BAR */
var flexSpace = Ti.UI.createButton({
    systemButton:Ti.UI.iOS.SystemButton.FELXIBLE_SPACE
});

var buttonDone = Ti.UI.createButton({
    systemButton:Ti.UI.iOS.SystemButton.DONE,
    bottom: 0
});

buttonDone.addEventListener('click', (e) => {
    tfAmount.blur();
    tfInterestRate.blur();
    interestRate = tfInterestRate.value;
});

var tfAmount = Ti.UI.createTextField({
        width: 140,
        hieght:30,
        right:20,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        hintText: '1000',
        keyboardToolbar: [flexSpace, buttonDone],
        keyboardType: Ti.UI.KEYBOARD_TYPE_PHONE_PAD
})

ammountRow.add(tfAmount);

ammountRow.add(labelAmmount);

/*
var tfAmount = Ti.UI.createTextField({
    width: 140,
    height: 30,
    right: 20,
    borderStyle: Ti.UI.INPUT_BORDER_STYLE_ROUNDED,
    returnKeyType: Ti.UI.RETURN_KEY_DONE,
    hintText: '1000.00'
});

ammountRow.add(tfAmount);
*/
view.add(ammountRow);

/* INETEREST RATE STUFF */
var interestRateRow =  Ti.UI.createView({
    top:10,
    left:0,
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE
});

var labelInterestRate = Ti.UI.createLabel({
    width:Ti.UI.SIZE,
    height:30,
    top:0,
    left:20,
    font:{
        fontSize:14,
        fontFamily:'Helvetica',
        fontWeight:'bold'
    },
    text:'Interest Rate:   %'
});

interestRateRow.add(labelInterestRate);

const tfInterestRate = Ti.UI.createTextField({
    width: 140,
    hieght:30,
    right:20,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    returnKeyType: Ti.UI.RETURNKEY_DONE,
    hintText: interestRate,
    keyboardToolbar: [flexSpace, buttonDone],
    keyboardType: Ti.UI.KEYBOARD_TYPE_PHONE_PAD
});

interestRateRow.add(tfInterestRate);

var lengthSlider = Ti.UI.createSlider({
    width: 140,
    top: 200,
    right: 20,
    min: 12,
    max: 60,
    value: numberOfMonths,
    thumbImage: 'sliderThumb.png',
    highlightedThumbImage: 'sliderThumbSelected.png'
});

view.add(interestRateRow);

const loanLengthRow = Ti.UI.createView({
      top:10,
      left:0,
      width:Ti.UI.FILL,
      height:Ti.UI.SIZE
});

var labelLoanLength = Ti.UI.createLabel({
    width:Ti.UI.SIZE,
    height:30,
    top:0,
    left:20,
    font:{
        fontSize:14,
        fontFamily:'Helvetica',
        fontWeight:'bold'
    },
    text:'Loan length: ' + numberOfMonths + ' months'
});

loanLengthRow.add(labelLoanLength);

lengthSlider.addEventListener('change', function(e){
    console.log(lengthSlider.value);
    numberOfMonths = Math.round(lengthSlider.value);
    labelLoanLength.text = 'loany lengthy (' + Math.round(numberOfMonths) + ' months';
});

loanLengthRow.add(lengthSlider);

view.add(loanLengthRow);

var buttonCalculateInterest = Ti.UI.createButton({
    title: 'Calculate Total Interest',
    id: 1,
    top: 10
})

buttonCalculateInterest.addEventListener('click', calculateAndDisplayValue);

view.add(buttonCalculateInterest);

var buttonCalculateRepayments = Ti.UI.createButton({
    title: 'Calculate Total Repayments',
    id: 2,
    top: 10
});

buttonCalculateRepayments.addEventListener('click', calculateAndDisplayValue);

function calculateAndDisplayValue(e){
    console.log('Button id = ' + e.source.id);
    if (tfAmount.value === '' || tfAmount.value === null) {
        var errorDialogue = Ti.UI.createAlertDialog({
            title: 'Error!',
            message: 'You gotta give abn ammounbt bro'
        });
        errorDialogue.show();
        return;
        }

    if (e.source.id == 1) {
        var totalInterest = (tfAmount.value * (interestRate / 100) * numberOfMonths) / 12;
        console.log(`Total interest = ${totalInterest}`);
        var optionsMessage = `Total interest on dis loan equates to $${totalInterest}`
    } else {
        var totalInterest = (tfAmount.value * (interestRate / 100) * numberOfMonths) / 12;
        var totalRepayments = Math.round(tfAmount.value) + totalInterest;
        console.log(`Total repayments ${totalRepayments}`);
        var optionsMessage = `Total repayments on this here loan equates to $${totalRepayments}`;
    }
    if (win2.autoShowChart == true) {
        openChartWindow();
    } else {
        var resultOptionDialog = Ti.UI.createOptionDialog({
            title: optionsMessage + '\n\nDo you wanna view this inna chart?',
            options: ['Okay bruv', 'Nah bruv '],
            cancel: 1
        });
        resultOptionDialog.addEventListener('click', function(e){
            console.log(`button index tapped: ${e.index}`);
            if (e.index == 0){
            openChartWindow();
            }
        });
        resultOptionDialog.show();
    }
}

view.add(buttonCalculateRepayments);

win1.add(view);


var tab1 = Ti.UI.createTab({
    title:'calc',
    window: win1
});

var win2 = require('win2')

win2.autoShowChart = false;

var tab2 = Ti.UI.createTab({
    title:'settings tab2 yoooo',
    window: win2
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();

function openChartWindow() {
    var totalInterest = (tfAmount.value * (interestRate / 100) * numberOfMonths) / 12;
    var totalRepayments = Math.round(tfAmount.value) + totalInterest;
    var chartWindow = require("chartwin");
    chartWindow.numberOfMonths = numberOfMonths;
    chartWindow.interestRate=interestRate;
    chartWindow.totalInterest=totalInterest;
    chartWindow.totalRepayments=totalRepayments;
    chartWindow.principalRepayments=(totalRepayments - totalInterest);

    tab1.open(chartWindow);
}
