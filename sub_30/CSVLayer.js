//>>built
define("esri/layers/CSVLayer","dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../arcgis/csv ./FeatureLayer ../geometry/Extent ../tasks/FeatureSet".split(" "),function(h,e,f,p,k,g,l,m,n){e=e(l,{declaredClass:"esri.layers.CSVLayer",_preventInit:!0,_fieldTypeMap:{Date:"esriFieldTypeDate",Number:"esriFieldTypeDouble",String:"esriFieldTypeString"},constructor:function(b,a){this.url=b;a=f.mixin({},a);this.columnDelimiter=a.columnDelimiter;this.latitudeFieldName=a.latitudeFieldName;
this.longitudeFieldName=a.longitudeFieldName;var d=a.layerDefinition;d||(d={fields:a.fields||[],geometryType:"esriGeometryPoint",copyrightText:a.copyright},a.fields&&h.forEach(a.fields,function(c){c.type=this._fieldTypeMap[c.type||"String"];c.alias||(c.alias=c.name)},this));this._buildCsvFcParam={url:this.url,columnDelimiter:this.columnDelimiter,layerDefinition:d,outFields:a.outFields};this.latitudeFieldName&&this.longitudeFieldName&&(this._buildCsvFcParam.locationInfo={locationType:"coordinates",
latitudeFieldName:this.latitudeFieldName,longitudeFieldName:this.longitudeFieldName});this._projectFeatures=f.hitch(this,this._projectFeatures);this._addFeatures=f.hitch(this,this._addFeatures);this._initCSVLayer(a)},refresh:function(){this._fireUpdateStart();this.applyEdits(null,null,this.graphics);this._loadFeatures()},_isWebGLCompatible:function(){return!1},_setMap:function(b){var a=this.inherited(arguments);this._fireUpdateStart();this._projectFeatures(this._csvFC).then(this._addFeatures).otherwise(this._errorHandler);
this._csvFC=null;return a},_initCSVLayer:function(b){var a=this;g.buildCSVFeatureCollection(this._buildCsvFcParam).then(function(d){!a._buildCsvFcParam.locationInfo||a.latitudeFieldName&&a.longitudeFieldName||(a.latitudeFieldName=a._buildCsvFcParam.locationInfo.latitudeFieldName,a.longitudeFieldName=a._buildCsvFcParam.locationInfo.longitudeFieldName);a._csvFC=d;var c=d.layerDefinition;c.extent=a._getFCExtent(d);b.outFields||(b.outFields=["*"]);b.timeInfo&&(c.timeInfo=b.timeInfo);a._initFeatureLayer({layerDefinition:c},
b)}).otherwise(this._errorHandler)},_loadFeatures:function(){g.buildCSVFeatureCollection(this._buildCsvFcParam).then(this._projectFeatures).then(this._addFeatures).otherwise(this._errorHandler)},_projectFeatures:function(b){return g.projectFeatureCollection(b,this._map.spatialReference)},_addFeatures:function(b){b=new n(b.featureSet);this.applyEdits(b.features,null,null);this._fireUpdateEnd()},_getFCExtent:function(b){if(b&&b.featureSet&&b.featureSet.features){b=b.featureSet.features;var a=b.length;
if(1<a){var d=b[0].geometry;var c=new m(d.x,d.y,d.x,d.y);for(--a;0<a;a--)d=b[a].geometry,c.xmin=Math.min(c.xmin,d.x),c.ymin=Math.min(c.ymin,d.y),c.xmax=Math.max(c.xmax,d.x),c.ymax=Math.max(c.ymax,d.y);0>=c.getWidth()&&0>=c.getHeight()&&(c=null)}}return c}});f.setObject("layers.CSVLayer",e,k);return e});