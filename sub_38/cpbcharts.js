(function($) {
  $(document).ready(function(){

  $('select.cpbchartspulldown').bind('change', function() {
    var reeks =  $(this).val();
    var cpbdata = Drupal.settings.cpbcharts;
    var yas = Drupal.settings.cpbchartsyas;
    var chart = $('#highchartscontainer').highcharts();
    
    chart.zoomOut();
    chart.xAxis[0].setCategories(cpbdata[reeks]['jaar']);
    chart.yAxis[0].update({min: cpbdata[reeks]['minyas']});
    chart.yAxis[0].update({title: {text: yas[reeks] } });
    chart.series[0].update({ data: cpbdata[reeks]['cbscijfers'] });
    chart.series[1].update({ data: cpbdata[reeks]['raming'] });
    $('#highchartscontainer').css('background-image', 'url('+Drupal.settings.cpbchartspad+'/img/'+reeks+'.png)');
  });

  });
})(jQuery);


