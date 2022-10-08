/*
* Show Hide Elements Functionality
*/
function switchid(itemid) { 
   whichitem = document.getElementById(itemid); 
   if (whichitem.className=="show") 
   { 
      whichitem.className="hide"; 
   } 
   else 
   { 
      whichitem.className="show"; 
   } 
} 

function switchallids(itemid) {
	var idx = 1;
	var id = "b" + idx;
	var act = document.getElementById(id);
	while(act != null){
		if(id == itemid){
			switchid(itemid);
		}else{
			act.className="hide";
		}
		
		idx = idx + 1;
		id = "b" + idx;
		act = document.getElementById(id);
	}
}


/*
* Font Size Increase Decrease Functionality 
*/
function fontsizeup() {
  active = getActiveStyleSheet();
  switch (active) {
    case 'A--' : 
      setActiveStyleSheet('A-');
      break;
    case 'A-' : 
      setActiveStyleSheet('A');
      break;
    case 'A' : 
      setActiveStyleSheet('A+');
      break;
    case 'A+' : 
	  //setActiveStyleSheet('A++');   optional but I do not recommend the usage of it!
      break;
    case 'A++' :
      break;
    default :
      setActiveStyleSheet('A-');
      break;
  }
}

function fontsizedown() {
  active = getActiveStyleSheet();
  switch (active) {
    case 'A++' : 
      setActiveStyleSheet('A+');
      break;
    case 'A+' : 
      setActiveStyleSheet('A');
      break;
    case 'A' : 
      setActiveStyleSheet('A-');
      break;
    case 'A-' : 
      // Turned off on request of the customer.
      //setActiveStyleSheet('A--');
      break;
    case 'A--' : 
       break;
    default :
      setActiveStyleSheet('A--');
      break;
  }
}

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  return ('A-');
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
if (title == 'null') {
  title = getPreferredStyleSheet();
}

setActiveStyleSheet(title);