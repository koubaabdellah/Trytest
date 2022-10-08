var queryline;
var filtercount = 0;
var totalcount= 0;
var pw;
var ph;
var orgcomparea = "";

$(document).ready(Init);

function Init()
{
  OnLoadPage();
}


function Listen(evnt, elem, func) 
{    
	if (elem.addEventListener) {
	  // W3C
	  elem.addEventListener(evnt,func,false);   
	} else if (elem.attachEvent) {
		// IE
		var r = elem.attachEvent("on"+evnt, func);	
		return r;    
  } else {
  	window.alert("No EventListening possible in this browser");
  }
} 

function getEventTarget(event)
{
	var targetElement = null;
	if (typeof event.target != "undefined") {
	  targetElement = event.target;	
	} else {
	  targetElement = event.srcElement;		
	}
	while ((targetElement.nodeType == 3) && (targetElement.parenNode != null)) {
	  targetElement = targetElement.parentNode;  	
	}
	return targetElement;
}

function AddEvents()
{
  var inp = null;
  var inputcol= document.body.getElementsByTagName("INPUT");
  for  (var i=0;i<inputcol.length;i++) {
  	inp = inputcol[i];
  	if (inp.getAttribute("type") == "checkbox")  {
      if (inp.className != 'comp' ) {
        Listen('click',inp,DoFilter);	
      }
    }
  }
  
  var sel = null;
  var selectcol= document.body.getElementsByTagName("SELECT");
  for  (var j=0;j<selectcol.length;j++) {
  	sel = selectcol[j];
  	if (sel.id != "pd_techniek") { 		  			
  	  Listen('change',sel,DoFilter);	  
  	}
  } 
}

function OnLoadPage()
{
  AddEvents();
  SetExternalFilter();  
  DoFilter();	 
  //OnResizePage();
}

function SetExternalFilter() 
{
  var urlline  = document.location.href;
  var index1 =  urlline.indexOf("filter=");
  if (index1 > -1) {
		// filter aanwezig
		var filterline = urlline.substr(index1 + 7);
		var index2 = filterline.indexOf("&");
		if (index2 > -1) {
			filterline = filterline.substr(0,index2);
		}
		var filterarray = filterline.split(",");
		for (var i=0;i<filterarray.length;i++) {  
			var id = decodeURI(filterarray[i]);
			id = id.trim();
			var index3 = id.indexOf(":");
			if (index3 > -1) {
				// samengestelde id
				var subid = id.substr(index3 + 1);
				id = id.substr(0,index3);	  
			}  
			var filterobj = document.getElementById(id);
			if (filterobj != null) {
				if ((filterobj.tagName == "INPUT") && (filterobj.getAttribute("type") == "checkbox")) {
					filterobj.setAttribute("checked","checked");  
				} else if (filterobj.tagName == "SELECT") {
					for (var j=0;j<filterobj.options.length;j++) {
						if (filterobj.options[j].value == subid) {
							filterobj.selectedIndex = j;
						}
					}
				}	
			}
		}
  }
}

function OnResizePage()
{
  //var pwidth = parseInt(document.body.clientWidth);
  //var pheight = parseInt(document.body.clientHeight);
  
  var pwidth = 700;
  var pheight = parseInt(document.body.clientHeight);
  
  var comparea = document.getElementById("comp_area");
  var comp_innerarea = document.getElementById("comp_innerarea");
  if ((comparea) && (comp_innerarea))  {
 	  var caw = pwidth - 100;
 	  if (caw < 500) { caw = 500 }
 	  var cah = pheight - 100;
 	  if (cah < 500) { cah = 500 }
 	  
 	  comparea.style.width = caw + "px";
 	  comparea.style.height = (cah - 80) + "px";
 	  comp_innerarea.style.height = (cah - 110) + "px";
 	  
 	  var cal = (pwidth / 2) - (caw / 2);
 	  if (cal < 0) { cal = 0 }
 	  var cat = (pheight / 2) - (cah / 2);
 	  if (cat < 0) { cat = 0 }
 	  
 	  comparea.style.left = cal  + "px";
 	  comparea.style.top = cat + "px";
 	      
  }  	
}

function ovrcbl(obj)
{
  obj.className = "cbl_hover";
}

function outcbl(obj)
{
  obj.className = "cbl";	
}

function NavToTechniek(obj)
{
  if (  obj.options[obj.options.selectedIndex].value != "-1" ) {
    NavTo( obj.options[obj.options.selectedIndex].value  );	
  }
}

