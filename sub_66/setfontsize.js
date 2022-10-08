var standardfs;

(function($) {
    $(document).ready(function(){
        standardfs = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').replace("px", ""));
    });
})(jQuery);


function standardFontSize() {
  document.body.style.fontSize = standardfs + "px";
}

function increaseFontSize() {
  var fs = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').replace("px", ""));
  if (fs < 26) {
    fs += 1;
    document.body.style.fontSize = fs + "px";
  } 
}

function decreaseFontSize() {
  var fs = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').replace("px", ""));
  if (fs > 6) {
    fs -= 1;
    document.body.style.fontSize = fs + "px";
  }
}

