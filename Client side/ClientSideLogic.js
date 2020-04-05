window.onload = function () {/************************** MAIN FUNCTION ENTRY POINT **************************/

    initButtonsControlDefault();
    initKeysControlDefault();
    initToggleButton();


    /********************** INCLUDE CHART.JS **********************/

    Chart.defaults.global.elements.rectangle.borderWidth = 0;

    XaAcc = document.getElementById('x-axis-acceleration');
    XaVel = document.getElementById('x-axis-velocity');

    YaAcc = document.getElementById('y-axis-acceleration');
    YaVel = document.getElementById('y-axis-velocity');

    ZaAcc = document.getElementById('z-axis-acceleration');
    ZaVel = document.getElementById('z-axis-velocity');

    /************** X-AXIS **************/
    XaAccChart = new Chart(XaAcc, {
        type: 'bar',
        data: {
            labels: ['m/s\xB2'],
            datasets: [{
                label: 'X-Axis Acceleration',
                borderSkipped: true,
                data: [sdXaAcc],
                backgroundColor: ['red'],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 'flex',
                maxBarThickness: 50,
                minBarLength: 1
            }]
        },
        options: {
            tooltips: {
                enabled: false
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
                },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        min: -10,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    offset: true,
                    gridLines: { 
                        offsetGridLines: false
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    });
    /*** EOC ***/
    XaVelChart = new Chart(XaVel, {
        type: 'bar',
        data: {
            labels: ['m/s'],
            datasets: [{
                label: 'X-Axis Acceleration',
                borderSkipped: true,
                data: [sdXaVel],
                backgroundColor: ['pink'],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 'flex',
                maxBarThickness: 50,
                minBarLength: 1,
            }]
        },
        options: {
            tooltips: {
                enabled: false
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        min: -10,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    offset: true, 
                    gridLines: { 
                        offsetGridLines: false 
                    }
                }]
            },
            hover: {
                animationDuration: 0 
            },
            responsiveAnimationDuration: 0 
        }
    });
    /************** Y-AXIS **************/
    YaAccChart = new Chart(YaAcc, {
        type: 'horizontalBar',
        data: {
            labels: ['m/s\xB2'],
            datasets: [{
                label: 'X-Axis Acceleration',
                borderSkipped: true,
                data: [sdYaAcc],
                backgroundColor: ['green'],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 'flex',
                maxBarThickness: 30,
                minBarLength: 1,
            }]
        },
        options: {
            tooltips: {
                enabled: false
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{

                }],
                xAxes: [{
                    offset: false, 
                    gridLines: { 
                        offsetGridLines: false 
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        min: -10,
                        stepSize: 1
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 
            },
            responsiveAnimationDuration: 0 
        }
    });
    /*** EOC ***/
    YaVelChart = new Chart(YaVel, {
        type: 'horizontalBar',
        data: {
            labels: ['m/s'],
            datasets: [{
                label: 'X-Axis Acceleration',
                borderSkipped: true,
                data: [sdYaVel],
                backgroundColor: ['LightGreen '],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 'flex',
                maxBarThickness: 30,
                minBarLength: 1,
            }]
        },
        options: {
            tooltips: {
                enabled: false
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    
                }],
                xAxes: [{
                    offset: false, 
                    gridLines: { 
                        offsetGridLines: false 
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        min: -10,
                        stepSize: 1
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 
            },
            responsiveAnimationDuration: 0 
        }
    });
    /************** Z-AXIS **************/
    ZaAccChart = new Chart(ZaAcc, {
        type: 'bar',
        data: {
            labels: ['m/s\xB2'],
            datasets: [{
                label: 'X-Axis Acceleration',
                borderSkipped: true,
                data: [sdZaAcc],
                backgroundColor: ['blue'],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 'flex',
                maxBarThickness: 50,
                minBarLength: 1,
            }]
        },
        options: {
            tooltips: {
                enabled: false
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        min: -10,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    offset: true, 
                    gridLines: { 
                        offsetGridLines: true 
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 
            },
            responsiveAnimationDuration: 0 
        }
    });
    /*** EOC ***/
    ZaVelChart = new Chart(ZaVel, {
        type: 'bar',
        data: {
            labels: ['m/s'],
            datasets: [{
                label: 'X-Axis Acceleration',
                borderSkipped: true,
                data: [sdZaVel],
                backgroundColor: ['LightBlue'],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 'flex',
                maxBarThickness: 50,
                minBarLength: 1,
            }]
        },
        options: {
            tooltips: {
                enabled: false
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        min: -10,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    offset: true, 
                    gridLines: { 
                        offsetGridLines: true 
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 
            },
            responsiveAnimationDuration: 0 
        }
    });

    allCharts = [XaAccChart, YaAccChart, ZaAccChart, XaVelChart, YaVelChart, ZaVelChart];

    ////////// TEST RUN:
    //setInterval(
    //    function () {
    //        var dataArray = [
    //            GenerateRandomSigned(),
    //            GenerateRandomSigned(),
    //            GenerateRandomSigned(),
    //            GenerateRandomSigned(),
    //            GenerateRandomSigned(),
    //            GenerateRandomSigned()
    //        ];
    //        sendWsMessage(dataArray);
    //    },
    //    2000
    //);
    //// End Of Main
}

function updateChartsByMutating(charts, sdata) {

    if (charts == null || sdata == null) {
        return;
    }

    for (var i = 0; i < charts.length; i++) {
        charts[i].data.datasets[0].data[0] = sdata[i];
        charts[i].update(200);
    }
}

/************ TEST RUN FUNCTION ************/
function GenerateRandomSigned() {
    var number = Math.random() * 20;
    if (Math.random() < 0.5) {
        number *= -1;
    }
    return number
}


/********************** GLOBAL VARIABLES **********************/

/******** SENSOR DATA RELATED VARIABLES ********/
var XaAcc; //
var XaVel; //
var YaAcc; //   canvas containers
var YaVel; //   by "id"
var ZaAcc; //
var ZaVel; //

var sdXaAcc = 0; //
var sdXaVel = 0; //
var sdYaAcc = 0; //   sensor data
var sdYaVel = 0; //   values
var sdZaAcc = 0; //
var sdZaVel = 0; //

var XaAccChart; //
var XaVelChart; // 
var YaAccChart; //  Chart.JS
var YaVelChart; //  Objects
var ZaAccChart; //
var ZaVelChart; //

var allCharts; //   chart container: array<object>

/******** EVENT HANDLER REFERENCES ********/
var mouseOverHandler = function (e) { hover(e) };
var mouseDownHandler = function (e) { pressLMB(e) };
var mouseUpOrOutHandler = function (e) { releaseLMB(e) };
var clickSwitchHandler = function (e) { clickLMB(e) };

var keyDownHandler = function (e) { keyOn(e) };
var keyUpHandler = function (e) { keyOff(e) };
var keySwitchHandler = function (e) { keySwitch(e) };

/******** AUTH-MESSAGE CONSTANTS ********/
const msgGreeting = {
    Type: "auth",
    Value: "greeting",
    TimeStamp: new Date()
};
const msgGoodbye = {
    Type: "auth",
    Value: "goodbye",
    TimeStamp: new Date()
};
const msgError = {
    Type: "auth",
    Value: "error",
    TimeStamp: new Date()
};
/****** CONTROL-MESSAGE CONSTANTS ******/
const msgForward = {
    Type: "control",
    Value: "F",
    TimeStamp: new Date()
};
const msgBackward = {
    Type: "control",
    Value: "B",
    TimeStamp: new Date()
};
const msgLeft = {
    Type: "control",
    Value: "L",
    TimeStamp: new Date()
};
const msgRight = {
    Type: "control",
    Value: "R",
    TimeStamp: new Date()
};
const msgStopAll = {
    Type: "control",
    Value: "S",
    TimeStamp: new Date()
};
function msgStopId(id) {
    this.Type = "control";
    this.Value = "S"+id;
    this.TimeStamp = new Date();
}


/********************** WEBSOCKET STUFF **********************/
//const mySocket = new WebSocket('ws://echo.websocket.org');          	// test server
const mySocket = new WebSocket('ws://79.172.214.20:8866');  			// live server

mySocket.addEventListener('open', function (event) {
    console.log("Connection successful: " + mySocket.url);
    mySocket.send(JSON.stringify(msgGreeting));
});

mySocket.addEventListener('message', function (event) {
    console.log(event.data);
	var reveived = JSON.parse(event.data);
	if(reveived.Type === "control"){
		updateChartsByMutating(allCharts, JSON.parse(reveived.Value));
	}
});

function sendWsMessage(obj) {
    mySocket.send(JSON.stringify(obj));
}


/********************** INITIALIZERS FOR CONTROLS **********************/

function initToggleButton() {
    var toggleButton = document.getElementById("toggle");
    toggleButton.addEventListener("click", function () {

        if (toggleButton.className === "active") {

            initButtonsControlDefault();
            initKeysControlDefault();

            toggleButton.className = "passive";
            toggleButton.innerHTML = "Toggle ON";
        }
        else {

            initButtonsControlToggle();
            initKeysControlToggle();

            toggleButton.className = "active";
            toggleButton.innerHTML = "Toggle OFF";
        }
    });
}

function initButtonsControlDefault() {
    var controlButtons = document.querySelectorAll(".controller > button");
    for (var i = 0; i < controlButtons.length; i++) {
        controlButtons[i].addEventListener("mouseover", mouseOverHandler);
        controlButtons[i].addEventListener("mousedown", mouseDownHandler);
        controlButtons[i].addEventListener("mouseup", mouseUpOrOutHandler);
        controlButtons[i].addEventListener("mouseout", mouseUpOrOutHandler);

        controlButtons[i].removeEventListener("click", clickSwitchHandler);
    }
}

function initButtonsControlToggle() {
    
    var controlButtons = document.querySelectorAll(".controller > button");
    for (var i = 0; i < controlButtons.length; i++) {
        controlButtons[i].addEventListener("click", clickSwitchHandler);

        controlButtons[i].removeEventListener("mouseover", mouseOverHandler);
        controlButtons[i].removeEventListener("mousedown", mouseDownHandler);
        controlButtons[i].removeEventListener("mouseup", mouseUpOrOutHandler);
        controlButtons[i].removeEventListener("mouseout", mouseUpOrOutHandler);
    }
}

function initKeysControlDefault() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    document.removeEventListener("keyup", keySwitchHandler);
}

function initKeysControlToggle() {
    document.addEventListener("keyup", keySwitchHandler);

    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
}


/********************** MOUSE CONTROLS **********************/

var isMouseDown = false;

function hover(e) {
    e.target.className = "hovered";
}

function pressLMB(e) {
    isMouseDown = true;
    var target = e.target;
    target.className = "active";
    //start the corresponding engine(s):
    sendById(target.id);
}
function releaseLMB(e) {
    if (isMouseDown) { //only take the action if LMB is under pressure(important for mouseout event)
        e.target.className = "passive";
        //stop the engine(s):
        sendWsMessage(msgStopAll);
    }
    isMouseDown = false;
}

function clickLMB(e) {
    var target = e.target;
    if (target.className === "active") {
        target.className = "passive";
        //stop the corresponding engine(s):
        sendWsMessage(new msgStopId(target.id));
    }
    else {
        target.className = "active";
        //start the corresponding engine(s):
        sendById(target.id);
    }
}

function sendById(targetId) {
    switch (targetId) {
        case "F":
            sendWsMessage(msgForward);
            break;
        case "B":
            sendWsMessage(msgBackward);
            break;
        case "L":
            sendWsMessage(msgLeft);
            break;
        case "R":
            sendWsMessage(msgRight);
            break;
        default:
            sendWsMessage(msgError);
    }
}


/********************** KEYBOARD CONTROLS **********************/

var keysDown = [];

function keyOn(e) {
    var key = e.which || e.keyCode;
    
    if (keysDown.indexOf(key) < 0) {
        changeState(key, false);
        keysDown.push(key);
    }
}

function keyOff(e) {
    var key = e.which || e.keyCode;

    if (keysDown.indexOf(key) > -1) {
        changeState(key, true);
        delete keysDown[keysDown.indexOf(key)];
    }
}

function keySwitch(e) {
    var key = e.which || e.keyCode;
    changeState(key, null);
}

function changeState(key, optionParam) {
    var helper = optionParam != null;
    switch (key) {
        case 37: //left
            var leftButton = document.getElementById("L");
            var lbClass = leftButton.className === "active";
            flipState(helper ? optionParam : lbClass, leftButton, msgLeft);
            break;
        case 38: //up
            var upButton = document.getElementById("F");
            var ubClass = upButton.className === "active";
            flipState(helper ? optionParam : ubClass, upButton, msgForward);
            break;
        case 39: //right
            var rightButton = document.getElementById("R");
            var rbClass = rightButton.className === "active";
            flipState(helper ? optionParam : rbClass, rightButton, msgRight);
            break;
        case 40: //down
            var downButton = document.getElementById("B");
            var dbClass = downButton.className === "active";
            flipState(helper ? optionParam : dbClass, downButton, msgBackward);
            break;
    }
}
function flipState(isActive, thisButton, msgWhich) {
    isActive ? setStop(thisButton, new msgStopId(thisButton.id)) : setStart(thisButton, msgWhich);
}
function setStart(thisButton, obj) {
    thisButton.className = "active";
    sendWsMessage(obj); //msgForward, msgBackward, etc...
}
function setStop(thisButton, obj) {
    thisButton.className = "passive";
    sendWsMessage(obj); //new msgStopId(id)...
}


/********************** KEYBOARD SCROLL DISABLED **********************/
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

/*********************** FLIP LIGHT-DARK THEME ***********************/
window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey && e.keyCode == 66 && document.body.style.backgroundColor == "white") {
        document.body.style.color = "white";
        document.body.style.backgroundColor = "black";
        document.getElementsByTagName("TH")[0].style.color = "black";
    }
    else if (e.ctrlKey && e.altKey && e.keyCode == 66) {
        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";
    }
}, false);
