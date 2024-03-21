function isMobile() {
	
	var index = navigator.appVersion.indexOf("Mobile");
	return (index > -1);
}


function loadvs() {
	document.write('<script src="js/vs.js"><\/script>');
}