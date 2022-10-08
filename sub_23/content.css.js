/* eslint-disable */
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
var loadCSS = function( href, before, media, attributes ){
  // Arguments explained:
  // `href` [REQUIRED] is the URL for your CSS file.
  // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
  // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
  // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
  // `attributes` [OPTIONAL] is the Object of attribute name/attribute value pairs to set on the stylesheet's DOM Element.
  var doc = window.document;
  var ss = doc.createElement( "link" );
  var ref;
  if( before ){
    ref = before;
  }
  else {
    var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
    ref = refs[ refs.length - 1];
  }

  var sheets = doc.styleSheets;
  // Set any of the provided attributes to the stylesheet DOM Element.
  if( attributes ){
    for( var attributeName in attributes ){
      if( attributes.hasOwnProperty( attributeName ) ){
        ss.setAttribute( attributeName, attributes[attributeName] );
      }
    }
  }
  ss.rel = "stylesheet";
  ss.href = href;
  // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
  ss.media = "only x";

  // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
  function ready( cb ){
    if( doc.body ){
      return cb();
    }
    setTimeout(function(){
      ready( cb );
    });
  }
  // Inject link
    // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
    // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
  ready( function(){
    ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
  });
  // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
  var onloadcssdefined = function( cb ){
    var resolvedHref = ss.href;
    var i = sheets.length;
    while( i-- ){
      if( sheets[ i ].href === resolvedHref ){
        return cb();
      }
    }
    setTimeout(function() {
      onloadcssdefined( cb );
    });
  };

  function loadCB(){
    if( ss.addEventListener ){
      ss.removeEventListener( "load", loadCB );
    }
    ss.media = media || "all";
  }

  // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
  if( ss.addEventListener ){
    ss.addEventListener( "load", loadCB);
  }
  ss.onloadcssdefined = onloadcssdefined;
  onloadcssdefined( loadCB );
  return ss;
};

var seleneCssNode = window.document.querySelector('[href*="selene-static"], [href*="selene-latest"]');
var FILES = ["https://a.static2.aviasales.com/helios-assets/css_variables.0a21cb727c77db217dd6.css","https://a.static2.aviasales.com/helios-assets/app.f65dc1b574f1aaf8661b.css","https://a.static2.aviasales.com/helios-assets/2039.52d7de5015628d74bb21.css","https://a.static2.aviasales.com/helios-assets/8986.93cf9e6d22856368ad80.css","https://a.static2.aviasales.com/helios-assets/2890.c18c004f86b15099b421.css","https://a.static2.aviasales.com/helios-assets/index.820f5671b103a555f020.css"].slice();

if (!seleneCssNode) {
  // Reverse to maintain the original stylesheet order (loadCss uses insertBefore)
  FILES.reverse()
}
for (var i = 0; i < FILES.length; i++) {
  loadCSS(FILES[i], seleneCssNode);
}
