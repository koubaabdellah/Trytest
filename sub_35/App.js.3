/**
 * App.js
 */

var version = 'v1.2.0'; // dd. 5-5-2017

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
var Geodan = Geodan || {};
window.Geodan = Geodan;

var mapServerUrl;
var reportServerUrl;


var BESCHIKBAARHEID_GEGEVENS = "Beschikbaarheid_gegevens";
var BEVOEGD_GEZAG = "Bevoegd_gezag";
var VOORTGANG_ONDERZOEK = "Voortgang_onderzoek";
var BKK = "Gemeentelijk_bodembeleid";
var GEMEENTEN = 0;
var LAYERMANAGER = 1;
var INFO = 2;
var ACHTERGRONDKAARTEN = 3;
var wms_layers;
var ttips;
var SCALELIMIT = 64494.047619; // ter info: zoomniveau 7 === scale 76195.1232; hogere zoom is lagere scale
var dox, doy;
var staticLayerManager0; //brt
var staticLayerManager1; //ond
var staticLayerManager2; //bkk
var staticLayerManager3; //mijn

function initMap() {

	Geodan.defaults = {
		mapServerUrl: appProperties.mapServerUrl,
		reportServerUrl: appProperties.reportServerUrl,
		// dinoWmsServerUrl: 'http://www.gdngeoservices.nl/arcgis/services/blk/lks_blk_rd/MapServer/WMSServer' // productie
		// dinoWmsServerUrl: 'http://acc.gdngeoservices.nl/arcgis/services/blk/lks_blk_rd/MapServer/WMSServer' // acceptatie
		dinoWmsServerUrl: appProperties.dinoWmsServerUrl // productie
	};

	OLApp.setImagePath("resource/img/");
	var baseLayerSwitcher = new OpenLayers.Control.BaseLayerSwitcher({autoActivate: true});
	var mapControls = [
		new OpenLayers.Control.Navigation({
			dragPanOptions: {
				enableKinetic: true
			}
		}),
		new OpenLayers.Control.DragPan(),
		new OpenLayers.Control.ScaleLine(),
		baseLayerSwitcher,
		new OpenLayers.Control.MousePosition({
			numDigits: 0
		}),
		new OpenLayers.Control.WindowHistory({numDigits: 0})
	];

	var previous = null;
	var options = {
		projection: "EPSG:28992",
		displayProjection: new OpenLayers.Projection('EPSG:28992'),
		maxExtent: new OpenLayers.Bounds(-285401.92, 22598.08, 595401.92, 903401.92),
		maxResolution: 860.16,
		resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52,
			53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21],
		restrictedExtent: new OpenLayers.Bounds(0, 300000, 290000, 640000),
		units: 'm',
		controls: mapControls,
		layers: [
			// let op: lege achtergrondlaag is nodig ivm initiele zoom
			new OpenLayers.Layer('Geen', {isBaseLayer: true, displayInLayerSwitcher: false})
		],
		theme: null
	};

	// check for initial extent?
	// if in command line args -> use for initial map extent
	if (window.location.hash != '') {
		var hash = window.location.hash.replace('#', '');
		var initialExtent = OpenLayers.Bounds.fromString(hash);
		if (initialExtent.top === initialExtent.top) { // only if ! NaN
			// create dummy layer to calculate zoom for extent
			var div = document.getElementById('map');
			var layer = new OpenLayers.Layer('Geen', {
				resolutions: options.resolutions
			});
			layer.map = {
				getSize: function() {
					var size = new OpenLayers.Size(div.clientWidth,
										   div.clientHeight);

					return size;
				}
			};

			options.center = initialExtent.getCenterLonLat();
			options.zoom = layer.getZoomForExtent(initialExtent, true); // 'true' is belangrijk bij afgeronde coordinaten
		}

	}

	OLApp.map = new OpenLayers.Map("map", options);

	initReport();
	OpenLayers.Map.prototype.zoomToMaxExtent = function () {
		OLApp.map.zoomToExtent(OLApp.map.restrictedExtent);
	};

	ttips = new OpenLayers.Control.ToolTips({
		bgColor: "white",
		textColor: "black",
		bold: true,
		opacity: 1
	}); // ttips = { hide: function(){}, show: function(){} };
	OLApp.map.addControl(ttips); // JP
}

