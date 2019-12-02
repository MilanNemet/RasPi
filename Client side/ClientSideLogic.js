var mouseoverHandler = function (e) { hover(e) };
var mouseDownHandler = function (e) { pressLMB(e) };
var mouseUpOrOutHandler = function (e) { releaseLMB(e) };
var clickSwitchHandler = function (e) { clickLMB(e) };

var keydownHandler = function (e) { keyOn(e) };
var keyupHandler = function (e) { keyOff(e) };
var keySwitchHandler = function (e) { keySwitch(e) };

var isMouseDown = false;

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
/******************/
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



const mySocket = new WebSocket('wss://echo.websocket.org/');
mySocket.addEventListener('open', function (event) { console.log("connection is living"); mySocket.send(JSON.stringify(msgGreeting)); });
mySocket.addEventListener('message', function (event) { console.log(event.data); });

function sendMessage(obj) {
    mySocket.send(JSON.stringify(obj))
}



/************************************************************************************************/
/************************************************************************************************/
window.onload = function () {
    initButtonsControlDefault();
    initKeysControlDefault();
    initButtonToggle();    
}
/************************************************************************************************/
/************************************************************************************************/



/********************** INITIALIZERS FOR CONTROLS **********************/

function initButtonToggle() {
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
        controlButtons[i].addEventListener("mouseover", mouseoverHandler);
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

        controlButtons[i].removeEventListener("mouseover", mouseoverHandler);
        controlButtons[i].removeEventListener("mousedown", mouseDownHandler);
        controlButtons[i].removeEventListener("mouseup", mouseUpOrOutHandler);
        controlButtons[i].removeEventListener("mouseout", mouseUpOrOutHandler);
    }
}

function initKeysControlDefault() {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    document.removeEventListener("keypress", keySwitchHandler);
}

function initKeysControlToggle() {
    document.addEventListener("keydown", keySwitchHandler);

    document.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("keyup", keyupHandler);
}



/********************** MOUSE CONTROLS **********************/

function hover(e) {
    e.target.className = "hovered";
}

function pressLMB(e) {
    e.target.className = "active";
    //start the corresponding engine(s):
    var targetId = e.target.id;
    sendById(targetId);
    isMouseDown = true;
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
    var targetId = e.target.id;
    if (e.target.className === "active") {
        e.target.className = "passive";
        //stop the corresponding engine(s):     //// ha több motort is elindít a user párhuzamosan, akkor melyiket állítsuk le...? (const StopAll; const StopId ???)
        sendMessage(new msgStopId(targetId));
    }
    else {
        e.target.className = "active";
        //start the corresponding engine(s):
        sendById(targetId);
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

function keyOn(e) {
    var key = e.which || e.keyCode;
    
    switch (key) {
        case 37: //left
            document.getElementById("L").className = "active";
            break;
        case 38: //up
            document.getElementById("F").className = "active";
            break;
        case 39: //right
            document.getElementById("R").className = "active";
            break;
        case 40: //down
            document.getElementById("B").className = "active";
            break;
    }
    //start the corresponding engine(s)
}

function keyOff(e) {
    var key = event.which || event.keyCode;

    switch (key) {
        case 37: //left
            document.getElementById("L").className = "passive";
            break;
        case 38: //up
            document.getElementById("F").className = "passive";
            break;
        case 39: //right
            document.getElementById("R").className = "passive";
            break;
        case 40: //down
            document.getElementById("B").className = "passive";
            break;
    }
    //stop the corresponding engine(s)
}

function keySwitch(e) {
    var key = e.which || e.keyCode;

    switch (key) {
        case 37: //left
            console.log(e.key);
            var leftButton = document.getElementById("L");
            leftButton.className === "active" ? leftButton.className = "passive" : leftButton.className = "active";
            break;
        case 38: //up
            console.log(e.key);
            var uptButton = document.getElementById("F");
            uptButton.className === "active" ? uptButton.className = "passive" : uptButton.className = "active";
            break;
        case 39: //right
            console.log(e.key);
            var rightButton = document.getElementById("R");
            rightButton.className === "active" ? rightButton.className = "passive" : rightButton.className = "active";
            break;
        case 40: //down
            console.log(e.key);
            var downButton = document.getElementById("B");
            downButton.className === "active" ? downButton.className = "passive" : downButton.className = "active";
            break;
    }
    //start or stop the corresponding engine(s)
}



////////////// space and arrow keys won't scroll the page:
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);