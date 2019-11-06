var mouseoverHandler = function (e) { hover(e) };
var mouseDownHandler = function (e) { press(e) };
var mouseUpOrOutHandler = function (e) { release(e) };
var clickSwitchHandler = function (e) { clickSwitch(e) };

var keydownHandler = function (e) { keyOn(e) };
var keyupHandler = function (e) { keyOff(e) };
var keySwitchHandler = function (e) { keySwitch(e) };


window.onload = function () {
    initButtonsControlDefault();
    initKeysControlDefault();
    initButtonToggle();
}

function initButtonToggle() {
    var toggleButton = document.getElementById("toggle");
    toggleButton.addEventListener("click", function () {

        if (toggleButton.className === "active") {

            initButtonsControlDefault();
            initKeysControlDefault();

            toggleButton.className = "passive";
            toggleButton.innerHTML = "Toggle ON&nbsp;&nbsp;";
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

function hover(e) {
    e.target.className = "hovered";
}

function press(e) {
    e.target.className = "active";
    //////start the corresponding engine(s):
    //var buttonId = e.target.id;
    //switch (buttonId) {
    //    case "up":
    //        break;
    //    case "down":
    //        break;
    //    case "left":
    //        break;
    //    case "right":
    //        break;
    //    default:
    //}
}

function release(e) {
    e.target.className = "passive";
    //stop the corresponding engine(s)
}

function clickSwitch(e) {
    if (e.target.className === "active") {
        e.target.className = "passive";
        //stop the corresponding engine(s)
    }
    else {
        e.target.className = "active";
        //start the corresponding engine(s):
    }
}

function keyOn(e) {
    var key = e.which || e.keyCode;
    
    switch (key) {
        case 37: //left
            document.getElementById("left").className = "active";
            break;
        case 38: //up
            document.getElementById("up").className = "active";
            break;
        case 39: //right
            document.getElementById("right").className = "active";
            break;
        case 40: //down
            document.getElementById("down").className = "active";
            break;
    }
    //start the corresponding engine(s)
}

function keyOff(e) {
    var key = event.which || event.keyCode;

    switch (key) {
        case 37: //left
            document.getElementById("left").className = "passive";
            break;
        case 38: //up
            document.getElementById("up").className = "passive";
            break;
        case 39: //right
            document.getElementById("right").className = "passive";
            break;
        case 40: //down
            document.getElementById("down").className = "passive";
            break;
    }
    //stop the corresponding engine(s)
}

function keySwitch(e) {
    var key = e.which || e.keyCode;

    switch (key) {
        case 37: //left
            console.log(e.key);
            var leftButton = document.getElementById("left");
            leftButton.className === "active" ? leftButton.className = "passive" : leftButton.className = "active";
            break;
        case 38: //up
            console.log(e.key);
            var uptButton = document.getElementById("up");
            uptButton.className === "active" ? uptButton.className = "passive" : uptButton.className = "active";
            break;
        case 39: //right
            console.log(e.key);
            var rightButton = document.getElementById("right");
            rightButton.className === "active" ? rightButton.className = "passive" : rightButton.className = "active";
            break;
        case 40: //down
            console.log(e.key);
            var downButton = document.getElementById("down");
            downButton.className === "active" ? downButton.className = "passive" : downButton.className = "active";
            break;
    }
    //start or stop the corresponding engine(s)
}



// space and arrow keys won't scroll the page:
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);