var initialIndex;
var index;
var indexMap;

$( document ).ready(function() {
    loadMostache();
    initialIndex = 0;
    index = 3;
    indexMap = new Map();
});

function loadMostache() {
    var template = $("#mp_template").html();
    $.getJSON('/feedimages.json', function(data) {

//        for (let value of data) {
        for(var i = 0; i< data.length; i++){
          let value = data[i];
          value.documents = value.documents.filter(function( doc ) {
            return (doc.index >= initialIndex && doc.index < index);
          });
        }
        initialIndex++;
        index++;
        var text = Mustache.render(template, data);
        $("#imagespanel").html(text);
        document.getElementById("alle_beeldenButton").click()
    });
}

function loadMoreMostache(categoryId) {
    var template = '{{#.}} {{#documents}} <div class="col-image col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"> <div class="row"> <div class="col-12 col-photo"> <span>{{category}}</span> <div class="image-container"> <figure> <img src="data:image/png;base64, {{baseImage}}" alt="{{description}}"> </figure> </div> </div> </div> <div class="row"> <div class="col-4 col-timestamp"> <p> {{ creationDate }} </p> </div> <div class="col-8 col-copyright"> <strong> </strong> </div> </div> <div class="row"> <div class="col-12 col-description"> <p> <strong>{{ title }}</strong> {{ description }} </p> </div> </div> <div class="row"> <div class="col-4 col-dimensions"> <p> {{ intList.dimensions }} </p> </div> <div class="col-8 col-dimesions-value"> <p> {{width}}x{{height}} </p> </div> </div> <div class="row"> <div class="col-12"> <a href="data:image/png;base64, {{baseImage}}" download="{{title}}" class="read-more">{{ intList.download }}</a> </div> </div> </div> {{/documents}} {{/.}}';

    if (indexMap.get(categoryId + "InitialIndex") == undefined) {
        indexMap.set(categoryId + "InitialIndex", 3);
        indexMap.set(categoryId + "Index", 6);
    } else {
        indexMap.set(categoryId + "InitialIndex", indexMap.get(categoryId + "InitialIndex") + 3);
        indexMap.set(categoryId + "Index", indexMap.get(categoryId + "Index") + 3);
    }

    $.getJSON('/feedimages.json', function(data) {
         data = data.filter(function( doc ) {
             return (doc.categoryId == categoryId);
         });
//         for (let value of data) {
            for(var i = 0; i< data.length; i++){
            let value = data[i];
           value.documents = value.documents.filter(function( doc ) {
             return (doc.index >= indexMap.get(categoryId + "InitialIndex") && doc.index < indexMap.get(categoryId + "Index"));
           });
         }
       var text = Mustache.render(template, data);
       $("#" + categoryId + "_appender").append(text);
    });
}

function openTab(evt, cityName) {
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
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " current";

}