

// map.updateSize() when layer changes size



// http://acanimal.github.io/thebookofopenlayers3/chapter02_02_layer_stack.html

var tijdtypes=['maand'];

var traffic_corop_info_keuzes={
'weekeinde':traffic_corop_weekeinde_info,
'werkdagen':traffic_corop_werkdagen_info,
'week':traffic_corop_week_info,
};

var traffic_roads_info_keuzes={
'weekeinde':traffic_roads_weekeinde_info,
'werkdagen':traffic_roads_werkdagen_info,
'week':traffic_roads_week_info,
};
var timeseries={};


var regiosel=41;
var road_sel=0;
var road_sel2=0;
var rijksweg_sel=0;

var legenda_1=[{lower:0, upper:400,color:0},
              {lower:400, upper:800, color:1},
              {lower:800, upper:1200, color:2},
              {lower:1200, upper:1600, color:3},
              {lower:1600, upper:2000, color:4},
              {lower:2000, upper:null, color:5}];

var legenda_2=[{lower:0, upper:800, color:0},
              {lower:800, upper:1600, color:1},
              {lower:1600, upper:2400, color:2},
              {lower:2400, upper:3200, color:3},
              {lower:3200, upper:4000, color:4},
              {lower:4000, upper:null, color:5}];

var current_legend='legenda_2';
var current_legenda=legenda_2;

var daglabels={ 
  'weekeinde':'Zaterdag & zondag',
  'werkdagen':'Maandag t/m vrijdag',
  'week':'Alle dagen'
}

var ts_width=500;
var ts_height=350;
var mindate=new Date('2011-01-01T00:00:00');
var maxdate=new Date('2017-01-01T00:00:00');
var xlabel='datum';
var ylabel="intensiteit (auto's per uur)";
var ts_xpos=0;
var ts_ypos=0;
var ts_sel_color={'a':'blue','b':'blue','c':'black'};

var tijdselectie='maand';
var dagfilter1='week';
var dagfilter2='week';
var tsmode='regio';

var playstate='play';
var playmode='stop';
var displaytype='ts';

var traffic_corop_info=traffic_corop_info_keuzes[dagfilter1];
var traffic_roads_info=traffic_roads_info_keuzes[dagfilter1];
var regiodata=traffic_corop_info_keuzes[dagfilter1];


var coropColorstring='rgba(0,0,255,0.7)';
var coropNoFillColor='rgba(0,0,255,0.0)';
var hoverStrokeColor='rgba(0, 0, 255, 0.6)';
var hoverFillColor='rgba(0, 0, 255, 0.1)';
var clickStrokeColor='rgba(0, 0, 255, 1.0)';
var clickFillColor='rgba(0, 0, 255, 0.4)'





function build_legend (labels) {


 s='<ul class="sel_heading"> '; 
 t='<ul class="sel_heading"> '; 

 for (i=0; i<labels.length; i++) {
    label=labels[i];
    lower=label.lower;
    upper=label.upper;
    if (upper==null) {txt='&gt;'+lower;} 
    if (lower==null) {txt='&lt;'+upper;} 
    if ((lower!=null)  && (upper!=null)) {txt=lower+'-'+upper; } 

    s+='<li class=" legend_item" ><div> <i class="legend_box" id="l1_'+i+'"></i>'+ txt + '</div> </li>';
    t+='<li class=" legend_item" ><div> <i class="legend_box" id="l2_'+i+'"></i>'+ txt + '</div> </li>';
 }
 s+='</ul>';
 t+='</ul>';

 
 $('#legenda1').html(s);
 $('#legenda2').html(t);

 for (i=0; i<labels.length; i++) {
    color=road_colors[labels[i].color];    
    colorstring='rgba('+color[0]+','+color[1]+','+color[2]+',1.0)';
    $('#l1_'+i).css('background',colorstring);
    $('#l2_'+i).css('background',colorstring);
  }

}

 
  




function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};




function update_timeseries_info  (mode) {

  //console.log('update_timeseries_info');
  if (mode=='regio') {
    regio_index=corop_index;    
    regio_label2key=corop_id2label;
     info=traffic_corop_info[tijdselectie];
  }
  if (mode=='roads') {
    regio_index=road_index;   
    zoom=map_view.getZoom();
    if (zoom>9) {
      regio_label2key=colnr2roadlabel;
    } else {
      regio_label2key=colnr2roadlabel2;
    }
    info=traffic_roads_info[tijdselectie];
  }
  regio_ts_min=info.ts_min;
  regio_ts_max=info.ts_max;
  regio_ts=info.ts;

  date_index=info.dateindex;
}


