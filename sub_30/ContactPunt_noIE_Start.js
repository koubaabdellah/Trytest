var mobj3=document.body;
mobj3.onload=new function eventHandler(){
	try {
	var cw=document.body.clientWidth;
	var inw=925;
	var inw2=750;
	var offs=(cw-inw)/2;
	var offs2=(cw+inw2)/2;
	var ROL=document.getElementById('RO_link');
	var CL=document.getElementById('contact_link');
	var HL=document.getElementById('home_link');
	var RCI=document.getElementById('rightColImgID');
	var blubber=document.getElementById('blubber');
	var LftCol=document.getElementById('lftColID');

	ROL.style.left=offs+'px';
	offs+=5;
	HL.style.left=offs+'px';
	offs+=17;
	LftCol.style.left=offs+'px';
	CL.style.left=offs2+'px';
	offs2-=150;
	RCI.style.left=offs2+'px';
	offs2-=115;
	blubber.style.left=offs2+'px';

	/*var nm=document.location.href;
	var q=nm.indexOf('?');
	q = parseInt(q);
	if (isNaN(q)!=true){
		var sl=nm.indexOf('/');
		sl = parseInt(sl);
		var sls=-1;
		if (isNaN(sl)!=true){
			while (sl<q&&sl>=0){
				sls=sl
				nm=nm.substring(sl+1,nm.length)
				sl=nm.indexOf('/');
				q=nm.indexOf('?');
				q=parseInt(q);
			}
		}
	}
	nm=nm.substring(0,q)

	document.getElementById('StatsDiv').innerHTML="<IFRAME id='statFRM' name='statFRM' src='imgtest.rbm?tgt="+nm+"'></IFRAME>";*/
	} catch (err) {alert(err.description)}
	
	setTimeout("askEnq()", 30000);
	
}

