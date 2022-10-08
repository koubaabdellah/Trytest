if (typeof (AIS) !== "object") { var AIS = new Object(); }
if (typeof (AIS.Views) !== "object") { AIS.Views = new Object(); }
if (typeof (AIS.Views.Results) !== "object") { AIS.Views.Results = new Object(); }

AIS.Views.Results = function () {

  return {
    Init: function () {
      $(document).ready(function () {

        //events handlers 

        $(this).off("click", ".ais-expander-script");
        $(this).on("click", ".ais-expander-script",
          function (event) {
            event.preventDefault();

            //var toToggle = $(this).closest(".ais-expander-container").find(".ais-expanded");
            var toToggle = "." + $(this).attr("expand");
            $('.ais-expanded').not(toToggle).hide();
            if ($(toToggle).is(":visible")) {
              $(toToggle).hide();
            }
            else {
              $(toToggle).show();
            }
          });

        $(this).off("click", ".ais-bookmark-link-element");
        $(this).on("click", ".ais-bookmark-link-element", function (event) {

          event.preventDefault();

          var bookmarkUrl = this.href;
          var bookmarkTitle = this.title;

          if (window.sidebar) { // For Mozilla Firefox Bookmark
            window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, "");
          } else if (window.external || document.all) { // For IE Favorite
            window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
          } else if (window.opera) { // For Opera Browsers
            $("a.jQueryBookmark").attr("href", bookmarkUrl);
            $("a.jQueryBookmark").attr("title", bookmarkTitle);
            $("a.jQueryBookmark").attr("rel", "sidebar");
          } else { // for other browsers which does not support
            alert('Your browser does not support this bookmark action');
            return false;
          }

        });

        for (var i = 0; i < 5; i++) {
          var maxHeight = 0;
          $(".ais-brief-gallery>ul>li").slice(i * 3, i * 3 + 3).each(function () {
            var thisH = $(this).height() + 12;
            if (thisH > maxHeight) { maxHeight = thisH; }
          });
          $(".ais-brief-gallery>ul>li").slice(i * 3, i * 3 + 3).each(function () {
            var thisH = $(this).height() + 12;
            $(this).find(".content").css("padding-bottom", maxHeight - thisH);
          });
        }

        $(this).off("click", ".ais-brief-send-via-email-script");
        $(this).on("click", ".ais-brief-send-via-email-script", function (event) {
          event.preventDefault();
          AIS.Views.Results.OpenSendViaEmailPopup();
        });

        $(".ais-select-all-script").click(function (event) {
          event.preventDefault();

          AIS.RecordSelection.SelectAll();
        });

        $(".ais-invert-selection-script").click(function (event) {
          event.preventDefault();

          AIS.RecordSelection.InvertSelection();
        });

        $(".ais-clear-selection-script").click(function (event) {
          event.preventDefault();

          AIS.RecordSelection.ClearSelection();
        });

        $(document).on("click", ".ais-results .selector-script", function (event) {
        //$(".ais-results .selector-script").on("click", function (event) {
          var record = $(this).parent();
          var priref = record.attr("data-priref");
          var database = record.attr("data-database");
          var selected = record.attr("data-selected");
          var sitename = $(".ais-sitename-value").val();
          if (selected === 'false') {
            AIS.RecordSelection.AddToSelection(priref, database, sitename, record);
          }
          else {
            AIS.RecordSelection.RemoveFromSelection(priref, database, sitename, record);
          }
        });

        $(".ais-popupwrapper-script .ais-send-via-email-container .ais-send-via-email-submit-script").on("click", function (event) {

          var fromName = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-FromName").val();
          var toName = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-ToName").val();
          var toEmail = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-ToEmail").val();
          var subject = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-Subject").val();
          var messageBody = $(".ais-popupwrapper-script .ais-send-via-email-container textarea#MessageBody").val();
          $.ajax({

            url: AIS.Helpers.ResolveUrl("results/sendresultsviaemail"),
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            type: "POST",
            data: {
              FromName: fromName,
              ToName: toName,
              ToEmail: toEmail,
              Subject: subject,
              MessageBody: messageBody
            },
            success: function (response) {
              $(".ais-message-element").html(response.message);
            }
          });
        });

      });
    },

    CheckLoadChildrenHierarchy: function (unfoldSender) {

      if ($(unfoldSender).siblings(".hierarchy-node").children("ul.ais-children-hierarchy").length === 0) {

        //get the correct priref
        var priref = 0;
        if ($(unfoldSender).children(".ais-priref-value").length === 0) {
          priref = $(".ais-priref-value").val();
        }
        else {
          priref = $(unfoldSender).children(".ais-priref-value").val();
        }

        $.ajax({
          async: false,
          type: "get",
          url: AIS.Helpers.ResolveUrl("Details/detailschildren"),
          dataType: "html",
          data: {
            database: $(".ais-database-name-value").val(),
            site: $(".ais-sitename-value").val(),
            priref: priref,
            page: 1,
            recordsPerPage: 10
          },
          success: function (data) {

            if ($(unfoldSender).siblings(".hierarchy-node").children("ul").length >= 1) {

              //if the node already has expanded child nodes

              //list items to be preserved (if it's been already extended)
              var listItemsToKeep = $(unfoldSender).siblings(".hierarchy-node").children("ul").children("li");

              //replace existing list with new data
              $(unfoldSender).siblings(".hierarchy-node").children("ul").replaceWith(data);

              listItemsToKeep.each(function (index) {

                //restore preserved list item
                $(unfoldSender).siblings(".hierarchy-node").children("ul").children("li#" + $(this).attr("id")).replaceWith(this);
              });
            }
            else {

              //if the node doesn't have expanded child nodes,
              //then just append new html to hierarchy node
              $(unfoldSender).siblings(".hierarchy-node").append(data);
            }
          }
        });
      }
    },

    OpenSendViaEmailPopup: function () {

      $.ajax({
        type: "get",
        url: AIS.Helpers.ResolveUrl("results/getsendviaemailform"),
        dataType: "json",
        success: function (data) {

          AIS.Views.Results.Popup().html(data.content);
          AIS.Views.Results.Popup().dialog({
            modal: true,
            title: data.title,
            resizable: false,
            width: 'auto'
          });
        }
      });

    },

    Popup: function () { return $(".ais-popupwrapper-script"); },

    SendViaEmailSubmit: function () { return $(".ais-popupwrapper-script .ais-send-via-email-container .ais-send-via-email-submit-script"); }

  }
}();

AIS.Views.Results.Init();
