//>>built
define("dgrid/util/mouse",["dojo/_base/lang","dojo/on","dojo/dom","dojo/query"],function(b,e,f){function a(g,h){return function(k,l){return e(k,g+":"+h,function(c){if(!f.isDescendant(c.relatedTarget,this))return l.call(this,c)})}}var d={enterRow:a(".dgrid-content .dgrid-row","mouseover"),enterCell:a(".dgrid-content .dgrid-cell","mouseover"),enterHeaderCell:a(".dgrid-header .dgrid-cell","mouseover"),leaveRow:a(".dgrid-content .dgrid-row","mouseout"),leaveCell:a(".dgrid-content .dgrid-cell","mouseout"),
leaveHeaderCell:a(".dgrid-header .dgrid-cell","mouseout"),createDelegatingHandler:a};b.getObject("dgrid.util.mouse",!0);b.mixin(dgrid.util.mouse,d);return d});