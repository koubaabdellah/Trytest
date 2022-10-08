"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[6588,5846],{65702:(e,t,i)=>{i.d(t,{Z:()=>r})
var s=i(83814)
class r{constructor(e,t){this._storage=new s.WJ,this._storage.maxSize=e,t&&this._storage.registerRemoveFunc("",t)}put(e,t,i){this._storage.put(e,t,i,1)}pop(e){return this._storage.pop(e)}get(e){return this._storage.get(e)}clear(){this._storage.clearAll()}destroy(){this._storage.destroy()}get maxSize(){return this._storage.maxSize}set maxSize(e){this._storage.maxSize=e}}},23474:(e,t,i)=>{i.d(t,{Z:()=>y})
var s,r=i(53090),o=i(83798),n=i(78814),l=(i(89890),i(2425)),a=i(22501),u=i(42653),c=i(4413),p=i(38475),d=i(55846)
let h=s=class extends((0,p.W)(c.Z)){constructor(e){super(e),this.config=null,this.fieldMap=null,this.scaleExpression=null,this.scaleExpressionTitle=null,this.url=null,this.type="dictionary"}get _loader(){return new d.DictionaryLoader(this.url,this.config,this.fieldMap)}writeData(e,t){e&&(t.scalingExpressionInfo={expression:e,returnType:"number"})}writeVisualVariables(e,t,i,s){null!=s&&s.origin||super.writeVisualVariables(e,t,i,s)}clone(){return new s({config:(0,o.d9)(this.config),scaleExpression:this.scaleExpression,scaleExpressionTitle:this.scaleExpressionTitle,fieldMap:(0,o.d9)(this.fieldMap),url:(0,o.d9)(this.url),visualVariables:(0,o.d9)(this.visualVariables)})}async getSymbolAsync(e,t){return this._loader.getSymbolAsync(e,t)}async collectRequiredFields(e,t){await this.collectVVRequiredFields(e,t),this.scaleExpression&&await(0,u.collectArcadeFieldNames)(e,t,this.scaleExpression)
for(const i in this.fieldMap){const s=this.fieldMap[i]
t.has(s)&&e.add(s)}}get arcadeRequired(){return!0}getSymbol(){return null}getSymbols(){return[]}getAttributeHash(){return this.visualVariables&&this.visualVariables.reduce(((e,t)=>e+t.getAttributeHash()),"")}getMeshHash(){return`${this.url}-${JSON.stringify(this.fieldMap)}`}getSymbolFields(){return this._loader.getSymbolFields()}};(0,r._)([(0,n.Cb)({type:d.DictionaryLoader})],h.prototype,"_loader",null),(0,r._)([(0,n.Cb)({type:Object,json:{read:{source:"configuration"},write:{target:"configuration"}}})],h.prototype,"config",void 0),(0,r._)([(0,n.Cb)({type:Object,json:{write:!0}})],h.prototype,"fieldMap",void 0),(0,r._)([(0,n.Cb)({type:String,json:{read:{source:"scalingExpressionInfo.expression"},write:!0}})],h.prototype,"scaleExpression",void 0),(0,r._)([(0,a.c)("scaleExpression")],h.prototype,"writeData",null),(0,r._)([(0,n.Cb)({type:String,json:{read:{source:"scalingExpressionInfo.title"},write:{target:"scalingExpressionInfo.title",overridePolicy(e){return{enabled:!!e&&!!this.scaleExpression}}}}})],h.prototype,"scaleExpressionTitle",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],h.prototype,"url",void 0),(0,r._)([(0,a.c)("visualVariables")],h.prototype,"writeVisualVariables",null),h=s=(0,r._)([(0,l.j)("esri.renderers.DictionaryRenderer")],h)
const y=h},53808:(e,t,i)=>{i.d(t,{Z:()=>R})
var s,r=i(53090),o=i(72),n=i(83798),l=i(11483),a=i(89890),u=i(74226),c=i(78814),p=i(2425),d=i(42653),h=i(4413),y=i(38475),b=i(85381),f=i(50983),m=(i(41656),i(70507),i(73950))
const g=f.Z.getLogger("esri.renderers.support.AttributeColorInfo")
let _=s=class extends b.wq{constructor(e){super(e),this.color=null,this.field=null,this.label=null,this.valueExpression=null,this.valueExpressionTitle=null}castField(e){return null==e?e:"function"==typeof e?(g.error(".field: field must be a string value"),null):(0,a.Zs)(e)}getAttributeHash(){return`${this.field}-${this.valueExpression}`}clone(){return new s({color:this.color&&this.color.clone(),field:this.field,label:this.label,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle})}};(0,r._)([(0,c.Cb)({type:o.Z,json:{type:[Number],write:!0}})],_.prototype,"color",void 0),(0,r._)([(0,c.Cb)({type:String,json:{write:!0}})],_.prototype,"field",void 0),(0,r._)([(0,m.p)("field")],_.prototype,"castField",null),(0,r._)([(0,c.Cb)({type:String,json:{write:!0}})],_.prototype,"label",void 0),(0,r._)([(0,c.Cb)({type:String,json:{write:!0}})],_.prototype,"valueExpression",void 0),(0,r._)([(0,c.Cb)({type:String,json:{write:!0}})],_.prototype,"valueExpressionTitle",void 0),_=s=(0,r._)([(0,p.j)("esri.renderers.support.AttributeColorInfo")],_)
const v=_
var S
let w=S=class extends b.wq{constructor(){super(...arguments),this.unit=null}clone(){return new S({unit:this.unit})}};(0,r._)([(0,c.Cb)({type:String,json:{write:!0}})],w.prototype,"unit",void 0),w=S=(0,r._)([(0,p.j)("esri.renderers.support.DotDensityLegendOptions")],w)
const C=w
var x,j=i(20735),V=i(4111)
let M=x=class extends((0,y.W)(h.Z)){constructor(e){super(e),this.attributes=null,this.backgroundColor=new o.Z([0,0,0,0]),this.blendDots=!0,this.dotBlendingEnabled=!0,this.dotShape="square",this.dotSize=1,this.legendOptions=null,this.outline=new V.Z,this.dotValue=null,this.referenceDotValue=null,this.referenceScale=null,this.seed=1,this.type="dot-density"}calculateDotValue(e){if(null==this.referenceScale)return this.dotValue
const t=e/this.referenceScale*this.dotValue
return t<1?1:t}getSymbol(){return new j.Z({outline:this.outline})}async getSymbolAsync(){return this.getSymbol()}getSymbols(){return[this.getSymbol()]}getAttributeHash(){return this.attributes&&this.attributes.reduce(((e,t)=>e+t.getAttributeHash()),"")}getMeshHash(){return JSON.stringify(this.outline)}clone(){return new x({attributes:(0,n.d9)(this.attributes),backgroundColor:(0,n.d9)(this.backgroundColor),dotBlendingEnabled:(0,n.d9)(this.dotBlendingEnabled),dotShape:(0,n.d9)(this.dotShape),dotSize:(0,n.d9)(this.dotSize),dotValue:(0,n.d9)(this.dotValue),legendOptions:(0,n.d9)(this.legendOptions),outline:(0,n.d9)(this.outline),referenceScale:(0,n.d9)(this.referenceScale),visualVariables:(0,n.d9)(this.visualVariables),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})}getControllerHash(){return`${this.attributes.map((e=>e.field||e.valueExpression||""))}-${this.outline&&JSON.stringify(this.outline.toJSON())||""}`}async collectRequiredFields(e,t){await this.collectVVRequiredFields(e,t)
for(const i of this.attributes)i.valueExpression&&await(0,d.collectArcadeFieldNames)(e,t,i.valueExpression),i.field&&e.add(i.field)}};(0,r._)([(0,c.Cb)({type:[v],json:{write:!0}})],M.prototype,"attributes",void 0),(0,r._)([(0,c.Cb)({type:o.Z,json:{write:!0}})],M.prototype,"backgroundColor",void 0),(0,r._)([(0,c.Cb)({type:Boolean}),(0,l.B)("dotBlendingEnabled")],M.prototype,"blendDots",void 0),(0,r._)([(0,c.Cb)({type:Boolean,json:{write:!0}})],M.prototype,"dotBlendingEnabled",void 0),(0,r._)([(0,c.Cb)({type:String,json:{write:!1}})],M.prototype,"dotShape",void 0),(0,r._)([(0,c.Cb)({type:Number,json:{write:!0,origins:{"web-map":{write:!1},"web-scene":{write:!1}}}})],M.prototype,"dotSize",void 0),(0,r._)([(0,c.Cb)({type:C,json:{write:!0}})],M.prototype,"legendOptions",void 0),(0,r._)([(0,c.Cb)({type:V.Z,json:{default:null,write:!0}})],M.prototype,"outline",void 0),(0,r._)([(0,c.Cb)({type:Number,json:{write:!0}})],M.prototype,"dotValue",void 0),(0,r._)([(0,c.Cb)({type:Number}),(0,l.B)("dotValue")],M.prototype,"referenceDotValue",void 0),(0,r._)([(0,c.Cb)({type:Number,json:{write:!0}})],M.prototype,"referenceScale",void 0),(0,r._)([(0,c.Cb)({type:Number,json:{write:!0}})],M.prototype,"seed",void 0),(0,r._)([(0,u.J)({dotDensity:"dot-density"})],M.prototype,"type",void 0),M=x=(0,r._)([(0,p.j)("esri.renderers.DotDensityRenderer")],M)
const R=M},9709:(e,t,i)=>{i.d(t,{Z:()=>m})
var s,r=i(53090),o=i(72),n=i(83798),l=i(78814),a=(i(89890),i(74226)),u=i(2425),c=i(42653),p=i(4413),d=i(85381)
i(41656),i(70507)
let h=s=class extends d.wq{constructor(e){super(e),this.color=null,this.ratio=null}clone(){return new s({color:this.color,ratio:this.ratio})}};(0,r._)([(0,l.Cb)({type:o.Z,json:{write:!0}})],h.prototype,"color",void 0),(0,r._)([(0,l.Cb)({type:Number,json:{write:!0}})],h.prototype,"ratio",void 0),h=s=(0,r._)([(0,u.j)("esri.renderers.support.HeatmapColorStop")],h)
const y=h
var b
let f=b=class extends p.Z{constructor(e){super(e),this.blurRadius=10,this.referenceScale=0,this.colorStops=[new y({ratio:0,color:new o.Z("rgba(255, 140, 0, 0)")}),new y({ratio:.75,color:new o.Z("rgba(255, 140, 0, 1)")}),new y({ratio:.9,color:new o.Z("rgba(255, 0,   0, 1)")})],this.field=null,this.fieldOffset=0,this.maxPixelIntensity=100,this.minPixelIntensity=0,this.type="heatmap"}async collectRequiredFields(e,t){const i=this.field
i&&"string"==typeof i&&(0,c.collectField)(e,t,i)}getAttributeHash(){return null}getMeshHash(){return`${JSON.stringify(this.colorStops)}.${this.blurRadius}.${this.field}`}clone(){return new b({blurRadius:this.blurRadius,referenceScale:this.referenceScale,colorStops:(0,n.d9)(this.colorStops),field:this.field,maxPixelIntensity:this.maxPixelIntensity,minPixelIntensity:this.minPixelIntensity})}};(0,r._)([(0,l.Cb)({type:Number,json:{write:!0}})],f.prototype,"blurRadius",void 0),(0,r._)([(0,l.Cb)({type:Number})],f.prototype,"referenceScale",void 0),(0,r._)([(0,l.Cb)({type:[y],json:{write:!0}})],f.prototype,"colorStops",void 0),(0,r._)([(0,l.Cb)({type:String,json:{write:!0}})],f.prototype,"field",void 0),(0,r._)([(0,l.Cb)({type:Number,json:{write:{overridePolicy:(e,t,i)=>({enabled:null==i})}}})],f.prototype,"fieldOffset",void 0),(0,r._)([(0,l.Cb)({type:Number,json:{write:!0}})],f.prototype,"maxPixelIntensity",void 0),(0,r._)([(0,l.Cb)({type:Number,json:{write:!0}})],f.prototype,"minPixelIntensity",void 0),(0,r._)([(0,a.J)({heatmap:"heatmap"})],f.prototype,"type",void 0),f=b=(0,r._)([(0,u.j)("esri.renderers.HeatmapRenderer")],f)
const m=f},12768:(e,t,i)=>{i.r(t),i.d(t,{default:()=>h})
var s,r=i(53090),o=i(83798),n=i(78814),l=(i(89890),i(74226)),a=i(2425),u=i(4413),c=i(38475),p=i(63705)
let d=s=class extends((0,c.W)(u.Z)){constructor(e){super(e),this.description=null,this.label=null,this.symbol=null,this.type="simple"}async collectRequiredFields(e,t){await Promise.all([this.collectSymbolFields(e,t),this.collectVVRequiredFields(e,t)])}async collectSymbolFields(e,t){await Promise.all(this.getSymbols().map((i=>i.collectRequiredFields(e,t))))}getSymbol(e,t){return this.symbol}async getSymbolAsync(e,t){return this.symbol}getSymbols(){return this.symbol?[this.symbol]:[]}getAttributeHash(){return this.visualVariables&&this.visualVariables.reduce(((e,t)=>e+t.getAttributeHash()),"")}getMeshHash(){return this.getSymbols().reduce(((e,t)=>e+JSON.stringify(t)),"")}get arcadeRequired(){return this.arcadeRequiredForVisualVariables}clone(){return new s({description:this.description,label:this.label,symbol:this.symbol&&this.symbol.clone(),visualVariables:(0,o.d9)(this.visualVariables),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})}};(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],d.prototype,"description",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],d.prototype,"label",void 0),(0,r._)([(0,n.Cb)(p.G)],d.prototype,"symbol",void 0),(0,r._)([(0,l.J)({simple:"simple"})],d.prototype,"type",void 0),d=s=(0,r._)([(0,a.j)("esri.renderers.SimpleRenderer")],d)
const h=d},55846:(e,t,i)=>{i.r(t),i.d(t,{DictionaryLoader:()=>b})
var s=i(72),r=i(40138),o=i(74684),n=i(50983),l=i(65702),a=i(78910),u=i(55879),c=i(9055),p=i(9217),d=i(55052)
const h=n.Z.getLogger("esri.renderers.support.DictionaryLoader"),y={type:"CIMSimpleLineCallout",lineSymbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:.5,color:[0,0,0,255]}]}}
class b{constructor(e,t,i){this.config=null,this.fieldMap=null,this.url=null,this._ongoingRequests=new Map,this._symbolCache=new l.Z(100),this.url=e,this.config=t,this.fieldMap=i}getSymbolFields(){return this._symbolFields}async getSymbolAsync(e,t){let i
this._dictionaryPromise||(this._dictionaryPromise=this.fetchResources(t))
try{i=await this._dictionaryPromise}catch(e){if((0,u.D_)(e))return this._dictionaryPromise=null,null}const r={}
if(this.fieldMap)for(const s of this._symbolFields){const t=this.fieldMap[s]
if(t&&null!=e.attributes[t]){const i=""+e.attributes[t]
r[s]=i}else r[s]=""}const o=i(r,t)
if(!o||"string"!=typeof o)return null
const n=(0,c.hP)(o).toString(),l=this._symbolCache.get(n)
if(l)return l.catch((()=>{this._symbolCache.pop(n)})),l
const p=o.split(";"),d=[],h=[]
for(const a of p)if(a)if(a.includes("po:")){const e=a.substr(3).split("|")
if(3===e.length){const t=e[0],i=e[1]
let r=e[2]
if("DashTemplate"===i)r=r.split(" ").map((e=>Number(e)))
else if("Color"===i){const e=new s.Z(r).toRgba()
r=[e[0],e[1],e[2],255*e[3]]}else r=Number(r)
h.push({primitiveName:t,propertyName:i,value:r})}}else if(a.includes("|")){for(const e of a.split("|"))if(this._itemNames.has(e)){d.push(e)
break}}else this._itemNames.has(a)&&d.push(a)
const y=!(0,a.pC)(e.geometry)||!e.geometry.hasZ&&"point"===e.geometry.type,b=this._cimPartsToCIMSymbol(d,h,y,t)
return this._symbolCache.put(n,b,1),b}async fetchResources(e){if(this._dictionaryPromise)return this._dictionaryPromise
if(!this.url)return void h.error("no valid URL!")
const t=(0,a.pC)(e)?e.abortOptions:null,i=(0,r.default)(this.url+"/resources/styles/dictionary-info.json",{responseType:"json",query:{f:"json"},...t}),[{data:s}]=await Promise.all([i,(0,p.LC)()])
if(!s)throw this._dictionaryPromise=null,new o.default("esri.renderers.DictionaryRenderer","Bad dictionary data!")
const n=s.expression,l=s.authoringInfo
this._refSymbolUrlTemplate=this.url+"/"+s.cimRefTemplateUrl,this._itemNames=new Set(s.itemsNames),this._symbolFields=l.symbol
const u={}
if(this.config){const e=this.config
for(const t in e)u[t]=e[t]}if(l.configuration)for(const r of l.configuration)u.hasOwnProperty(r.name)||(u[r.name]=r.value)
const c=[]
if((0,a.pC)(e)&&e.fields&&this.fieldMap)for(const r of this._symbolFields){const t=this.fieldMap[r],i=e.fields.filter((e=>e.name===t))
i.length>0&&c.push({...i[0],name:r})}return this._dictionaryPromise=(0,p.pp)(n,(0,a.pC)(e)?e.spatialReference:null,c,u).then((e=>{const t={scale:0}
return(i,s)=>{const r=e.repurposeFeature({geometry:null,attributes:i})
return t.scale=(0,a.pC)(s)?s.scale:void 0,e.evaluate({$feature:r,$view:t})}})).catch((e=>(h.error("Creating dictinoary expression failed:",e),null))),this._dictionaryPromise}async _cimPartsToCIMSymbol(e,t,i,s){const r=new Array(e.length)
for(let l=0;l<e.length;l++)r[l]=this._getSymbolPart(e[l],s)
const o=await Promise.all(r),n=this.fieldMap
for(const l of o)f(l,n)
return new d.Z({data:this._combineSymbolParts(o,t,i)})}async _getSymbolPart(e,t){if(this._ongoingRequests.has(e))return this._ongoingRequests.get(e).then((e=>e.data))
const i=this._refSymbolUrlTemplate.replace(/\{itemName\}/gi,e),s=(0,r.default)(i,{responseType:"json",query:{f:"json"},...t})
this._ongoingRequests.set(e,s)
try{return(await s).data}catch(t){return this._ongoingRequests.delete(e),Promise.reject(t)}}_combineSymbolParts(e,t,i){if(!e||0===e.length)return null
const s={...e[0]}
if(e.length>1){s.symbolLayers=[]
for(const t of e){const e=t
s.symbolLayers.unshift(...e.symbolLayers)}}return i&&(s.callout=y),{type:"CIMSymbolReference",symbol:s,primitiveOverrides:t}}}function f(e,t){if(!e)return
const i=e.symbolLayers
if(!i)return
let s=i.length
for(;s--;){const e=i[s]
e&&!1!==e.enable&&"CIMVectorMarker"===e.type&&m(e,t)}}function m(e,t){const i=e.markerGraphics
if(i)for(const s of i){if(!s)continue
const e=s.symbol
if(e)switch(e.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":f(e,t)
break
case"CIMTextSymbol":e.fieldMap=t}}}},46588:(e,t,i)=>{i.d(t,{i:()=>n,a:()=>a})
var s=i(50395),r=i(28800),o=i(17473)
function n(e,t){return a(e,null,t)}const l=(0,r.d)({types:o.A})
function a(e,t,i){return e?e&&(e.styleName||e.styleUrl)&&"uniqueValue"!==e.type?(i&&i.messages&&i.messages.push(new s.Z("renderer:unsupported","Only UniqueValueRenderer can be referenced from a web style, but found '"+e.type+"'",{definition:e,context:i})),null):l(e,t,i):null}},17473:(e,t,i)=>{i.d(t,{A:()=>c,o:()=>p})
var s=i(26550),r=i(23474),o=i(53808),n=i(9709),l=i(4413),a=i(12768),u=i(714)
const c={key:"type",base:l.Z,typeMap:{heatmap:n.Z,simple:a.default,"unique-value":u.Z,"class-breaks":s.Z,"dot-density":o.Z,dictionary:r.Z},errorContext:"renderer"},p={key:"type",base:l.Z,typeMap:{simple:a.default,"unique-value":u.Z,"class-breaks":s.Z},errorContext:"renderer"}}}])
