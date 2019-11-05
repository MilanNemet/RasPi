// JavaScript source code
window.onload = function () {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mousedown", function (e) { press(e) });
        buttons[i].addEventListener("mouseup", function (e) { release(e) });
        buttons[i].addEventListener("mouseout", function (e) { release(e) });
    }

    document.addEventListener("keydown", function (e) { keyOn(e) });
    document.addEventListener("keyup", function (e) { keyOff(e) });
}

function press(e) {
    e.target.style.background = "skyblue";
    //start the corresponding engine(s)
}

function release(e) {
    e.target.style.background = "lightgrey";
    //stop the corresponding engine(s)
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