function update_map_info (mapnr, dateindex) {

  //console.log('update_map_info:',dateindex,tijdselectie);
  roadinfo=traffic_roads_info;
  road_ts_min=traffic_roads_info[tijdselectie].ts_min;
  road_ts_max=traffic_roads_info[tijdselectie].ts_max;
  road_dateindex=traffic_roads_info[tijdselectie].dateindex;
  road_data=traffic_roads_info[tijdselectie].ts;
  road_regio_max=traffic_roads_info[tijdselectie].regio_max;
  road_regio_min=traffic_roads_info[tijdselectie].regio_min;
  
  roadrownr=0;
  if (mapnr==1) { 
    road_data_fordate1=road_data[dateindex];
  } else {
    road_data_fordate2=road_data[dateindex];
  }   
}

var gradient_steps=6;

var road_colors=colormap_road(gradient_steps);

////console.log ('road_colors:', road_colors);



var createTextStyle = function(feature, resolution, dom) {
  var align = dom.align.value;
  var baseline = dom.baseline.value;
  var size = dom.size.value;
  var offsetX = parseInt(dom.offsetX.value, 10);
  var offsetY = parseInt(dom.offsetY.value, 10);
  var weight = dom.weight.value;
  var rotation = parseFloat(dom.rotation.value);
  var font = weight + ' ' + size + ' ' + dom.font.value;
  var fillColor = dom.color.value;
  var outlineColor = dom.outline.value;
  var outlineWidth = parseInt(dom.outlineWidth.value, 10);

  return new ol.style.Text({
    textAlign: align,
    textBaseline: baseline,
    font: font,
    text: getText(feature, resolution, dom),
    fill: new ol.style.Fill({color: fillColor}),
    stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
    offsetX: offsetX,
    offsetY: offsetY,
    rotation: rotation
  });
};



function update_map_header(dateindex, headernr) {

  //console.log('update_map_header',dateindex,headernr, dagfilter1, dagfilter2);
  moment.locale('nl');
  datumtxt=moment(road_dateindex[dateindex]).locale("nl").format('MMMM YYYY');  
  

  if (headernr=='1') {
    txt=datumtxt ;

      $('#map1_header').text(txt);
    }
  
}




function update_map(mapnr){

  console.log('update_map:',mapnr);
  if (mapnr=='1') {
    roadindex=parseInt(mapindex[dateindex1]);   
    update_map_header(dateindex1,mapnr);       
    roads_L[mapnr][0].changed();
    roads_R[mapnr][0].changed(); 
    roads_LR[mapnr][0].changed();
    roads_L[mapnr][1].changed();
    roads_R[mapnr][1].changed(); 
    roads_LR[mapnr][1].changed();
    roads_L[mapnr][2].changed();
    roads_R[mapnr][2].changed(); 
    roads_LR[mapnr][2].changed();
    roads_L[mapnr][3].changed();
    roads_R[mapnr][3].changed(); 
    roads_LR[mapnr][3].changed();

  }

}




var map_layers=[new ol.layer.Tile({ source: new ol.source.OSM({url:"tiles/{z}/{x}/{y}.png"})})];


var map_view=new ol.View({
          center: ol.proj.transform([5.5500, 52.3167], 'EPSG:4326', 'EPSG:3857'),
          minZoom: 7,
          maxZoom: 13,
          zoom: 7
        });

 var extent =  [3.2, 50.5, 7.3, 52];
 extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));



var centerZoom = map_view.getCenter();  
map_view.on('change:center', function (evt) {
        var zoom = map_view.getZoom();
        var center = map_view.getCenter();

        txtCenter = '' + center;
        txtCenterZoom = '' + centerZoom;  
     // console.log(zoom, center);

//reset the center if user move it
        if (zoom == 7 && txtCenter != txtCenterZoom) {                                
            return true;
        }                    
    });

  

var map = new ol.Map({
   target: 'map1',
   layers: map_layers,
   view: map_view,   
 });









var road_widths=[ 3.0, 3.0, 3.0, 3.0, 3.0,
                  3.0, 3.0, 3.0, 3.0, 3.0,
                  4.0, 6.0, 8.0, 12, 1
                  ];

