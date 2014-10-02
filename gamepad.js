var gamepadInfo = document.getElementById("gamepad-info");
var ball = document.getElementById("ball");
var start;
var a = 0;
var b = 0;

var rAF = window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
window.webkitCancelRequestAnimationFrame ||
window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function() {
	var gp = navigator.getGamepads()[0];
	gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";

	gameLoop();
});

window.addEventListener("gamepaddisconnected", function() {
	gamepadInfo.innerHTML = "Waiting for gamepad.";

	rAFStop(start);
});

if(!('GamepadEvent' in window)) {
	// No gamepad events available, poll instead.
	var interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	
	for (var i = 0; i < gamepads.length; i++) {
		
		var gp = gamepads[i];
		
		if(gp) {
			gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
			gameLoop();
			clearInterval(interval);
		}
	}
}

function buttonPressed(b) {
	if (typeof(b) == "object") {
		return b.pressed;
	}
	return b == 1.0;
}

function gameLoop() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	
	if (!gamepads)
		return;

	var gp = gamepads[0];

	
	if (buttonPressed(gp.buttons[12])) { 			// D-Pad Up
		b--;
	} else if (buttonPressed(gp.buttons[13])) { 	// D_Pad Down
		b++;
	}

	if(buttonPressed(gp.buttons[15])) {				// D-Pad Right
		a++;
	} else if(buttonPressed(gp.buttons[14])) {		// D-Pad Left
		a--;
	}

	if (buttonPressed(gp.buttons[0])) { 			// A Button
		ball.style = "background-color:lightgreen";
	}else if (buttonPressed(gp.buttons[3])) { 		// Y Button 
		ball.style = "background-color:yellow";
	}else if (buttonPressed(gp.buttons[1])) { 		// B Button
		ball.style = "background-color:red";
	}else if (buttonPressed(gp.buttons[2])) {		// X Button
		ball.style = "background-color:blue";
	}else{
		ball.style = "background-color:none"
	}

	ball.style.left = a*2 + "px";
	ball.style.top = b*2 + "px";
	var start = rAF(gameLoop);
};
