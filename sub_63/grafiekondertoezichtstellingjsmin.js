function grafiekOndertoezichtstelling(s){const chartId="jongeren-met-ondertoezichtstelling-chart";const periodeURLs=["https://opendata.cbs.nl/ODataApi/OData/84134NED/Perioden?$filter=substring(Key,4,4)+eq+'"+s.periodeType+"'","https://opendata.cbs.nl/ODataApi/OData/85099NED/Perioden?$filter=substring(Key,4,4)+eq+'"+s.periodeType+"'"];let periodenQuery=["",""];let categories={data:[],formatted:[]};jQuery.when(ajax(periodeURLs[0]),ajax(periodeURLs[1])).done(function(resultPerioden0,resultPerioden1){const perioden=[resultPerioden0[0].value,resultPerioden1[0].value];for(let i=0;i<perioden.length;i++){if(perioden[i].length>0){for(let p in perioden[i]){categories.data.push({Key:perioden[i][p].Key,Status:perioden[i][p].Status});periodenQuery[i]+="Perioden+eq+'"+perioden[i][p].Key+"'";if(p<perioden[i].length-1){periodenQuery[i]+="+or+";}}}}
categories.formatted=(s.periodeType=="JJ00")?formatYears(categories.data):formatHalfYears(categories.data);let result0=[],result1=[];let requests=[ajax("https://opendata.cbs.nl/ODataApi/OData/84134NED/TypedDataSet?$filter=(substring(RegioS,0,6)+eq+'"+s.gmCode+"'+or+substring(RegioS,0,4)+eq+'"+s.jzRegio+"'+or+substring(RegioS,0,4)+eq+'"+nl+"')+and+VormenVanJeugdzorg+eq+'A045534'+and+"+periodenQuery[0]+"&$select=Perioden,RegioS,JongerenMetJeugdzorgRelatief_2").then(res=>result0=res.value)];if(periodenQuery[1]!=="")requests.push(ajax("https://opendata.cbs.nl/ODataApi/OData/85099NED/TypedDataSet?$filter=(substring(RegioS,0,6)+eq+'"+s.gmCode+"'+or+substring(RegioS,0,4)+eq+'"+s.jzRegio+"'+or+substring(RegioS,0,4)+eq+'"+nl+"')+and+VormenVanJeugdzorg+eq+'A045534'+and+"+periodenQuery[1]+"&$select=Perioden,RegioS,JongerenMetJeugdzorgRelatief_2").then(res=>result1=res.value));jQuery.when.apply(jQuery,requests).done(function(){const res=result0.concat(result1);const data={gm:res.filter(function(d){return d.RegioS.trim()===s.gmCode}).map(function(d){return d.JongerenMetJeugdzorgRelatief_2}),jz:res.filter(function(d){return d.RegioS.trim()===s.jzRegio}).map(function(d){return d.JongerenMetJeugdzorgRelatief_2}),nl:res.filter(function(d){return d.RegioS.trim()===nl}).map(function(d){return d.JongerenMetJeugdzorgRelatief_2})}
let chartOptions={chart:{type:"column",height:400,events:{render:function(){cbsStyle(this);}}},plotOptions:{column:{grouping:false}},title:{text:"Jongeren met ondertoezichtstelling",margin:35},xAxis:{categories:categories.formatted,tickLength:0,labels:{autoRotation:false,y:20}},yAxis:{title:{text:"% van alle jongeren tot 18 jaar",y:-15,textAlign:"left"},plotLines:[{value:0,zIndex:4}]},tooltip:{shared:true,valueSuffix:"%",valueDecimals:1},series:[{name:s.gmNaam,data:data.gm,zIndex:2,pointPadding:0.3,className:"cbs-color-lightgreen"},{name:"Jeugdregio "+s.jzRegioNaam,data:data.jz,zIndex:1,pointPadding:0.15,className:"cbs-color-darkblue"},{name:"Nederland",data:data.nl,zIndex:0,pointPadding:0,className:"cbs-color-lightblue"}],legend:{margin:74,visible:true}};if(result1.length>0){chartOptions.xAxis.plotLines=[{value:resultPerioden0[0].value.length-0.5,className:'xaxis-plotline',zIndex:4,label:{text:"trendbreuk →",verticalAlign:"top",rotation:0,y:12}}];}
Highcharts.chart(chartId,chartOptions);fillDataTable(chartId,"Jaar",null,chartOptions);if(categories.data.some(function(e){return e.Status=="Voorlopig"})){jQuery("p#benchmark-jeugdzorg-voetnoot").text("* Voorlopige cijfers");}});});}