function addLayers() {
	staticLayerManager0 = new OLApp.LayerManager("layerspanel0", {
		radio: false,
		checkbox: false,
		slider: true,
		legend: false
	});
	staticLayerManager1 = new OLApp.LayerManager("layerspanel2", {
		radio: false,
		checkbox: true,
		slider: true,
		legend: false
	});
	staticLayerManager2 = new OLApp.LayerManager("layerspanel1", {
		radio: false,
		checkbox: false,
		slider: true,
		legend: false
	});
	staticLayerManager3 = new OLApp.LayerManager("layerspanel3", {
		radio: false,
		checkbox: false,
		slider: true,
		legend: false
	});


	OLApp.layerManagers['layerspanel0'] = staticLayerManager0;
	OLApp.layerManagers['layerspanel2'] = staticLayerManager1;
	OLApp.layerManagers['layerspanel1'] = staticLayerManager2;
	OLApp.layerManagers['layerspanel3'] = staticLayerManager3;

	var gemeenten = new OLApp.LayerInfo(
		{
			id: "gemeenten",
			baseoverlay: true,
			server: Geodan.defaults.mapServerUrl,
			layers: "gemeenten",
			opacity: 0.5,
			format: "image/png",
			label: "Nederlandse gemeenten",
			single: true,
			visible: false
		});

	var beleid = new OLApp.LayerInfo(
		{
			id: BKK,
			baseoverlay: true,
			server: Geodan.defaults.mapServerUrl,
			layers: "beleid",
			opacity: 0.5,
			format: "image/png",
			label: BKK.replace(/_/,' '),
			single: true
		});

	var zb = new OLApp.LayerInfo(
		{
			id: 'zonering_b',
			baseoverlay: true,
			server: Geodan.defaults.mapServerUrl,
			layers: "zonering_bovengrond",
			opacity: 1.0,
			format: "image/png",
			label: "Zonering bovengrond",
			single: true,
			visible: false
		});

	var ob_tb = new OLApp.LayerInfo(
		{
			id: 'ontgraving_toepassing_b',
			baseoverlay: true,
			server: Geodan.defaults.mapServerUrl,
			layers: "ontgravingskaart_bovengrond", // of toepassingskaart_bovengrond
			opacity: 1.0,
			format: "image/png",
			label: "Ontgravings- of toepassingskaart bovengrond",
			single: true,
			visible: false
		});

	var bevoegd_gezag = new OLApp.LayerInfo({
		id: BEVOEGD_GEZAG,
		baseoverlay: true,
		server: Geodan.defaults.dinoWmsServerUrl,
		layers: BEVOEGD_GEZAG,
		label: BEVOEGD_GEZAG.replace(/_/,' '),
		styles: 'default',
		opacity: 0.5,
		format: "image/png",
		visible: true,
		single: true
	});
	var beschikbaarheid_gegevens = new OLApp.LayerInfo({
		id: BESCHIKBAARHEID_GEGEVENS,
		baseoverlay: true,
		server: Geodan.defaults.dinoWmsServerUrl,
		layers: BESCHIKBAARHEID_GEGEVENS,
		label: BESCHIKBAARHEID_GEGEVENS.replace(/_/,' '),
		styles: 'default',
		opacity: 0.5,
		format: "image/png",
		single: true
	});

	var bb = new OLApp.LayerInfo({
		id: VOORTGANG_ONDERZOEK,
		baseoverlay: true,
		server: Geodan.defaults.dinoWmsServerUrl,
		layers: 'WBB_locaties',
		styles: 'default',
		opacity: 0.5,
		visible: false,
		format: "image/png",
		label: VOORTGANG_ONDERZOEK.replace(/_/,' '),
		single: true
	});

	var mijnsteen = new OLApp.LayerInfo({
		id: "mijnsteen",
		baseoverlay: true,
		server: appProperties.mijnsteenServer,
		layers: "MIJNSTEENGEB_BESLUIT_BODEM_V",
		opacity: 0.5,
		format: "image/png",
		label: "",
		single: true
	});

	OLApp.layers["geen"] = new OpenLayers.Layer("Geen", {
		isBaseLayer: true,
		category: "achtergronden"
	});

	var lufo = new OpenLayers.Layer.WMTS({
		name: 'Luchtfoto',
		url: appProperties.pdokUrl + "hwh/luchtfotorgb/wmts/v1_0",
		layer: 'Actueel_ortho25',
		matrixSet: 'EPSG:28992',
		matrixIds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
		//numZoomLevels: 14, // 15!
		format: "image/jpeg",
		style: "_null",
		opacity: 0.5,
		maxResolution: 860.16,
		isBaseLayer: true,
		isForceColorModel: true
	});
	OLApp.map.addLayer(lufo);
	OLApp.layers['luchtfoto'] = lufo;

	var brt = new OpenLayers.Layer.WMTS({
		name: 'BRT',
		url: appProperties.pdokUrl + "brt/achtergrondkaart/wmts/v2_0",
		layer: 'standaard',
		matrixSet: 'EPSG:28992',
		matrixIds: ['EPSG:28992:0', 'EPSG:28992:1', 'EPSG:28992:2', 'EPSG:28992:3', 'EPSG:28992:4', 'EPSG:28992:5', 'EPSG:28992:6', 'EPSG:28992:7', 'EPSG:28992:8', 'EPSG:28992:9', 'EPSG:28992:10', 'EPSG:28992:11', 'EPSG:28992:12', 'EPSG:28992:13', 'EPSG:28992:14'],
		format: "image/png",
		style: "_null",
		opacity: 0.5,
		maxResolution: 860.16,
		isBaseLayer: true,
		isForceColorModel: true
	});

	OLApp.map.addLayer(brt);
	OLApp.layers['brt'] = brt;
	OLApp.map.setBaseLayer(OLApp.layers["brt"]);
	staticLayerManager0.addLayer({
		id: "brt",
		label: "Achtergrondkaart"
	});

	var kadastraleKaart = new OLApp.LayerInfo({
		id: "kadastraleKaart",
		baseoverlay: false,
		server: appProperties.geodataBaseUrl + "kadastralekaart/wms/v4_0?",
		layers: "kadastralekaart",
		//opacity: 0.5,
		format: "image/png",
		label: "Kadastrale percelen",
		single: true,
		maxResolution: 0.84, // zoomniveau 12
		minZoom: 12 // nog niet gebruikt
	});
	OLApp.addLayer(kadastraleKaart);
	staticLayerManager0.addLayer(kadastraleKaart, {

		checkbox: {
			control: true,
			value: true
		}
	});

	OLApp.addLayer(gemeenten);

	staticLayerManager2.addPanelToggle(false, " Bodemkwaliteitskaarten", false, "radios");
	staticLayerManager3.addPanelToggle(false, " Mijnsteengebieden", false, "radios");

	OLApp.addLayer(beleid);
	staticLayerManager2.addLayer(beleid, {
		radio: false,
		radio_checked: true
	});

	staticLayerManager2
		.add(H
			.dd(H
				.img(
					beleid.server
					+ "&format=image/png&version=1.1.1&service=wms&request=getLegendGraphic&layer="
					+ beleid.layers)));

	OLApp.addLayer(zb);
	OLApp.addLayer(ob_tb);

	staticLayerManager2.addLayer(zb, {checkbox: {control: true, value: true}});
	staticLayerManager2
		.add(H
			.dd(H
				.img(
				zb.server
				+ "&format=image/png&version=1.1.1&service=wms&request=getLegendGraphic&layer="
				+ zb.layers)));

	/* ontgravingskaart_bovengrond en toepassingskaart_bovengrond */
	staticLayerManager2.addLayer(ob_tb, {
		checkbox: {
			control: true,
			value: false
		},
		switchable: {
			items: [
				{layers: 'ontgravingskaart_bovengrond', label: 'Ontgravingskaart'},
				{layers: 'toepassingskaart_bovengrond', label: 'Toepassingskaart'}
			]
		}
	});
	staticLayerManager2.add( H.dd( H.img(
		ob_tb.server
		+ "&format=image/png&version=1.1.1&service=wms&request=getLegendGraphic&layer="
		+ ob_tb.layers)));

	staticLayerManager1.addPanelToggle(true, " Bodeminformatie");

	OLApp.addLayer(bevoegd_gezag);
	staticLayerManager1.addLayer(bevoegd_gezag, {slider: true, checkbox:false, legend:true,
		legendGraphic:"resource/img/legenda/Bevoegd_gezag.png"
	});

	OLApp.addLayer(beschikbaarheid_gegevens);
	staticLayerManager1.addLayer(beschikbaarheid_gegevens, {slider: true, checkbox:false, legend:true,
		legendGraphic:"resource/img/legenda/Beschikbaarheid_gegevens.png"
	});

	OLApp.addLayer(bb);
	staticLayerManager1.addLayer(bb, {
		slider: true, checkbox:false, legend:true,
        legendGraphic: Geodan.defaults.dinoWmsServerUrl + "?LAYER=WBB_locaties&STYLES=default&FORMAT=image%2Fpng&TRANSPARENT=TRUE&EXCEPTIONS=application%2Fvnd.ogc.se_blank&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&SRS=EPSG%3A28992&BBOX=99668.61390625,413751.29140625,200468.61390625,502455.29140625&WIDTH=193&HEIGHT=125"
	});

	OLApp.addLayer(mijnsteen);
	staticLayerManager3.addLayer(mijnsteen, {checkbox: false, legend:true,
		legendGraphic:"resource/img/legenda/mijnsteengebieden.gif"
	});

	staticLayerManager0.update();
	staticLayerManager1.update();
	staticLayerManager2.update();
	staticLayerManager3.update();

	jQuery("img").each(function () {
		if (jQuery(this).attr('id'))
			if (jQuery(this).attr('id').indexOf("zoomworld_innerImage") > 0) {
				jQuery(this).attr('title', 'Zoom naar heel Nederland');
			}
	});

	/*
	 * de zoneringen zijn pas te zien wanneer je minstens op SCALELIMIT bent
	 * ingezoomd (als het panel aan staat)
	 */
	function scaledependend() {
		//printDialogNormal();
		// setInfoTag();
		setLayerVisibility();
	}
	OLApp.layers['luchtfoto'].events.register('moveend', OLApp.layers['luchtfoto'],scaledependend);
	OLApp.layers['brt'].events.register('moveend', OLApp.layers['brt'],scaledependend);

	infolayergroups[BESCHIKBAARHEID_GEGEVENS] = beschikbaarheid_gegevens.layers;
	infolayergroups[BEVOEGD_GEZAG] = bevoegd_gezag.layers;
	infolayergroups[BKK] = beleid.layers;
	infolayergroups[VOORTGANG_ONDERZOEK] = bb.layers;
}

