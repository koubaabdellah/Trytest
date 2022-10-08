// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.24/esri/copyright.txt for details.//>>built
define("../../../../../chunks/_rollupPluginBabelHelpers ../../../../../chunks/tslib.es6 ../../../../../core/HandleOwner ../../../../../core/accessorSupport/decorators/property ../../../../../core/arrayUtils ../../../../../core/has ../../../../../core/accessorSupport/ensureType ../../../../../core/accessorSupport/decorators/subclass".split(" "),function(h,d,c,f,m,n,p,l){c=function(k){function g(a){a=k.call(this,a)||this;a.tiles=new Map;return a}h._inheritsLoose(g,k);var b=g.prototype;b.destroy=function(){this.tiles.clear();
this.layer=this.layerView=this.tileInfoView=this.tiles=null};b.acquireTile=function(a){const e=this.createTile(a);e.once("isReady",()=>this.notifyChange("updating"));this.tiles.set(a.id,e);return e};b.forceAttributeTextureUpload=function(){};b.forEachTile=function(a){this.tiles.forEach(a)};b.releaseTile=function(a){this.tiles.delete(a.key.id);this.disposeTile(a)};b.isUpdating=function(){let a=!0;this.tiles.forEach(e=>{a=a&&e.isReady});return!a};b.setHighlight=function(){};b.invalidateLabels=function(){};
b.requestUpdate=function(){this.layerView.requestUpdate()};h._createClass(g,[{key:"updating",get:function(){return this.isUpdating()}}]);return g}(c.HandleOwner);d.__decorate([f.property()],c.prototype,"layer",void 0);d.__decorate([f.property()],c.prototype,"layerView",void 0);d.__decorate([f.property()],c.prototype,"tileInfoView",void 0);d.__decorate([f.property()],c.prototype,"updating",null);return c=d.__decorate([l.subclass("esri.views.2d.layers.features.tileRenderers.BaseTileRenderer")],c)});