function askEnq() {
    
	var ae =document.getElementById('iAskEnq').value;

    if (ae.length <= 0) {
        var enqAskedTwice = getCookie('enqAsked_2');
        var shw = false;
        if (enqAskedTwice != 'yes') {
            setCookie('enqAsked_2', '', 14)
            if (enqAskedTwice == 'no1') {
                setCookie('enqAsked_2', 'yes', 14)
                shw = true;
            } else {
                setCookie('enqAsked_2', 'no1', 14)
                shw = true;
            }
        } 
        if (shw == true) {
			//alertOverlayTonen('askEnq', '<p>De site van het Contactpunt bouwproducten wordt met grote zorg samengesteld en onderhouden. <p></p>Om dit in de toekomst nog beter te kunnen doen zouden wij u graag enkele vragen willen stellen over het gebruik en uw mening over de site. <p></p>Wilt u meedoen aan deze korte enquete (11 vragen)? <p></p>klik dan op "Doorgaan", <p></p>wilt u niet meedoen? klik dan op "Annuleren".</p>');
			//setCookie('enqAsked_2', 'yes', 14);
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
//-=-=-
var ovlTonen = false;
var DoCloseOverlay = true;
function alertOverlayTonen(act, txt) {
    
    currAction = act;
    document.getElementById('AOMtxt').innerHTML = txt;

    // overlay aan pagina toevoegen
    var overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    overlay.setAttribute("class", "overlay");
    document.body.appendChild(overlay);
    document.getElementById('overlay').style.zIndex = 1200000;

    document.getElementById('alertOverlay').style.display = 'block';

    ovlTonen = true;

}
var currAction = '';
function doorgaan() {

    switch (currAction) {

        case 'askEnq':
            document.location.href = 'Contactpuntbouwproducten_Enquete2016.aspx';
            break;
    }
}
function annuleren() {
    currAction = '';

    restore();
}

function restore() {

    if (DoCloseOverlay == true) {
        ovlTonen = false;

        document.getElementById('alertOverlay').style.display = 'none';
        document.body.removeChild(document.getElementById("overlay"));
        

    }
    DoCloseOverlay = true;
}
//-=-=-
var mobjXX = document.body;
mobjXX.onresize = function onresDoc(){
	var cw=document.body.clientWidth;
	var inw=925;
	var inw2=750;
	var offs=(cw-inw)/2;
	var offs2=(cw+inw2)/2;
	var ROL=document.getElementById('RO_link');
	var CL=document.getElementById('contact_link');
	var HL=document.getElementById('home_link');
	var RCI=document.getElementById('rightColImgID');
	var blubber=document.getElementById('blubber');
	var LftCol=document.getElementById('lftColID');
	ROL.style.left=offs+'px';

	offs+=5;
	CL.style.left=offs2+'px';
	HL.style.left=offs+'px';
	offs+=17;
	LftCol.style.left=offs+'px';
	offs2-=150;
	RCI.style.left=offs2+'px';
	offs2-=115;
	blubber.style.left=offs2+'px';
}

var MaxXMLversie=6;
function createXMLHttp(){
	if (typeof XMLHttpRequest != undefined&&typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	} else {
		for (var i=MaxXMLversie;i>=0;i--){
			if (i==0){
				try {
					var oXmlHttp = new ActiveXObject('Microsoft.XMLHttp')
					return oXmlHttp;
				} catch (err) {}
			} else if (i==1) {
				try {
					var oXmlHttp = new ActiveXObject('MSXML2.XMLHttp')
					return oXmlHttp;
				} catch (err) {}
			} else  {
				try {
					var oXmlHttp = new ActiveXObject('MSXML2.XMLHttp.'+i+'.0')
					return oXmlHttp;
				} catch (err) {}
			}
		}
		throw new Error('MSXML is niet geinstalleerd!');
	}
}
function Verzend_Ajax(vrg,eml,nm){
	//alert('Verzend_Ajax: y = ' + y);
	try {
	var sreq;

	arParams = new Array();
	var sParam = encodeURIComponent("vraag");
	sParam += '=';
	sParam += encodeURIComponent(vrg);
	arParams[arParams.length]=sParam;

	var sParam = encodeURIComponent("email");
	sParam += '=';
	sParam += encodeURIComponent(eml);
	arParams[arParams.length]=sParam;

	var sParam = encodeURIComponent("naam");
	sParam += '=';
	sParam += encodeURIComponent(nm);
	arParams[arParams.length]=sParam;

	var sParam = encodeURIComponent("ticketnr");
	sParam += '=';
	sParam += encodeURIComponent(document.getElementById('ticketnr').value);
	arParams[arParams.length]=sParam;

	var sParam = encodeURIComponent("instelling");
	sParam += '=';
	sParam += encodeURIComponent(document.getElementById('instelling').value);
	arParams[arParams.length]=sParam;

	sreq=arParams.join('&');

	var oXmlHttp = createXMLHttp();
	oXmlHttp.open('post','MyVraagVerzenden.rbm',true);

	oXmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	oXmlHttp.onreadystatechange = function () {
		if (oXmlHttp.readyState  == 4){
			//alert(123);
			if (oXmlHttp.status==200){
				if (oXmlHttp.responseText.length>0){
					alert(oXmlHttp.responseText)
					//document.getElementById('PrivacyVerkl').style.color='#ff0000';
				}
			} else {
				alert('Helaas, er is een probleem opgetreden! /n/nOmschrijving van het probleem: \"' + oXmlHttp.statusText + '\"');
				//document.getElementById('PrivacyVerkl').style.color='#ff0000';
			}
		}
	}
	oXmlHttp.send(sreq);
	} catch (err){alert(err.description);}

}
function RMHover(x){
	document.getElementById(x).style.backgroundColor='#cce0f1';
	document.getElementById(x+'img').src='images/ArrowFromLeft_blue.png';
}
function RMunHover(x){
	document.getElementById(x).style.backgroundColor='#FFFFFF';
	document.getElementById(x+'img').src='images/ArrowFromLeft.png';
}