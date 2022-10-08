<!--
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
window.onload = function(){
	var hash = getUrlVars();
	var back = hash['BACK']=='true';
	if (back){
		var oNewP=document.createElement("a");
		var oText=document.createTextNode("Terug");
		oNewP.appendChild(oText);
		oNewP.href="javascript:history.back()";
		oNewP.className="back";
		var beforeMe=document.getElementsByTagName("h1")[0];
		document.body.insertBefore(oNewP,beforeMe);
	}
}
-->