function SelectAll(id)
{
  var area = document.getElementById(id);
  
  var inp = null;
  var inputcol= area.getElementsByTagName("INPUT");
  for  (var i=0;i<inputcol.length;i++) {
  	inp = inputcol[i];
  	if (inp.getAttribute("type") == "checkbox") {
      inp.checked = true; 
    }
  }
  
  DoFilter();
}

function ResetSelection()
{
  var area = document.getElementById('queryarea');
  
  var inp = null;
  var inputcol= area.getElementsByTagName("INPUT");
  for  (var i=0;i<inputcol.length;i++) {
  	inp = inputcol[i];
  	if (inp.getAttribute("type") == "checkbox") {
      inp.checked = false; 
    }
  }
  
  var sel = null;
  var selectcol= area.getElementsByTagName("SELECT");
  for  (var j=0;j<selectcol.length;j++) {
  	sel = selectcol[j];
  	if (sel.id != "pd_techniek") { 		  			
  	  sel.selectedIndex = 0; 
  	}
  } 
  
  DoFilter();
  	
}

function ShowResults()
{
  tarea = document.getElementById("techniekenarea");
  qarea = document.getElementById("queryarea");
  if ((tarea) && (qarea)) {
    tarea.style.display = "block";
    qarea.style.display = "none";	
  }  	
}

function ShowQueryPage()
{
  tarea = document.getElementById("techniekenarea");
  qarea = document.getElementById("queryarea");
  if ((tarea) && (qarea)) {
    tarea.style.display = "none";
    qarea.style.display = "block";	
  } 	
}

function DoFilter()
{
  BuildQueryLine();
  ResetTable();
  BuildTable();	
}

function BuildQueryLine()
{
	queryline = "";
	var inp = null;
	
	var area = document.getElementById('queryarea');
	
	var inputcol= area.getElementsByTagName("INPUT");
  for  (var i=0;i<inputcol.length;i++) {
  	inp = inputcol[i];
  	if (inp.getAttribute("type") == "checkbox") { 		 		 	
  	  if (inp.checked == true) {
  	    queryline += inp.value + "|";	
  	  }
  	}
  }  
  
  
  var opt = null;
  var optioncol= area.getElementsByTagName("OPTION");
  for  (var j=0;j<optioncol.length;j++) {
  	opt = optioncol[j];
  	if (opt.getAttribute("t") != "t") { 		  			
  	  if (opt.selected == true) {
  	  	if (opt.value != "-1") {
  	      queryline += opt.value + "|";	
  	    }
  	  }
  	}
  } 
}

function ResetTable()
{
  totalcount = 0;
  filtercount = 0;
  
  var ttable = document.getElementById("techniektabel");
  var trcol = ttable.getElementsByTagName("TR");
  for (var i=0;i<trcol.length;i++) {
  	var trobj = trcol[i]
    if (trobj.getAttribute("f")) {
      trcol[i].style.display = "";
      totalcount += 1;
      filtercount += 1;
    }
  }
  
  ResetTechniekSelectors();
}

function BuildTable()
{
  var fline = "";
  var ttable = document.getElementById("techniektabel");
  var trcol = ttable.getElementsByTagName("TR");
  var trobj = null;
  var trarray = null;
  var queryarray = queryline.split("|");
  for (var i=0;i<trcol.length;i++) {
    trobj = trcol[i];
    trarray = null;
    trfilters = trobj.getAttribute("f");
    if (trfilters) {
      for (var j=0;j<queryarray.length;j++) {
        qvalue = "|" + queryarray[j] + "|";
        if (qvalue != "||") {
	        if (trfilters.indexOf(qvalue) < 0) {
	          trobj.style.display = "none";
	          filtercount -= 1;
	          break;    	
	        }
	      }
      }
    }  
  }
  SetCounters();    	
}

function SetCounters()
{
	var msg = filtercount + " van " +  totalcount + " technieken overgebleven na selectie";
	var counter1 = document.getElementById("filtercounter1");
	var counter2 = document.getElementById("filtercounter2");
	var counter3 = document.getElementById("filtercounter3");
	var counter4 = document.getElementById("filtercounter4");
	if ( (counter1) && (counter2) && (counter3) && (counter4)) {
	  counter1.innerHTML = msg;	
	  counter2.innerHTML = msg;	
	  counter3.innerHTML = msg;	
	  counter4.innerHTML = msg;	
	}
}