var road_widths_hover=[ 4.0, 4.0, 4.0, 4.0, 4.0,
                  5.0, 5.0, 5.0, 6.0, 7.0,
                  9, 10, 15, 24, 1
                  ];


var corop_widths=[0.4, 0.4, 0.4, 0.4, 0.4,
                  0.5, 0.5, 0.5, 0.5, 0.5,
                  1, 1, 1, 1.5, 1
                  ];



function set_road_visibility(zoom, mapnr) {


//  console.log('set_road_visibility', zoom,mapnr);
  if (mapnr=='1') {
      roadindex=parseInt(mapindex[dateindex1]);   
  }


  if (zoom<=13) {
    if (current_legend!='legenda_2') {
        build_legend (legenda_2);
        current_legend='legenda_2';
        current_legenda=legenda_2;
      }    

      if (mapnr=='1') {
          roadindex=parseInt(mapindex[dateindex1]);   
      }

  //  console.log('ROADINDEX:',roadindex);
/*    if ((roadindex==3) && (mapnr=='2')) {  // XXX
      roadindex=1;
    } */
    for (i=0; i<=3; i++) {
      if (i!=roadindex) {        
         // //console.log('invisible:',i)
          roads_L[mapnr][i].setVisible(false);
          roads_R[mapnr][i].setVisible(false);
          roads_LR[mapnr][i].setVisible(false);
        }
      else {    
         // //console.log('visible:',i)
          roads_L[mapnr][i].setVisible(false);
          roads_R[mapnr][i].setVisible(false);
          roads_LR[mapnr][i].setVisible(true);
        }
      } //for        
  //console.log('done:');
  }  // if zoom  <=9

}



// see http://openlayers.org/en/v3.11.0/examples/earthquake-clusters.html 


 function road_style (feature, resolution, mapnr) {


  zoom=map_view.getZoom();
  var road_width=road_widths[zoom];
  ////console.log(feature);

  var props=feature.getProperties();
  var roadname=props.roadseg;
  var rijksweg=roadname.split('_')[0];  
  var colnr=roadname2colnr[roadname];

  //console.log('roadstyle:',roadname, rijksweg, colnr, road_sel, rijksweg_sel);


  set_road_visibility(zoom, mapnr);
  //console.log('update_road:',feature.getProperties().roadseg, zoom, road_width);

  if (zoom>9) {
    if (colnr==undefined) {
      val=undefined;
    } else {
      if (mapnr==1)
         val=road_data_fordate1[colnr];
      else
         val=road_data_fordate2[colnr];
    }
  } else {    
    roadname2=roadname.slice(0,roadname.length-1);    

    colnr_L=roadname2colnr[roadname2+'L'];
    colnr_R=roadname2colnr[roadname2+'R'];
    if (mapnr==1) {
      val_L=road_data_fordate1[colnr_L];
      val_R=road_data_fordate1[colnr_R];
    } else {
      val_L=road_data_fordate2[colnr_L];
      val_R=road_data_fordate2[colnr_R];
    }
    if ((val_L==undefined) || (val_R==undefined)) {
      val=undefined;
    } else {      
      val=val_L+val_R;     
    }
  }


  alpha=1.0;              // blend out niet-geselecteerde rijkswegen
  if (rijksweg_sel!=0) {
    alpha=0.0;
    if (rijksweg_sel==rijksweg) {
        alpha=1.0;
    } 
  }

  var colorstring='';
  if (val==undefined) {
    colorstring='rgba(120,120,120,'+alpha+')';
  } else {

    if (zoom>9) {
        ival=0;
        if (val<current_legenda[0].upper) ival=0;
        if ((val>=current_legenda[1].lower) && (val<current_legenda[1].upper))  ival=1;
        if ((val>=current_legenda[2].lower) && (val<current_legenda[2].upper))  ival=2;
        if ((val>=current_legenda[3].lower) && (val<current_legenda[3].upper))  ival=3;
        if ((val>=current_legenda[4].lower) && (val<current_legenda[4].upper))  ival=4;
        if ((val>=current_legenda[5].lower))  ival=5;
      }
    else {
        ival=0;
        if (val<current_legenda[0].upper) ival=0;
        if ((val>=current_legenda[1].lower) && (val<current_legenda[1].upper))  ival=1;
        if ((val>=current_legenda[2].lower) && (val<current_legenda[2].upper))  ival=2;
        if ((val>=current_legenda[3].lower) && (val<current_legenda[3].upper))  ival=3;
        if ((val>=current_legenda[4].lower) && (val<current_legenda[4].upper))  ival=4;
        if ((val>=current_legenda[5].lower))  ival=5;
    }

    if (ival<0) {ival=0;}
    if (ival>gradient_steps) {ival=gradient_steps-1;}
    color=road_colors[ival];
  }

  if (color==undefined) {  
    colorstring='rgba(140,140,140,'+alpha+')';
	}   else {
    colorstring='rgba('+color[0]+','+color[1]+','+color[2]+','+ alpha+')';
  }
 // //console.log('roadid:', feature.getProperties().roadseg, colnr, val, ival,color, colorstring);

 if (zoom>9) {
    if (roadname==road_sel) {
      colorstring=clickStrokeColor;
      road_width=road_widths_hover[zoom];
    }    
 } else {
    if (road_sel2!=0) {
      roadname2=roadname.slice(0,roadname.length-1);        
      if (roadname2==road_sel2) {
        colorstring=clickStrokeColor;
        road_width=road_widths_hover[zoom];
      }
    }
 }

 var roadstyleArray = [new ol.style.Style({
                        fill: new ol.style.Fill({
                          color: colorstring
                           }),
                        stroke: new ol.style.Stroke({
                        color: colorstring , 
                        width: road_width
                        })
                      })];
  return roadstyleArray;

}



