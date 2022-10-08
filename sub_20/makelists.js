
url="/getthemalist.php";
$.getJSON(url, function( data ) {
  var items = [];
  $.each(data, function(i,item) {
  	var link="/thema/"+striptitle(data[i].name);
    items.push( "<li id='" + data[i].id + "'><a href='"+link+"'>" + data[i].name + "</a></li>" );
  });
  $( "<ul/>", {
    "class": "panel-body",
    html: items.join( "" )
  }).appendTo( "#collapseTwo" );
});


url="/getorglist.php";
$.getJSON(url, function( data ) {
  var items = [];
  $.each(data, function(i,item) {
  	var link="/organisatie/"+striptitle(data[i].name);
    items.push( "<li id='" + data[i].id + "'><a href='"+link+"'>" + data[i].name + "</a></li>" );
  });
  $( "<ul/>", {
    "class": "panel-body",
    html: items.join( "" )
  }).appendTo( "#collapseOne" );
});


function striptitle(mystr) {
	return mystr.toLowerCase().replace(/\W/g, '');
}
