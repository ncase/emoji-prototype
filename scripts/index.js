/***

On scroll, tell each playable iframe whether they're on screen,
and if so, how far they are along the page.

Parallax Parameter:
< 0: below viewing screen
0 < x < 1: on screen
> 1: above viewing screen

Pick the last one on screen to be the one being played

***/
window.onscroll = function(){
	var scrollY = window.pageYOffset;
	var innerHeight = window.innerHeight;
	var playables = document.querySelectorAll("iframe.example");
	var messages = [];

	// Calculate parallax, and is it the last one on screen?
	for(var i=0;i<playables.length;i++){
		var p = playables[i];
		var top = p.offsetTop-innerHeight;
		var bottom = p.offsetTop+p.clientHeight;
		var parallax = (scrollY-top)/(bottom-top); // from 0 to 1
		messages[i] = {
			isOnScreen: (0<parallax && parallax<1),
			parallax: parallax
		};
	}

	// Send all the messages
	for(var i=0;i<messages.length;i++){
		var p = playables[i];
		var m = messages[i];
		p.contentWindow.postMessage(m,"*");
	}

};

setTimeout(function(){
	window.onscroll();
},1000);