// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.24/esri/copyright.txt for details.//>>built
define("../../../../../chunks/_rollupPluginBabelHelpers ../../../../../chunks/tslib.es6 ../../../../../core/has ../../../../../core/promiseUtils ../../../../../core/Logger ../../../../../core/accessorSupport/ensureType ../../../../../core/arrayUtils ../../../../../core/accessorSupport/set ../../../../../core/accessorSupport/decorators/subclass ../../../../../geometry/support/aaBoundingRect ../../../engine/webgl/FeatureTile ../support/rendererUtils ./BaseTileRenderer ./support/visualVariablesUtils ./support/WGLFeatureView".split(" "),
function(k,l,m,n,f,x,y,z,p,q,r,t,u,v,w){f=function(g){function h(){var a=g.apply(this,arguments)||this;a.type="symbol";return a}k._inheritsLoose(h,g);var c=h.prototype;c.install=function(a){const b=new w.WGLFeatureView(this.tileInfoView,this.layerView,this.layer,()=>this.notifyChange("updating"));this.featuresView=b;a.addChild(b)};c.uninstall=function(a){a.removeChild(this.featuresView);this.featuresView.destroy();this.featuresView=null};c.fetchResource=function(a,b){({url:a}=a);const d=this.featuresView.stage;
try{return d.resourceManager.fetchResource(a,{signal:b.signal})}catch(e){return n.isAbortError(e)?Promise.resolve({width:0,height:0}):Promise.reject(e)}};c.isUpdating=function(){var a;const b=g.prototype.isUpdating.call(this),d=!this.featuresView||this.featuresView.isUpdating(),e=null==(a=this.featuresView)?void 0:a.hasEmptyAttributeView();a=b||d||b&&e;m("esri-2d-log-updating")&&console.log(`Updating SymbolTileRenderer ${a}\n  -> updatingTiles ${b}\n  -> hasFeaturesView ${!!this.featuresView}\n  -> updatingFeaturesView ${d}`);
return a};c.hitTest=function(a){return this.featuresView.hitTest(a)};c.supportsRenderer=function(a){return null!=a&&"simple class-breaks unique-value dot-density dictionary heatmap pie-chart".split(" ").includes(a.type)};c.onConfigUpdate=function(a){var b=null;"visualVariables"in a&&(b=(t.simplifyVVRenderer(a).visualVariables||[]).map(d=>{const e=d.clone();"normalizationField"in d&&(e.normalizationField=null);d.valueExpression&&"$view.scale"!==d.valueExpression&&(e.valueExpression=null,e.field="nop");
return e}),b=v.convertVisualVariables(b));this.featuresView.setRendererInfo(a,b,this.layerView.featureEffect)};c.onTileData=function(a){const b=this.tiles.get(a.tileKey);if(b&&a.data)this.featuresView.onTileData(b,a.data);this.layerView.view.labelManager.requestUpdate()};c.onTileError=function(a){if(a=this.tiles.get(a.tileKey))this.featuresView.onTileError(a)};c.forceAttributeTextureUpload=function(){this.featuresView.attributeView.forceTextureUpload()};c.lockGPUUploads=function(){this.featuresView.attributeView.lockTextureUpload();
this.tiles.forEach(a=>a.lock())};c.unlockGPUUploads=function(){this.featuresView.attributeView.unlockTextureUpload();this.tiles.forEach(a=>a.unlock())};c.getMaterialItems=function(){var a=k._asyncToGenerator(function*(b){return this.featuresView.getMaterialItems(b)});return function(b){return a.apply(this,arguments)}}();c.invalidateLabels=function(){this.featuresView.hasLabels&&this.layerView.view.labelManager.requestUpdate()};c.createTile=function(a){const b=this.tileInfoView.getTileBounds(q.create(),
a);return new r.FeatureTile(a,b[0],b[3],this.featuresView.attributeView,()=>this.layerView.view.labelManager.requestUpdate())};c.disposeTile=function(a){this.featuresView.removeChild(a);a.destroy();this.layerView.view.labelManager.requestUpdate()};return h}(u);return f=l.__decorate([p.subclass("esri.views.2d.layers.features.tileRenderers.SymbolTileRenderer")],f)});