/**
 * Authors (i.e. Large Egos ;):
 *  - Your name
 *
 * Use head.js if you have to do stuff bwfore all the content is loaded.
 * Like, for example, hiding all the content untill it has loaded.
*/
(function ($) {
    "use strict";
	//hide content until javascript is executed
	//classname removed in engine.js
	function hasClass(el, name) {
        return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
	}
	function addClass(el, name) {
	    if (!hasClass(el, name)) { 
            el.className += (el.className ? ' ' : '') + name;
        }
	}
	addClass(document.getElementsByTagName("html")[0], "visuallyhidden");
}());
