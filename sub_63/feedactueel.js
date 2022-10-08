var initialIndex;
var index;
var indexMap;

$( document ).ready(function() {
    initialIndex = 0;
    index = 6;
    indexMap = new Map();
    loadItems();



});

function loadItems() {

    var excludeFilter ='highlighted';

    var template = $("#actueel_template").html();

    var url = window.location.href;
    console.log(url);
    var jsonLg = '';
    if (url.includes("/en")) {
        var jsonLg = '/feeditemsen.json';
    } else {
        var jsonLg = '/feeditems.json';
    }
    console.log(jsonLg);

     $.getJSON(jsonLg, function(data) {

         data = data.filter(function( doc ) {
              return (doc.tag != excludeFilter && doc.itemList.length > 0);
          });
         for(var i = 0; i< data.length; i++){
                             let value = data[i];
                             value.itemList = value.itemList.filter(function( doc ) {
                                  return (doc.index >= initialIndex && doc.index < index);
                                });
                          }

         var text = Mustache.render(template, data);
         $("#actueelPanel").html(text);
         document.getElementById("allButton").click();
     });
}

function readMoreItems(tag) {
    var template = '{{#.}} {{#itemList}} {{#urlWebm}} <article class="block-image col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 30px;"> <div class="wrapper"> <div class="row"> <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7"> <div class="theoplayer-container video-js theoplayer-skin" data-type-mp4="video/webm" data-src-webm="{{ urlWebm }}" data-src-still-image="{{ urlStillImage }}"> </div> </div> <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"> <div class="container-custom-action"> <header class="row"> <div class="col-12"> <span> {{ displayDocumentType }} </span> <a href="{{ urlToDocument }}" class=""> <h3>{{ title }}</h3> </a> </div> </header> <div class="article-body row"> <div class="col-12"> <p> </p> <a href="{{ urlToDocument }}" class="read-more" data-href="{{ urlToDocument }}" aria-label="Volledig bericht Het Medusa nieuws" tabindex="0">Volledig bericht</a> </div> </div> </div> <footer> <div class="row"> <div class="col-datetime col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12"> <p>Gepubliceerd op {{ date.dayOfMonth }} {{ month }} {{ date.year }}, {{date.hourOfDay}}:{{date.minute}} CET</p> </div> <div class="col-source col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> <p>Bron: <a href="https://www.kpn.nl" target="_blank" rel="noopener noreferrer" title="Open de bron van dit artikel" tabindex="0" class=""> LSP</a> </p> </div> </div> </footer> </div> </div> </div> </article> {{/urlWebm}} {{^urlWebm}} {{#urlMP4}} <article class="block-image col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 30px;"> <div class="wrapper"> <div class="row"> <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7"> <div class="theoplayer-container video-js theoplayer-skin" data-type-mp4="video/mp4" data-src-mp4="{{ urlMP4 }}" data-src-still-image="{{ urlStillImage }}"> </div> </div> <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"> <div class="container-custom-action"> <header class="row"> <div class="col-12"> <span> {{ displayDocumentType }} </span> <a href="{{ urlToDocument }}" class=""> <h3>{{ title }}</h3> </a> </div> </header> <div class="article-body row"> <div class="col-12"> <p> </p> <a href="{{ urlToDocument }}" class="read-more" data-href="{{ urlToDocument }}" aria-label="Volledig bericht Het Medusa nieuws" tabindex="0">{{intList.toArticle}}</a> </div> </div> </div> <footer> <div class="row"> <div class="col-datetime col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12"> <p>{{intList.published}} {{ date.dayOfMonth }} {{ date.month }} {{ date.year }}, {{date.hourOfDay}}:{{date.minute}} CET</p> </div> <div class="col-source col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> <p>{{intList.source}}: <a href="https://www.kpn.nl" target="_blank" rel="noopener noreferrer" title="Open de bron van dit artikel" tabindex="0" class=""> LSP</a> </p> </div> </div> </footer> </div> </div> </div> </article> {{/urlMP4}} {{^urlMP4}} <article class="block-article col-xs-12 col-sm-12 col-md-6 col-lg-6" style="margin-top: 30px;"> <div class="wrapper"> <div class="container-custom-action"> <header> <span>{{ documentType }}</span> <a href="{{ urlToDocument }}" class=""> <h3>{{ title }}</h3> </a> </header> <div class="article-body"> <p> </p> <a class="read-more" href="{{ urlToDocument }}" data-href="{{ urlToDocument }}" aria-label="Volledig bericht {{ title }}">{{intList.toArticle}}</a> </div> </div> <footer> <div class="row"> <div class="col-datetime col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12"> <p>{{intList.published}} {{ date.dayOfMonth }} {{ date.month }} {{ date.year }}, {{date.hourOfDay}}:{{date.minute}} CET</p> </div> <div class="col-source col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> <p>{{intList.source}}: <a href="{{url}}" target="_blank" rel="noopener noreferrer" title="Open de bron van dit artikel" tabindex="0" class=""> {{source}}</a> </p> </div> </div> </footer> </div> </article> {{/urlMP4}}{{/urlWebm}} {{/itemList}} {{/.}}';

    if (indexMap.get(tag + "InitialIndex") == undefined) {
        indexMap.set(tag + "InitialIndex", 1);
        indexMap.set(tag + "Index", 6);
    } else {
        indexMap.set(tag + "InitialIndex", indexMap.get(tag + "InitialIndex") + 1);
        indexMap.set(tag + "Index", indexMap.get(tag + "Index") + 1);
    }

    var url = window.location.href;
    console.log(url);
    var jsonLg = '';
    if (url.includes("/en")) {
        var jsonLg = '/feeditemsen.json';
    } else {
        var jsonLg = '/feeditems.json';
    }
    console.log(jsonLg);

    $.getJSON(jsonLg, function(data) {
         data = data.filter(function( doc ) {
             return (doc.tag == tag);
         });
//         for (let value of data) {
        for(var i = 0; i< data.length; i++){
                             let value = data[i];
           value.itemList = value.itemList.filter(function( doc ) {
             return (doc.index >= indexMap.get(tag + "InitialIndex") && doc.index < indexMap.get(tag + "Index"));
           });
         }
       var text = Mustache.render(template, data);
       $("#" + tag + "_appender").append(text);
    });
}

function openTab(evt, tag) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" current", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tag).style.display = "block";
  evt.currentTarget.className += " current";

}