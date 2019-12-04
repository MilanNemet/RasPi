window.onload = function () {/************************** MAIN FUNCTION ENTRY POINT **************************/

    initButtonsControlDefault();
    initKeysControlDefault();
    initToggleButton();


    /********************** INCLUDE CHART.JS **********************/

    var ctx = document.getElementById('x-axis-acceleration');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


/********************** GLOBAL VARIABLES **********************/

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

var sdXaAcc = 0;
var sdXaVel = 0;

var sdYaAcc = 0;
var sdYaVel = 0;

var sdZaAcc = 0;
var sdZaVel = 0;

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


