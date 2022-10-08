//>>built
define("dgrid/editor","dojo/_base/kernel dojo/_base/lang dojo/_base/array dojo/_base/Deferred dojo/dom-class dojo/on dojo/aspect dojo/has dojo/query dojo/when ./Grid put-selector/put dojo/_base/sniff".split(" "),function(K,y,L,B,z,q,r,t,M,N,C,u){function A(a,b){a.value=b;if("radio"==a.type||"checkbox"==a.type)a.checked=a.defaultChecked=!!b}function D(a,b){if("number"==typeof b)a=isNaN(a)?a:parseFloat(a);else if("boolean"==typeof b)a="true"==a?!0:"false"==a?!1:a;else if(b instanceof Date){var g=new Date(a);
a=isNaN(g.getTime())?a:g}return a}function O(a,b){return"function"==typeof b.get?D(b.get("value")):D(b["checkbox"==b.type||"radio"==b.type?"checked":"value"])}function P(a,b,g,e,c){if((g&&g.valueOf())!=(e&&e.valueOf())){var l=b.element;var h=b.row;var k=b.column;if(k.field&&h)if(b={grid:a,cell:b,rowId:h.id,oldValue:g,value:e,bubbles:!0,cancelable:!0},c&&c.type&&(b.parentType=c.type),q.emit(l,"dgrid-datachange",b))a.updateDirty?(a.updateDirty(h.id,k.field,e),k.autoSave&&setTimeout(function(){a._trackError("save")},
0)):h.data[k.field]=e;else{var d;(d=l.widget)?(d._dgridIgnoreChange=!0,d.set("value",g),setTimeout(function(){d._dgridIgnoreChange=!1},0)):(d=l.input)&&A(d,g);return g}}return e}function v(a,b,g){var e=a.cell(b.domNode||b),c=e.column,l;var h=a._activeCell;if(!b.isValid||b.isValid())if(g=P(a,e,h?a._activeValue:b._dgridLastValue,O(c,b),g),h?a._activeValue=g:b._dgridLastValue=g,"radio"===b.type&&b.name&&!c.editOn&&c.field)for(l in h=a.row(b),M("input[type\x3dradio][name\x3d"+b.name+"]",a.contentNode).forEach(function(k){var d=
a.row(k);k!==b&&k._dgridLastValue&&(k._dgridLastValue=!1,a.updateDirty?a.updateDirty(d.id,c.field,!1):d.data[c.field]=!1)}),a.dirty)h.id!==l&&a.dirty[l][c.field]&&a.updateDirty(l,c.field,!1)}function w(a){var b=a.parentNode||a.domNode&&a.domNode.parentNode;b&&z.contains(b,x)||(b=a.focusNode||a.domNode||a);return b}function E(a){if(a){var b=a.parentNode||a.domNode&&a.domNode.parentNode;b&&z.contains(b,x)||(b=a.domNode||a);return b}}function F(a,b){isNaN(b)&&(b=isNaN(a.tabIndex)?-1:a.tabIndex);return u("div",
{className:x,tabIndex:b},a)}function G(a){var b=a.editor,g=a.editOn,e=a.grid,c="string"!=typeof b;var l=a.editorArgs||{};"function"==typeof l&&(l=l.call(e,a));if(c){var h=new b(l);c=h.focusNode||h.domNode;c.className+=" dgrid-input";t("mac")&&g&&/checkbox|radio/i.test(c.type)?(a=F(h.domNode,a.tabIndex),q(a,"blur",function(){h._dgridIgnoreChange||v(e,h,{type:"widget"})})):g||h.connect(h,"onChange",function(){h._dgridIgnoreChange||v(e,h,{type:"widget"})})}else{var k=function(d){var f=d.target;"_dgridLastValue"in
f&&-1<f.className.indexOf("dgrid-input")&&v(e,f,d)};a.grid._hasInputListener||(e._hasInputListener=!0,e.on("change",function(d){k(d)}));h=c=u(("textarea"==b?"textarea":"input[type\x3d"+b+"]")+".dgrid-input",y.mixin({name:a.field,tabIndex:isNaN(a.tabIndex)?-1:a.tabIndex},l));t("mac")&&g&&/checkbox|radio/i.test(b)&&(a=F(h),h.tabIndex=0,h.removeAttribute("tabindex"));if(9>t("ie")||t("ie")&&t("quirks"))"radio"==b||"checkbox"==b?q(h,"click",function(d){k(d)}):q(h,"change",function(d){k(d)})}return h}function Q(a,
b){function g(){var f=c._activeCell;k.blur();"function"===typeof c.focus&&setTimeout(function(){c.focus(f)},l&&9>t("ie")?15:0)}var e=G(a),c=a.grid,l=e.domNode,h=E(e),k=w(e),d=l?function(){e.set("value",e._dgridLastValue)}:function(){A(e,e._dgridLastValue);v(a.grid,e)};q(k,"keydown",function(f){f=f.keyCode||f.which;27==f?(d(),c._activeValue=e._dgridLastValue,g()):13==f&&!1!==a.dismissOnEnter&&g()});(a._editorBlurHandle=q.pausable(w(e),"blur",function(f){if(!e.dropDown||!e.dropDown.domNode.contains(f.relatedTarget||
document.activeElement)){if(f&&f.target){var n=f.target;if((n=z.contains(n,x)&&n)&&f.relatedTarget===(e.focusNode||e)){n.focus();return}}v(c,e,{type:"widget"});f=h.parentNode;n=f.children.length-1;var m={alreadyHooked:!0},p=c.cell(h);q.emit(p.element,"dgrid-editor-hide",{grid:c,cell:p,column:a,editor:e,bubbles:!0,cancelable:!1});a._editorBlurHandle.pause();f.removeChild(h);if(p.row){for(u(p.element,"!dgrid-cell-editing");n--;)u(f.firstChild,"!");C.appendIfNode(f,a.renderCell(a.grid.row(f).data,c._activeValue,
f,c._activeOptions?y.delegate(m,c._activeOptions):m))}c._focusedEditorCell=c._activeCell=c._activeValue=c._activeOptions=null}})).pause();return e}function H(a,b,g,e){var c=a.domNode;c||A(a,e);g.innerHTML="";u(g,".dgrid-cell-editing");u(g,E(a));c&&!b.editOn?b.grid._editorsPendingStartup.push([a,b,g,e]):I(a,b,g,e)}function I(a,b,g,e){var c=b.grid;a.domNode&&(a._started||a.startup(),a._dgridIgnoreChange=!0,a.set("value",e),setTimeout(function(){a._dgridIgnoreChange=!1},0));a._dgridLastValue=e;c._activeCell&&
(c._activeValue=e,q.emit(g,"dgrid-editor-show",{grid:c,cell:c.cell(g),column:b,editor:a,bubbles:!0,cancelable:!1}))}function J(a){for(var b=a._editorsPendingStartup,g=b.length;g--;)I.apply(null,b[g]);a._editorsPendingStartup=[]}function R(a){function b(n){c.grid._activeCell=h;H(c.editorInstance,c,h,d);c._editTimer=setTimeout(function(){var m=w(e);m.focus&&m.focus();c._editorBlurHandle&&c._editorBlurHandle.resume();c._editTimer=null;n.resolve(e)},0)}var g,e;a.column||(a=this.cell(a));if(!a||!a.element)return null;
var c=a.column;var l=c.field;var h=a.element.contents||a.element;if(e=c.editorInstance){if(c.grid._activeCell!=h){var k=a.row;var d=(g=this.dirty&&this.dirty[k.id])&&l in g?g[l]:c.get?c.get(k.data):k.data[l];if(!c.canEdit||c.canEdit(a.row.data,d)){var f=new B;a=w(e);a.offsetWidth?(a.blur(),setTimeout(function(){b(f)},0)):b(f);return f.promise}}}else if(c.editor&&(e=h.widget||h.input))return f=new B,e.focus&&e.focus(),f.resolve(e),f.promise;return null}var x="dgrid-editor-focus-wrapper";y.getObject("dgrid.editor",
!0);return dgrid.editor=function(a,b,g){function e(k){var d=k.grid,f;if(!d.edit){d.edit=R;d._editorsPendingStartup=[];l.push(q(d.domNode,".dgrid-input:focusin",function(){d._focusedEditorCell=d.cell(this)}));var n=d._editorFocusoutHandle=q.pausable(d.domNode,".dgrid-input:focusout",function(m){d._focusedEditorCell&&d._focusedEditorCell.element.contains(m.target)||(d._focusedEditorCell=null)});l.push(n);l.push(r.before(d,"removeRow",function(m){var p=d._focusedEditorCell;m=d.row(m);p&&m&&p.row.id===
m.id&&(f=p,n.pause(),setTimeout(function(){n.resume();f=null},0))}));l.push(r.after(d,"insertRow",function(m){var p=d.row(m);f&&f.row.id===p.id&&d.edit(d.cell(p,f.column.id));return m}));l.push(r.after(d,"renderArray",function(m){N(m,function(p){p.length?J(d):d._editorsPendingStartup=[]});return m}));l.push(r.after(d,"_onNotification",function(){J(d)}))}}var c=a.renderCell||C.defaultRenderCell,l=[];a||(a={});a.editor=b=b||a.editor||"text";a.editOn=g=g||a.editOn;var h="string"!=typeof b;a.widgetArgs&&
(K.deprecated("column.widgetArgs","use column.editorArgs instead","dgrid 0.4"),a.editorArgs=a.widgetArgs);r.after(a,"init",g?function(){e(a);a.editorInstance=Q(a,c)}:function(){var k=a.grid;e(a);h&&l.push(r.before(k,"removeRow",function(d){if(d=(d=k.cell(d,a.id).element)&&(d.contents||d).widget)k._editorFocusoutHandle.pause(),d.destroyRecursive(),k._editorFocusoutHandle.resume()}))});r.after(a,"destroy",function(){L.forEach(l,function(k){k.remove()});a._editorBlurHandle&&a._editorBlurHandle.remove();
a._editTimer&&clearTimeout(a._editTimer);g&&h&&a.editorInstance.destroyRecursive();a.grid.edit=null;a.grid._editorsPendingStartup=null});a.renderCell=g?function(k,d,f,n){var m=a.grid;n&&n.alreadyHooked||q("TD"==f.tagName?f:f.parentNode,g,function(){m._activeOptions=n;m.edit(this)});return c.call(a,k,d,f,n)}:function(k,d,f,n){if(!a.canEdit||a.canEdit(k,d))k=G(a),H(k,a,f,d),f[h?"widget":"input"]=k;else return c.call(a,k,d,f,n)};return a}});