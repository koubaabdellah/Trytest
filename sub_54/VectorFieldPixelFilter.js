//>>built
define("esri/layers/pixelFilters/VectorFieldPixelFilter","dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../lang dojo/_base/array".split(" "),function(g,q,D,z,r,v){g=g(null,{declaredClass:"esri.layers.pixelFilters.VectorFieldPixelFilter",speedUnits:["esriMetersPerSecond","esriKilometersPerHour","esriKnots","esriFeetPerSecond","esriMilesPerHour"],constructor:function(b){q.mixin(this,b);this.isDataUV=b&&b.isDataUV?b.isDataUV:!1;this.computeMagnitudeAndDirection=q.hitch(this,this.computeMagnitudeAndDirection);
this.unitConversionFactor=1;this._updateUnitConvFactor()},setUnits:function(b,a){this.inputUnit=b;this.outputUnit=a;this.unitConversionFactor=1;this._updateUnitConvFactor()},_updateUnitConvFactor:function(){var b=v.indexOf(this.speedUnits,this.inputUnit),a=v.indexOf(this.speedUnits,this.outputUnit);if(this.inputUnit&&this.outputUnit&&0<=b&&0<=a){var c=[1,.277778,.514444,.3048,.44704,0];this.unitConversionFactor=c[b]/c[a]}},computeMagnitudeAndDirection:function(b){if(!r.isDefined(b))throw"Could not compute magnitude and direction. No pixel data is available.";
var a=b.pixelBlock;if(!r.isDefined(a)||2!==a.getPlaneCount())throw"Could not compute magnitude and direction. Pixel data does not contain two bands.";var c=b.extent,w=(c.xmax-c.xmin)/a.width,x=(c.ymax-c.ymin)/a.height,A=c.xmin+w/2;c=c.ymax-x/2;a.statistics[0].minValue=0;a.statistics[0].maxValue=0;var B=180/Math.PI,y=[],h=0,k=0,d=0,C=!r.isDefined(a.mask),l,m,n,p;var t=n=Infinity;var u=p=-Infinity;for(h=0;h<a.height;h++)for(k=0;k<a.width;k++,d++)if(y.push([A+w*k,c-x*h]),C||a.mask[d]){var e=l=a.pixels[0][d];
var f=m=a.pixels[1][d];this.isDataUV&&(e=Math.sqrt(l*l+m*m),f=90-B*Math.atan2(m,l));a.pixels[0][d]=e*this.unitConversionFactor;a.pixels[1][d]=f;e>u&&(u=e);e<t&&(t=e);f>p&&(p=f);f<n&&(n=f)}a.statistics[0].maxValue=u;a.statistics[0].minValue=t;a.statistics[1].maxValue=p;a.statistics[1].minValue=n;b.locations=y;return b}});q.setObject("layers.pixelFilters.VectorFieldPixelFilter",g,z);return g});