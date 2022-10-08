

var jaren=[2011,2012,2013,2014,2015,2016];
var kwartalen=['1e kwartaal', '2e kwartaal', '3e kwartaal','4e kwartaal'];
var maanden=['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September', 'Oktober','November','December'];
var months=['January','February','March','April','May','June','July','August','September', 'October'];

var dag_nl=['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag','Zondag'];
var dag_en=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var dagen=[
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]];



var prevMonth_a=0;
var month_a=0;
var prevMonth_b=0;
var month_b=0;
var datewidgets=0;


var slider1_changed=function (d) {

 dt=moment(d.from,"X");
 month_a=dt._d.getMonth();
 if (month_a!=prevMonth_a) { 
    dagkeuze1=new Date(dt._d.getFullYear(), dt._d.getMonth(),1);
    //console.log('nieuwe maand:',dagkeuze1);
 }
  
  traffic_corop_info=traffic_corop_info_keuzes[dagfilter1];
  traffic_roads_info=traffic_roads_info_keuzes[dagfilter1];
  dateindex1=dt._d.getMonth()+(dt._d.getFullYear()-2011)*12;  // FIXME: datum opzoeken ipv uitrekenen.
  console.log(dateindex1);
  update_map_info(1, dateindex1);
  update_map_header(dateindex1,'1');
  update_map('1');

//  var timeserie=timeseries['a'];
//  timeserie.datesel=date_index[dateindex1];
// timeserie.update_ts_sel();

  $('#play').removeClass('fa-pause').addClass('fa-play').css('margin-left','8px');
  playstate='play';   
  playmode='stop';     
}






function datewidget(node, datum, range_start, range_end) {


  datewidgets=datewidgets+1;
  this.widgetnr=datewidgets;
  var _this = this;



  this.update_widget=function (node, datum, range_start, range_end) {

    _this.init_widget(node, datum, range_start, range_end);
  }




  this.click_dagfilter=function () {

    //console.log('click_datum', this.id);    
    var widgetnr=$(this).attr('data-widgetid');
    var sel=$(this).attr('data-selectie');    
    var dagfilter=$(this).attr('data-dagkeuze');
    //console.log(widgetnr,sel, dagfilter);    
    $('#dagselectie_value_'+widgetnr).html(daglabels[dagfilter]+' <span class="caret"></span>');
    if (widgetnr=='1') { 
        dagfilter1=dagfilter;
        traffic_corop_info=traffic_corop_info_keuzes[dagfilter1];
        traffic_roads_info=traffic_roads_info_keuzes[dagfilter1];

        update_timeseries_info(tsmode);
        update_map_info(1, dateindex1);
        //datesel=date_index[0];

        update_map('1');
        update_map_header(dateindex1,'1');
        //timeseries['a'].update_ts();
    }

}




  this.init_widget=function(node, datum, range_start, range_end)
  {

    //console.log('init_datewidget',node);
    var widgetnr=this.widgetnr;            
    var context={'widgetnr':widgetnr};      
      
    moment.locale('nl');
    mindate=moment(range_start, 'YYYYMMDD')
    maxdate=moment(range_end, 'YYYYMMDD')
    fromdate=moment(datum, 'YYYYMMDD')

    context=[];
    for (var key in daglabels) {
        if (daglabels.hasOwnProperty(key)) {
            context.push({'dagkeuze':daglabels[key],'key':key,'widgetid':widgetnr});
            }
    }
          

    $('#dagselectie_value_'+widgetnr).attr('data-selected','week');

    $('.datumdropdown'+widgetnr).on('click',_this.click_dagfilter);
    
    console.log('mindate=',mindate);
    console.log('maxdate=',maxdate);
    console.trace()
    
    var fromdate= mindate;

    $("#slider1").ionRangeSlider({
        min: +mindate.format("X"),
        max: +maxdate.format("X"),
        from: +fromdate.format("X"),
        prettify: function (num) {
            return moment(num, "X").format("MMMM YYYY");
        },
        step: 0.5,
        grid: true,
        grid_num: 4,
        hide_min_max: true,
        keyboard: true,
        onFinish: slider1_changed   
        });
    if (widgetnr==1) { d=dagfilter1;} 
    $('#dagselectie_value_'+widgetnr).html(daglabels[d]+' <span class="caret"></span>');
  }

  this.init_widget(node,datum, range_start, range_end);

 return false;
}