var road_style_1=function(feature, resolution) {
  return road_style (feature, resolution,1)
}

var road_style_2=function(feature, resolution) {
  return road_style (feature, resolution,2)
}



var corop_style=function(feature, resolution) {


zoom=map_view.getZoom();
props=feature.getProperties();

if (props.CR==regiosel) {
    var corop_color=clickStrokeColor; 
    var corop_FillColor=clickStrokeColor;
} else {
    var corop_color=coropColorstring;
    var corop_FillColor=coropNoFillColor;
}

var styleArray = [new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: corop_FillColor
                          }),
                        stroke: new ol.style.Stroke({
                        color: coropColorstring , 
                        width: corop_widths[zoom]
                        })
                      })];
  return styleArray;
}



var coropLayer = new ol.layer.Vector({  source: new ol.source.Vector({ url: 'js-data/corop2013.json', format: new ol.format.TopoJSON()}), style: corop_style });


var roads_LR=[[],[],[],[],[]];
var roads_L=[[],[],[],[],[]];
var roads_R=[[],[],[],[],[]];



//2011

 //new ol.layer.Vector({ source: new ol.source.TopoJSON({ url: 'js-data/allRoads_top_2010q1_LR.json'}),   style: road_style_1  })
roads_LR[1][0]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2010q1_LR.json',  format: new ol.format.TopoJSON()  }), style: road_style_1  });
roads_L[1][0]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2010q1_L.json', format: new ol.format.TopoJSON()  }), style: road_style_1  });
roads_R[1][0]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2010q1_R.json', format: new ol.format.TopoJSON()  }), style: road_style_1  });

roads_LR[2][0]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2010q1_LR.json',   format: new ol.format.TopoJSON()  }), style: road_style_2  });
roads_L[2][0]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2010q1_L.json',  format: new ol.format.TopoJSON()  }), style: road_style_2  });
roads_R[2][0]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2010q1_R.json',  format: new ol.format.TopoJSON()  }), style: road_style_2 });

//2012q2-q3

roads_LR[1][1]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2012q2_LR.json',   format: new ol.format.TopoJSON()  }) , style: road_style_1 });
roads_L[1][1]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q2_L.json', format: new ol.format.TopoJSON()  }), style: road_style_1   });
roads_R[1][1]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q2_R.json', format: new ol.format.TopoJSON()  }), style: road_style_1   });

roads_LR[2][1]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2012q2_LR.json',   format: new ol.format.TopoJSON()  }), style: road_style_2,});
roads_L[2][1]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q2_L.json', format: new ol.format.TopoJSON()  }), style: road_style_2,   });
roads_R[2][1]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q2_R.json', format: new ol.format.TopoJSON()  }), style: road_style_2, });

//2012q4

