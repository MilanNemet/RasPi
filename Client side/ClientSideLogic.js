window.onload = function () {/************************** MAIN FUNCTION ENTRY POINT **************************/

    initButtonsControlDefault();
    initKeysControlDefault();
    initToggleButton();


    /********************** INCLUDE CHART.JS **********************/

    Chart.defaults.global.elements.rectangle.borderWidth = 0;

    var XaAcc = document.getElementById('x-axis-acceleration');
    var XaVel = document.getElementById('x-axis-velocity');

    var YaAcc = document.getElementById('y-axis-acceleration');
    var YaVel = document.getElementById('y-axis-velocity');

    var ZaAcc = document.getElementById('z-axis-acceleration');
    var ZaVel = document.getElementById('z-axis-velocity');

    /************** X-AXIS **************/
    var XaAccChart = new Chart(XaAcc, {
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
                    //offset: false,
                    ticks: {
                        beginAtZero: true,
                        max: 50,
                        min: -50,
                        stepSize: 5
                    }
                }],
                xAxes: [{
                    offset: true,              //*
                    gridLines: {                //* ezekkel még érdemes lehet játszani
                        offsetGridLines: false  //*
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    }); /*** EOC ***/
    var XaVelChart = new Chart(XaVel, {
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
                //borderColor: ['rgba(255, 99, 132, 1)'],
                //borderWidth: 0
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
                    //offset: false,
                    ticks: {
                        beginAtZero: true,
                        max: 50,
                        min: -50,
                        stepSize: 5
                    }
                }],
                xAxes: [{
                    offset: true,               //*
                    gridLines: {                //* ezekkel még érdemes lehet játszani
                        offsetGridLines: false  //*
                    }
                }]
            },
            //animation: {
            //    duration: 1000
            //},
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    });
    /************** Y-AXIS **************/
    var YaAccChart = new Chart(YaAcc, {
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
                //borderColor: ['rgba(255, 99, 132, 1)'],
                //borderWidth: 0
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
                    offset: false,              //*
                    gridLines: {                //* ezekkel még érdemes lehet játszani
                        offsetGridLines: false  //*
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 50,
                        min: -50,
                        stepSize: 5
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    }); /*** EOC ***/
    var YaVelChart = new Chart(YaVel, {
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
                //borderColor: ['rgba(255, 99, 132, 1)'],
                //borderWidth: 0
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
                    offset: false,              //*
                    gridLines: {                //* ezekkel még érdemes lehet játszani
                        offsetGridLines: false  //*
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 50,
                        min: -50,
                        stepSize: 5
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    });
    /************** Z-AXIS **************/
    var ZaAccChart = new Chart(ZaAcc, {
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
                        max: 50,
                        min: -50,
                        stepSize: 5
                    }
                }],
                xAxes: [{
                    offset: true,              //*
                    gridLines: {                //* ezekkel még érdemes lehet játszani
                        offsetGridLines: true  //*
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    }); /*** EOC ***/
    var ZaVelChart = new Chart(ZaVel, {
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
                        max: 50,
                        min: -50,
                        stepSize: 5
                    }
                }],
                xAxes: [{
                    offset: true,              //*
                    gridLines: {                //* ezekkel még érdemes lehet játszani
                        offsetGridLines: true  //*
                    }
                }]
            },
            animation: {
                duration: 1000
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    });

    ////////// TEST RUN:
    var allCharts = [XaAccChart, XaVelChart, YaAccChart, YaVelChart, ZaAccChart, ZaVelChart];
    //setInterval(function () { updateChartByMutating(allCharts) }, 200);
    setInterval(function () { setTimeout(function () { updateChartByMutating(allCharts) }, 200+Math.random()*1000) }, 200); //same with random timer
}
/************ TEST RUN FUNCTIONS ************/
function updateChartByMutating(charts) {
    sdXaAcc = generateRandomSigned();
    sdXaVel += sdXaAcc * 0.2;
    sdYaAcc = generateRandomSigned();
    sdYaVel += sdYaAcc * 0.2;
    sdZaAcc = generateRandomSigned();
    sdZaVel += sdZaAcc * 0.2;

    var sensorData = [sdXaAcc, sdXaVel, sdYaAcc, sdYaVel, sdZaAcc, sdZaVel];

    for (var i = 0; i < charts.length; i++) {
        charts[i].data.datasets[0].data[0] = sensorData[i];
        charts[i].update(200);
    }
}
function generateRandomSigned() {
    var number = Math.floor(Math.random() * 20);
    if (Math.random() < 0.5) {
        number *= -1;
    }
    return number
}


