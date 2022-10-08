<!--
function openIndex(controller, index, lang) {
	var lng = '_nl';
	if (lang == 'en') {
		lng = '_uk';
	}
	window.open('/public/indexes/'+controller+'/'+index+'/index'+lng+'.html', 'index', 'width=500, height=300, status=no, toolbar=no, location=no, menubar=no, scrollbars=yes');
}

function closeIndex() {
	window.close();
}

function getIndex(index, query) {
	window.opener.document.getElementById(index).value = query;
	window.close();
}

function  popupIndex(srch){
  window.open('/public/indexes/popupIndex.html'+srch,'indx',"location=no,width=410,height=530,left=300,top=100,menubar=no,scrollbars=yes,resizable=no");
}
-->