function NavTo(id)
{
  var page = '';
  if (id.indexOf('.trinidad') > 0) {
    page = id.substr(0,id.indexOf('.trinidad'));
  } else if (id.indexOf('.xml') > 0) {
    page = id.substr(0,id.indexOf('.xml'));	
  } else if (id.indexOf('.html') > 0) {
    page = id.substr(0,id.indexOf('.html'));	
  } else {
    page = id;	
  }
  
  if ( page.indexOf('http://') == -1 ) {
    page = "/Connect/bodemonderzoek/" + page;
    document.location.href = page;		
  } else {
    window.open(page);		
  } 
}

function ResetTechniekSelectors()
{
  var tt = document.getElementById("techniektabel");	
	if (tt) {	
	  var inputcol = tt.getElementsByTagName("INPUT"); 
	  for (var i=0;i<inputcol.length;i++) {
	    inputcol[i].checked = false;  	
	  }	
	}	
}

function ShowComparison()
{
	var tt = document.getElementById("techniektabel");	
	if (tt) {			
		var counter = 0;
	  var inputcol = tt.getElementsByTagName("INPUT"); 
		var techniekid = "";
		var techniektitel = "";
		
		if (orgcomparea == "") {
		  orgcomparea = document.getElementById("comp_innerarea").innerHTML;
		} else {
		  document.getElementById("comp_innerarea").innerHTML = orgcomparea;	
		}
		
			
		
		var comptable	= document.getElementById("comp_table");
		if (comptable) {
	    var techrow = document.getElementById("comp_techniek_tr");	
			var filterline = "";
			var beetjewaar = "";
			var trobj = null;	 		   
			for (var i=0;i<inputcol.length;i++) {
			  if ((inputcol[i].checked == true) && (inputcol[i].parentNode.parentNode.style.display != "none") && (inputcol[i].id != "toggle_all_techniek")) {
			    counter += 1;
			    if (counter > 20) { 			    	
			    	alert("U kunt maximaal 20 technieken met elkaar vergelijken.\nDe eerst 20 technieken zijn opgenomen in de vergelijkingstabel.\n\nKlik op OK om verder te gaan.");
			      break; 
			    }
			    techniekid = inputcol[i].getAttribute("tid");
			    trobj = inputcol[i].parentNode.parentNode;
			    filterline = trobj.getAttribute("f");
			    beetjewaar = trobj.getAttribute("b");
			    var tdcol = trobj.getElementsByTagName("TD");
			    if (tdcol.length > 1) {
			      techniektitel = tdcol[1].innerHTML; 	
			    } else {
			      techniektitel = "";	
			    }	
			    
			    var atd = document.createElement("TD");
			    atd.innerHTML = techniektitel;
			    
			    if ( (trobj.getAttribute("t") != '-') && (trobj.getAttribute("t") != '') ) {
			      atd.setAttribute("t", trobj.getAttribute("t"));			    
			      atd.className = "ct";
			      //Listen('click',atd,ClickCompTechniek);
			      //Listen('mouseover',atd,OverCompTechniek);
			      //Listen('mouseout',atd,OutCompTechniek);	
			    } else {
			      atd.className = "ct_disabled";  	
			    }
			    			    
			    techrow.appendChild(atd);
		    		    
		      var trobj = null;
		      var trcol = comptable.getElementsByTagName("TR");
		      for (var k=0;k<trcol.length;k++) {
		        trobj = trcol[k];
		        	        	        	        
		        var fid = trobj.getAttribute("fid");	        
		        var td2 = document.createElement("TD");
		        td2.className = "cc";
					  if ((fid) && (fid != "")) {
						  if (filterline.indexOf("|" + fid + "|") > -1) {
							  if (beetjewaar.indexOf("|" + fid + "|") > -1) {
							    td2.innerHTML = "o"; 	
							  } else {						  
							    td2.innerHTML = "+"; 
							  }
							} else {
							  td2.innerHTML = "-"; 	
							}							
						} else {						
							td2.innerHTML = "&nbsp;";   							  
					  } 
					  
					  if (trobj.id != "comp_techniek_tr") {
					    trobj.appendChild(td2); 	
					  }				 							 	
		      } 	
		    }       
		  }
		} 
	}
	
	
	var area = document.getElementById("comp_area");
	if (area) {
		if (counter > 0) {
			window.scrollTo(0,0);
	    area.style.display = "";
	  } else {
	    alert("Geen technieken geselecteerd");	
	  }	
	}
}

