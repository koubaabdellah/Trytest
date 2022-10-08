// <![CDATA[

function clearSelects(which){
  var selCtrls= document.getElementsByTagName("select");
  for(x=0;x < selCtrls.length;x++) {
    if(which == "hide")
      selCtrls[x].style.visibility = "hidden";
    else
      selCtrls[x].style.visibility = "visible";
  }
}

function browserIE6orLower(){
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
	 var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
	 if (ieversion<=6) {
	  return true;
	 } else {
	  return false;
	 }
	} else {
	  return false;
	}
}


sfHover = function() {
	var sfEls = document.getElementById("cascading-nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			if (this.lastChild.tagName == "UL") {
				if (browserIE6orLower()) {
				  clearSelects('hide');
				}
			}
			this.className+=(this.className.length>0? " ": "") + "cascademenu";
		}
		sfEls[i].onmouseout=function() {
			if (browserIE6orLower()) {
			  clearSelects('show');
			}
			this.className=this.className.replace(new RegExp("( ?|^)cascademenu\\b"), "");
		}
	}
}
mcAccessible = function() {
	var mcEls = document.getElementById("cascading-nav").getElementsByTagName("A");
	for (var i=0; i<mcEls.length; i++) {
		mcEls[i].onfocus=function() {
			if (this.parentNode.lastChild.tagName == "UL") {
				clearSelects('hide');
			}
			this.className+=(this.className.length>0? " ": "") + "cascademenu"; //a:focus
			
			this.parentNode.className+=(this.parentNode.className.length>0? " ": "") + "cascademenu"; //li < a:focus
			if(this.parentNode.parentNode.parentNode.nodeName == "LI") {
				this.parentNode.parentNode.parentNode.className+=(this.parentNode.parentNode.parentNode.className.length>0? " ": "") + "cascademenu"; //li < ul < li < a:focus
				clearSelects('hide');
				if(this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
					this.parentNode.parentNode.parentNode.parentNode.parentNode.className+=(this.parentNode.parentNode.parentNode.parentNode.parentNode.className.length>0? " ": "") + "cascademenu"; //li < ul < li < ul < li < a:focus
					clearSelects('hide');
				}
			}
		}
		mcEls[i].onblur=function() {
			clearSelects('show');
			this.className=this.className.replace(new RegExp("( ?|^)cascademenu\\b"), "");
			this.parentNode.className=this.parentNode.className.replace(new RegExp("( ?|^)cascademenu\\b"), "");
			
			if(this.parentNode.parentNode.parentNode.nodeName == "LI") {
				clearSelects('show');
				this.parentNode.parentNode.parentNode.className=this.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)cascademenu\\b"), "");
				if(this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
					clearSelects('show');
					this.parentNode.parentNode.parentNode.parentNode.parentNode.className=this.parentNode.parentNode.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)cascademenu\\b"), "");
					
				}
			}
		}
	}
}

// only ie needs the sfHover script. all need the accessibility script...
if(window.addEventListener) window.addEventListener('load', mcAccessible, false); // gecko, safari, konqueror and standard
else if(document.addEventListener) document.addEventListener('load', mcAccessible, false); // opera 7
else if(window.attachEvent) { // win/ie
	window.attachEvent('onload', sfHover);
	window.attachEvent('onload', mcAccessible);
} else { // mac/ie5
	if(typeof window.onload == 'function') {
		var existing = onload;
		window.onload = function() {
			existing();
			sfHover();
			mcAccessible();
		}
	} else {
		window.onload = function() {
			sfHover();
			mcAccessible();
		}
	}
}



// ]]>