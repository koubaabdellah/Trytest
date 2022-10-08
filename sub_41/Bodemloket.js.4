/**
 * OLApp is a bunch of utils in Js that every OpenLayers app needs.
 *
 * @see openlayers.org mapOptions and layerOptions must be set in the App that
 *      uses OLApp, The OpenLayers.Map is defined outside of OLApp, to express
 *      where the map object is (OLApp.map)
 */
var OLApp = {};
var LayerManager = {};

(function () {

	function el(tag, s, attribs) {
		return "<" + tag + HtmlBuilder.attr(attribs) + ">" + s + "</" + tag + ">";
	}

	window.OLApp = {

		Constants: {
			OVERLAY: 1,
			BASELAYER: 2,
			ALL_LAYERS: 3,
			LAYER_PROP_LAYERS: 0,
			LAYER_PROP_INFOID: 1
			// the LayerInfo object has a separate id field, this is added to the
			// OpenLayers.Layer object
		},
		wgs84: new OpenLayers.Projection("EPSG:4326"),
		google: new OpenLayers.Projection("EPSG:3857"),
		googlemercator: new OpenLayers.Projection("EPSG:3857"),
		rd: new OpenLayers.Projection("EPSG:28992"),
		appname: null,
		tiledNLBounds: new OpenLayers.Bounds(0, 300000, 300000, 625000),
		tiledOSMGeozetBounds: new OpenLayers.Bounds(-285401.92, 22598.08,
			595401.92, 903401.92),
		NLResolutions: new Array(3276, 1092, 364, 122, 40.5, 13.5, 4.5, 1.5, 0.5,
			0.1666666667),
		themes: [] /*
		 * hashlist of OLApp.ThemeObject (grouping a list of
		 * OLApp.LayerInfo)
		 */
		,
		layers: [] /*- hash list of OpenLayers Layers identify by id -*/
		,
		layerManagers: [],
		map: null,
		popup: null,
		selectedFeature: null,
		selectedLayerId: null,
		point: null,
		drag: null,
		vectors: null,
		setImagePath: function (path) {
			OpenLayers.ImgPath = path;
		},
		pack: function (lon, lat, zoomlevel, source, destination) {
			//console.log('pack');
			var extent = OLApp.map.restrictedExtent;
			if (!extent)
				extent = OLApp.map.maxExtent;

			if (lon && lat && zoomlevel && source && destination)
				OLApp.map.setCenter(new OpenLayers.LonLat(lon, lat).transform(source,
					destination), zoomlevel);
			else if (lon && lat && zoomlevel)
				OLApp.map.setCenter(new OpenLayers.LonLat(lon, lat), zoomlevel);
			else if (lon && lat)
				OLApp.map.setCenter(new OpenLayers.LonLat(lon, lat));
			else
				OLApp.map.zoomToMaxExtent();
		},
		getCenter: function () {
			return OLApp.map.center || OLApp.map.restrictedExtent.getCenterLonLat();
		},
		zoomTo: function (bounds) {
			//console.log('zoom to ', bounds);
			if (bounds) {
				OLApp.map.zoomToExtent(bounds, true);
			}
		},
		zoomToBox: function (bb) { /*
		 * bb a list of string xmi,ymin,xmax,ymax
		 * (left,bottom,right,top)
		 */
			var bounds = new OpenLayers.Bounds(parseFloat(bb[0]), parseFloat(bb[1]),
				parseFloat(bb[2]), parseFloat(bb[3]));
			OLApp.zoomTo(bounds);
		},
		inside: function (lon, lat, polygon) {
			var point = new OpenLayers.Geometry.Point($("#lon").val(), $("#lat")
				.val()).transform(OLApp.google, OLApp.rd);
			if (polygon.containsPoint(point) != 1) {
				return false;
			}
			return true;
		},
		addAllThemes: function (themeOptions) {
			for (var i = 0; i < themeOptions.length; i++)
				OLApp.addTheme(themeOptions[i]);
		},
		addTheme: function (info) {
			OLApp.themes[info.id] = new OLApp.ThemeObject(info);
			for (var lay in info.layers)
				OLApp.themes[info.id].layers[lay] = new OLApp.LayerInfo(
					info.layers[lay]);
		},
		addAllLayers: function (layerOptions) {
			for (var i = 0; i < layerOptions.length; i++)
				OLApp.addLayer(new OLApp.LayerInfo(layerOptions[i]));
		},
		mergeLayerParams: function (layerName, newParams) {
			var layers = OLApp.map.getLayersByName(layerName);
			if (layers.length > 0) {
				layers[0].mergeNewParams(newParams);
			}
		},
		addLayer: function (info) { /*- currently adds WMS layers -*/
			var layerParams = {
				/*- parameters that appear in the request -*/
				layers: info.layers,
				query_layers: info.layers,
				styles: info.styles,
				sld: info.sld,
				format: (Util.isIE6() ? "image/gif" : info.format),
				transparent: info.transparent,
				exceptions: 'application/vnd.ogc.se_blank'
			};
			var layerOptions = {
				/*- other parameters -*/
				// projection: info.projection;
				// ,reproject:true;
				// ,units:"m";
				// ,maxExtent: info.maxextent;
				// ,resolutions: info.resolutions;
				visibility: info.visible,
				numZoomLevels: info.numzoomlevels,
				singleTile: info.single,
				ratio: info.ratio,
				gutter: info.gutter,
				buffer: info.buffer,
				isBaseLayer: info.baselayer,
				opacity: info.opacity,
				displayInLayerSwitcher: info.displayinlayerswitcher,
				category: info.category,
				infoid: info.id
			};
			if (info.minZoom) {
				layerOptions.minZoom = info.minZoom;
			}
			if (info.maxResolution) {
				layerOptions.maxResolution = info.maxResolution;
			}
			var layer = new OpenLayers.Layer.WMS(info.label, info.server,
				layerParams, layerOptions);
			OLApp.layers[info.id] = layer;
			OLApp.map.addLayer(layer);
			OLApp.layers[info.id].baseoverlay = info.baseoverlay;
		},
		removeVectors: function () {
			if (OLApp.drag) {
				OLApp.map.removeControl(OLApp.drag);
				OLApp.drag.destroy();
				OLApp.drag = null;
			}
			if (OLApp.vectors) {
				OLApp.map.removeLayer(OLApp.vectors);
				OLApp.vectors.destroy();
				OLApp.vectors = null;
			}
		},
		removeMarkerLayer: function () {
			OLApp.removeVectors();
		},
		addMarkerLayer: function () {
			OLApp.removeVectors();
			var layer_style = OpenLayers.Util.extend({},
				OpenLayers.Feature.Vector.style['default']);
			layer_style.fillOpacity = 0.2;
			layer_style.graphicOpacity = 1;
			layer_style.strokeWidth = 2;
			layer_style.strokeColor = "red";
			OLApp.vectors = new OpenLayers.Layer.Vector("Markers", {
				style: layer_style,
				displayInLayerSwitcher: false
			});
			OLApp.map.addLayer(OLApp.vectors);
		},
		addMovingMarkerLayer: function (options) {

			OLApp.removeVectors();
			OLApp.vectors = new OpenLayers.Layer.Vector("Toevoegen", {
				displayInLayerSwitcher: false,
				styleMap: new OpenLayers.StyleMap({
					'default': new OpenLayers.Style({
						externalGraphic: "resource/img/legenda/locatie.gif",
						graphicHeight: 25,
						graphicWidth: 21,
						graphicYOffset: -12.5,
						graphicXOffset: -10.5

					})
				})
			});
			var lonlat = OLApp.map.getLonLatFromViewPortPx(new OpenLayers.Pixel(460,
				240));

			if (options.lonlat)
				lonlat = options.lonlat

			var p = new OpenLayers.Feature.Vector(OpenLayers.Geometry
				.fromWKT("POINT(" + lonlat.lon + " " + lonlat.lat + ")"));

			OLApp.vectors.addFeatures(p);
			OLApp.map.addLayer(OLApp.vectors);

			if (options.save)
				options.save(lonlat);
			if (options.drag) {
				OLApp.drag = new OpenLayers.Control.DragFeature(OLApp.vectors);
				OLApp.map.addControl(OLApp.drag);
				OLApp.drag.activate();
			}
		},
		position: function () {
			return Openlayers.Utils.getMousePosition();
		},
		getCenter: function (geometry) {
			var p = geometry.getCentroid();
			return new OpenLayers.LonLat(p.x, p.y)
		},
		addAllWFSLayers: function (featureLayerOptions) {
			for (var i = 0; i < featureLayerOptions.length; i++)
				OLApp.addWFS(new OLApp.LayerInfo(featureLayerOptions[i]))
		},
		addWFS: function (info) {
			var context = {
				getMarker: function (feature) {
					var url = info["image"]
					return url;
				},

				getVisibility: function (feature) {
					var vis = "";
					if (!feature.attributes["periodstart"])
						return vis;
					if ($(".select00Chkbox").attr("checked"))
						return vis;

					vis = "none";
					var chb = $(".selectChkbox").each(function () {
						if ($(this).attr("checked")) {
							var fmonth = feature.attributes["periodstart"].split("-")[1];
							if (fmonth && fmonth == $(this).val()) {
								vis = ""
								return "";
							}
						}

					});
					return vis;
				}
			}// context
			var template = {
				display: "${getVisibility}",
				externalGraphic: "${getMarker}",
				graphicHeight: 35,
				graphicWidth: 27,
				graphicYOffset: -35,
				graphicXOffset: -13.5
			}
			var wfs_style = new OpenLayers.Style(template, {
				context: context
			})
			var wfs_selectstyle = {};

			OLApp.layers[info.id] = new OpenLayers.Layer.Vector(info["label"], {
				strategies: [new OpenLayers.Strategy.Fixed(),
					new OpenLayers.Strategy.Refresh()],
				styleMap: new OpenLayers.StyleMap({
					'default': wfs_style,
					'select': wfs_selectstyle
				}),
				extractAttributes: true,
				protocol: new OpenLayers.Protocol.HTTP({
					url: info.server,
					params: {
						format: "WFS",
						service: "WFS",
						request: "GetFeature",
						srs: "EPSG:3857",
						VERSION: "1.0.0",
						typename: info.layers,
						filter: info.filter
					},
					format: new OpenLayers.Format.GML()
				}),
				displayInLayerSwitcher: info.displayinlayerswitcher,
				selectable: info.selectable,
				visibility: info.visible
			});

			OLApp.map.addLayer(OLApp.layers[info.id]);
			OLApp.layers[info.id].loaded = false
			OLApp.layers[info.id].events.register('loadend', OLApp.layers[info.id],
				function () {
					OLApp.layers[info.id].loaded = true
					OLApp.layers[info.id].baseoverlay = info.baseoverlay
				})
		},
		addWFSLayer: function (info) {
			var context = {
				getMarker: function (feature) {
					var url = info.image
					return url;
				},
				getVisibility: function (feature) {
					var vis = "";
					if (!feature.attributes["periodstart"])
						return vis;
					if ($(".select00Chkbox").attr("checked"))
						return vis;

					vis = "none";
					var chb = $(".selectChkbox").each(function () {
						if ($(this).attr("checked")) {
							var fmonth = feature.attributes["periodstart"].split("-")[1];
							if (fmonth && fmonth == $(this).val()) {
								vis = ""
								return "";
							}
						}

					});
					return vis;
				}
			}// context
			var template = {
				display: "${getVisibility}",
				externalGraphic: "${getMarker}",
				graphicHeight: 35,
				graphicWidth: 27,
				graphicXOffset: -17.5,
				graphicYOffset: -13.5

			}
			var wfs_style = new OpenLayers.Style(template, {
				context: context
			})
			var wfs_selectstyle = {};// new OpenLayers.Style(selecttemplate)

			OLApp.layers[info.id] = new OpenLayers.Layer.WFS(info.label, info.server,
				{
					format: OpenLayers.Format.WFS,
					typeName: info.layers,
					srsCode: info.srs,
					filter: info.filter
				}, {
					styleMap: new OpenLayers.StyleMap({
						'default': wfs_style,
						'select': wfs_selectstyle
					}),
					strategies: [new OpenLayers.Strategy.Fixed()],
					selectable: info.selectable,
					visibility: info.visible,
					displayInLayerSwitcher: info.displayinlayerswitcher,
					extractAttributes: true,
					infoid: info.id
				}
			);

			set_event_visible({
				reset: true
			})
			OLApp.map.addLayer(OLApp.layers[info.id]);
		},
		addAllGeoRSSLayers: function (featureLayerOptions) {
			for (var i = 0; i < featureLayerOptions.length; i++)
				OLApp.addGeoRSSLayer(new OLApp.LayerInfo(featureLayerOptions[i]))
		},
		addGeoRSSLayer: function (info) {
			var context = {
				getMarker: function (feature) {
					var url = Geodan.Settings.imagesPath + "/marker.png";
					return url;
				}
			};

			var template = {
				externalGraphic: "${getMarker}",
				graphicHeight: 35,
				graphicWidth: 27,
				graphicXOffset: -17.5,
				graphicYOffset: -13.5,
				cursor: "pointer"
			}
			/*-needed?:it's possible-*/

			var selecttemplate = {
				// fillOpacity: 0.50
			}

			var rssstyle = new OpenLayers.Style(template, {
				context: context
			})
			var rssselectstyle = new OpenLayers.Style(selecttemplate)

			OLApp.layers[info.id] = new OpenLayers.Layer.GML(info.label, info.server,
				{
					format: OpenLayers.Format.GeoRSS,
					styleMap: new OpenLayers.StyleMap({
						'default': rssstyle,
						'select': rssselectstyle
					}),
					projection: new OpenLayers.Projection("EPSG:4326"),
					selectable: info.selectable,
					displayInLayerSwitcher: info.displayinlayerswitcher
				});

			OLApp.map.addLayer(OLApp.layers[info.id]);
		},
		addPopupControl: function () {
			/*- find all selectable layers -*/
			var featureLayers = OLApp.getFeatureLayers()
			if (featureLayers.length > 0) {
				OLApp.popupControl = new OpenLayers.Control.SelectFeature(
					featureLayers, {
						clickout: true,
						onSelect: function (feature) {

							OLApp.selectedFeature = null;
							endPopup();
							OLApp.selectedFeature = feature;
							if (OLApp.popup) {
								OLApp.map.removePopup(OLApp.popup);
							}
							if (OLApp.selectedFeature) {
								OLApp.selectedLayerId = OLApp.selectedFeature.layer.id;
								implementOnSelect();
								/*- use OLApp.selectedFeature-*/
							}
						}
					});
				OLApp.map.addControl(OLApp.popupControl);
				OLApp.popupControl.activate();
			}
		},
		onPopupClose: function () {
			OLApp.map.removePopup(OLApp.popup);
			if (OLApp.selectedFeature) {
				OLApp.popupControl.unselect(OLApp.selectedFeature);
				OLApp.selectedFeature = null;
			}

		},
		getFeatureLayers: function () {
			var tmp = new Array();
			for (var idx in OLApp.layers)
				if (OLApp.layers[idx].selectable)
					tmp[tmp.length] = OLApp.layers[idx];
			return tmp;
		},
		reloadFeatureLayers: function (needed) {
			for (var idx in OLApp.layers)
				if (needed && OLApp.layers[idx].selectable)
					OLApp.reloadFeatureLayer(OLApp.layers[idx].id);
		},
		reloadFeatureLayer: function (id) {
			for (var idx in OLApp.layers) {
				if (OLApp.layers[idx].id == id) {
					OLApp.layers[idx].refresh({
						force: true
					})
					return;
				}
			}
		},
		addControls: function (controls) {
			for (var i = 0; i < controls.length; i++)
				OLApp.map.addControl(controls[i])

		},
		setPanZoomControlPosition: function (where) {
			var pzid = OLApp.map.getControlsByClass("OpenLayers.Control.PanZoom")[0].id;
			var pz = document.getElementById(pzid);
			if (pz)
				switch (where) {
					case 'tl':
						// default OL values
						pz.style.top = '4px';
						pz.style.left = '22px';
						break;
					case 'tr':
						pz.style.left = '';
						pz.style.right = '54px';
						break;
					case 'bl':
						pz.style.top = '';
						pz.style.bottom = '154px';
						break;
					case 'br':
						pz.style.top = '';
						pz.style.bottom = '54px';
						pz.style.left = '';
						pz.style.right = '14px';
						break;
				}
		},
		getLayerUrl: function (id) {
			if (OLApp.map.getExtent() == null)
				return null;
			return OLApp.layers[id].getURL(OLApp.map.getExtent());
		},
		getXY: function () {

		},
		hideLayer: function (layernumber) {

			if (OLApp.map.layers[layernumber]) {
				OLApp.map.layers[layernumber].setVisibility(false);
			}

		},
		showLayer: function (layernumber) {
			OLApp.map.layers[layernumber].setVisibility(true);
		},
		addLayerChecked: function (layerInfo) {
			setVisibilityAllLayers(false);
			for (info in layerInfo) {
				if (isLayerAvailable(layerInfo[info])) {
					showLayer(getLayerIndex(layerInfo[info]));
				} else {
					addLayer(layerInfo[info]);
				}
			}
		},
		dumpLayers: function () {
			for (layer in OLApp.map.layers)
				Util.log(OLApp.map.layers[layer].id + " "
					+ OLApp.map.layers[layer].name);
		},
		removeLayer: function (info_id) {
			OLApp.map.removeLayer(OLApp.layers[info_id]);
		},
		removeAllLayers: function () {
			OLApp.removeVectors();
			var allay = OLApp.map.layers;
			for (var layer = allay.length - 1; layer >= 0; layer--) {
				if (!(allay[layer].isBaseLayer || allay[layer].baseoverlay))
					OLApp.map.removeLayer(allay[layer]);
			}
		},
		removeAllLayersFromCategory: function (category) {
			OLApp.removeVectors();
			var allay = OLApp.map.layers;
			for (var layer = allay.length - 1; layer >= 0; layer--)
				if (allay[layer].category == category)
					OLApp.map.removeLayer(allay[layer]);
		},
		removeAllLayersExceptCategory: function (category) {
			OLApp.removeVectors();
			var allay = OLApp.map.layers;
			for (var layer = allay.length - 1; layer >= 0; layer--)
				if (!(allay[layer].isBaseLayer || allay[layer].baseoverlay || allay[layer].category != category))
					OLApp.map.removeLayer(allay[layer]);
		},
		getVisibleLayers: function (WHAT, PROP) {
			/* first baselayers then overlays */
			var baselayers = new Util.StringBuilder();
			var overlayers = new Util.StringBuilder();
			var allay = OLApp.map.layers;
			for (var i = 0; i < allay.length; i++) {

				if (!allay[i].visibility)
					continue;
				if (allay[i].infoid == "")
					continue;
				if (allay[i].params && allay[i].params["LAYERS"]
					&& allay[i].params["LAYERS"] == "")
					continue;
				if (allay[i].name == "Geen")
					continue;
				if (allay[i].CLASS_NAME == "OpenLayers.Layer.Vector")
					continue;

				if (PROP == OLApp.Constants.LAYER_PROP_LAYERS) {
					if (allay[i].isBaseLayer || allay[i].baseoverlay) {
						baselayers.append(allay[i].params["LAYERS"]);
					} else {
						overlayers.append(allay[i].params["LAYERS"]);
					}
				} else if (PROP == OLApp.Constants.LAYER_PROP_INFOID) {
					if (allay[i].isBaseLayer || allay[i].baseoverlay) {
						baselayers.append(allay[i].infoid);
					} else {
						overlayers.append(allay[i].infoid);
					}
				}
			}
			if (WHAT == OLApp.Constants.OVERLAY)
				return overlayers.join(",");
			if (WHAT == OLApp.Constants.BASELAYER)
				return baselayers.join(",");

			if (WHAT == OLApp.Constants.ALL_LAYERS) {
				for (var a in overlayers.strings) {

					baselayers.append(overlayers.get(a));
				}
				return baselayers.join(",");
			}
		},
		setVisibilityAllLayers: function (visible, category) {
			var allay = OLApp.map.layers;

			for (var i = 0; i < allay.length; i++) {
				if (!(allay[i].isBaseLayer || allay[i].name == "Markers" || allay[i].baseoverlay)) {

					if (category != null)
						if (category != allay[i].category)
							continue;
					if (visible)
						OLApp.showLayer(i);
					else
						OLApp.hideLayer(i);
				}
			}
		},
		toggleInfo: function (inputcontrol) {
			var rid = inputcontrol.id.replace("radio", "")
			if (typeof OLApp.layers[rid] != "undefined") {
				;
			} else {
				alert("toggle_overlay: layer['" + inputcontrol.id + "'] is undefined");
			}
		},
		toggleOverlay: function (inputcontrol) {
			if (typeof OLApp.layers[inputcontrol.id] != "undefined") {
				OLApp.layers[inputcontrol.id].setVisibility(inputcontrol.checked);

			} else {
				alert("toggle_overlay: layer['" + inputcontrol.id + "'] is undefined");
			}
		},
		toggleSingleOverlay: function (inputcontrol) { /*- inputcontrol = named radio : name = layerinfoprop category-*/
			OLApp.setVisibilityAllLayers(false, inputcontrol.name)
			if (typeof OLApp.layers[inputcontrol.id] != "undefined") {
				OLApp.layers[inputcontrol.id].setVisibility(inputcontrol.checked);
				// Util.log(OLApp.layers[inputcontrol.id].getFullRequestString(OLApp.map.getExtent()))
			} else {
				alert("toggleSingleOverlay: layer['" + inputcontrol.id + "'] is undefined");
			}
		},
		setQueryParam: function (id, index, qp, refresh) {
			if (typeof OLApp.layers[id] != "undefined") {
				for (var qi in qp) {
					if (qp[qi].id == id) {
						OLApp.layers[id].params[qp[qi].key] = qp[qi].options[index].value
						if (refresh) {
							OLApp.layers[id].setVisibility(false);
							OLApp.layers[id].setVisibility(true);
							// Util.log(OLApp.layers[id].getFullRequestString(OLApp.map.getExtent()))
						}
					}
				}
			} else {
				alert("setQueryParam: layer['" + id + "'] is undefined");
			}
		},
		setBaselayer: function (index) {
			OLApp.map.setBaseLayer(OLApp.layers[index]);
		},
		getLayerIndex: function (info) {
			var id = (info.id) ? info.id : info;
			return OLApp.map.getLayerIndex(OLApp.layers[id]);
		},
		isLayerAvailable: function (info) {
			var id = (info.id) ? info.id : info;
			return OLApp.map.getLayerIndex(OLApp.layers[id]) > -1;
		},
		getThemeIds: function () {
			var themeids = [];
			var i = 0;
			for (var th in OLApp.themes) {
				themeids[i++] = OLApp.themes[th].id;
			}
			return themeids;
		},
		/*- QueryParam can be set on a layer request by setting params[key]=value for its id -*/
		QueryParam: OpenLayers.Class({
			id: null,
			key: null,
			options: {},
			initialize: function (qp) {
				OpenLayers.Util.extend(this, qp);
			}
		}),
		LayerInfo: OpenLayers.Class({
			id: null,
			baselayer: false,
			opacity: 1.0,
			baseoverlay: false // the layer may not be a isBaseLayer but treated like
							   // one
			,
			buffer: 0,
			category: null,
			order: 0,
			dbname: null,
			displayinlayerswitcher: true,
			enabled: true,
			filter: null,
			format: "image/png",
			label: null,
			layers: null /*
			 * the WMS layers parameter: a commaseperated list of
			 * layernames
			 */
			,
			legendrequest: "getLegendGraphic",
			maxextent: OLApp.tiledNLBounds,
			metadataurl: null
			// ,ratio:1.5
			// ,resolutions:OLApp.NLResolutions
			,
			selectable: false,
			server: null,
			single: false,
			sld: null,
			srs: OLApp.rd,
			styles: null,
			transparent: true,
			units: "m",
			visible: true,
			clone: function () {
				return new OLApp.LayerInfo(this)
			},
			initialize: function (options) {
				OpenLayers.Util.extend(this, options);
			}
		}),
		ThemeObject: OpenLayers.Class({
			id: null,
			label: null,
			layers: null /* a list of LayerInfo objects */
			,
			initialize: function (options) {
				OpenLayers.Util.extend(this, options);
			},
			clone: function () {
				return new ThemeObject(this);
			}
		}),
		/**
		 * -LayerManager is created with initial options {label,radio,slider,check}
		 * -fills a content string, -then layerManager.update() is called.
		 *
		 * fill the content string sequentially by adding to the content string
		 *
		 * main item would be added with layerManager.addLayer(LayerInfo)
		 * radio/visibility/slider/legend (be sure to check syntax of legend) you
		 * can add anything with layerManager.add
		 *
		 * initial options can be overriden with addLayer(LayerInfo,options)
		 *
		 * TODO not completely implemented
		 *
		 */
		LayerManager: OpenLayers.Class({
			id: null,
			panel: null,
			layers: null,
			title: "",
			radio: false,
			checkbox: false,
			slider: false,
			legend: false,
			content: null,
			visible: true,
			createPanel: function (id) {
				this.id = id;
				this.panel = jQuery("#" + id);
			},
			setTitle: function (html) {
				this.title = html;
			},
			update: function () {
				this.setPanelLayerVisibility();
				this.panel.html(this.content.join(""))
			},
			clear: function () {
				this.content.clear();
				this.update();
			},

			addPanelToggle: function (onoff, label, likeradio, name) {

				var id = this.id;
				this.panel.wrap("<div class='layerspanel'></div>");
				this.panel.before("<div id='" + id + "toggle'></div>");
				this.visible = onoff;
				var opts = {
					type: likeradio ? "radio" : "checkbox",
					id: id + "togglecontrol"
				};
				if (likeradio) {
					opts.name = name;
				}
				if (this.visible) {
					opts.checked = true;
				}
				var inp = HtmlBuilder.input(opts)
				var labelclass = this.visible ? "layermanager-title"
					: "layermanager-title-folded";
				var label = HtmlBuilder.labelfor(inp, opts.id, label,
					{
						"class": labelclass
					});
				jQuery("#" + this.id + "toggle").html(label);
				var self = this;
				jQuery("#" + this.id + "togglecontrol").on("click",function () {
					self.togglePanel(likeradio, name);
				});
			},
			togglePanel: function (likeradio, name) {
				if (likeradio) {
					this.visible = true;
				} else {
					this.visible = !this.visible;
				}
				this.setPanelLayerVisibility(likeradio, name);
				// TODO integrate
				setLayerVisibility();
			}
			,
			setPanelLayerVisibility: function (likeradio, name) {
				for (var i = 0; i < this.layers.length; i++)
					OLApp.layers[this.layers[i]].setVisibility(this.visible);

				if (this.visible) {
					this.panel.show();
					jQuery("#" + this.id + "toggle > label").removeClass(
						"layermanager-title-folded").addClass("layermanager-title")
				} else {
					this.panel.hide();
					jQuery("#" + this.id + "toggle > label").removeClass(
						"layermanager-title").addClass("layermanager-title-folded")
				}
				if (likeradio) {
					jQuery("input[type=radio][name=" + name + "]").each(function () {
						if (!jQuery(this).attr("checked")) {
							var id = jQuery(this).attr("id");
							var panel = OLApp.layerManagers[id.substr(0, id.length - "togglecontrol".length)];
							panel.panel.hide();
							jQuery("#" + panel.id + "toggle > label").removeClass(
								"layermanager-title").addClass("layermanager-title-folded")

							for (var i = 0; i < panel.layers.length; i++)
								OLApp.layers[panel.layers[i]].setVisibility(this.visible);

						}
					});
				}
			}
			,
			addLayer: function (info, options) {
				var label = HtmlBuilder.span(info.label?info.label:'', {
					"class": "layermanager-item-title"
				});
				var chk = "";
				var rad = "";
				var sli = "";
				var leg = "";

				this.layers[this.layers.length] = info.id
				if (this.radio || (options && options.radio)) {
					var opts = {
						type: "radio",
						id: "info_" + info.id,
						name: "radio_info",
						onclick: "setInfoLayer('" + info.id + "')",
						"class": "infobutton"
					};
					if (options && options.radio_checked) {
						opts.checked = "checked";
					}
					rad = HtmlBuilder
							.span(
							"i",
							{
								style: "color:blue;font-family:Times New Roman;font-size:10pt;font-style:italic"
							})
						+ HtmlBuilder.input(opts);

				}
				if (options && options.checkbox) {

					var opts = {
						type: "checkbox",
						id: info.id,
						onclick: 'OLApp.toggleOverlay(this)'
					};
					if (options ? options.checkbox ? options.checkbox.value : true : false)
						opts.checked = true;
					chk = HtmlBuilder.input(opts);
					chk = HtmlBuilder.nbsp() + chk;
				}
				if (options && options.switchable && options.switchable.items) {
					leg += '<div class="switchable-layers">';
					for (var i = 0; i < options.switchable.items.length; i++) {
						var item = options.switchable.items[i];
						var opts = {
							type: 'radio',
							name: 'radio_switchable',
							id: 'radio_switchable' + i,
							label: item.label,
							onclick: "OLApp.mergeLayerParams('" + info.label + "', {LAYERS: '" + item.layers + "', QUERY_LAYERS: '" + item.layers + "'})"
						};
						if (i === 0) {
							opts.checked = true;
						}
						var html = HtmlBuilder.input(opts);
						leg += '<dd>' + html + '</dd>';
					}
					leg += "</div>";
				}
				var _slider = this.slider;
				if (options)
					if (typeof options.slider != 'undefined')
						_slider = options.slider;

				if (_slider) {
					if (typeof info.opacity === 'undefined')
						info.opacity = 1.0;
					sli = H.dd(H.div({
						"class": "slider",
						style: "padding-top:2px",
						value: (info.opacity) * 100,
						id: "sli|" + info.id
					}));
				}
				if (options && options.legend) {

					var imgsrc = info.server
						+ "&format=image/png&version=1.1.1&service=wms&request=getLegendRequest&layer=" + info.layers;

					if (options.legendGraphic) {
							imgsrc = options.legendGraphic;
					}
					leg += H.dd(H.img(imgsrc));

				}
				this.content.append(HtmlBuilder.div({"class": "lm_" + info.id}, chk + rad + (info.label == "" ? info.label : label) + sli
					+ leg));
			}
			,
			/* add anything */
			add: function (s) {
				this.content.append(s + HtmlBuilder.br());
			}
			,
			getActiveInfoLayers: function () {
				var ids = new Util.StringBuilder();
				this.panel.children("input[type=radio]").each(function () {
					if (jQuery(this).attr("checked"))
						ids.append($(this).attr("id").replace("info_", ""));
				});
				return ids.join(",");
			}
			,
			initialize: function (id, options) {
				this.createPanel(id);
				this.content = new Util.StringBuilder();
				this.layers = [];
				OpenLayers.Util.extend(this, options);
			}
		})
	};

})();
