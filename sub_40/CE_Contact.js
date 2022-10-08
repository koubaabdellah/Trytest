
var mobj3=document.body;
mobj3.onload=new function eventHandler(){

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

	var mldn = document.getElementById('mld').value;
	if (mldn.length>0){
		alert(mldn);
		document.getElementById('mld').value='';
	}

	document.getElementById('ZoekTerm').style.backgroundColor='#BBBBBB';
	document.getElementById('ZoekTerm').disabled=true;
	document.getElementById('DoeZoekIMG').disabled=true;
	//document.getElementById('SelFromList').style.display='block';
	document.getElementById('ZoekTerm').value='De lijst met Zoektermen wordt opgehaald.';
	var VFD=document.getElementById('VerzendFormDIV').innerHTML+="<DIV style='background-color:#FFFFFF;'><SELECT onclick='javascript:SelectZoekTerm(this.id);' id=DirSearchResult name=DirSearchResult style='z-index:100000;position:absolute;top:65;left:175;visibility:hidden;width:650px;height:200px;' MULTIPLE><OPTION value=1>lkmlkmlm</SELECT></DIV>";
	//document.getElementById('VerzendFormDIV').innerHTML=VFD;
	/*document.onmouseup = function RestLayout() {
		//document.getElementById('tipsDIV').style.display='block';
		//document.getElementById('Devider').style.display='block';
		//document.getElementById('NormPresentatieDIV').style.display='block';


		/*if (topgezet==true){
			document.getElementById('appl-ttl').style.top='-267px';
			document.getElementById('topNavigatie').style.top='-275px';
		}*/

		//document.getElementById('DirSearchResult').style.visibility='hidden';
	//}
	
	Verzend_Ajax();
}
/*var ZtRM
function DoeDirectSearch(){
	alert('DoeDirectSearch()');
}*/
function SelectZoekTerm(x){
//alert(111);
	var lst=document.getElementById(x);
	//alert(2);
	var thsItm=lst[lst.selectedIndex];
	//alert(3);
	//try {
	//alert(document.getElementById('PB_State').value);
	var PB_State=document.getElementById('PB_State').value;
	
	//alert(4);
	//alert('DoRelay.aspx?ID='+thsItm.value+'&fromlist=true'+'&thsFL='+document.getElementById('thsFL').value+'&Zoekterm='+thsItm.text.replace(/\?/g,"%vrgtk%").replace(/\&/g,"%mprsnd%").replace(/\#/g,"%hkj%")+'&PB_State='+PB_State+'&UB='+document.getElementById('UB').value);
	//alert(5);
	//} catch (err) {alert('AAAA! ' + err.description);}
	document.location.href='DoRelay.aspx?ID='+thsItm.value+'&fromlist=true'+'&thsFL='+document.getElementById('thsFL').value+'&Zoekterm='+thsItm.text.replace(/\?/g,"%vrgtk%").replace(/\&/g,"%mprsnd%").replace(/\#/g,"%hkj%")+'&PB_State='+PB_State+'&UB='+document.getElementById('UB').value;

}
var NormenLijst = new Array();
var ProduktenLijst = new Array();
var geladen=false;
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
function Verzend_Ajax(){
	try {
	/*var arParams = new Array();
	for (var i=0;i<document.frmGegHalen.elements.length;i++){
		var sParam = encodeURIComponent(document.frmGegHalen.elements[i].name);
		sParam += '=';
		sParam += encodeURIComponent(document.frmGegHalen.elements[i].value);
		arParams[arParams.length]=sParam;
	}
	//alert('value = ' + document.frmGegHalen.elements['gZoekTerm'].value + '\n\nencoded = ' + encodeURIComponent(document.frmGegHalen.elements['gZoekTerm'].value));
	var sreq=arParams.join('&');*/
	//var sreq='';

	var sreq='PB_State=' + encodeURIComponent(document.getElementById('PB_State').value);

	var oXmlHttp = createXMLHttp();
	oXmlHttp.open('post','CE_NormenLijst.aspx',true);
	oXmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	oXmlHttp.onreadystatechange = function () {
		if (oXmlHttp.readyState  == 4){
			if (oXmlHttp.status==200){
				ParamLijst = oXmlHttp.responseText;
				if (ParamLijst!=undefined&&ParamLijst!='undefined'){
					if (ParamLijst.indexOf('#')>=0){
						var arPlst=new Array();
						arPlst=ParamLijst.split(/\#/g);
						for (var i=0;i<arPlst.length;i++) {

							if (arPlst[i].length>0){
								if (i==0) {
									if (arPlst[i].indexOf('~')>=0){
										NormenLijst=arPlst[i].split(/\~/g);
									} else {
										NormenLijst[0]=arPlst[i];
									}
								} else if (i==1){
									if (arPlst[i].indexOf('~')>=0){
										ProduktenLijst=arPlst[i].split(/\~/g);
									} else {
										ProduktenLijst[0]=arPlst[i];
									}
								}
								geladen=true;
							}
						}
					}
				}
				setTimeout("SetZoekVak()",2000);
			} else {
				alert('Helaas, er is een probleem opgetreden! /n/nOmschrijving van het probleem: \"' + oXmlHttp.statusText + '\"');
			}
		}
	}
	oXmlHttp.send(sreq);
	} catch (err){alert(err.description);}

}

function SetZoekVak(){
	//Dit is een tijdelijke functie om de vertraging voor het ophalen van de lijst te simuleren
	document.getElementById('ZoekTerm').style.backgroundColor='#FFFFFF';
	document.getElementById('ZoekTerm').disabled=false;
	document.getElementById('DoeZoekIMG').disabled=false;
	document.getElementById('ZoekTerm').style.color='#444444';
	document.getElementById('ZoekTerm').value='Type hier waar u naar wilt zoeken';
}
var MinDirSLen = "2"
var MaxResLen = "0"
var ParamLijst;

var mobj1=document.getElementById('ZoekTerm');

var CommIsCleared=false;
mobj1.onmouseup=function ClearCommunicatietext(){
	if (CommIsCleared==false) {
		document.getElementById('ZoekTerm').value='';
		document.getElementById('ZoekTerm').style.color='#000000';
		CommIsCleared=true;
	}
}

mobj1.onfocus=function SelectThis(){
	try {
		document.VerzendForm.ZoekTerm.select();
	} catch (err){}
}
var toph1='';
var toph2='';
var topgezet=false;
mobj1.onkeyup=function DoeActie(){
	var src=document.getElementById('ZoekTerm').value.toLowerCase();
	var asrc=src.toLowerCase();
	if (asrc!='alle'){

		MinDirSLen=parseInt(MinDirSLen);
		MaxResLen=parseInt(MaxResLen);

		if (src.substring(0,6)=='norm: ') {
			src=asrc.substring(6,src.length);
		}
		if (src.substring(0,9)=='produkt: ') {
			src=asrc.substring(9,src.length);
		}

		var as='a'+src;
//alert(1);
		if (as.length>MinDirSLen){
			if (document.getElementById('DirSearchResult')){
				document.getElementById('DirSearchResult').options.length=0;
			}
			var arRes = new Array();
			arRes[0]="<SELECT onclick='javascript:SelectZoekTerm(this.id);' id=DirSearchResult name=DirSearchResult style='z-index:100000;visibility:hidden;position:absolute;top:65px;left:175px;width:650px;height:200px;' MULTIPLE>";
			tlr=1;
		}
		//alert(2);
		if (as.length>MinDirSLen){
			for (var i=0;i<NormenLijst.length;i++){
				if (NormenLijst[i].indexOf('^')>0){
					var arAn = new Array();
					arAn = NormenLijst[i].split(/\^/g);
					var an='a'+arAn[1].toLowerCase();
					if (an.indexOf(src)>=1){
						arRes[tlr]="<option value=N";
						arRes[tlr+1]=arAn[0];
						arRes[tlr+2]=">";
						arRes[tlr+3]=arAn[1].replace(/%hkj%/g, "#").replace(/%dkj%/g, "^").replace(/%tld%/g, "~");;
						tlr+=4
					}
				}
			}
		}

		//alert(3);
		try {
		if (as.length>MinDirSLen){
			tlr+=1;
			//alert(11);
			for (var i=0;i<ProduktenLijst.length-1;i++){
				//if (src.indexOf('is')>0){
					//alert('i = ' + i + '\n\nProduktenLijst[i] = ' + ProduktenLijst[i]);
				//}
				if (ProduktenLijst[i].indexOf('^')>0){
					var arAn = new Array();
					arAn = ProduktenLijst[i].split(/\^/g);
					var an='a'+arAn[1].toLowerCase();
					if (an.indexOf(src)>=1){
						arRes[tlr]="<option value=P";
						arRes[tlr+1]=arAn[0];
						arRes[tlr+2]=">";
						arRes[tlr+3]=arAn[1].replace(/%hkj%/g, "#").replace(/%dkj%/g, "^").replace(/%tld%/g, "~");;
						tlr+=4
					}
				} /* else {
					alert('xxx no ^');
				}*/
			}
			arRes[tlr]="</SELECT>";
			//alert(4);
			document.getElementById('drpdwnDIV').innerHTML=arRes.join('');
			//alert(5);
		}
		} catch (err) {alert(err.description);}


		//Wellicht willen we in de toekomst toch nog eens direct gaan zoek op IUT Tabellen

		/*		if (as.length>MinDirSLen){
					document.getElementById('DirSearchResult').options.length=0;
					for (var i=0;i<IUTabellenLijst.length;i++){
						if (IUTabellenLijst[i].indexOf('^')>0){
							var arAn = new Array();
							arAn = IUTabellenLijst[i].split(/\^/g);
							var an='a'+arAn[1].toLowerCase();
							if (an.indexOf(src)>=1){
								var opts = new Option(arAn[1],arAn[0]);
								document.getElementById('DirSearchResult').options.add(opts);
							}
						}
					}
				}*/


		var optl=document.getElementById('DirSearchResult').options.length;
		optl=parseInt(optl);

		if (optl<15){
			document.getElementById('DirSearchResult').style.height=(2+20*optl)+'px';
		} else {
			document.getElementById('DirSearchResult').style.height=300;
		}

		//alert('optl = ' + optl + '\n\nas = ' + as);
		if (optl>0&&as.length>1&&as.length>MinDirSLen){
			//alert(333);
			//document.getElementById('tipsDIV').style.display='none';
			//document.getElementById('Devider').style.display='none';
			//document.getElementById('NormPresentatieDIV').style.display='none';

			document.getElementById('DirSearchResult').style.visibility='visible';
			//document.getElementById('DirSearchResult')[0].selected=true;
			//document.getElementById('DirSearchResult').selectedIndex=0;

			//toph1=document.getElementById('appl-ttl').style.top;
			//toph2=document.getElementById('topNavigatie').style.top;
			//document.getElementById('appl-ttl').style.top='-217px';
			//document.getElementById('topNavigatie').style.top='-225px';
			//topgezet=true;

		} else {
			document.getElementById('DirSearchResult').style.visibility='hidden';
		}
	} else {
		document.getElementById('DirSearchResult').style.visibility='hidden';
	}
}