var hidenamesTimeout = null;
var getnamesTimeout = null;

function getTooltip(e) {

	// mousemovebug in chrome
	if (Current.movex == e.xy.x && Current.movey == e.xy.y) return;
	Current.movex = e.xy.x;
	Current.movey = e.xy.y;
	//
	clearTimeout(getnamesTimeout);
	ttips.hide();
	getnamesTimeout = setTimeout(function () {
		startgetTooltip(e); // JP
	}, 500);

}
function getToolTipLayer() {
	// layer id voor laag die binnen scalelimit valt, en zichtbaar is
	var tooltipLayers = ['ontgraving_toepassing_b', 'zonering_b'];

	var layerId = 'gemeenten';
	if (OLApp.map.getScale() <= SCALELIMIT) {
		for (var i = 0; i < tooltipLayers.length; i++) {
			var layer = OLApp.layers[tooltipLayers[i]];
			if (layer && layer.getVisibility()) {
				layerId = tooltipLayers[i];
				break;
			}
		}
	}
	return layerId;
}
function closeToTheEdge(xy){
	return  (xy.x < 10 || xy.x > 615 || xy.y < 10 || xy.y > 540)
}
function startgetTooltip(e) {
	clearTimeout(hidenamesTimeout);
	if (!Current.enabletooltips || closeToTheEdge(e.xy))
		return;

	Current.lonlat.move = OLApp.map.getLonLatFromViewPortPx(new OpenLayers.Pixel(
		e.xy.x, e.xy.y));

	var layer = getToolTipLayer();

	// added for M180416925 tooltip uitzetten
	if (layer == 'gemeenten') {
		return;
	}

	var infourl = OLApp.layers[layer].getFullRequestString({
		INFO_FORMAT: "application/vnd.ogc.gml",
		REQUEST: "getFeatureInfo",
		EXCEPTIONS: "application/vnd.ogc.se_xml",
		BBOX: OLApp.map.getExtent().toBBOX(),
		WIDTH: OLApp.map.size.w,
		HEIGHT: OLApp.map.size.h,
		SRS: 'EPSG:28992',
		X: e.xy.x,
		Y: e.xy.y
	});

	infourl = "/bodemloket/jsp/" + (layer == 'gemeenten' ? 'gemname' : 'zonesoort')
		+ ".jsp?server="
		+ infourl.replace("?", "&").replace('https', 'http')
	;

	jQuery.ajax({

		type: 'GET',
		url: infourl,
		success: function (doc) {
			doc = doc.replace(/\n/g, "");
			doc = doc.replace(/\r/g, "");
			if (doc == "") {
				ttips.hide();
				Current.gemeente = null;
			} else {
				Current.gemeente = doc.split(",")[0];
				ttips.show({
					html: Current.gemeente
				});
				hidenamesTimeout = setTimeout(function () {
					ttips.hide();
				}, 7120);
			}
		},
		error: function () {
			ttips.hide();
		}
	});
}