function ClickCompTechniek(event)
{
  var obj = getEventTarget(event);
  if (obj) {  	
    NavTo(obj.getAttribute("t")); 
  } 	
}

function OverCompTechniek(event)
{
  var obj = getEventTarget(event);
  if (obj) {
   obj.style.color = "#990000"; 
  }    	
}

function OutCompTechniek(event)
{
  var obj = getEventTarget(event);
  if (obj) {
    obj.style.color = "#000000";  
  }    
}

function OverClose(obj)
{
   obj.style.textDecoration = "underline";
}

function OutClose(obj)
{
  obj.style.textDecoration = "none";	
}

function CloseComp()
{
  var area = document.getElementById("comp_area");
	if (area) {
	  area.style.display = "none";	
	}	
}

function ToggleAllTechniek()
{
  var inputobj = document.getElementById("toggle_all_techniek");
  if ((inputobj) && (inputobj.checked == true)) {
    CheckAllTechniek();  	
  }	else {
    UncheckAllTechniek()	
  }
}

function CheckAllTechniek()
{
  var inputobj = document.getElementById("toggle_all_techniek");  
  if (inputobj) {
    inputobj.title = "Deselecteer alle technieken";	
    var tbl = document.getElementById("techniektabel");
    if (tbl) {
      var col = tbl.getElementsByTagName("INPUT");
      for (var i=0;i<col.length;i++) {
        if (col[i].className == "comp") {
          col[i].checked = true;    	
        }	
      }
    }
  }	
}

function UncheckAllTechniek()
{
  var inputobj = document.getElementById("toggle_all_techniek");
  if (inputobj) {
    inputobj.title = "Selecteer alle technieken";
    var tbl = document.getElementById("techniektabel");
    if (tbl) {
      var col = tbl.getElementsByTagName("INPUT");
      for (var i=0;i<col.length;i++) {
        if (col[i].className == "comp") {
          col[i].checked = false;    	
        }	
      }	
    }		
  }	
}

function PrintCompTable()
{
  var docPrint = window.open("","Print",null);
  var cbl = document.getElementById("comp_table");
  if (cbl) {
	  var innerHTML = cbl.parentNode.innerHTML;
	  docPrint.document.write('<html><head><title>Bodemrichtlijn - Vergelijkingstabel onderzoekstechnieken</title>');
	  docPrint.document.write('<script type="text/javascript">');
	   docPrint.document.write('  function NavTo(id) {  }');
	  docPrint.document.write('</script>');
	  docPrint.document.write('<style>');
	  docPrint.document.write('BODY { font-family: verdana; }');	  
	  docPrint.document.write('A:link { color:#000000; text-decoration:none;cursor:default; }');
	  docPrint.document.write('A:visited { color:#000000; text-decoration:none;cursor:default; }');
	  docPrint.document.write('A:active { color:#000000; text-decoration:none;cursor:default; }');
	  docPrint.document.write('#comp_table { margin-left: 4px; }');
	  docPrint.document.write('.cf { font-size: 7pt;font-weight: bolder; }');
	  docPrint.document.write('.cftr { background-color: #cccccc; }');
	  docPrint.document.write('.ci { font-size: 7pt;font-weight: normal;margin-left: 12px; }');
	  docPrint.document.write('.ct { writing-mode:tb-rl; filter:flipv fliph; width:20px; font-size: 7pt;color: #000000; }');
	  docPrint.document.write('.ct_disabled { writing-mode:tb-rl; filter:flipv fliph; width:20px; font-size: 7pt; color: #777777; }');
	  docPrint.document.write('.cc { font-size: 7pt; font-weight: normal; text-align: center; }');
	  docPrint.document.write('.legenda { margin-top: 16px;font-size: 8pt;margin-left: 4px;margin-bottom: 32px; }');
	  docPrint.document.write('.printtoolbar { display:none; }');
	  docPrint.document.write('.legenda { margin-top: 16px;font-size: 8pt;margin-left: 4px;margin-bottom: 32px; }');
	  docPrint.document.write('</style>');	  
	  docPrint.document.write('</head><body onLoad="self.print()">');
	  docPrint.document.write(innerHTML);
	  docPrint.document.write('</body></html>');
	  docPrint.document.close();  
	  docPrint.focus();	  
  }	
}

var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-545977-7"]);  
_gaq.push(["_trackPageview"]);
      
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();