roads_LR[1][2]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2012q4_LR.json',   format: new ol.format.TopoJSON()  }), style: road_style_1  });
roads_L[1][2]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q4_L.json', format: new ol.format.TopoJSON()  }), style: road_style_1  });
roads_R[1][2]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q4_R.json', format: new ol.format.TopoJSON() }), style: road_style_1  });

roads_LR[2][2]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2012q4_LR.json',   format: new ol.format.TopoJSON()  }), style: road_style_2  });
roads_L[2][2]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q4_L.json', format: new ol.format.TopoJSON()  }), style: road_style_2  });
roads_R[2][2]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2012q4_R.json', format: new ol.format.TopoJSON()  }), style: road_style_2  });


//2013

roads_LR[1][3]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2013q1_LR.json',   format: new ol.format.TopoJSON()  }), style: road_style_1 });
roads_L[1][3]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2013q1_L.json', format: new ol.format.TopoJSON()  }), style: road_style_1 });
roads_R[1][3]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2013q1_R.json', format: new ol.format.TopoJSON()  }), style: road_style_1 });

roads_LR[2][3]  = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_top_2013q1_LR.json',   format: new ol.format.TopoJSON() }), style: road_style_2  });
roads_L[2][3]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2013q1_L.json', format: new ol.format.TopoJSON() }), style: road_style_2  });
roads_R[2][3]   = new ol.layer.Vector({source: new ol.source.Vector({url: 'js-data/allRoads_medium_2013q1_R.json', format: new ol.format.TopoJSON() }), style: road_style_2  });








var hoverOverlay = new ol.layer.Vector({
  source: new ol.source.Vector(),
  map: map,  
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: hoverStrokeColor,  width: 1 }),
    fill: new ol.style.Fill({ color: hoverFillColor })     
    })

   });

var clickOverlay = new ol.layer.Vector({
  source: new ol.source.Vector(),
  map: map,  
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: clickStrokeColor,  width: 1 }),
    fill: new ol.style.Fill({ color: clickFillColor })     
    })

   });