var Current = {};
Current.gemeente = false;
Current.lonlat = {};
Current.lonlat.move = {};
Current.lonlat.click = {};
Current.enabletooltips = true;
Current.infoid = null;
Current.event = null;
Current.movex = 0;
Current.movey = 0;

function rePosition() {
	var p1 = jQuery("#_search").position();
	jQuery("#gemeententab").css({
		'left': (p1.left) + 'px',
		'top': +(p1.top + 24) + 'px'
	});

}

var navigation = null;
var clickHandler;

function initialize() {
	jQuery("div.version").html(version);
	document.onresize = rePosition;
	document.mousemove = function (evt) {
		evt = evt ? evt : event;
		dox = evt.clientX;
		doy = evt.clientY;
	};
	Util.setLibName("HtmlBuilder", "H");
	jQuery("#info").draggable({handle: ".infoheader"});

	initMap();
	rePosition();
	addLayers();
	setLayerVisibility(); // toegevoegd voor initiele zichtbaarheid
	hidePanels();
	jQuery('.slider').slider({
		range: false,
		min: 0,
		max: 100,
		value: 50,
		slide: function (ui, event) {

			var id = ui.target.id.split("|")[1]; // "sli|" + layerid

			if (OLApp.layers[id])
				OLApp.layers[id].setOpacity(event.value / 100);
			if (id == "brt")
				OLApp.layers["luchtfoto"].setOpacity(event.value / 100);
			if (id == BEVOEGD_GEZAG)
				OLApp.layers[BESCHIKBAARHEID_GEGEVENS].setOpacity(event.value / 100);
		}
	});


	jQuery("#_search").autocomplete({
		autoFocus: true,
		source: function(request, response) {
			jQuery.ajax({
				url: appProperties.geodataBaseUrl + "locatieserver/suggest",
				dataType: "json",
				data: {
					q: request.term.replace(/,/g," ")
				},
				success: function (data) {
					var docs = data.response.docs;
					if(docs.length == 0) docs.push({weergavenaam:"Niets gevonden"})
					var mappedResults = jQuery.map(docs, function (item) {
						//Extend the service data with a label and value property that autocomplete uses
						return jQuery.extend(item, { label: item.weergavenaam, value: item.weergavenaam });
					});

					response(mappedResults);
				}
			});
		},
		minLength: 2,
		select: function(event, ui) {
			if(ui.item.id)
				jQuery.ajax({
					url: appProperties.geodataBaseUrl + 'locatieserver/lookup?id='+ ui.item.id + '&fl=geometrie_rd',
					dataType: "json",
					success: function (data) {
						var fmt = new OpenLayers.Format.WKT();
						var geom = fmt.read(data.response.docs[0].geometrie_rd)
						OLApp.map.zoomToExtent(geom.geometry.getBounds());
					}
				})
		},
		//html: true, // optional (jquery.ui.autocomplete.html.js required)

		// optional (if other layers overlap autocomplete list)
		open: function(event, ui) {
			jQuery(".ui-autocomplete").css("z-index", 1000);
		}

	});
	jQuery("#_search").data('ui-autocomplete')._renderItem = function(ul, item) {
		return jQuery( "<li></li>" )
			.attr( "data-value", item.value )
			.append(' <a>&nbsp;' + item.label +'</a>' )
			.appendTo( ul );
	};


	// OLApp.map.removeControl(new OpenLayers.Control.PanZoom());
	OLApp.map.addControl(new OpenLayers.Control.PanZoomBar());

	clickHandler = new OpenLayers.Handler.Click(this, {
		dblclick: function (event) {
			OLApp.map.zoomIn();
		},
		click: function (event) {
			hidePanels();
			getFeatureInfo(event);
		}
	}, {
		single: true,
		double: true,
		stopSingle: true,
		stopDouble: true
	});
	clickHandler.setMap(OLApp.map);
	clickHandler.activate();

	OLApp.map.events.register('mousemove', OLApp.map, getTooltip);

	if (!OLApp.map.getCenter()) {
		OLApp.map.zoomTo(2); // show initial map
	}

	if (window.location.hash != '') {
		var hash = window.location.hash.replace('#', '');
		var initialExtent = OpenLayers.Bounds.fromString(hash);
	}
}

