// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.24/esri/copyright.txt for details.//>>built
define("../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../core/Accessor ../../../../core/promiseUtils ../../../../core/accessorSupport/decorators/property ../../../../core/arrayUtils ../../../../core/has ../../../../core/accessorSupport/ensureType ../../../../core/accessorSupport/decorators/subclass ../../../../geometry/Extent ../../../../geometry/support/aaBoundingRect ../../../../geometry/support/spatialReferenceUtils ../../../../layers/support/TileInfo ../../viewStateUtils ../../engine/Bitmap ../../tiling/TileInfoView ../../tiling/TileKey".split(" "),
function(r,h,e,C,m,K,L,M,D,y,E,F,G,z,H,I,J){const n=E.create(),p=[0,0],A=new J(0,0,0,0);e=function(B){function w(k){var a=B.call(this,k)||this;a._imagePromise=null;a.bitmaps=[];a.hidpi=!1;a.imageMaxWidth=2048;a.imageMaxHeight=2048;a.imageRotationSupported=!1;a.imageNormalizationSupported=!1;a.update=C.debounce(function(){var l=r._asyncToGenerator(function*(c,f){if(!c.stationary||a.destroyed)return null;const b=c.state;var d=F.getInfo(b.spatialReference);c=a.hidpi?c.pixelRatio:1;var g=a.imageNormalizationSupported&&
b.worldScreenWidth&&b.worldScreenWidth<b.size[0];g?(p[0]=b.worldScreenWidth,p[1]=b.size[1]):a.imageRotationSupported?(p[0]=b.size[0],p[1]=b.size[1]):z.getOuterSize(p,b);d=d&&(b.extent.xmin<d.valid[0]||b.extent.xmax>d.valid[1]);d=!a.imageNormalizationSupported&&d;const x=a.imageRotationSupported?b.rotation:0;Math.floor(p[0]*c)>a.imageMaxWidth||Math.floor(p[1]*c)>a.imageMaxHeight||d?(g=Math.min(a.imageMaxWidth,a.imageMaxHeight),d&&(g=Math.min(b.worldScreenWidth,g)),a._imagePromise=a._tiledExport(b,
g,c,f)):a._imagePromise=a._singleExport(b,p,g?b.paddedViewState.center:b.center,b.resolution,x,c,f);return a._imagePromise.then(function(){var u=r._asyncToGenerator(function*(q){a._imagePromise=null;if(!a.destroyed){a.bitmaps=null!=q?q:[];for(const t of a.container.children)q.includes(t)||t.fadeOut().then(()=>{t.remove()});for(const t of q)a.container.addChild(t),t.fadeIn()}});return function(q){return u.apply(this,arguments)}}()).catch(u=>{a._imagePromise=null;throw u;})});return function(c,f){return l.apply(this,
arguments)}}(),5E3);return a}r._inheritsLoose(w,B);var v=w.prototype;v.destroy=function(){this.bitmaps=[]};v.updateExports=function(k){for(const a of this.container.children){if(!a.visible||!a.stage)break;k(a);a.invalidateTexture();a.requestRender()}};v._export=function(){var k=r._asyncToGenerator(function*(a,l,c,f,b,d){c=yield this.fetchSource(a,Math.floor(l*b),Math.floor(c*b),{rotation:f,pixelRatio:b,signal:d});c=new H.Bitmap(c,"additive");c.x=a.xmin;c.y=a.ymax;c.resolution=a.width/l;c.rotation=
f;c.pixelRatio=b;return c});return function(a,l,c,f,b,d){return k.apply(this,arguments)}}();v._singleExport=function(){var k=r._asyncToGenerator(function*(a,l,c,f,b,d,g){z.getBBox(n,c,f,l);a=new y(n[0],n[1],n[2],n[3],a.spatialReference);return[yield this._export(a,l[0],l[1],b,d,g)]});return function(a,l,c,f,b,d,g){return k.apply(this,arguments)}}();v._tiledExport=function(k,a,l,c){var f=G.create({size:a,spatialReference:k.spatialReference,scales:[k.scale]});const b=new I(f);f=b.getTileCoverage(k);
if(!f)return null;const d=[];f.forEach((g,x,u,q)=>{A.set(g,x,u,q);b.getTileBounds(n,A);g=new y(n[0],n[1],n[2],n[3],k.spatialReference);d.push(this._export(g,a,a,0,l,c))});return Promise.all(d)};r._createClass(w,[{key:"updating",get:function(){return!this.destroyed&&null!==this._imagePromise}}]);return w}(e);h.__decorate([m.property()],e.prototype,"_imagePromise",void 0);h.__decorate([m.property()],e.prototype,"bitmaps",void 0);h.__decorate([m.property()],e.prototype,"container",void 0);h.__decorate([m.property()],
e.prototype,"fetchSource",void 0);h.__decorate([m.property()],e.prototype,"hidpi",void 0);h.__decorate([m.property()],e.prototype,"imageMaxWidth",void 0);h.__decorate([m.property()],e.prototype,"imageMaxHeight",void 0);h.__decorate([m.property()],e.prototype,"imageRotationSupported",void 0);h.__decorate([m.property()],e.prototype,"imageNormalizationSupported",void 0);h.__decorate([m.property()],e.prototype,"requestUpdate",void 0);h.__decorate([m.property()],e.prototype,"updating",null);return e=h.__decorate([D.subclass("esri.views.2d.layers.support.ExportStrategy")],
e)});