var hoverHighlightId=undefined;
var clickHighlightId=undefined;
var prevHoverFeature=undefined;
var prevClickFeature=undefined;





 function displayFeatureInfo(evt, pixel, mode) {



  var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    features.push(feature);
  }   );


  	// over 'water' hoveren in map (noordzee, ijselmeer)  

  if ((features.length==0) && (mode=='hover')) {
   // console.log('displayFeatureInfo, hover',prevHoverFeature, prevClickFeature);
    if (prevHoverFeature!=undefined) {
      hoverOverlay.getSource().removeFeature(prevHoverFeature);   
      $('#popup1').html('&nbsp');   
      $('#popup1').css('width',0);
      prevHoverFeature=undefined;
    }
//    coropLayer.changed();
    return;
  }

  // op 'water' klikken in map (noordzee, ijselmeer)  -> info nederland laten zien.

  if ((features.length==0) && (mode=='click')) {
  	console.log('clickNL/displayFeatureInfo',prevHoverFeature, prevClickFeature);
      if (prevClickFeature!=undefined) {
   		clickOverlay.getSource().removeFeature(prevClickFeature);      
   		$('#popup1').html('&nbsp');   
      $('#popup1').css('width',0);
    	prevClickFeature=undefined;
  		}
    tsmode='regio';
    regiosel=41;
    road_sel=0;
    road_sel2=0;
    update_timeseries_info(tsmode);
    //timeseries['a'].regiosel=41;
    //timeseries['a'].update_ts();      
    coropLayer.changed();
    update_map('1');
    return;
  }

  if (features.length==0) {
    console.log('exit displayFeatureInfo, unknown mode:',mode)
    return;
  }

  //console.log('displayFeatureInfo',mode);

  if (mode=='hover') {    
    strokeColor=hoverStrokeColor;
    fillColor=hoverFillColor;
    overlay=hoverOverlay;
    prevFeature=prevHoverFeature;
    highlightId=hoverHighlightId;
  } 
  if (mode=='click') {    
    strokeColor=clickStrokeColor;
    fillColor=clickFillColor;
    overlay=clickOverlay;
    prevFeature=prevClickFeature;
    highlightId=clickHighlightId;
  }

  var zoom=map_view.getZoom();
  var xpos=pixel[0];
  var ypos=pixel[1]-525;


  var roadfeature=undefined;

  for (i=0; i<features.length; i++) {    
    var props=features[i].getProperties();
    if ('overlay' in props) 
      continue
    if ('road' in props) roadfeature=features[i];
  }


  if (roadfeature!=undefined) {     //op wegstuk geklikt
      objs=roadfeature.getProperties();  
      roadId=objs.roadseg;    
      featuretype='road';
//    console.log ('road:',objs);
      if ((highlightId!=undefined) && (roadId==highlightId))
        return;  
    

      var colnr=roadname2colnr[objs.roadseg];	
      if (zoom>9) {
         var popuptxt=colnr2roadlabel[colnr];
      } else {
          var popuptxt=colnr2roadlabel2[colnr];
      }  	

      popup=$('#popup1');    		
  	  $(popup).html ('<div id="popuptxt">'+popuptxt+'</div>');  	
  	  $(popup).css('left',xpos);
  	  $(popup).css('top',ypos);
  	  width=getTextWidth(popuptxt, "bold 12pt arial");	
      $(popup).css('width',width); // popuptxt.length*10);
  	
	


  	//console.log('road_width_hover:',road_widths_hover[zoom],zoom);
      var featureStyle=  new ol.style.Style({
          stroke: new ol.style.Stroke({ color: strokeColor,  width: road_widths_hover[zoom] }),
          fill: new ol.style.Fill({ color: fillColor })     
      });



    //console.log('setStyle');
      overlay.setStyle(featureStyle);
    
      if (prevFeature!=undefined) {      
        overlay.getSource().removeFeature(prevFeature);
      }

    overlay.getSource().addFeature(roadfeature);



    overlay_props=overlay.getProperties();
    overlay_props.overlay=true;
    overlay.setProperties(overlay_props);
    

    if (mode=='hover') {
      prevHoverFeature=roadfeature;
      hoverHighlightId=roadId;    
    }
    if (mode=='click') {    
      prevClickFeature=roadfeature;
      clickHighlightId=roadId;
      console.log ('prevClickFeature=roadfeature');

      //console.log('tsmode:road', roadfeature.getProperties();
      tsmode='roads';
      update_timeseries_info(tsmode);      
      var road_props=roadfeature.getProperties()
      road_sel=road_props.roadseg;
      road_sel2=road_sel.slice(0,road_sel.length-1);     

      //timeseries['a'].regiosel=roadname2colnr[road_sel];            
      //timeseries['a'].update_ts();
      if (regiosel!=0) {
        regiosel=0;
        coropLayer.changed();  
      }
      update_map('1');      
    }



    return;
  }


  if (roadfeature==undefined) {
  // handle corops + click outside map (sea)

        coropFeature=undefined;
        for (i=0; i<features.length; i++) {
            props=features[i].getProperties();
            if ('overlay' in props) 
              continue
            if ('CR' in props) {
                  coropFeature=features[i];
                  corop_props=coropFeature.getProperties();
                  coropId=corop_props.CR;
                  break;
                }
        }


        if (coropFeature!=undefined) {
            if ((highlightId!=undefined) && (coropId==highlightId))
                return;
            console.log ('corop:',coropId);    
            if (prevFeature!=undefined) {      
                overlay.getSource().removeFeature(prevFeature);
            }


            var corop_props=coropFeature.getProperties();
            var popuptxt=corop_id2label[corop_props.CR];

//            console.log(coropFeature.getProperties());
		    popup=$('#popup1');    		
		  	$(popup).html ('<div id="popuptxt">'+popuptxt+'</div>');  	
		  	$(popup).css('left',xpos);
		  	$(popup).css('top',ypos);
		  	width=getTextWidth(popuptxt, "bold 12pt arial");	
		    $(popup).css('width',width); // popuptxt.length*10);



            var featureStyle=  new ol.style.Style({
                  stroke: new ol.style.Stroke({ color: strokeColor,  width: corop_widths[zoom] }),
                  fill: new ol.style.Fill({ color: fillColor })     
            });
            overlay.setStyle(featureStyle);  
            overlay.getSource().addFeature(coropFeature);

          if (mode=='hover') {
            prevHoverFeature=coropFeature;
            hoverHighlightId=coropId;    
          }
          if (mode=='click') {            
              
            if (prevClickFeature!=undefined)  {
                prevProps=prevClickFeature.getProperties();
                console.log(prevClickFeature.getProperties(),coropId);
              /*  if (prevProps.CR==coropId) {
                    clickitem=clickOverlay.getSource();                    
                    console.log('clickitem:', clickitem, prevClickFeature);
                    console.log('clickitem2:', overlay.getSource(), prevClickFeature);
                    clickOverlay.getSource().removeFeature(prevClickFeature);
                    console.log('remove done');
                    prevClickFeature=undefined;
                    tsmode='regio';
                    regiosel=41;
                    road_sel=0;
                    road_sel2=0;
                    update_timeseries_info(tsmode);
                    timeseries['a'].regiosel=41;
                    timeseries['a'].update_ts();      
                    coropLayer.changed();
                    update_map('1');
                    update_map('2');
                    return;
                  } */
            }
            prevClickFeature=coropFeature;
            clickHighlightId=coropId;    

            var corop_props=coropFeature.getProperties();

            if (corop_props.CR!=undefined) {
                console.log('click, tsmode:regio', corop_props);
                tsmode='regio';
                update_timeseries_info(tsmode);
                //timeseries['a'].regiosel=corop_props.CR;
                //timeseries['a'].update_ts();
                regiosel=corop_props.CR;
                road_sel=0;
                road_sel2=0;
                coropLayer.changed();
                update_map('1');
            }

          }  // click
       }   // corop      

    }   // roadfeature undefined




 }