function setLayerVisibility() {

	var mapScale = OLApp.map.getScale();
	var zonesvis = jQuery("#layerspanel1togglecontrol").is(':checked')
		&& mapScale <= SCALELIMIT;
	var bevgezagvis = jQuery("#layerspanel2togglecontrol").is(':checked')
		&& mapScale > SCALELIMIT;
	var beschvis = jQuery("#layerspanel2togglecontrol").is(':checked')
		&& mapScale < SCALELIMIT;

	jQuery("#layerspanel1 input[type='checkbox']").each(function () {
		OLApp.layers[this.id].setVisibility(zonesvis && this.checked);
		if (zonesvis)
			jQuery(this).removeAttr('disabled');
		else
			jQuery(this).attr('disabled', true);
	});

	OLApp.layers[BEVOEGD_GEZAG].setVisibility(bevgezagvis);
	OLApp.layers[BESCHIKBAARHEID_GEGEVENS].setVisibility(beschvis);
	jQuery(".lm_" + BEVOEGD_GEZAG).css("display", bevgezagvis ? "block" : "none");
	jQuery(".lm_" + BESCHIKBAARHEID_GEGEVENS).css("display", beschvis ? "block" : "none");
	jQuery(".lm_" + VOORTGANG_ONDERZOEK).css("display", beschvis ? "block" : "none");


	var kk_layer = OLApp.layers['kadastraleKaart'];
	if (kk_layer.calculateInRange()) {
		jQuery('.lm_kadastraleKaart').css('display', 'block');
	} else {
		jQuery('.lm_kadastraleKaart').css('display', 'none');
	}

}

