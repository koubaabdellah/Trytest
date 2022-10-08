"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[4254],{7482:(e,t,r)=>{r.d(t,{Z:()=>l})
var s,n,i=r(70507),a=r(43162);(n=s||(s={}))[n.varint=0]="varint",n[n.fixed64=1]="fixed64",n[n.delimited=2]="delimited",n[n.fixed32=5]="fixed32",n[n.unknown=99]="unknown"
const o=4294967296,u=new TextDecoder("utf-8"),c=(0,i.Z)("safari")||(0,i.Z)("ios")?6:(0,i.Z)("ff")?12:32
class l{constructor(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e?e.byteLength:0
this._tag=0,this._dataType=s.unknown,this._init(e,t,r,n)}_init(e,t,r,s){this._data=e,this._dataView=t,this._pos=r,this._end=s}clone(){return new l(this._data,this._dataView,this._pos,this._end)}pos(){return this._pos}move(e){this._pos=e}nextTag(e){for(;;){if(this._pos===this._end)return!1
const t=this._decodeVarint()
if(this._tag=t>>3,this._dataType=7&t,!e||e===this._tag)break
this.skip()}return!0}next(){if(this._pos===this._end)return!1
const e=this._decodeVarint()
return this._tag=e>>3,this._dataType=7&e,!0}empty(){return this._pos>=this._end}tag(){return this._tag}getInt32(){return this._decodeVarint()}getInt64(){return this._decodeVarint()}getUInt32(){let e=4294967295
return e=(127&this._data[this._pos])>>>0,this._data[this._pos++]<128?e:(e=(e|(127&this._data[this._pos])<<7)>>>0,this._data[this._pos++]<128?e:(e=(e|(127&this._data[this._pos])<<14)>>>0,this._data[this._pos++]<128?e:(e=(e|(127&this._data[this._pos])<<21)>>>0,this._data[this._pos++]<128?e:(e=(e|(15&this._data[this._pos])<<28)>>>0,this._data[this._pos++]<128?e:void 0))))}getUInt64(){return this._decodeVarint()}getSInt32(){const e=this.getUInt32()
return e>>>1^-(1&e)|0}getSInt64(){return this._decodeSVarint()}getBool(){const e=0!==this._data[this._pos]
return this._skip(1),e}getEnum(){return this._decodeVarint()}getFixed64(){const e=this._dataView,t=this._pos,r=e.getUint32(t,!0)+e.getUint32(t+4,!0)*o
return this._skip(8),r}getSFixed64(){const e=this._dataView,t=this._pos,r=e.getUint32(t,!0)+e.getInt32(t+4,!0)*o
return this._skip(8),r}getDouble(){const e=this._dataView.getFloat64(this._pos,!0)
return this._skip(8),e}getFixed32(){const e=this._dataView.getUint32(this._pos,!0)
return this._skip(4),e}getSFixed32(){const e=this._dataView.getInt32(this._pos,!0)
return this._skip(4),e}getFloat(){const e=this._dataView.getFloat32(this._pos,!0)
return this._skip(4),e}getString(){const e=this._getLength(),t=this._pos,r=this._toString(this._data,t,t+e)
return this._skip(e),r}getBytes(){const e=this._getLength(),t=this._pos,r=this._toBytes(this._data,t,t+e)
return this._skip(e),r}getLength(){return this._getLengthUnsafe()}processMessageWithArgs(e,t,r,s){const n=this.getMessage(),i=e(n,t,r,s)
return n.release(),i}processMessage(e){const t=this.getMessage(),r=e(t)
return t.release(),r}getMessage(){const e=this._getLength(),t=l.pool.acquire()
return t._init(this._data,this._dataView,this._pos,this._pos+e),this._skip(e),t}release(){l.pool.release(this)}dataType(){return this._dataType}skip(){switch(this._dataType){case s.varint:this._decodeVarint()
break
case s.fixed64:this._skip(8)
break
case s.delimited:this._skip(this._getLength())
break
case s.fixed32:this._skip(4)
break
default:throw new Error("Invalid data type!")}}skipLen(e){this._skip(e)}_skip(e){if(this._pos+e>this._end)throw new Error("Attempt to skip past the end of buffer!")
this._pos+=e}_decodeVarint(){const e=this._data
let t,r=this._pos,s=0
if(this._end-r>=10)do{if(t=e[r++],s|=127&t,0==(128&t))break
if(t=e[r++],s|=(127&t)<<7,0==(128&t))break
if(t=e[r++],s|=(127&t)<<14,0==(128&t))break
if(t=e[r++],s|=(127&t)<<21,0==(128&t))break
if(t=e[r++],s+=268435456*(127&t),0==(128&t))break
if(t=e[r++],s+=34359738368*(127&t),0==(128&t))break
if(t=e[r++],s+=4398046511104*(127&t),0==(128&t))break
if(t=e[r++],s+=562949953421312*(127&t),0==(128&t))break
if(t=e[r++],s+=72057594037927940*(127&t),0==(128&t))break
if(t=e[r++],s+=0x8000000000000000*(127&t),0==(128&t))break
throw new Error("Varint too long!")}while(0)
else{let n=1
for(;r!==this._end&&(t=e[r],0!=(128&t));)++r,s+=(127&t)*n,n*=128
if(r===this._end)throw new Error("Varint overrun!");++r,s+=t*n}return this._pos=r,s}_decodeSVarint(){const e=this._decodeVarint()
return e%2?-(e+1)/2:e/2}_getLength(){if(this._dataType!==s.delimited)throw new Error("Not a delimited data type!")
return this._decodeVarint()}_getLengthUnsafe(){return this.getUInt32()}_toString(e,t,r){if((r=Math.min(this._end,r))-t>c){const s=e.subarray(t,r)
return u.decode(s)}let s="",n=""
for(let i=t;i<r;++i){const t=e[i]
128&t?n+="%"+t.toString(16):(s+=decodeURIComponent(n)+String.fromCharCode(t),n="")}return n.length&&(s+=decodeURIComponent(n)),s}_toBytes(e,t,r){return r=Math.min(this._end,r),new Uint8Array(e.buffer,t,r-t)}}l.pool=new a.Z(l,null,(e=>{e._data=null,e._dataView=null}))},94777:(e,t,r)=>{r.d(t,{aX:()=>x,or:()=>S})
var s=r(53080),n=r(74684),i=r(50983),a=r(78910),o=r(1309),u=r(11083),c=r(87549),l=r(80111),p=r(26221),f=(r(50225),r(40138)),d=r(86893),h=r(98284)
const g=i.Z.getLogger("esri.geometry.support.normalizeUtils")
function y(e){return"polygon"===e[0].type}function m(e){return"polyline"===e[0].type}function _(e,t,r){if(t){const t=function(e,t){if(!(e instanceof u.Z||e instanceof o.Z)){const e="straightLineDensify: the input geometry is neither polyline nor polygon"
throw g.error(e),new n.default(e)}const r=(0,c.x3)(e),s=[]
for(const n of r){const e=[]
s.push(e),e.push([n[0][0],n[0][1]])
for(let r=0;r<n.length-1;r++){const s=n[r][0],i=n[r][1],a=n[r+1][0],o=n[r+1][1],u=Math.sqrt((a-s)*(a-s)+(o-i)*(o-i)),c=(o-i)/u,l=(a-s)/u,p=u/t
if(p>1){for(let o=1;o<=p-1;o++){const r=o*t,n=l*r+s,a=c*r+i
e.push([n,a])}const r=(u+Math.floor(p-1)*t)/2,n=l*r+s,a=c*r+i
e.push([n,a])}e.push([a,o])}}return function(e){return"polygon"===e.type}(e)?new o.Z({rings:s,spatialReference:e.spatialReference}):new u.Z({paths:s,spatialReference:e.spatialReference})}(e,1e6)
e=(0,p.Sx)(t,!0)}return r&&(e=(0,c.Sy)(e,r)),e}function b(e,t,r){if(Array.isArray(e)){const s=e[0]
if(s>t){const r=(0,c.XZ)(s,t)
e[0]=s+r*(-2*t)}else if(s<r){const t=(0,c.XZ)(s,r)
e[0]=s+t*(-2*r)}}else{const s=e.x
if(s>t){const r=(0,c.XZ)(s,t)
e=e.clone().offset(r*(-2*t),0)}else if(s<r){const t=(0,c.XZ)(s,r)
e=e.clone().offset(t*(-2*r),0)}}return e}function k(e,t){let r=-1
for(let s=0;s<t.cutIndexes.length;s++){const n=t.cutIndexes[s],i=t.geometries[s],a=(0,c.x3)(i)
for(let e=0;e<a.length;e++){const t=a[e]
t.some((r=>{if(r[0]<180)return!0
{let r=0
for(let e=0;e<t.length;e++){const s=t[e][0]
r=s>r?s:r}r=Number(r.toFixed(9))
const s=-360*(0,c.XZ)(r,180)
for(let n=0;n<t.length;n++){const t=i.getPoint(e,n)
i.setPoint(e,n,t.clone().offset(s,0))}return!0}}))}if(n===r){if(y(e))for(const t of(0,c.x3)(i))e[n]=e[n].addRing(t)
else if(m(e))for(const t of(0,c.x3)(i))e[n]=e[n].addPath(t)}else r=n,e[n]=i}return e}async function x(e,t,r){var n
if(!Array.isArray(e))return x([e],t)
const i=null!=(n=null==t?void 0:t.url)?n:s.default.geometryServiceUrl
let g,y,m,S,w,T,F,q,R=0
const I=[],E=[]
for(const s of e)if((0,a.Wi)(s))E.push(s)
else if(g||(g=s.spatialReference,y=(0,l.C5)(g),m=g.isWebMercator,T=m?102100:4326,S=c.UZ[T].maxX,w=c.UZ[T].minX,F=c.UZ[T].plus180Line,q=c.UZ[T].minus180Line),y)if("mesh"===s.type)E.push(s)
else if("point"===s.type)E.push(b(s.clone(),S,w))
else if("multipoint"===s.type){const e=s.clone()
e.points=e.points.map((e=>b(e,S,w))),E.push(e)}else if("extent"===s.type){const e=s.clone()._normalize(!1,!1,y)
E.push(e.rings?new o.Z(e):e)}else if(s.extent){const e=s.extent,t=(0,c.XZ)(e.xmin,w)*(2*S)
let r=0===t?s.clone():(0,c.Sy)(s.clone(),t)
e.offset(t,0),e.intersects(F)&&e.xmax!==S?(R=e.xmax>R?e.xmax:R,r=_(r,m),I.push(r),E.push("cut")):e.intersects(q)&&e.xmin!==w?(R=e.xmax*(2*S)>R?e.xmax*(2*S):R,r=_(r,m,360),I.push(r),E.push("cut")):E.push(r)}else E.push(s.clone())
else E.push(s)
let V=(0,c.XZ)(R,S),C=-90
const Z=V,v=new u.Z
for(;V>0;){const e=360*V-180
v.addPath([[e,C],[e,-1*C]]),C*=-1,V--}if(I.length>0&&Z>0){const t=k(I,await async function(e,t,r,s){const n="string"==typeof e?(0,d.mN)(e):e,i=t[0].spatialReference,a={...s,query:{...n.query,f:"json",sr:JSON.stringify(i),target:JSON.stringify({geometryType:(0,h.Ji)(t[0]),geometries:t}),cutter:JSON.stringify(r)}},o=await(0,f.default)(n.path+"/cut",a),{cutIndexes:u,geometries:c=[]}=o.data
return{cutIndexes:u,geometries:c.map((e=>{const t=(0,h.im)(e)
return t.spatialReference=i,t}))}}(i,I,v,r)),s=[],n=[]
for(let r=0;r<E.length;r++){const i=E[r]
if("cut"!==i)n.push(i)
else{const i=t.shift(),o=e[r];(0,a.pC)(o)&&"polygon"===o.type&&o.rings&&o.rings.length>1&&i.rings.length>=o.rings.length?(s.push(i),n.push("simplify")):n.push(m?(0,p.$)(i):i)}}if(!s.length)return n
const o=await async function(e,t,r){const s="string"==typeof e?(0,d.mN)(e):e,n=t[0].spatialReference,i=(0,h.Ji)(t[0]),a={...r,query:{...s.query,f:"json",sr:n.wkid?n.wkid:JSON.stringify(n),geometries:JSON.stringify((o=t,{geometryType:(0,h.Ji)(o[0]),geometries:o.map((e=>e.toJSON()))}))}}
var o
return function(e,t,r){const s=(0,h.q9)(t)
return e.map((e=>{const t=s.fromJSON(e)
return t.spatialReference=r,t}))}((await(0,f.default)(s.path+"/simplify",a)).data,i,n)}(i,s,r),u=[]
for(let e=0;e<n.length;e++){const t=n[e]
"simplify"!==t?u.push(t):u.push(m?(0,p.$)(o.shift()):o.shift())}return u}const U=[]
for(let s=0;s<E.length;s++){const e=E[s]
if("cut"!==e)U.push(e)
else{const e=I.shift()
U.push(!0===m?(0,p.$)(e):e)}}return Promise.resolve(U)}function S(e,t){const r=(0,l.C5)(t)
if(r){const[t,s]=r.valid,n=s-t
if(e<t)for(;e<t;)e+=n
if(e>s)for(;e>s;)e-=n}return e}},87549:(e,t,r)=>{r.d(t,{UZ:()=>a,x3:()=>c,uS:()=>l,XZ:()=>o,Sy:()=>u})
var s=r(11083),n=r(47131),i=r(98284)
const a={102100:{maxX:20037508.342788905,minX:-20037508.342788905,plus180Line:new s.Z({paths:[[[20037508.342788905,-20037508.342788905],[20037508.342788905,20037508.342788905]]],spatialReference:n.default.WebMercator}),minus180Line:new s.Z({paths:[[[-20037508.342788905,-20037508.342788905],[-20037508.342788905,20037508.342788905]]],spatialReference:n.default.WebMercator})},4326:{maxX:180,minX:-180,plus180Line:new s.Z({paths:[[[180,-180],[180,180]]],spatialReference:n.default.WGS84}),minus180Line:new s.Z({paths:[[[-180,-180],[-180,180]]],spatialReference:n.default.WGS84})}}
function o(e,t){return Math.ceil((e-t)/(2*t))}function u(e,t){const r=c(e)
for(const s of r)for(const e of s)e[0]+=t
return e}function c(e){return(0,i.oU)(e)?e.rings:e.paths}function l(e){const t=(null==e?void 0:e.isWebMercator)?102100:4326
return[a[t].minX,a[t].maxX]}},68888:(e,t,r)=>{function s(e){const t={}
for(const r in e){if("declaredClass"===r)continue
const n=e[r]
if(null!=n&&"function"!=typeof n)if(Array.isArray(n)){t[r]=[]
for(let e=0;e<n.length;e++)t[r][e]=s(n[e])}else"object"==typeof n?n.toJSON&&(t[r]=JSON.stringify(n)):t[r]=n}return t}r.d(t,{A:()=>s})},36867:(e,t,r)=>{r.d(t,{K9:()=>E,O7:()=>p,G$:()=>T})
var s=r(74684),n=r(78910),i=r(7482),a=r(60830),o=r(66316)
const u=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeString","esriFieldTypeDate","esriFieldTypeOID","esriFieldTypeGeometry","esriFieldTypeBlob","esriFieldTypeRaster","esriFieldTypeGUID","esriFieldTypeGlobalID","esriFieldTypeXML"],c=["sqlTypeBigInt","sqlTypeBinary","sqlTypeBit","sqlTypeChar","sqlTypeDate","sqlTypeDecimal","sqlTypeDouble","sqlTypeFloat","sqlTypeGeometry","sqlTypeGUID","sqlTypeInteger","sqlTypeLongNVarchar","sqlTypeLongVarbinary","sqlTypeLongVarchar","sqlTypeNChar","sqlTypeNVarchar","sqlTypeOther","sqlTypeReal","sqlTypeSmallInt","sqlTypeSqlXml","sqlTypeTime","sqlTypeTimestamp","sqlTypeTimestamp2","sqlTypeTinyInt","sqlTypeVarbinary","sqlTypeVarchar"],l=["upperLeft","lowerLeft"]
function p(e){return e>=u.length?null:u[e]}function f(e){return e>=c.length?null:c[e]}function d(e){return e>=l.length?null:l[e]}function h(e,t){return t>=e.geometryTypes.length?null:e.geometryTypes[t]}function g(e,t,r){const s=t.createPointGeometry(r)
for(;e.next();)switch(e.tag()){case 3:{const r=e.getUInt32(),n=e.pos()+r
let i=0
for(;e.pos()<n;)t.addCoordinatePoint(s,e.getSInt64(),i++)
break}default:e.skip()}return s}function y(e,t,r){const s=t.createGeometry(r),n=2+(r.hasZ?1:0)+(r.hasM?1:0)
for(;e.next();)switch(e.tag()){case 2:{const r=e.getUInt32(),n=e.pos()+r
let i=0
for(;e.pos()<n;)t.addLength(s,e.getUInt32(),i++)
break}case 3:{const r=e.getUInt32(),i=e.pos()+r
let a=0
for(t.allocateCoordinates(s);e.pos()<i;)t.addCoordinate(s,e.getSInt64(),a),a++,a===n&&(a=0)
break}default:e.skip()}return s}function m(e){const t=new a.Z
let r="esriGeometryPoint"
for(;e.next();)switch(e.tag()){case 2:{const r=e.getUInt32(),s=e.pos()+r
for(;e.pos()<s;)t.lengths.push(e.getUInt32())
break}case 3:{const r=e.getUInt32(),s=e.pos()+r
for(;e.pos()<s;)t.coords.push(e.getSInt64())
break}case 1:r=o.A[e.getEnum()]
break
default:e.skip()}return{queryGeometry:t,queryGeometryType:r}}function _(e){for(;e.next();)switch(e.tag()){case 1:return e.getString()
case 2:return e.getFloat()
case 3:return e.getDouble()
case 4:return e.getSInt32()
case 5:return e.getUInt32()
case 6:return e.getInt64()
case 7:return e.getUInt64()
case 8:return e.getSInt64()
case 9:return e.getBool()
default:return e.skip(),null}return null}function b(e){const t={type:p(0)}
for(;e.next();)switch(e.tag()){case 1:t.name=e.getString()
break
case 2:t.type=p(e.getEnum())
break
case 3:t.alias=e.getString()
break
case 4:t.sqlType=f(e.getEnum())
break
default:e.skip()
break
case 6:t.defaultValue=e.getString()}return t}function k(e){const t={}
for(;e.next();)switch(e.tag()){case 1:t.name=e.getString()
break
case 2:t.isSystemMaintained=e.getBool()
break
default:e.skip()}return t}function x(e,t,r,s){const n=t.createFeature(r)
let i=0
for(;e.next();)switch(e.tag()){case 1:{const t=s[i++].name
n.attributes[t]=e.processMessage(_)
break}case 2:n.geometry=e.processMessageWithArgs(y,t,r)
break
case 4:n.centroid=e.processMessageWithArgs(g,t,r)
break
default:e.skip()}return n}function S(e){const t=[1,1,1,1]
for(;e.next();)switch(e.tag()){case 1:t[0]=e.getDouble()
break
case 2:t[1]=e.getDouble()
break
case 4:t[2]=e.getDouble()
break
case 3:t[3]=e.getDouble()
break
default:e.skip()}return t}function w(e){const t=[0,0,0,0]
for(;e.next();)switch(e.tag()){case 1:t[0]=e.getDouble()
break
case 2:t[1]=e.getDouble()
break
case 4:t[2]=e.getDouble()
break
case 3:t[3]=e.getDouble()
break
default:e.skip()}return t}function T(e){const t={originPosition:d(0)}
for(;e.next();)switch(e.tag()){case 1:t.originPosition=d(e.getEnum())
break
case 2:t.scale=e.processMessage(S)
break
case 3:t.translate=e.processMessage(w)
break
default:e.skip()}return t}function F(e){const t={}
for(;e.next();)switch(e.tag()){case 1:t.shapeAreaFieldName=e.getString()
break
case 2:t.shapeLengthFieldName=e.getString()
break
case 3:t.units=e.getString()
break
default:e.skip()}return t}function q(e,t){const r=t.createSpatialReference()
for(;e.next();)switch(e.tag()){case 1:r.wkid=e.getUInt32()
break
case 5:r.wkt=e.getString()
break
case 2:r.latestWkid=e.getUInt32()
break
case 3:r.vcsWkid=e.getUInt32()
break
case 4:r.latestVcsWkid=e.getUInt32()
break
default:e.skip()}return r}function R(e,t){const r=t.createFeatureResult()
r.geometryType=h(t,0)
let s=!1
for(;e.next();)switch(e.tag()){case 1:r.objectIdFieldName=e.getString()
break
case 3:r.globalIdFieldName=e.getString()
break
case 4:r.geohashFieldName=e.getString()
break
case 5:r.geometryProperties=e.processMessage(F)
break
case 7:r.geometryType=h(t,e.getEnum())
break
case 8:r.spatialReference=e.processMessageWithArgs(q,t)
break
case 10:r.hasZ=e.getBool()
break
case 11:r.hasM=e.getBool()
break
case 12:r.transform=e.processMessage(T)
break
case 9:{const t=e.getBool()
r.exceededTransferLimit=t
break}case 13:t.addField(r,e.processMessage(b))
break
case 15:s||(t.prepareFeatures(r),s=!0),t.addFeature(r,e.processMessageWithArgs(x,t,r,r.fields))
break
case 2:r.uniqueIdField=e.processMessage(k)
break
default:e.skip()}return t.finishFeatureResult(r),r}function I(e,t){const r={}
let s=null
for(;e.next();)switch(e.tag()){case 4:s=e.processMessageWithArgs(m)
break
case 1:r.featureResult=e.processMessageWithArgs(R,t)
break
default:e.skip()}return(0,n.pC)(s)&&r.featureResult&&t.addQueryGeometry(r,s),r}function E(e,t){try{const r=2,s=new i.Z(new Uint8Array(e),new DataView(e)),n={}
for(;s.next();)s.tag()===r?n.queryResult=s.processMessageWithArgs(I,t):s.skip()
return n}catch(e){throw new s.default("query:parsing-pbf","Error while parsing FeatureSet PBF payload",{error:e})}}},66316:(e,t,r)=>{r.d(t,{A:()=>u,J:()=>c})
var s=r(57819),n=r(80111),i=r(52051),a=r(35939),o=r(60830)
const u=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"]
class c{constructor(e){this.options=e,this.geometryTypes=u,this._coordinatePtr=0,this._vertexDimension=0}createFeatureResult(){return new a.Z}prepareFeatures(e){this._vertexDimension=2,e.hasZ&&this._vertexDimension++,e.hasM&&this._vertexDimension++}finishFeatureResult(e){if(!e||!e.features||!e.hasZ||!this.options.sourceSpatialReference||!e.spatialReference||(0,n.fS)(e.spatialReference,this.options.sourceSpatialReference)||e.spatialReference.vcsWkid)return
const t=(0,s._R)(this.options.sourceSpatialReference)/(0,s._R)(e.spatialReference)
if(1!==t)for(const r of e.features){if(!(0,i.S6)(r))continue
const e=r.geometry.coords
for(let r=2;r<e.length;r+=3)e[r]*=t}}addFeature(e,t){e.features.push(t)}createFeature(){return new i.u_}createSpatialReference(){return{wkid:0}}createGeometry(){return new o.Z}addField(e,t){e.fields.push(t)}allocateCoordinates(e){e.coords.length=e.lengths.reduce(((e,t)=>e+t),0)*this._vertexDimension,this._coordinatePtr=0}addCoordinate(e,t){e.coords[this._coordinatePtr++]=t}addCoordinatePoint(e,t){e.coords.push(t)}addLength(e,t){e.lengths.push(t)}addQueryGeometry(e,t){e.queryGeometry=t.queryGeometry,e.queryGeometryType=t.queryGeometryType}createPointGeometry(){return new o.Z}}},68439:(e,t,r)=>{r.d(t,{C:()=>n})
var s=r(36867)
function n(e,t){const r=(0,s.K9)(e,t),n=r.queryResult.featureResult,i=r.queryResult.queryGeometry,a=r.queryResult.queryGeometryType
if(n&&n.features&&n.features.length&&n.objectIdFieldName){const e=n.objectIdFieldName
for(const t of n.features)t.attributes&&(t.objectId=t.attributes[e])}return n&&(n.queryGeometry=i,n.queryGeometryType=a),n}},44254:(e,t,r)=>{r.r(t),r.d(t,{encodeGeometry:()=>f,executeQuery:()=>h,executeQueryForCount:()=>_,executeQueryForExtent:()=>b,executeQueryForIds:()=>m,executeQueryPBF:()=>g,executeQueryPBFBuffer:()=>y,queryToQueryStringParameters:()=>d,runQuery:()=>k})
var s=r(40138),n=r(78910),i=r(86893),a=r(98284),o=r(94777),u=r(68888),c=r(68439),l=r(11457)
const p="Layer does not support extent calculation."
function f(e,t){if(t&&"extent"===e.type)return`${e.xmin},${e.ymin},${e.xmax},${e.ymax}`
if(t&&"point"===e.type)return`${e.x},${e.y}`
const r=e.toJSON()
return delete r.spatialReference,JSON.stringify(r)}function d(e,t){const r=e.geometry,s=e.toJSON()
delete s.compactGeometryEnabled,delete s.defaultSpatialReferenceEnabled
const i=s,o=e.outSpatialReference
let u,c
if((0,n.pC)(r)&&(u=r.spatialReference,c=r.spatialReference.wkid||JSON.stringify(r.spatialReference),i.geometryType=(0,a.Ji)(r),i.geometry=f(r,e.compactGeometryEnabled),i.inSR=c),s.groupByFieldsForStatistics&&(i.groupByFieldsForStatistics=s.groupByFieldsForStatistics.join(",")),s.objectIds&&(i.objectIds=s.objectIds.join(",")),s.orderByFields&&(i.orderByFields=s.orderByFields.join(",")),!s.outFields||!s.returnDistinctValues&&(null!=t&&t.returnCountOnly||null!=t&&t.returnExtentOnly||null!=t&&t.returnIdsOnly)?delete i.outFields:-1!==s.outFields.indexOf("*")?i.outFields="*":i.outFields=s.outFields.join(","),s.outSR?i.outSR=s.outSR.wkid||JSON.stringify(s.outSR):r&&(s.returnGeometry||s.returnCentroid)&&(i.outSR=i.inSR),s.returnGeometry&&delete s.returnGeometry,s.outStatistics&&(i.outStatistics=JSON.stringify(s.outStatistics)),s.pixelSize&&(i.pixelSize=JSON.stringify(s.pixelSize)),s.quantizationParameters&&(e.defaultSpatialReferenceEnabled&&(0,n.pC)(u)&&(0,n.pC)(e.quantizationParameters)&&(0,n.pC)(e.quantizationParameters.extent)&&u.equals(e.quantizationParameters.extent.spatialReference)&&delete s.quantizationParameters.extent.spatialReference,i.quantizationParameters=JSON.stringify(s.quantizationParameters)),s.parameterValues&&(i.parameterValues=JSON.stringify(s.parameterValues)),s.rangeValues&&(i.rangeValues=JSON.stringify(s.rangeValues)),s.dynamicDataSource&&(i.layer=JSON.stringify({source:s.dynamicDataSource}),delete s.dynamicDataSource),s.timeExtent){const e=s.timeExtent,{start:t,end:r}=e
null==t&&null==r||(i.time=t===r?t:`${null==t?"null":t},${null==r?"null":r}`),delete s.timeExtent}return e.defaultSpatialReferenceEnabled&&(0,n.pC)(u)&&(0,n.pC)(o)&&u.equals(o)&&(i.defaultSR=i.inSR,delete i.inSR,delete i.outSR),i}async function h(e,t,r,s){const i=(0,n.pC)(t.timeExtent)&&t.timeExtent.isEmpty?{data:{features:[]}}:await k(e,t,"json",s)
return(0,l.p)(t,r,i.data),i}async function g(e,t,r,s){if((0,n.pC)(t.timeExtent)&&t.timeExtent.isEmpty)return Promise.resolve({data:r.createFeatureResult()})
const i=await y(e,t,s),a=i
return a.data=(0,c.C)(i.data,r),a}function y(e,t,r){return k(e,t,"pbf",r)}function m(e,t,r){return(0,n.pC)(t.timeExtent)&&t.timeExtent.isEmpty?Promise.resolve({data:{objectIds:[]}}):k(e,t,"json",r,{returnIdsOnly:!0})}function _(e,t,r){return(0,n.pC)(t.timeExtent)&&t.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):k(e,t,"json",r,{returnIdsOnly:!0,returnCountOnly:!0})}function b(e,t,r){return(0,n.pC)(t.timeExtent)&&t.timeExtent.isEmpty?Promise.resolve({data:{count:0,extent:null}}):k(e,t,"json",r,{returnExtentOnly:!0,returnCountOnly:!0}).then((e=>{const t=e.data
if(t.hasOwnProperty("extent"))return e
if(t.features)throw new Error(p)
if(t.hasOwnProperty("count"))throw new Error(p)
return e}))}function k(e,t,r){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{}
const l="string"==typeof e?(0,i.mN)(e):e,p=t.geometry?[t.geometry]:[]
return a.responseType="pbf"===r?"array-buffer":"json",(0,o.aX)(p,null,a).then((e=>{const o=e&&e[0];(0,n.pC)(o)&&((t=t.clone()).geometry=o)
const p=(0,u.A)({...l.query,f:r,...c,...d(t,c)})
return(0,s.default)((0,i.v_)(l.path,"query"),{...a,query:{...p,...a.query}})}))}}}])