function init_map1 () {
//console.log('add map1');
 map.addLayer(coropLayer);
 
 
 for (i=0; i<=3; i++){
    //console.log('addlayer:',i);
    map.addLayer(roads_LR[1][i]);
    map.addLayer(roads_L[1][i]);
    map.addLayer(roads_R[1][i]);
 //map.addLayer(roads50_L[1][i]);
 //map.addLayer(roads50_R[1][i]);
  }


  map.on('pointermove', function(evt) {  
    if (evt.dragging) {
      return;
    }
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(evt, pixel, 'hover');
});

/*
  map.on('click', function(evt) {  
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(evt, pixel, 'click');
});
*/

  
}








function nextframe(evt) {

  
  //console.log('nextframe:',dateindex1,playstate, playmode);
  if (playmode!='playing') return;
  dateindex1+=1;
  if (dateindex1>=date_index.length){
    //console.log('ended');
    playstate='play';
    playmode='stop';
    $('#play').removeClass('fa-pause').addClass('fa-play').css('margin-left','8px');
    return;
  }
  //console.log('nextframe-play');


  d=moment(date_index[dateindex1]);
  var slider = $("#slider1").data("ionRangeSlider");  
  slider.update({from:+d.format("X")});
  // update map
  update_map_info(1, dateindex1);
  update_map_header(dateindex1,'1');
  update_map('1');

  var timeserie=timeseries['a'];
  //timeserie.datesel=date_index[dateindex1];
  //timeserie.update_ts_sel();

  setTimeout (nextframe,200);    
  return false; 
}







function toggle_play () {
  
  //console.log ('toggle_play', playstate,playmode);
  if (playstate=='play') {    
      $('#play').removeClass('fa-play').addClass('fa-pause').css('margin-left','6px');            
      playstate='pause';
      playmode='playing';
      setTimeout (nextframe(),200);
  } else {
      $('#play').removeClass('fa-pause').addClass('fa-play').css('margin-left','8px');
      playstate='play';   
      playmode='stop';     
    }
  //console.log ('toggle_play:exit', playstate, playmode);
  return false;
}


function click_wegfilter (evt, obj) {


  if (obj==undefined) {
    var wegfilter="Alle wegen";
  } else {
    var wegfilter=obj.selected;
  }


  var mapnr=$(this).attr('data-mapnr');   
  console.log(wegfilter, mapnr );  

  if (wegfilter=='Alle wegen') {
    rijksweg_sel=0;
  } else {
    rijksweg_sel=wegfilter;
  }
 update_map(mapnr);  
}



