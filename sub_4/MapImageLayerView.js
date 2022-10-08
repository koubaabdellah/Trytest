// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.24/esri/copyright.txt for details.//>>built
define("../../chunks/_rollupPluginBabelHelpers ../../chunks/tslib.es6 ../../core/Error ../../core/has ../../core/maybe ../../core/promiseUtils ../../core/accessorSupport/decorators/property ../../core/arrayUtils ../../core/accessorSupport/ensureType ../../core/accessorSupport/decorators/subclass ../../geometry/Extent ../../geometry/support/scaleUtils ../../layers/support/commonProperties ../../layers/support/ExportImageParameters ../../layers/support/floorFilterUtils ../../renderers/support/clickToleranceUtils ../../rest/identify ../../rest/support/IdentifyParameters ../../support/arcadeOnDemand ./support/popupUtils".split(" "),
function(m,v,E,I,x,J,y,U,V,K,L,M,N,O,P,F,Q,R,S,G){return p=>{p=function(C){function A(){return C.apply(this,arguments)||this}m._inheritsLoose(A,C);var q=A.prototype;q.initialize=function(){this.exportImageParameters=new O.ExportImageParameters({layer:this.layer})};q.destroy=function(){this.exportImageParameters.destroy();this.exportImageParameters=null};q.fetchPopupFeatures=function(){var d=m._asyncToGenerator(function*(b,c){var f,n,r,k,a,g;const {layer:h}=this;if(!b)throw new E("mapimagelayer:fetchPopupFeatures",
"Nothing to fetch without area",{layer:h});const t=null!=(f=null==(n=this.layer.capabilities)?void 0:null==(r=n.operations)?void 0:r.supportsQuery)?f:!0;if(!((null!=(k=null==(a=this.layer.capabilities)?void 0:null==(g=a.operations)?void 0:g.supportsIdentify)?k:1)&&10.5<=this.layer.version||t))throw new E("mapimagelayer:fetchPopupFeatures-not-supported","query operation is disabled for this service",{layer:h});return t?this._fetchPopupFeaturesUsingQueries(b,c):this._fetchPopupFeaturesUsingIdentify(b,
c)});return function(b,c){return d.apply(this,arguments)}}();q.canResume=function(){var d;return!C.prototype.canResume.call(this)||null!=(d=this.timeExtent)&&d.isEmpty?!1:!0};q._fetchPopupFeaturesUsingIdentify=function(){var d=m._asyncToGenerator(function*(b,c){b=yield this._createIdentifyParameters(b,c);if(x.isNone(b))return[];({results:b}=yield Q.identify(this.layer.parsedUrl,b));return b.map(f=>f.feature)});return function(b,c){return d.apply(this,arguments)}}();q._createIdentifyParameters=function(){var d=
m._asyncToGenerator(function*(b,c){var f,n,r=this;const {floors:k,spatialReference:a,scale:g}=this.view,h=x.isSome(c)?c.event:null,t=yield this._collectPopupProviders(this.layer.sublayers,g,c);if(!t.length)return null;yield Promise.all(t.map(({sublayer:w})=>w.load().catch(()=>{})));c=Math.min(I("mapimagelayer-popup-identify-max-tolerance"),this.layer.allSublayers.reduce((w,z)=>z.renderer?F.calculateTolerance({renderer:z.renderer,event:h}):w,2));var l=this.createFetchPopupFeaturesQueryGeometry(b,c);
const e=M.getResolutionForScale(g,a),u=Math.round(l.width/e);l=new L({xmin:l.center.x-e*u,ymin:l.center.y-e*u,xmax:l.center.x+e*u,ymax:l.center.y+e*u,spatialReference:l.spatialReference});const D=!1===(null==(f=this.layer.capabilities)?void 0:null==(n=f.operations)?void 0:n.supportsQuery)||(yield new Promise(w=>{let z=!1;Promise.all(t.map(function(){var T=m._asyncToGenerator(function*({popupTemplate:B}){if(B){const H=yield r._loadArcadeModules(B);!z&&(null==H?0:H.arcadeUtils.hasGeometryOperations(B))&&
(z=!0,w(!0))}});return function(B){return T.apply(this,arguments)}}())).finally(()=>w(!1))}));return new R({floors:k,gdbVersion:this.layer.gdbVersion,geometry:b,height:u,layerOption:"popup",mapExtent:l,maxAllowableOffset:D?0:e,returnGeometry:!0,spatialReference:a,sublayers:this.layer.sublayers,timeExtent:this.timeExtent,tolerance:c,width:u})});return function(b,c){return d.apply(this,arguments)}}();q._fetchPopupFeaturesUsingQueries=function(){var d=m._asyncToGenerator(function*(b,c){var f=this;const n=
yield this._collectPopupProviders(this.layer.sublayers,this.view.scale,c),r=x.isSome(c)?c.event:null;c=n.map(function(){var k=m._asyncToGenerator(function*({sublayer:a,popupTemplate:g}){yield a.load().catch(()=>{});const h=a.createQuery(),t=F.calculateTolerance({renderer:a.renderer,event:r}),l=f.createFetchPopupFeaturesQueryGeometry(b,t);h.geometry=l;h.outFields=yield G.getRequiredFields(a,g);if("floors"in f.view){var e,u;const D=null==(e=f.view)?void 0:null==(u=e.floors)?void 0:u.clone();e=P.getLayerFloorFilterClause(D,
a);x.isSome(e)&&(h.where=h.where?`(${h.where}) AND (${e})`:e)}e=yield f._loadArcadeModules(g);e&&e.arcadeUtils.hasGeometryOperations(g)||(h.maxAllowableOffset=l.width/t);return(yield a.queryFeatures(h)).features});return function(a){return k.apply(this,arguments)}}());return(yield J.eachAlways(c)).reduce((k,a)=>a.value?[...k,...a.value]:k,[]).filter(k=>null!=k)});return function(b,c){return d.apply(this,arguments)}}();q._collectPopupProviders=function(){var d=m._asyncToGenerator(function*(b,c,f){const n=
[],r=function(){var k=m._asyncToGenerator(function*(a){var g=0===a.minScale||c<=a.minScale;const h=0===a.maxScale||c>=a.maxScale;a.visible&&g&&h&&(a.sublayers?a.sublayers.forEach(r):a.popupEnabled&&(g=G.getFetchPopupTemplate(a,{...f,defaultPopupTemplateEnabled:!1}),x.isSome(g)&&n.unshift({sublayer:a,popupTemplate:g})))});return function(a){return k.apply(this,arguments)}}();b=b.toArray().reverse().map(r);yield Promise.all(b);return n});return function(b,c,f){return d.apply(this,arguments)}}();q._loadArcadeModules=
function(d){var b;if((null==(b=d.expressionInfos)?0:b.length)||Array.isArray(d.content)&&d.content.some(c=>"expression"===c.type))return S.loadArcade()};m._createClass(A,[{key:"exportImageVersion",get:function(){var d;null==(d=this.exportImageParameters)?void 0:d.commitProperty("version");this.commitProperty("timeExtent");return(this._get("exportImageVersion")||0)+1}}]);return A}(p);v.__decorate([y.property()],p.prototype,"exportImageParameters",void 0);v.__decorate([y.property({readOnly:!0})],p.prototype,
"exportImageVersion",null);v.__decorate([y.property()],p.prototype,"layer",void 0);v.__decorate([y.property()],p.prototype,"suspended",void 0);v.__decorate([y.property(N.combinedViewLayerTimeExtentProperty)],p.prototype,"timeExtent",void 0);return p=v.__decorate([K.subclass("esri.views.layers.MapImageLayerView")],p)}});