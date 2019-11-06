// JavaScript source code

var _toggle = false;
var active = false;
var mouseoverHandler = function (e) { hover(e) };
var mouseDownHandler = function (e) { press(e) };
var mouseUpOrOutHandler = function (e) { release(e) };
var clickHandler = function (e) { click(e, active); active = !active;};

window.onload = function () {
    initButtonsControlDefault();
    initKeysControlDefault();
    initButtonToggle(_toggle);
}

function initButtonToggle(_toggle) {
    var toggleButton = document.getElementById("toggle");
    toggleButton.addEventListener("click", function () {
        toggleButton.style.background = (_toggle ? "lightgrey": "#333");
        toggleButton.style.color = (_toggle ? "black" : "white");
        toggleButton.innerHTML = (_toggle ? "Toggle OFF" : "Toggle ON&nbsp;&nbsp;");
        if (_toggle) {
            initButtonsControlDefault();
            //initKeysControlDefault();
        }
        else {
            initButtonsControlToggle();
        }
        _toggle = !_toggle;
    });
}

function initButtonsControlDefault() {
    var controlButtons = document.querySelectorAll(".controller > button");
    for (var i = 0; i < controlButtons.length; i++) {
        controlButtons[i].addEventListener("mouseover", mouseoverHandler);

        controlButtons[i].addEventListener("mousedown", mouseDownHandler);
        controlButtons[i].addEventListener("mouseup", mouseUpOrOutHandler);
        controlButtons[i].addEventListener("mouseout", mouseUpOrOutHandler);

        controlButtons[i].removeEventListener("click", clickHandler);
    }
}

function initButtonsControlToggle() {
    
    var controlButtons = document.querySelectorAll(".controller > button");
    for (var i = 0; i < controlButtons.length; i++) {
        controlButtons[i].addEventListener("click", (e) => clickHandler(e, active));

        controlButtons[i].removeEventListener("mouseover", mouseoverHandler);
        controlButtons[i].removeEventListener("mousedown", mouseDownHandler);
        controlButtons[i].removeEventListener("mouseup", mouseUpOrOutHandler);
        controlButtons[i].removeEventListener("mouseout", mouseUpOrOutHandler);
    }
}

function initKeysControlDefault() {
    document.addEventListener("keydown", function (e) { keyOn(e) });
    document.addEventListener("keyup", function (e) { keyOff(e) });
}

function hover(e) {
    e.target.style.background = "#CCC";
    //stop the corresponding engine(s)
}

function press(e) {
    e.target.style.background = "skyblue";
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
    e.target.style.background = "lightgrey";
    //stop the corresponding engine(s)
}

function click(e, active) {
    if (active) {
        e.target.style.background = "lightgrey";
    }
    else {
        e.target.style.background = "skyblue";
    }
}

function keyOn(e) {
    var key = event.which || event.keyCode;
    
    switch (key) {
        case 37: //left
            document.getElementById("left").style.background = "skyblue";
            break;
        case 38: //up
            document.getElementById("up").style.background = "skyblue";
            break;
        case 39: //right
            document.getElementById("right").style.background = "skyblue";
            break;
        case 40: //down
            document.getElementById("down").style.background = "skyblue";
            break;
    }
    //start the corresponding engine(s)
}

function keyOff(e) {
    var key = event.which || event.keyCode;

    switch (key) {
        case 37: //left
            document.getElementById("left").style.background = "lightgrey";
            break;
        case 38: //up
            document.getElementById("up").style.background = "lightgrey";
            break;
        case 39: //right
            document.getElementById("right").style.background = "lightgrey";
            break;
        case 40: //down
            document.getElementById("down").style.background = "lightgrey";
            break;
    }
    //stop the corresponding engine(s)
}

// space and arrow keys won't scroll the page:
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);