window.DW_ajax = null;
if (window.XMLHttpRequest) {
  window.DW_ajax=new XMLHttpRequest()
} else if (window.ActiveXObject) {
  window.DW_ajax=new ActiveXObject("Microsoft.XMLHTTP")
}
function ajaxForm(url,form_id,callback,failback) {
  if (window.DW_ajax==null) {
    failback('No Ajax');
    return 0;
  }
  var params = new Array;
  $('#'+form_id+' input').each(function(){
    params.push(this.name+'='+escape(this.value));
  });
  $('#'+form_id+' select').each(function(){
    params.push(this.name+'='+escape(this.value));
  });
  var req = params.join('&');
  var fn = function () {
    if (window.DW_ajax.readyState==4) {
      if (window.DW_ajax.status == 200) {
        callback(window.DW_ajax.responseText);
      } else if (failback) {
        failback(window.DW_ajax.responseText);
      }
    }
  }
  window.DW_ajax.onreadystatechange=fn;
  window.DW_ajax.open("POST",url,true);
  window.DW_ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  window.DW_ajax.setRequestHeader("Content-length", req.length);
  window.DW_ajax.setRequestHeader("Connection", "close");
  window.DW_ajax.send(req);

  return 1;
}
function ajaxRequest(url,callback,failback) {
  if (window.DW_ajax==null) {
    failback('No Ajax');
    return 0;
  }
  url += "?sid="+Math.random();
  var fn = function () {
    if (window.DW_ajax.readyState==4) {
      if (window.DW_ajax.status == 200) {
        callback(window.DW_ajax.responseText);
      } else if (failback) {
        failback(window.DW_ajax.responseText);
      }
    }
  }
  window.DW_ajax.onreadystatechange=fn;
  window.DW_ajax.open("GET",url,true);
  window.DW_ajax.send(null);
  return 1;
}

function fill_checkbox(o) {
  for (var i=0; i<o.length; i++) {
    o[i].checked = true;
  }
}
function clear_checkbox(o) {
  for (var i=0; i<o.length; i++) {
    o[i].checked = false;
  }
}

jQuery(document).ready(function(){
  jQuery('a[rel^=_]').each(function(n){
    this.target=this.rel;
  });
  jQuery(':checkbox[readonly=readonly]').keydown(function(v){
    if (v.keyCode==' ') {
      return false;
    }
    return true;
  });
  jQuery(':checkbox[readonly=readonly]').click(function(){
    return false;
  });
  var w=0;
  jQuery('span.fixed').each(function(n){w0=jQuery(this).width();w=w>w0?w:w0;});
  if (w) {
    jQuery('span.fixed').css('display','inline-block').width(w+4);
  }

  jQuery("#dwsearchbox").keyup(function(){
    // Retrieve the input field text and reset the count to zero
    var filter = jQuery(this).val();
    // Loop through the comment list
    jQuery("tr.srow").each(function(){
      // If the list item does not contain the text phrase fade it out
      if (jQuery("td.sname", this).text().search(new RegExp(filter, "i")) < 0) {
        jQuery(this).fadeOut();
        // Show the list item if the phrase matches and increase the count by 1
      } else {
        jQuery(this).show();
      }
    });
  });
});
