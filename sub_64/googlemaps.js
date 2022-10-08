showGoogleMaps = function ($element, sAddress, iRadius, fLat, fLong)
{
    var self = this;

    self.googleMap = null;
    self.oDirectionsService = null;
    self.oDirectionsRenderer = null;
    self.mapRef = typeof ($element) == 'object' ? $element : document.getElementById('locationMapHtml');
    self.infoWindow = false;

    var oOptions = {
        mapTypeControlOptions: {
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID
            ]

        },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    this.showShoplocationlist = function (json)
    {
        /* show locations, it's prited into the page */

    }

    this.addMarkers = function (json, sType)
    {
        for (var i in json.records)
        {
            self.addMarker(json.records[i], i, sType);
        }
    }

    this.addMarker = function (data, index, sType)
    {
        //var markerLatLng = new google.maps.LatLng(data.google_lat, data.google_long);
        //var aMarkerlabels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        //var sColor = 'orange';

        /*
         if (sType == 'letter' && typeof(aMarkerlabels[index]) == 'string')
         {
         var sMarkerImg = 'http://' + document.location.host + '/img/google_maps_markers/' + sColor + '_Marker' + aMarkerlabels[index] + '.png';
         }
         else
         {
         var sMarkerImg = 'http://' + document.location.host + '/img/google_maps_markers/' + sColor + '_Marker_empty.png';
         }

         var markerImage = new google.maps.MarkerImage(
         sMarkerImg,
         new google.maps.Size(20, 34),
         new google.maps.Point(0,0),
         new google.maps.Point(10, 34)
         );
         */

        var oMarker = new google.maps.Marker({
            position: data.position,
            map: self.googleMap,
            title: data.title,
            id: data.id,
            google_coordinates: data.google_coordinates
        });


        google.maps.event.addListener(oMarker, "click", function () {
            //self.markerClick(oMarker);
        });
    }
    this.markerClick = function (oMarker)
    {
        $.getJSON(
                '/json/getMarkerInfo.php',
                {
                    id: oMarker.id
                },
                function (data)
                {
                    if (typeof (self.infoWindow) == 'object')
                    {
                        self.infoWindow.close();
                    }
                    self.infoWindow = new google.maps.InfoWindow(
                            {
                                content: data.html,
                                size: new google.maps.Size(500, 100)
                            });
                    self.infoWindow.open(self.googleMap, oMarker);
                }
        );
    }

    /* Directions */
    this.getDirections = function (sFrom, sTo, oDirectionElement)
    {

        self.oDirectionsRenderer.setMap(self.googleMap);
        self.oDirectionsRenderer.setPanel(oDirectionElement);

        var oRequest = {
            origin: sFrom,
            destination: sTo,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        self.oDirectionsService.route(oRequest, function (oResult, status)
        {
            if (status == google.maps.DirectionsStatus.OK) {
                self.oDirectionsRenderer.setDirections(oResult);
            }
        });
    }

    /*
     * start the class
     */

    var oMap = this.mapRef;
    var geocoder = new google.maps.Geocoder();

    this.oDirectionsService = new google.maps.DirectionsService();
    this.oDirectionsRenderer = new google.maps.DirectionsRenderer();

    if (typeof (fLat) == 'number' && typeof (fLong) == 'number')
    {
        var latlng = new google.maps.LatLng(fLat, fLong);

        oOptions.center = latlng;

        self.googleMap = new google.maps.Map(oMap, oOptions);

        var oMarker = {
            title: sAddress,
            position: latlng
        };

        self.addMarker(oMarker, 0);
    } else if (sAddress != '')
    {
        geocoder.geocode(
                {
                    'address': sAddress
                },
                function (latLong, status)
                {
                    if (status == google.maps.GeocoderStatus.OK)
                    {
                        var oGeodata = latLong[0].geometry.location;

                        oOptions.center = oGeodata;

                        self.googleMap = new google.maps.Map(oMap, oOptions);

                        var oMarker = {
                            title: sAddress,
                            position: oGeodata
                        };

                        self.addMarker(oMarker, 1);
                        return true;
                    }
                });
        //self.oDirectionsRenderer.setMap(self.googleMap);
    } else
    {
        geocoder.geocode(
                {
                    'address': 'Nederland'
                },
                function (latLong, status)
                {
                    var oGeodata = latLong[0].geometry.location;

                    oOptions.zoom = 7;
                    oOptions.center = oGeodata;

                    self.googleMap = new google.maps.Map(oMap, oOptions);
                    $.getJSON(
                            '/ajax/googleMapMarkers.php',
                            {
                                address: 'all'
                            },
                            function (json)
                            {
                                if (json.rows_found > 0)
                                {
                                    //self.showShoplocationlist(json);
                                    self.addMarkers(json, 'blank');
                                }
                            }
                    );
                }
        );
    }
}