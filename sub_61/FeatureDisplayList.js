// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.24/esri/copyright.txt for details.//>>built
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","./cpuMapped/FreeList"],function(n,p,f,m){let l=function(){function h(g,a,d,c,b){this.target=g;this.geometryType=a;this.materialKey=d;this.indexFrom=c;this.indexCount=b}h.prototype.extend=function(g){this.indexCount+=g};p._createClass(h,[{key:"indexEnd",get:function(){return this.indexFrom+this.indexCount}}]);return h}(),r=function(){function h(a,d){this.geometryType=0;this._target=a;this.geometryType=d}h.from=
function(a,d,c,b){a=new h(a,d);if(f.isSome(b))for(const e of b)c.seekIndex(e),a.addRecord(c);else for(;c.next();)a.addRecord(c);return a};var g=h.prototype;g.addRecord=function(a){var d=this._target,c=this.geometryType,b=a.materialKey;let e=a.indexFrom,k=a.indexCount;const q=a.vertexFrom;a=a.vertexCount;k||(e=q,k=a);if(f.isNone(this._head))b=new l(d,c,b,e,k),this._head=new m.List(b);else{d=null;for(c=this._head;c;){if(e<c.data.indexFrom)return this._insert(b,e,k,d,c);d=c;c=c.next}this._insert(b,e,
k,d,null)}};g.forEach=function(a){f.isSome(this._head)&&this._head.forEach(a)};g.infos=function*(){if(f.isSome(this._head))for(const a of this._head.values())yield a};g._insert=function(a,d,c,b,e){if(f.isNone(b)&&f.isNone(e)){const k=new l(this._target,this.geometryType,a,d,c);this._head=new m.List(k)}if(f.isNone(b)&&f.isSome(e))return this._insertAtHead(a,d,c,e);if(f.isSome(b)&&f.isNone(e))return this._insertAtEnd(a,d,c,b);if(f.isSome(b)&&f.isSome(e))return this._insertAtMiddle(a,d,c,b,e)};g._insertAtHead=
function(a,d,c,b){a===b.data.materialKey&&d+c===b.data.indexFrom?(b.data.indexFrom=d,b.data.indexCount+=c):(a=new l(this._target,this.geometryType,a,d,c),this._head=new m.List(a),this._head.next=b)};g._insertAtEnd=function(a,d,c,b){b.data.materialKey===a&&b.data.indexEnd===d?b.data.indexCount+=c:(a=new l(this._target,this.geometryType,a,d,c),a=new m.List(a),b.next=a)};g._insertAtMiddle=function(a,d,c,b,e){b.data.materialKey===a&&b.data.indexEnd===d?(b.data.indexCount+=c,b.data.materialKey===e.data.materialKey&&
b.data.indexEnd===e.data.indexFrom&&(b.data.indexCount+=e.data.indexCount,b.next=e.next)):a===e.data.materialKey&&d+c===e.data.indexFrom?(e.data.indexFrom=d,e.data.indexCount+=c):(a=new l(this._target,this.geometryType,a,d,c),a=new m.List(a),b.next=a,a.next=e)};return h}();n.FeatureDisplayList=r;n.FeatureDisplayListInfo=l;Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});