function _setInfoTag() {

	var id = OLApp.map.getScale() <= SCALELIMIT ? VOORTGANG_ONDERZOEK : BKK;
	if (id != Current.infoid) {
		jQuery(".info_title").hide();
		Current.infoid = id;
		jQuery("#" + id).hide().fadeIn();
	}
	if (id === BKK)
		if (staticLayerManager1.visible)
			jQuery("#" + id).css({
				'color': 'black',
				'font-style': 'normal'
			});
		else
			jQuery("#" + id).css({
				'color': 'gray'
			});
	if (id === VOORTGANG_ONDERZOEK)
		if (staticLayerManager2.visible)
			jQuery("#" + id).css({
				'color': 'black'
			});
		else
			jQuery("#" + id).css({
				'color': 'gray'
			});

}
function getFeatureInfo(event) {
	Current.event = event;

	Current.lonlat.click = OLApp.map
		.getLonLatFromViewPortPx(new OpenLayers.Pixel(event.xy.x, event.xy.y));
	var p1 = jQuery("#map").position();

	var leftx = event.xy.x + p1.left;
	var topy = event.xy.y + p1.top;
	var cssblock = {
		'z-index': '100000',
		'position': 'absolute',
		'left': parseInt(event.xy.x + p1.left - (leftx > 500 ? 450 : 0)) + 'px',
		'top': parseInt(event.xy.y + p1.top - (topy > 450 ? 100 : 0)) + 'px'
	};
	jQuery("#clicked-point").css(cssblock);

	// one is true in the one-click info
	var bkkinfo = jQuery("#layerspanel1togglecontrol").is(':checked')
	var voortganginfo = jQuery("#layerspanel2togglecontrol").is(':checked') && OLApp.map.getScale() <= SCALELIMIT;
	var beschinfo = jQuery("#layerspanel2togglecontrol").is(':checked') && OLApp.map.getScale() > SCALELIMIT;
	/*
	//radiobuttons
	 if (bkkinfo) {
	 getBeleidInformatie();
	 }
	 if (voortganginfo) {
	 getDinoInformatie();
	 }
	 if (beschinfo) {
	 getBeschInformatie();
	 }
	 */
	// checkbuttons
	// one or more is true in the choose-info click
	var bkkinfo = staticLayerManager2.visible;
	var voortganginfo = staticLayerManager1.visible && OLApp.map.getScale() <= SCALELIMIT;
	var beschinfo = staticLayerManager1.visible;
	if (bkkinfo && !staticLayerManager1.visible) {
		getBeleidInformatie();
	}
	if (!bkkinfo && voortganginfo && !beschinfo) { // komt niet voor
		getDinoInformatie();
	}
	if (!bkkinfo && beschinfo && !voortganginfo) {
		getBeschInformatie();
	}
	if ((voortganginfo && beschinfo) || ((voortganginfo || beschinfo) && bkkinfo)) {
		var info = {
			"bkkinfo": bkkinfo,
			"voortganginfo": voortganginfo,
			"beschinfo": beschinfo
		};
		addKiesInfoPanel(cssblock, info);
	}
}
function addKiesInfoPanel(cssblock, info) {
	Current.enabletooltips = false;

	var div = new Util.StringBuilder();

	div.append(
		"<div id='kiesinfolaagprompt'> \
		<div class='infoheader'><img style='display: inline-block; float:right;' src='resource/img/kruisje.gif'  onclick='hidePanels()' /></div> \
		<div style='margin:2px'> \
		<b>Er zijn meerdere informatiebronnen beschikbaar.</b>\
		<p>Maak een keuze. </p>\
		<ul>"
	);

	if (info.voortganginfo)div.append("<li><a href='#' onclick='getDinoInformatie();return false'>Voortgang bodemonderzoek</a></li>");
	if (info.beschinfo)div.append("<li><a href='#' onclick='getBeschInformatie();return false'>Eventuele beschikbaarheid van informatie op andere websites</a></li>");
	if (info.bkkinfo)div.append("<li><a href='#' onclick='getBeleidInformatie();return false'>Bodemkwaliteitskaart</a></li>");
	div.append("</ul></div></div>");
	div = jQuery(div.toString());

	cssblock.background = 'white';
	cssblock.border = '1px solid black';

	div.css(cssblock).draggable();
	jQuery("#map").append(div);
}
function getDinoInformatie() {
	hidePanels();

	e = Current.event;
	infolayers = infolayergroups[VOORTGANG_ONDERZOEK];

	// precisiebox voor info uitgeschakeld
	//var r = 10;
	//var ll = OLApp.map.getLonLatFromViewPortPx(new OpenLayers.Pixel(e.xy.x, e.xy.y));
	//var infoprecisionbbox = [parseInt(ll.lon, 10) - r, parseInt(ll.lat, 10) - r, parseInt(ll.lon, 10) + r, parseInt(ll.lat, 10) + r].join(",");

	var mapSize = OLApp.map.getSize();

	var infourl = OLApp.layers[VOORTGANG_ONDERZOEK].getFullRequestString({
		REQUEST: "getFeatureInfo",
		LAYERS: '*',
		QUERY_LAYERS: '*',
		EXCEPTIONS: "application/vnd.ogc.se_xml",
		CRS: 'EPSG:28992',
		WIDTH: mapSize.w,
		HEIGHT: mapSize.h,
		X: e.xy.x,
		Y: e.xy.y,
		BBOX: OLApp.map.getExtent().toBBOX(), //infoprecisionbbox,
		FEATURE_COUNT: 10
	});

	infourl = "/bodemloket/jsp/dinoinfo.jsp?server=" + infourl.replace("?", "&");

	Current.empty = false;
	jQuery.ajax({
		type: 'GET',
		url: infourl,
		success: function (doc) {

			Current.enabletooltips = false;
			jQuery("#infotab").html(doc).show();
			jQuery("#info").show();
			ttips.hide();
			if (doc.indexOf("Er is een fout opgetreden") > -1) {
				return;
			}
			if (doc.indexOf("return report") == -1) {
				Current.empty = true;
				reportWbb("-", "-", "-");
				enablePrint();
			}
			enablePrint();
		}
	});
}
function getBeschInformatie() {
	hidePanels();
	e = Current.event;
	infolayers = infolayergroups[BKK];

	var infourl = OLApp.layers["gemeenten"].getFullRequestString({
		INFO_FORMAT: "application/vnd.ogc.gml",
		REQUEST: "getFeatureInfo",
		EXCEPTIONS: "application/vnd.ogc.se_xml",
		BBOX: OLApp.map.getExtent().toBBOX(),
		WIDTH: OLApp.map.size.w,
		HEIGHT: OLApp.map.size.h,
		SRS: 'EPSG:28992',
		X: e.xy.x,
		Y: e.xy.y
	});

	infourl = "/bodemloket/jsp/gemname.jsp?server=" + infourl.replace("?", "&").replace('https', 'http');

	jQuery.ajax({
		type: 'GET',
		url: infourl,
		success: function (doc) {
			Current.gemeente = doc;
			var infourl = "/bodemloket/tools/viewWebsiteInfoUpdate/"
				+ Current.gemeente.split(",")[1];
			jQuery.ajax({
				type: 'GET',
				url: infourl,
				success: function (doc) {
					Current.enabletooltips = false;
					jQuery("#infotab").html(doc).show();
					jQuery("#info").show();
					jQuery("#printje").hide();
					ttips.hide();

					if (doc.indexOf("Geen informatie") > -1) {
						Current.enabletooltips = true;
						setTimeout(function () {
							hidePanels();
						}, 1776);
					}

				},
				error: function (xhr, textStatus) {/**/
				}
			});
		}
	});
}