/********************** GLOBAL VARIABLES **********************/

/******** SENSOR DATA CONTAINER ********/
var sdXaAcc = 0;
var sdXaVel = 0;

var sdYaAcc = 0;
var sdYaVel = 0;

var sdZaAcc = 0;
var sdZaVel = 0;


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
    type: "auth",
    value: "greeting",
    timeStamp: new Date().toLocaleString()
};
const msgGoodbye = {
    type: "auth",
    value: "goodbye",
    timeStamp: new Date().toLocaleString()
};
const msgError = {
    type: "auth",
    value: "error",
    timeStamp: new Date().toLocaleString()
};
/****** CONTROL-MESSAGE CONSTANTS ******/
const msgForward = {
    type: "control",
    value: "F",
    timeStamp: new Date().toLocaleString()
};
const msgBackward = {
    type: "control",
    value: "B",
    timeStamp: new Date().toLocaleString()
};
const msgLeft = {
    type: "control",
    value: "L",
    timeStamp: new Date().toLocaleString()
};
const msgRight = {
    type: "control",
    value: "R",
    timeStamp: new Date().toLocaleString()
};
const msgStopAll = {
    type: "control",
    value: "S",
    timeStamp: new Date().toLocaleString()
};
function msgStopId(id) {
    this.type = "control";
    this.value = "S"+id;
    this.timeStamp = new Date().toLocaleString();
}


/********************** WEBSOCKET STUFF **********************/
const mySocket = new WebSocket('wss://echo.websocket.org/');
mySocket.addEventListener('open', function (event) { console.log("Connection successful: " + mySocket.url); mySocket.send(JSON.stringify(msgGreeting)); });
mySocket.addEventListener('message', function (event) { console.log(event.data); });

function sendMessage(obj) {
    mySocket.send(JSON.stringify(obj))
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
        sendMessage(msgStopAll);
    }
    isMouseDown = false;
}

function clickLMB(e) {
    var target = e.target;
    if (target.className === "active") {
        target.className = "passive";
        //stop the corresponding engine(s):
        sendMessage(new msgStopId(target.id));
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
            sendMessage(msgForward);
            break;
        case "B":
            sendMessage(msgBackward);
            break;
        case "L":
            sendMessage(msgLeft);
            break;
        case "R":
            sendMessage(msgRight);
            break;
        default:
            sendMessage(msgError);
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

function changeState(key, boolConst) {
    var helper = boolConst != null;
    switch (key) {
        case 37: //left
            var leftButton = document.getElementById("L");
            var lbClass = leftButton.className === "active";
            flipState(helper ? boolConst : lbClass, leftButton, msgLeft);
            break;
        case 38: //up
            var upButton = document.getElementById("F");
            var ubClass = upButton.className === "active";
            flipState(helper ? boolConst : ubClass, upButton, msgForward);
            break;
        case 39: //right
            var rightButton = document.getElementById("R");
            var rbClass = rightButton.className === "active";
            flipState(helper ? boolConst : rbClass, rightButton, msgRight);
            break;
        case 40: //down
            var downButton = document.getElementById("B");
            var dbClass = downButton.className === "active";
            flipState(helper ? boolConst : dbClass, downButton, msgBackward);
            break;
    }
}
function flipState(isActive, thisButton, msgWhich) {
    isActive ? setStop(thisButton, new msgStopId(thisButton.id)) : setStart(thisButton, msgWhich);
}
function setStart(thisButton, obj) {
    thisButton.className = "active";
    sendMessage(obj); //msgForward, msgBackward, etc...
}
function setStop(thisButton, obj) {
    thisButton.className = "passive";
    sendMessage(obj); //new msgStopId(id)...
}


/********************** KEYBOARD SCROLL DISABLED **********************/
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

/*********************** FLIP LIGHT-DARK STYLE ***********************/
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
