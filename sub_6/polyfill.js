if (document.documentMode) {  // IE check
    var d=document, 
    s=d.getElementsByTagName('script')[0];
    g1=d.createElement('script'), 
    g1.src= window.location.origin + '/assets/polyfill/es6-promise.min.js'; 
    s.parentNode.insertBefore(g1,s);
    g2=d.createElement('script'), 
    g2.src= window.location.origin + '/assets/polyfill/es6-promise.auto.min.js';
    s.parentNode.insertBefore(g2,s);
}