function getBeleidInformatie() {

	hidePanels();
	e = Current.event;
	infolayers = infolayergroups[BKK];

	var infourl = OLApp.layers["gemeenten"].getFullRequestString({
		INFO_FORMAT: "application/vnd.ogc.gml",
		REQUEST: "getFeatureInfo",
		EXCEPTIONS: "application/vnd.ogc.se_xml",
		BBOX: OLApp.map.getExtent().toBBOX(),
		WIDTH: OLApp.map.size.w,
		HEIGHT: OLApp.map.size.h,
		SRS: 'EPSG:28992',
		X: e.xy.x,
		Y: e.xy.y
	});

	infourl = "/bodemloket/jsp/gemname.jsp?server=" + infourl.replace("?", "&").replace('https', 'http');

	jQuery.ajax({
		type: 'GET',
		url: infourl,
		success: function (doc) {
			Current.gemeente = doc;
			var infourl = "/bodemloket/tools/gemeente/"
				+ Current.gemeente.split(",")[1];
			jQuery.ajax({
				type: 'GET',
				url: infourl,
				success: function (doc) {
					Current.enabletooltips = false;
					jQuery("#infotab").html(doc).show();
					jQuery("#info").show();
					jQuery("#printje").hide();
					ttips.hide();

					if (doc.indexOf("Geen informatie") > -1) {
						Current.enabletooltips = true;
						setTimeout(function () {
							hidePanels();
						}, 1776);
					}

				},
				error: function (xhr, textStatus) {/**/
				}
			});
		}
	});
}

