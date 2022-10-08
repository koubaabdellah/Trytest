// $Id: BaseLayerSwitcher.Control.js 708 2010-11-29 11:11:44Z johnp $

/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.BaseLayerSwitcher
 */
OpenLayers.Control.BaseLayerSwitcher = OpenLayers.Class(OpenLayers.Control.Panel, {

	numBaseLayers: 0,

	currentBaseLayer: null,

	showSingleBaseLayer: false,
        
	initialize: function(options) {
            OpenLayers.Control.Panel.prototype.initialize.apply(this, [OpenLayers.Util.extend({
                displayClass: 'olControlBaseLayerSwitcher'
            }, options)]);
	},

	/**
	 * APIMethod: destroy
	 */
	destroy: function() {
		if (this.map) {
			this.map.events.unregister("buttonclick", this, this.onButtonClick);
		}
		this.map.events.un({
			"addlayer": this.addLayer,
			"removelayer": this.removeLayer,
			//"changelayer": this.redraw,
			"changebaselayer": this.changeBaseLayer,
			scope: this
		});

		OpenLayers.Control.Panel.prototype.destroy.apply(this, arguments);
	},

	/**
	 * Method: setMap
	 *
	 * Properties:
	 * map - {<OpenLayers.Map>}
	 */
	setMap: function(map) {
                
                for (var i = 0; i < map.layers.length; i++) {
                    var button = this.addLayer(map.layers[i]);
                    if (map.layers[i] === map.baseLayer) {
                        this.defaultControl = button;
                    }
                }
		OpenLayers.Control.Panel.prototype.setMap.apply(this, arguments);
                
		//this.map.events.register("buttonclick", this, this.onButtonClick);
		this.map.events.on({
			"addlayer": this.addLayer,
			"removelayer": this.removeLayer,
			"changebaselayer": this.changeBaseLayer,
			scope: this
		});
	},
        
        addLayer: function(ev) {
            var layer = ev.layer;
            if (layer.isBaseLayer && layer.displayInLayerSwitcher) {
               // console.log('baselayer added', layer);
                var button = new OpenLayers.Control({
                    type: OpenLayers.Control.TYPE_TOOL,
                    displayClass: 'olControlBaseLayerSwitcherButton', 
                    eventListeners: {
                        activate: function(ev) { // bevat object, type-of-event, element
                            //console.log('click', arguments);
                            ev.object.map.setBaseLayer(ev.object.baseLayer);
                        },
                        scope: button
                    },
                    title: OpenLayers.i18n('Gebruik ${name} als achtergrond', {name: layer.name}),
                    baseLayer: layer
                });
                this.addControls([button]);
                button.panel_div.innerHTML = layer.name;
            }
            return button;
        },
        
        removeLayer: function(ev) {
            var layer = ev.layer;
            if (layer.isBaseLayer) {
                // remove button from panel
                for (var i = 0; i < this.controls.length; i++) {
                    if (this.controls[i].baseLayer === layer) {
                        var control = this.controls[i];
                        this.controls.splice(i, 1);
                        control.destroy(); // verwijdert control ook uit kaart
                        break;
                    }
                }
                //console.log('remove baselayer', arguments);
                this.redraw();
            }
        },
        
        changeBaseLayer: function(ev) {
            var layer = ev.layer; // new base layer
            for (var i = 0; i < this.controls.length; i++) {
                if (this.controls[i].baseLayer === layer) {
                    //this.defaultControl = this.controls[i];
                    this.activateControl(this.controls[i]);
                    break;
                }
            }
            //console.log('change base layer', arguments);
            this.redraw();
        },

	CLASS_NAME: 'OpenLayers.Control.BaseLayerSwitcher'
});
