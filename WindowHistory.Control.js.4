// $Id: WindowHistory.Control.js 708 2010-11-29 11:11:44Z johnp $

/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.WindowHistory
 */
OpenLayers.Control.WindowHistory = OpenLayers.Class(OpenLayers.Control, {

	hashPrefix: '#',
	
	numDigits: null,
	
	separator: ',',

	shouldUpdate: true,
	
	previousBbox: null,
	
	initialBbox: null,

	initialize: function() {
		OpenLayers.Control.prototype.initialize.apply(this, arguments);
		window.addEventListener('popstate', this.popStateHandler.bind(this));
	},
	
	popStateHandler: function(event) {
		if (event.state === null) {
			console.log('empty popstate');
			// todo: zoom to initial extent (= max extent)
			this.shouldUpdate = false;
			//this.map.zoomToMaxExtent();
			this.zoomToBbox(this.initialBbox);
			return;
		}
		
		// restore the map view from the state
		this.shouldUpdate = false;
		
		this.zoomToBbox(event.state.bbox);
	},
	
	/**
	 * Method: setMap
	 *
	 * Properties:
	 * map - {<OpenLayers.Map>}
	 */
	setMap: function(map) {
		OpenLayers.Control.prototype.setMap.apply(this, arguments);

		this.map.events.on({
			moveend: this.updateWindowHistory,
			scope: this
		});
	},
	
	updateWindowHistory: function() {
		if (!this.shouldUpdate) {
			// do not update when the view was changed in the popstate handler
			this.shouldUpdate = true;
			return;
		}
		
		var bboxString = this.extentToBbox(this.map.getExtent());
		var state = {
			bbox: bboxString
		};
		if (this.initialBbox == null) {
			// first time
			this.previousBbox = this.initialBbox = bboxString; // extent of initial map (don't show this in url)
			// don't push state here, would lead to enabled 'back' button
		} else if (this.previousBbox !== bboxString) {
			this.previousBbox = bboxString;
			var hash = this.hashPrefix + bboxString;
			window.history.pushState(state, 'map', hash);
		}
	},
	
	zoomToBbox: function(bboxString) {
		this.map.zoomToExtent(OpenLayers.Bounds.fromString(bboxString), true);
	},
	
	extentToBbox: function(bounds) {
		if (typeof this.numDigits !== 'number') {
			return bounds.toBBOX();
		} else {
			return bounds.left.toFixed(this.numDigits) + this.separator + bounds.bottom.toFixed(this.numDigits) 
				+ this.separator + bounds.right.toFixed(this.numDigits) + this.separator + bounds.top.toFixed(this.numDigits);
		}
	},
	
	CLASS_NAME: 'OpenLayers.Control.WindowHistory'
});
