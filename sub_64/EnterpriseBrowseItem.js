//>>built
define("esri/dijit/analysis/mixins/browselayers/configs/EnterpriseBrowseItem","dojo/_base/lang dojo/has dojox/lang/functional/object ../../../../../kernel ./Common ../../../AnalysisRegistry ../../../ItemTypes dojo/i18n!../../../nls/BrowseLayerMixin".split(" "),function(l,k,m,n,g,e,c,f){k={getConfig:function(a){var b=a.disableLAAL?{customSections:[]}:{customSections:g.getLAALCustomSection(a)};!a.disableBoundary&&a.portal.EsriBoundaryLayersGroupQuery&&b.customSections.push(g.getBoundaryLayersSection(a));
-1<a.allowedItemTypes.indexOf(c.RFT)&&a.showRFTSystemSection&&b.customSections.push(g.getSystemRFTSection(a));b=l.mixin({dialogTitle:a.title||f.customAnalysisLayerTitle,allowedItemTypes:a.allowedItemTypes,availableItemTypeFilters:a.availableItemTypeFilters,baseSections:["myContent","myFavorites","myGroups","myOrganization"],resultsPerQuery:g.getNumberOfPages(),layoutMode:"fullscreen",staticFilters:g.getStaticFilters(a.customQueryTags),mainActionTitle:f.mainActionTitle,customActions:[g.getAddtoMapActions(a.onActionSubLayer)],
showSubResources:this._getSubResourcesForPortal(a),disabledSubResources:a.disabledSubResources,addQueryParameters:a.addQueryParameters,enableMapAreaFilter:a.enableMapAreaFilter},b);a.showRFTEditCustomAction&&b.customActions.push(g.getEditRFTActions(a.onEditRFT));return b},_getSubResourcesForPortal:function(a){var b={};-1<a.allowedItemTypes.indexOf(c.FS)&&(b[c.FS]={allowed:function(d){return this.allowedItemsForTypes(d,a.customQueryTags)}.bind(this),onSelect:a.onSelectSubLayer,customActions:[g.getAddtoMapActions(a.onActionSubLayer)],
filters:this._getFilterforSubLayer(!1,a.customQueryTags)});-1<a.allowedItemTypes.indexOf(c.MS)&&(b[c.MS]={allowed:function(d){return this.allowedItemsForTypes(d,a.customQueryTags)}.bind(this),onSelect:a.onSelectSubLayer,customActions:[g.getAddtoMapActions(a.onActionSubLayer)],filters:this._getFilterforSubLayer(!1,a.customQueryTags)});-1<a.allowedItemTypes.indexOf(c.BIGDATA)&&(b[c.BIGDATA]={allowed:function(d){return this.allowedItemsForTypes(d,a.customQueryTags)}.bind(this),onSelect:a.onSelectSubLayer,
filters:this._getFilterforSubLayer(!0,a.customQueryTags)});-1<a.allowedItemTypes.indexOf(c.GPSERVICE)&&(b[c.GPSERVICE]={allowed:function(){return!0},onSelect:a.onSelectGPTool,filters:[]});return b},_getFilterforSubLayer:function(a,b){var d=[];d.push(this.getGeometryFilter(b.geometryTypes));b.layerTypes&&(a?d.push(this.getFilterForLayerTypesForBigData(b.layerTypes)):d.push(this.getFilterForLayerTypesForFS(b.layerTypes)));b.timeTypes&&d.push(this.getTimeFilter(b.timeTypes));return d},getGeometryFilter:function(a){var b=
[];(a&&0<a.length?a:m.values(e.GeometryTypes)).forEach(function(d){switch(d){case e.GeometryTypes.Point:b.push({displayName:f.pointFilterName,allowed:this.filters.geometryTypes[e.GeometryTypes.Point],value:"point"});break;case e.GeometryTypes.Polygon:b.push({displayName:f.polygonFilterName,allowed:this.filters.geometryTypes[e.GeometryTypes.Polygon],value:"polygon"});break;case e.GeometryTypes.Line:b.push({displayName:f.lineFilterName,allowed:this.filters.geometryTypes[e.GeometryTypes.Line],value:"line"});
break;case e.GeometryTypes.MultiPoint:b.push({displayName:f.multiPointFilterName,allowed:this.filters.geometryTypes[e.GeometryTypes.MultiPoint],value:"multipoint"})}},this);return{allowed:function(){return!0},displayName:f.geometryFilterName,value:"geometry",children:b}},getFilterForLayerTypesForFS:function(a){var b=[];(a?0<a.length?a:[c.FLAYER,c.TABLE]:[]).forEach(function(d){switch(d){case c.FLAYER:b.push({displayName:f.featureLayerName,allowed:this.filters.layerTypes[c.FLAYER],value:"featurelayer"});
break;case c.TABLE:b.push({displayName:f.tableLayerName,allowed:this.filters.layerTypes[c.TABLE],value:"ftable"})}},this);return{allowed:function(){return!0},displayName:f.itemTypeFilterName,value:"itemtype",children:b}},getFilterForLayerTypesForBigData:function(a){var b=[];(a?0<a.length?a:[c.BDATAFEATURE,c.BTABLE]:[]).forEach(function(d){switch(d){case c.BDATAFEATURE:b.push({displayName:f.featureLayerName,allowed:this.filters.layerTypes[c.BDATAFEATURE],value:"bfeaturelayer"});break;case c.BTABLE:b.push({displayName:f.tableLayerName,
allowed:this.filters.layerTypes[c.BTABLE],value:"btable"})}},this);return{allowed:function(){return!0},displayName:f.featureLayerName,value:"itemtype",children:b}},getTimeFilter:function(a){var b=[];(a?0<a.length?a:[e.TimeTypes.Instant,e.TimeTypes.Interval]:[]).forEach(function(d){switch(d){case e.TimeTypes.Instant:b.push({displayName:f.instantFilterName,allowed:this.filters.timeTypes[e.TimeTypes.Instant].bind(this),value:"instant"});break;case e.TimeTypes.Interval:b.push({displayName:f.intervalFilterName,
allowed:this.filters.timeTypes[e.TimeTypes.Interval].bind(this),value:"interval"})}},this);return{allowed:function(){return!0},displayName:f.timeFilterName,value:"time",children:b}},allowedItemsForTypes:function(a,b){var d=!0,h=b.layerTypes||[c.FLAYER,c.BDATAFEATURE];b.geometryTypes&&a.geometryType&&(b.geometryTypes=0<b.geometryTypes.length?b.geometryTypes:m.values(e.GeometryTypes),d=d&&-1!==b.geometryTypes.indexOf(a.geometryType));h&&a.type&&(h=0<h.length?h:[c.FLAYER,c.BDATAFEATURE,c.BTABLE,c.TABLE],
d=d&&-1!==h.indexOf(a.type));b.timeTypes&&(b.timeTypes=0<b.timeTypes.length?b.timeTypes:[e.TimeTypes.Instant,e.TimeTypes.Interval],d=d&&-1!==b.timeTypes.indexOf(this.getTimeType(a)));b.customCheck&&b.customCheck.customCheckHandler&&(d=d&&b.customCheck.customCheckHandler(a));return d&&a},getTimeType:function(a){return a?this.isDefined(a.timeInfo)&&this.isDefined(a.timeInfo.startTimeField)&&!this.isDefined(a.timeInfo.endTimeField)?e.TimeTypes.Instant:this.isDefined(a.timeInfo)&&this.isDefined(a.timeInfo.startTimeField)&&
this.isDefined(a.timeInfo.endTimeField)?e.TimeTypes.Interval:this.isDefined(a.time)&&this.isDefined(a.time.timeType)?a.time.timeType:!1:!1},isDefined:function(a){return void 0!==a&&null!==a},filters:{layerTypes:{"Feature Layer":function(a){return a.type===c.FLAYER},Table:function(a){return a.type===c.TABLE},featureClass:function(a){return a.type===c.BDATAFEATURE},table:function(a){return a.type===c.BTABLE}},geometryTypes:{esriGeometryMultipoint:function(a){return a.geometryType===e.GeometryTypes.MultiPoint},
esriGeometryPolyline:function(a){return a.geometryType===e.GeometryTypes.Line},esriGeometryPolygon:function(a){return a.geometryType===e.GeometryTypes.Polygon},esriGeometryPoint:function(a){return a.geometryType===e.GeometryTypes.Point}},timeTypes:{instant:function(a){return this.getTimeType(a)===e.TimeTypes.Instant},interval:function(a){return this.getTimeType(a)===e.TimeTypes.Interval}}}};l.setObject("dijit.analysis.mixins.browselayers.configs.EnterpriseBrowseItem",k,n);return k});