
var mobj3=document.body;
mobj3.onload=new function eventHandler(){
	//alert('load!');
	//alert(5);
	var sUA=document.getElementById('UA').value;

	/*if (sUA.indexOf('irefox')<=0&&sUA.indexOf('MSIE')<=0){
		alert('Deze module is ontwikkeld om visueel correct te functioneren met de browsers \"Firefox\" of \"Internet Explorer (versie 7,8 of 9)\".\n\nOp andere browsers functioneert deze wel, maar kan de visuele presentatie gebreken vertonen.')
	}*/
	/*if (sUA.indexOf('MSIE 9.')>1){
		alert('U gebruikt op het ogenblik Internet Explorer 9. De CE markeringen module werkt correct op deze browser, er kunnen echter kleine visuele imperfecties optreden ten gevolge van de marginaal andere verwerking van stylesheets hierin.\n\nEen set nieuwe stylesheets speciaal voor Internet Explorer 9 is in bewerking en zal binnenkort worden geimplementeerd. \n\nIndien u de kleine visuele imperfecties storend vindt kunt u tot het zover is ook gebruik maken van de \"Compatibility modus\" van Internet Explorer 9. Deze activeert u door op het \"Gescheurde documentje\" aan de rechterzijde van de URL balk te klikken');
	}*/
	//alert(13);
	var nm=document.location.href;
	var q=nm.indexOf('?');
	q = parseInt(q);
	//alert(17);
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
	
	//alert(31);
	
	nm=nm.substring(0,q)
	//alert(36);
	//document.getElementById('StatsDiv').innerHTML="<IFRAME id='statFRM' name='statFRM' src='imgtest.aspx?tgt="+nm+"'></IFRAME>";
//alert(37);


	/*var mldn = document.getElementById('mld').value;
	if (mldn.length>0){
		alert(mldn);
		document.getElementById('mld').value='';
	}*/

	//alert(47);

	document.getElementById('ZoekTerm').style.backgroundColor='#BBBBBB';
	document.getElementById('ZoekTerm').disabled=true;
	//document.getElementById('DoeZoekIMG').disabled=true;
	document.getElementById('ZoekTerm').value='';		//De lijst met Zoektermen wordt opgehaald.
	//alert(53);
	var VFD=document.getElementById('VerzendFormDIV').innerHTML+="<DIV style='background-color:#FFFFFF;'><SELECT onclick='javascript:SelectZoekTerm();' id='DirSearchResult' name='DirSearchResult' style='z-index:100000;position:absolute;top:65px;left:175;visibility:hidden;width:650px;height:200px;' MULTIPLE='multiple'><OPTION value=1>lkmlkmlm</SELECT></DIV>";
	//document.getElementById('VerzendFormDIV').innerHTML=VFD; 
	/*document.onmouseup = function RestLayout() {
		document.getElementById('tipsDIV').style.display='block';

		document.getElementById('DirSearchResult').style.visibility='hidden';
		/*if (topgezet==true){
			document.getElementById('appl-ttl').style.top='-267px';
			document.getElementById('topNavigatie').style.top='-275px';
		}*/
	//}
	
	//alert(67);
	
	Verzend_Ajax();
	
	//alert(71);
}
function SelectZoekTerm(){
	
	var x = 'DirSearchResult';
	
	var lst=document.getElementById(x);
	var thsItm=lst[lst.selectedIndex];
	var PB_State=document.getElementById('PB_State').value;
	//alert('DoRelay.aspx?ID='+thsItm.value+'&fromlist=true'+'&thsFL='+document.getElementById('thsFL').value+'&Zoekterm='+thsItm.text+'&PB_State='+PB_State+'&UB='+document.getElementById('UB').value);
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
	*/
	//alert(119);
	var sreq='PB_State=' + encodeURIComponent(document.getElementById('PB_State').value);

	var oXmlHttp = createXMLHttp();
	oXmlHttp.open('post','CE_NormenLijst.aspx',true);
	oXmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	oXmlHttp.onreadystatechange = function () {
		if (oXmlHttp.readyState  == 4){
			if (oXmlHttp.status==200){
				//alert(133);
				ParamLijst = oXmlHttp.responseText;
				if (ParamLijst!=undefined&&ParamLijst!='undefined'){
					if (ParamLijst.indexOf('#')>=0){
						var arPlst=new Array();
						arPlst=ParamLijst.split(/\#/g);
						
						//alert(125);
						
						for (var i=0;i<arPlst.length;i++) {

							if (arPlst[i].length>0){
								if (i==0) {
									//alert('arPlst[0] = ' + arPlst[i]);
									if (arPlst[i].indexOf('~')>=0){
										NormenLijst=arPlst[i].split(/\~/g);
									} else {
										NormenLijst[0]=arPlst[i];
									}
									//alert(NormenLijst.join('#'));
									//document.getElementById('TEST_DIV').innerHTML = NormenLijst.join('<br>');
									/*for (var j = 0;j<NormenLijst.length;j++){
										if (NormenLijst[j]){
											NormenLijst[j] = NormenLijst[j].replace("%hkj%", "#").replace("%dkj%", "^").replace("%tld%", "~");
										}
									}*/
								} else if (i==1){
									if (arPlst[i].indexOf('~')>=0){
										ProduktenLijst=arPlst[i].split(/\~/g);
									} else {
										ProduktenLijst[0]=arPlst[i];
									}
									/*for (var j = 0;j<ProduktenLijst.length;j++){
										if (ProduktenLijst[j]){
											ProduktenLijst[j] = ProduktenLijst[j].replace("%hkj%", "#").replace("%dkj%", "^").replace("%tld%", "~");
										}
									}*/
								}
								geladen=true;
							}
						}
					}
				}
				setTimeout("SetZoekVak()",2000);
			} else {
				alert('Helaas, er is een probleem opgetreden! \n\nOmschrijving van het probleem: \"' + oXmlHttp.statusText + '\"');
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
	//document.getElementById('DoeZoekIMG').disabled=false;
	document.getElementById('ZoekTerm').style.color='#444444';
	document.getElementById('ZoekTerm').value='Type hier waar u naar wilt zoeken';
	//alert(186);
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
	//alert('CEstart.js: DoeActie()');
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
		var tlr=0;
		if (as.length>MinDirSLen){
			document.getElementById('DirSearchResult').options.length=0;
			var arRes = new Array();
			arRes[0]="<SELECT onclick='javascript:SelectZoekTerm(this.id);' id='DirSearchResult' name='DirSearchResult' style='z-index:100000;width:650px;height:200px;' MULTIPLE>";
			tlr=1;
		}
		
		//alert(237);
		
		if (as.length>MinDirSLen){
			
			//alert('ProduktenLijst.length = ' + ProduktenLijst.length);
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
						arRes[tlr+3]=arAn[1].replace(/%hkj%/g, "#").replace(/%dkj%/g, "^").replace(/%tld%/g, "~");
						tlr+=4
					}
				} /* else {
					alert('xxx no ^');
				}*/
			}
			
		}
		
		//alert(264);
		
		if (as.length>MinDirSLen){
			tlr+=1;
		}
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
						arRes[tlr+3]=arAn[1].replace(/%hkj%/g, "#").replace(/%dkj%/g, "^").replace(/%tld%/g, "~");
						tlr+=4
					}
				}
			}
		}
		if (as.length>MinDirSLen){
			arRes[tlr]="</SELECT>";
			//alert(283);
			document.getElementById('drpdwnDIV').innerHTML=arRes.join('');
			document.getElementById('drpdwnDIV').style.visibility="visible";
			//console.clear();
			//console.log(document.getElementById('drpdwnDIV').innerHTML);
		}
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
								var ll=document.getElementById('DirSearchResult').options.length;
								document.getElementById('DirSearchResult').options[ll].add(opts);
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

		if (optl>0&&as.length>1&&as.length>MinDirSLen){
			//alert(333);
			document.getElementById('tipsDIV').style.display='none';

			/* UITGEZET 20220206*/
			document.getElementById('DirSearchResult').style.visibility='visible';
			
			//document.getElementById('DirSearchResult')[0].selected=true;
			//document.getElementById('DirSearchResult').selectedIndex=0;

			/*toph1=document.getElementById('appl-ttl').style.top;
			toph2=document.getElementById('topNavigatie').style.top;
			document.getElementById('appl-ttl').style.top='-217px';
			document.getElementById('topNavigatie').style.top='-225px';*/
			topgezet=true;
			
			/*EINDEUITGEZET 20220206*/

		} else {

			document.getElementById('DirSearchResult').style.visibility='hidden';
		}
	} else {

		document.getElementById('DirSearchResult').style.visibility='hidden';
	}
}
function Get_Cookie( check_name ) {
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		a_temp_cookie = a_all_cookies[i].split( '=' );


		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function Set_Cookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires )
	{
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	//alert('expires ' + expires_date.toGMTString());// this is for testing purposes only

	document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString()
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
//alert('koekjes');
}

function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
			( ( path ) ? ";path=" + path : "") +
			( ( domain ) ? ";domain=" + domain : "" ) +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