var infolayergroups = {};
function hidePanels() {
	//printDialogNormal();
	jQuery('#gemeententab').html('').hide();
	jQuery('#infotab').html('');
	jQuery('#info').hide();
	jQuery('#kiesinfolaagprompt').remove();

	Current.enabletooltips = true;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
	c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
	return c.substring(name.length, c.length);
	}
	}
	return "";
	}

	function checkDisclaimerCookie() {
	var user = getCookie("disclaimerAccept");
	if (user == "") {
        alert("De gegevens op het Bodemloket zijn met de grootste zorg samengesteld. Toch kan het voorkomen dat de informatie op deze website verouderd is,onvolledig is of onjuistheden bevat. De organisatie achter Bodemloket.nl noch de data-eigenaren (gemeenten en provincies) zijn aansprakelijk voor enigerlei schade die het directe of indirecte gevolg is van of in verband staat met het gebruik van de op deze website beschikbare informatie.U helpt de overheid door eventuele geconstateerde fouten of gebreken te melden. De provincies en gemeenten die op de kaart van Nederland groen gekleurd zijn,leveren informatie aan voor het Bodemloket. Ook andere instanties - zoals kleinere gemeenten - hebben soms bodeminformatie, maar deze vindt u voorlopig nog niet op deze website. Wilt u een compleet beeld? Neem dan zeker óók contact op met uw gemeente. Staat een locatie (nog) niet vermeld op de kaart? Dan hebben we daar geen informatie over. De contactgegevens vindt u op de website van de desbetreffende gemeente of provincie.")
	setCookie("disclaimerAccept", true, 7);
	}
	}

