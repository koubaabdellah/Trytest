if (typeof (AIS) !== "object") { var AIS = new Object(); }
if (typeof (AIS.Views) !== "object") { AIS.Views = new Object(); }
if (typeof (AIS.Views.SearchAdvanced) !== "object") { AIS.Views.SearchAdvanced = new Object(); }

AIS.Views.SearchAdvanced = function () {
  
  var AttachAutocomplete = function () {
    /* New API */
    $(".ais-search-advanced-script .autocomplete-script.webapi").each(function (n, element) {
      var attr = element.attributes['autocompletetag'];
      var language = $('#ais-search-language').val();
      var autoCompleteTag = "";
      if (attr !== undefined) {
        autoCompleteTag = element.attributes['autocompletetag'].value;
      }
      //added the _renderItem to fix the changes from jqueryUI-autocomplete that broke the bold part of the text
      $(this).autocomplete({
        source: function (request, response) {
          $.ajax({
            type: "GET",
            async: true,
            url: AIS.Helpers.ResolveUrl("helper/GetAutocompleteValues"),
            dataType: "json",
            data:
            {
              database: $('select[name="SourceName"] option:selected').val() != null ? $('select[name="SourceName"] option:selected').val(): $("#SourceName").val(),
              searchType: "advanced",
              fieldTag: autoCompleteTag,
              language: language,
              term: request.term
            },
            success: function (data) {

              /*new api version*/
              /* temp API backward compatibility fix: old webapi misses record node in json, later/current version have a record node */
              var recordList = data["adlibJSON"]["recordList"]["record"] === undefined ? data["adlibJSON"]["recordList"] : data["adlibJSON"]["recordList"]["record"];
              if (recordList) {
                response($.map(recordList, function (item) {

                  var finalRecordList = item.term[0].spans;
                  var spantextLabel = "", spantextValue = "";
                  for (var i = 0; i < finalRecordList.length; i++) {

                    if (finalRecordList[i].attributes & 0x01) {
                      spantextValue += finalRecordList[i].text;
                      spantextLabel += "<b>" + finalRecordList[i].text + "</b>";
                    }
                    else {
                      spantextLabel += finalRecordList[i].text;
                      spantextValue += finalRecordList[i].text;
                    }
                  }

                  return {
                    label: spantextLabel,
                    value: spantextValue

                  }
                }))
              }
              else {
                response()
              }
            }
          });
        }
      }).autocomplete("instance")._renderItem = function (ul, item) {
          return $("<li></li>")
            .data("item.autocomplete", item)
            .append("<a>" + item.label + "</a>")
            .appendTo(ul);
        };
    });
    /*old api version*/
    $(".ais-search-advanced-script .autocomplete-script.api").each(function (n) {
      var fieldname = $(this).parent(".advanced-inputs-row-script").find('*[name$="FieldName"]').val();
      $(this).autocomplete({

        source: function (request, response) {
          $.ajax({
            type: "GET",
            url: AIS.Helpers.ResolveUrl("helper/GetAutocompleteValues"),
            dataType: "json",
            data:
            {
              database: $('select[name="SourceName"] option:selected').val(),
              searchType: "advanced",
              fieldName: fieldname,
              term: request.term
            },
            success: function (data) {

              /*old api version*/
              var recordList = data["adlibJSON"]["recordList"]["record"];
              if (recordList) {
                response($.map(recordList, function (item) {

                  return {
                    label: item.term,
                    value: item.term

                  };

                }))
              }

              else {
                response()
              }
            }
          });
        }
      }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<a>" + item.label + "</a>")
          .appendTo(ul);
      };
    });
  }

  var AttachListButton = function () {
    $(".ais-search-listbutton-script").each(function (n) {
      $(this).click(function () {
        AIS.PopupAutoCompleteScan.Open($(this));
      });
    });
  }

  return {

    Init: function () {
      $(document).ready(function () {

        $(".ais-database-choices-script").on("change", function (event) {
          getFieldsFromApiAndAddToForm();
          $(".zebra").show();
          $(".form-buttons").show();
          var sourceName = $(".ais-database-choices-script").val();
          if (sourceName == '') {
            $(".form-buttons").hide();
          }
        });
        // returns dropdown only; see also databasechoices.ascx
        if (location.search == "?init=true") {
          $("#ais-search-advanced-form-container").children("li:not(.first-row)").remove();
          //$("#ais-database-choices select").val(0);
          //$(".zebra").hide();
          $(".form-buttons").hide();
          $('#ais-database-choices').prop('selectedIndex', 0);
        }

        // Clear form
        $(".ais-database-clear-script").click(function (event) {
          getFieldsFromApiAndAddToForm();
        });

        // Load form with click
        $(".advanced-search-change-script").click(function (event) {
          var sourceName = $(this).attr("database");
          $("#ais-database-choices").val(sourceName);
          $.ajax({
            url: AIS.Helpers.ResolveUrl("search/getadvancedsearchfields"),
            dataType: "html",
            data: { sourcename: $(this).attr("database") },
            success: function (data) {
              removeFieldsFromForm();
              //Add li's to the form
              $("#ais-search-advanced-form-container").append(data);
              reInitializeForm();
            }
          });
          $(".databasechoice").removeClass("current");
          $(this).parent(li).addClass("current");
        });

        /**
         * Remove all the fields from the form except the first one, whic is the database selection box
         */
        var removeFieldsFromForm = function () {
          $("#ais-search-advanced-form-container").children("li:not(.first-row)").remove();
        };

        /*
         * Get the html form from the api and append it to the empty form
         */
        var getFieldsFromApiAndAddToForm = function () {
          var sourceName = $(".ais-database-choices-script").val();
          if (sourceName !== '') {
            $.ajax({
              url: AIS.Helpers.ResolveUrl("search/getadvancedsearchfields"),
              dataType: "html",
              data: { sourcename: sourceName },
              success: function (data) {

                removeFieldsFromForm();

                //Add li's to the form
                $("#ais-search-advanced-form-container").append(data);
                reInitializeForm();
              }
            });
          } else {
            $("#ais-search-advanced-form-container").children("li:not(.first-row)").remove();
          }
        }

        /**
         * Attach all jquery behaviour to the newly created form
         */
        var reInitializeForm = function () {
          AttachAutocomplete();
          AttachListButton();
          setCursorInForm();
          AIS.Helpers.AttachDatePicker();
        }

        /**
         * Set focus on the first inputable field (type = text)
         */
        var setCursorInForm = function () {
          $("#ais-search-advanced-form-container li input:text").first().focus();
        };

        reInitializeForm();
      });
    }
  };
}();

AIS.Views.SearchAdvanced.Init();


