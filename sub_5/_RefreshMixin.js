//>>built
define("esri/dijit/_RefreshMixin","dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/on dojo/has ../kernel".split(" "),function(b,c,f,d,l,g){function e(a){"object"!==typeof a&&(a=Error(a));a.grid=this;d.emit(this.domNode,"dgrid-error",{grid:this,error:a,cancelable:!0,bubbles:!0})}b=b(null,{_trackError:function(a){"string"===typeof a&&(a=c.hitch(this,a));try{var h=a()}catch(k){e.call(this,k)}return f.when(h,c.hitch(this,function(){d.emit(this.domNode,"refresh",{cancelable:!0,bubbles:!0})}),
c.hitch(this,e))}});c.setObject("dijit._RefreshMixin",b,g);return b});