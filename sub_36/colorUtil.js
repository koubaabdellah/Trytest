//>>built
define("esri/dijit/ColorPicker/colorUtil",["dojo/_base/lang","../../Color"],function(k,e){var d={equal:function(a,b){return a&&b&&a.r===b.r&&a.g===b.g&&a.b===b.b&&a.a===b.a},normalizeHex:function(a){return"#"+k.trim(a).replace(/#/g,"").substr(0,6)},normalizeColor:function(a){return new e(a)},isValidHex:function(a){return d.isShorthandHex(a)||d.isLonghandHex(a)},_shortHandHex:/^#[0-9A-F]{3}$/i,isShorthandHex:function(a){return a&&4===a.length&&d._shortHandHex.test(a)},_longhandHex:/^#[0-9A-F]{6}$/i,
isLonghandHex:function(a){return a&&7===a.length&&d._longhandHex.test(a)},getContrastingColor:function(a){return d.isBright(a)?this.darker(a):this.brighter(a,3)},isBright:function(a){return 127<=.299*a.r+.587*a.g+.114*a.b},darker:function(a,b){var c=Math.pow(.7,b?b:1);return new e([Math.round(a.r*c),Math.round(a.g*c),Math.round(a.b*c),a.a])},brighter:function(a,b){var c=Math.pow(.7,b?b:1),f=a.r,g=a.g,h=a.b;30>f&&(f=30);30>g&&(g=30);30>h&&(h=30);return new e([Math.min(255,Math.round(f/c)),Math.min(255,
Math.round(g/c)),Math.min(255,Math.round(h/c)),a.a])}};return d});