function click_dagfilter (evt) {

  var mapnr=$(this).attr('data-mapnr');   
  
  var werkdagen=$('#werkdagen_map'+mapnr).hasClass('selected');
  var weekeinde=$('#weekeinde_map'+mapnr).hasClass('selected');
  var click_werkdagen=$(this).hasClass('werkdagen');
  var click_weekeinde=$(this).hasClass('weekeinde');
  console.log(werkdagen, weekeinde, click_werkdagen, click_weekeinde);
  if ((werkdagen==false) && (weekeinde==true) && (click_weekeinde==true)) {
    return;
  }
  if ((werkdagen==true) && (weekeinde==false) && (click_werkdagen==true)) {
    return;
  }

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected fa-check-square');
    $(this).addClass('fa-square-o');
  } else {
    $(this).removeClass('fa-square-o');
    $(this).addClass('selected fa-check-square');    
  }

  werkdagen=$('#werkdagen_map'+mapnr).hasClass('selected');
  weekeinde=$('#weekeinde_map'+mapnr).hasClass('selected');
  if ((werkdagen==false) && (weekeinde==true)) {
    dagfilter='weekeinde';
  } 
  if ((werkdagen==true) && (weekeinde==false)) {
    dagfilter='werkdagen';
  }   
  if ((werkdagen==true) && (weekeinde==true)) {
    dagfilter='week';
  } 

  console.log(dagfilter);
  if (mapnr=='1') { 
        dagfilter1=dagfilter;
        traffic_corop_info=traffic_corop_info_keuzes[dagfilter1];
        traffic_roads_info=traffic_roads_info_keuzes[dagfilter1];

        update_timeseries_info(tsmode);
        update_map_info(1, dateindex1);
        //datesel=date_index[0];

        update_map('1');
        update_map_header(dateindex1,'1');
//        timeseries['a'].update_ts();
    }
}




function click_attribution () {

  $('#toelichting_txt').bPopup({zIndex: 0});  
}






var substringMatcher = function(strs) {
  return function findMatches(q, cb) {

    var matches, substringRegex;

    console.log('typeahead:',q);
    if (q === '') {
        matches=wegen;
    } else {
    // an array that will be populated with substring matches
        matches = [];

    // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
    }

        cb(matches);
    };

};




function init_page() {
  //console.log('init_page, set ts');
  
//  update_dagkeuze();


  $('#toelichting_txt').html(toelichting_txt);
  t=$('.ol-attribution');
  $(t).html('<button type="button" title="Attributions"><span>i</span></button>')

  update_timeseries_info(tsmode);
  dateindex1=0;
  dateindex2=0;
  datesel1=date_index[dateindex1];
  datesel2=date_index[dateindex2];
  //console.log('init datesel:',datesel1,datesel2 );

  update_map_info(1, dateindex1);
  update_map_header(dateindex1,'1');

  init_map1();

  coropLayer.setVisible(true);
  
  update_timeseries_info(tsmode);
//  timeseries['a']=new TimeSeries('a', datesel1, regiosel);
//  timeseries['a'].update_ts();


  
  date1_widget=new datewidget('datepicker1','20110101','20110101','20161231');
  build_legend (legenda_2);
  

  

  $('#play').on('click',toggle_play);




    var context=[{'wegnaam':'','widgetid':2121},{'wegnaam':'Alle wegen','widgetid':4242}];
    rijks_sort=[];
    for (i=0; i<rijkswegen.length; i++){    
    		rijks_sort.push(rijkswegen[i].substring(1));
    	}
    	rijks_sort=rijks_sort.sort(function (a, b) {  return a - b; } );    
    for (i=0; i<rijks_sort.length; i++){                   		
        context.push({'wegnaam':'R'+rijks_sort[i],'widgetid':i, 'weglabel':weglabels['R'+rijks_sort[i]]});            
    }
      






    source   = $("#template_wegkeuzelist").html();
    template = Handlebars.compile(source);    
    html    = template({wegkeuzes:context,mapnr:1});
    $('#wegpicker1').html(html);
    html    = template({wegkeuzes:context,mapnr:2});
    $('#wegpicker2').html(html);
  
    $(".chosen-select").chosen({no_results_text: "Geen snelweg gevonden",
                              allow_single_deselect: true, 
                              search_contains: true,
                              width: "150px"});


//$("#wegkeuze1").chosen().change(click_wegfilter);

$('#wegkeuze1').on('change',click_wegfilter);
$('#wegkeuze2').on('change',click_wegfilter);
$('.dagselectie').on('click', click_dagfilter);

//    $('.wegdropdown').on('click',click_wegfilter);
    $('.ol-attribution').on('click',click_attribution);
    $('.ol-control ul').remove();
}



$(document).ready(function() {
  moment().format();
  init_page();
$('#tab_ts').trigger('click');
 /*$('#datepicker2').hide();
   $('#slider2parent').hide();
   $('#legenda2').hide();      */
});

