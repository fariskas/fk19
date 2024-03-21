var VirtualScroll = (function(document) {

	var vs = {};

	var numListeners, listeners = [], initialized = false;

	var touchStartX, touchStartY;

	// [ These settings can be customized with the options() function below ]
	// Mutiply the touch action by two making the scroll a bit faster than finger movement
	var touchMult = 2;
	// Firefox on Windows needs a boost, since scrolling is very slow
	var firefoxMult = 15;
	// How many pixels to move with each key press
	var keyStep = 120;
	// General multiplier for all mousehweel including FF
	var mouseMult = 1;

	var bodyTouchAction;

	var hasWheelEvent = 'onwheel' in document;
	var hasMouseWheelEvent = 'onmousewheel' in document;
	var hasTouch = 'ontouchstart' in document;
	var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
	var hasPointer = !!window.navigator.msPointerEnabled;
	var hasKeyDown = 'onkeydown' in document;

	var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

	var event = {
		y: 0,
		x: 0,
		deltaX: 0,
		deltaY: 0,
		originalEvent: null
	};

	vs.on = function(f) {
		if(!initialized) initListeners();
		listeners.push(f);
		numListeners = listeners.length;
	}

	vs.options = function(opt) {
		keyStep = opt.keyStep || 120;
		firefoxMult = opt.firefoxMult || 15;
		touchMult = opt.touchMult || 2;
		mouseMult = opt.mouseMult || 1;
	}

	vs.off = function(f) {
		listeners.splice(f, 1);
		numListeners = listeners.length;
		if(numListeners <= 0) destroyListeners();
	}

	var notify = function(e) {
		event.x += event.deltaX;
		event.y += event.deltaY;
		event.originalEvent = e;

		for(var i = 0; i < numListeners; i++) {
			listeners[i](event);
		}
	}

	var onWheel = function(e) {
        e.preventDefault();
		// In Chrome and in Firefox (at least the new one)
		event.deltaX = e.wheelDeltaX || e.deltaX * -1;
		event.deltaY = e.wheelDeltaY || e.deltaY * -1;

		// for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
		// real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
		if(isFirefox && e.deltaMode == 1) {
			event.deltaX *= firefoxMult;
			event.deltaY *= firefoxMult;
		}

		event.deltaX *= mouseMult;
		event.deltaY *= mouseMult;

		notify(e);
	}

	var onMouseWheel = function(e) {
        e.preventDefault();
		// In Safari, IE and in Chrome if 'wheel' isn't defined
		event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
		event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

		notify(e);
	}

	var onTouchStart = function(e) {
		var t = (e.targetTouches) ? e.targetTouches[0] : e;
		touchStartX = t.pageX;
		touchStartY = t.pageY;
	}

	var onTouchMove = function(e) {
		// e.preventDefault(); // < This needs to be managed externally
		var t = (e.targetTouches) ? e.targetTouches[0] : e;

		event.deltaX = (t.pageX - touchStartX) * touchMult;
		event.deltaY = (t.pageY - touchStartY) * touchMult;

		touchStartX = t.pageX;
		touchStartY = t.pageY;

		notify(e);
	}

	var onKeyDown = function(e) {
		// 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
		event.deltaX = event.deltaY = 0;
		switch(e.keyCode) {
			case 37:
				event.deltaX = -keyStep;
				break;
			case 39:
				event.deltaX = keyStep;
				break;
			case 38:
				event.deltaY = keyStep;
				break;
			case 40:
				event.deltaY = -keyStep;
				break;
		}

		notify(e);
	}

	var initListeners = function() {
		if(hasWheelEvent) document.addEventListener("wheel", onWheel);
		if(hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel);

		if(hasTouch) {
			document.addEventListener("touchstart", onTouchStart);
			document.addEventListener("touchmove", onTouchMove);
		}

		if(hasPointer && hasTouchWin) {
			bodyTouchAction = document.body.style.msTouchAction;
			document.body.style.msTouchAction = "none";
			document.addEventListener("MSPointerDown", onTouchStart, true);
			document.addEventListener("MSPointerMove", onTouchMove, true);
		}

		if(hasKeyDown) document.addEventListener("keydown", onKeyDown);

		initialized = true;
	}

	var destroyListeners = function() {
		if(hasWheelEvent) document.removeEventListener("wheel", onWheel);
		if(hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

		if(hasTouch) {
			document.removeEventListener("touchstart", onTouchStart);
			document.removeEventListener("touchmove", onTouchMove);
		}

		if(hasPointer && hasTouchWin) {
			document.body.style.msTouchAction = bodyTouchAction;
			document.removeEventListener("MSPointerDown", onTouchStart, true);
			document.removeEventListener("MSPointerMove", onTouchMove, true);
		}

		if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

		initialized = false;
	}

	return vs;
})(document);



// Grab both red boxes
var section = document.querySelector("section");
var section = $(document)[0];

// Check how much we can scroll. This value is the
// height of the scrollable element minus the height of the widow
// var sectionHeight = section.getBoundingClientRect().height - window.innerHeight;
var sectionHeight = $(section).height() - window.innerHeight;


// Add easing to the scroll. Play with this value to find a setting that you like.
var ease = 0.035;

// Store current scroll position
var targetX = 0,
    targetY = 0;
var currentX = 0,
    currentY = 0;

// Use this if you want to lock the elastic overscroll on mobile
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});

// Add virtual scroll listener
VirtualScroll.on(function(e) {

    // Accumulate delta value on each scroll event
    targetY += e.deltaY;
    targetX += e.deltaX;

    // Clamp the value so it doesn't go too far up or down
    // The value needs to be between 0 and -sectionHeight
    targetY = Math.max(-sectionHeight, targetY);

    // targetY = Math.max(-$(document).height(), targetY);


    targetY = Math.min(0, targetY);

});

var scrolls = function() {
    // Make sure this works across different browsers (use the shim or something)
    requestAnimationFrame(scrolls);

    // Get closer to the target value at each frame, using ease.
    // Other easing methods are also ok.
    currentY += (targetY - currentY) * ease;

	//console.log(currentY)

	window.scroll(0, -(currentY))


    // Uncomment this line to scroll horizontally
    // currentX += (targetX - currentX) * ease;

    // Create the CSS transform string
    // (alternativly: use WebKitCSSMatrix, though it doesn't see any faster (http://jsperf.com/webkitcssmatrix-vs-translate3d)
    var v1 = "translateX(" + currentX + "px) translateY(" + currentY + "px)"; // translateZ(0)";
    var v2 = "translateX(" + currentX + "px) translateY(" + currentY + "px)"; // translateZ(0)";

    // Apply CSS style
    // section.style['webkitTransform'] = v1;
    // section.style['msTransform'] = v1;
    // section.style.transform = v1;
}

// Start the rendering loop function
scrolls();
