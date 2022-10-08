//	Belastingdienst (c) : /common/js/bd_init.js

function Init(strPara1, strPara2, strPara3, strPara4) {
  // In strPara1 wordt aangegeven om wat voor soort pagina het gaat. SP/OP/IP/SF/IH
/*	if (document.location.href.indexOf("/zoek/")>=0) {
			SetResolution(screen.width, screen.height, "ZOEK")
 	} else {
			SetResolution(screen.width, screen.height, strPara1)
	}*/
	initReken();
	initMatomo();
//	doZoekBox();
//	doInitVGV();
//	boxCorner();
}

// script Matomo beta en productie
function initMatomo() {
	let domain = (location.host === undefined) ? ['beta'] : location.host.split('.', 1);
	if (domain[0] === 'beta' || domain[0] === 'beta-t' || domain[0] === 'beta-m' || domain[0] === 'beta-o'){
		var _mtm = _mtm || [];
		_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://pwa001.belastingdienst.nl/js/container_V5pHHGy2.js'; s.parentNode.insertBefore(g,s); }
	else {
		var _mtm = _mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://pwa001.belastingdienst.nl/js/container_RSpCJUas.js'; s.parentNode.insertBefore(g,s); }
}

//Speciale functie welke worden uitgevoerd bij het laden van rekenmodules
function initReken(){
	try {	
		document.getElementById("divVragen").style.display = "block";  // Alleen tonen bij javascript aan. 
	} catch(err){}

	try {
		document.getElementById("divButtons").style.display = "block"; 
	} catch(err){}

  uri = getURL(uri);
  if (uri.dir.toLowerCase().indexOf('\/rekenhulpen\/') != -1 || uri.dir.toLowerCase().indexOf('\/rekenhulpen_coi\/') != -1){
	 // Voorkom cache-probleem bij pagina-refresh
  	for(i=0; i<document.forms.length; i++) {
  	  document.forms[i].reset();
		}
		var arrAllDIVs = document.getElementsByTagName("div");
		//Het versienummer en de debug-velden tonen in ontwikkel-omgeving
		if(uri.dom == 'file:' || uri.dom.substr(0,6) == "www-o." || uri.dom.substr(0,9) == "douane-o."|| uri.dom.substr(0,8) == "tslgn-o." || uri.dom.substr(0,9) == "localhost" || uri.dom.substr(0,14) == "www-o-local.nl") {
			try{document.getElementById("divVersie").style.display = 'block';}catch(e){}
			try{initVersie();}catch(e){}
			for (i=0; i <= arrAllDIVs.length - 1; i++) {
				if (arrAllDIVs[i].className == "clDebugHidden" ) {
					try{arrAllDIVs[i].className = "clDebug";}
					catch(e){}
				}
			}
		} else {
			try{document.getElementById("divVersie").style.display = 'none';}
			catch(e){}
			for (i=0; i <= arrAllDIVs.length - 1; i++) {
				if (arrAllDIVs[i].className == "clDebug" ) {
					try{arrAllDIVs[i].className = "clDebugHidden";}
					catch(e){}
				}
			}
		}
		toonVersie();
  }
}

function toonVersie(){
	var bToonteller = false;
	for (var i=0; i<uri.args.length && bToonteller == false; i++){
		if (uri.args[i] == "versie" ) {
			bToonteller = true;
			if (typeof sVersie!=="undefined"){
			alert("Versie: " + sVersie);
			} else if (typeof sTiVersie!=="undefined"){
				alert("Versie: " + sTiVersie);
			}
		}
	}
}

 function SwitchStyleSheet2(title) {
	var i, a, main;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			a.disabled = true;
			if(a.getAttribute("title") == title) a.disabled = false;
		}
	}
}


 /* SwitchStyleSheet aangepast i.v.m. probleem Safari 5.1 ( a.disabled werkt niet ) */
function SwitchStyleSheet(title) {
  var a, oNOJS;
	var link = "";
  for(var i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("title") == "NOJS" ) {
			oNOJS = a;
		}
	  if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			if(a.getAttribute("title") == title && link=="" ) link = a.href;
			a.setAttribute("href","");
    }
  }
	oNOJS.setAttribute("href",link);
}

function _loadXMLDoc(xmlName) {
  var xmlDoc;
  if (window.ActiveXObject) { //IE
  	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  } else if (document.implementation && document.implementation.createDocument) { //MOZ, FF, OP
  	xmlDoc=document.implementation.createDocument("","doc",null);
  } else {
  	alert('Your browser cannot handle this script');
  }
  xmlDoc.async=false;
  xmlDoc.load(xmlName);
  return(xmlDoc);
}

function getElementsByClassName(oElm, strTagName, strClassName) {
/*
	// mdb: versie zonder RegExp >> nodig?
	var arrElements = oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	for(var i=0; i<arrElements.length; i++) {
		if(arrElements[i].className.toString() == strClassName) {
			arrReturnElements.push(arrElements[i]);
		}
	}
*/
//alert("oElm: " + oElm + "\ntagName: " + strTagName + "\nclassName: " + strClassName)
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++) {
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)) {
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}