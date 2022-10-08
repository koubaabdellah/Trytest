if (typeof (AIS) !== "object") { var AIS = new Object(); }
if (typeof (AIS.Views) !== "object") { AIS.Views = new Object(); }
if (typeof (AIS.Views.Detail) !== "object") { AIS.Views.Detail = new Object(); }

AIS.Views.Detail = function () {

  function attachListeners() {
    /////////////// TOGGLE GROUP //////////////////////////
    $(".toggle-group.show-label").show();
    $(".toggle-group.hide-label").hide();
    $(".toggle-group.children").hide();

    $(".toggle-group.show-label.script").click(function () {
      toggleToggleGroup($(this));
      $(this).siblings(".hide-label").toggle();
    });

    $(".toggle-group.hide-label.script").click(function () {
      toggleToggleGroup($(this));
      $(this).siblings(".show-label").toggle();
    });

    function toggleToggleGroup(obj) {
      obj.siblings(".children").toggle("fast", function () { });
      obj.toggle();
    }
  }

  function show(element) {
    var parent = $(element).parentsUntil("toggle-group.container");
    parent.children(".toggle-group.show-label").hide();
    parent.children(".toggle-group.hide-label").show().css({ 'display': 'inline-block', 'margin-right': '2px' });
    parent.children(".toggle-group.children").show("fast");
  }

  function hide(element) {
    var parent = $(element).parentsUntil("toggle-group.container");
    parent.children(".toggle-group.show-label").show();
    parent.children(".toggle-group.hide-label").hide();
    parent.children(".toggle-group.children").hide("fast");
  }

  function beforeDownload() {
    var elements = document.getElementsByTagName("link");
    for (var i = 0; i < elements.length; i++) {
      var link = elements[i];
      var attributes = link.attributes;
      for (var a = 0; a < attributes.length; a++) {
        var attr = attributes[a];
        if (attr.name === "href") {
          if (attr.nodeValue.length > 0) {
            if (attr.nodeValue[0] === "/") {
              attr.nodeValue = window.location.origin + attr.nodeValue;
            }
          }
        }
        console.log(attr);
      }
    }
    var scripts = document.getElementsByTagName("script");
    for (var b = 0; b < scripts.length; b++) {
      var script = scripts[b];
      script.parentNode.removeChild(script);
    }
  }

  return {
    BeforeDownload: beforeDownload,
    Show: show,
    Hide: hide,
    AttachListeners: attachListeners,
    Init: function () {
      $(document).ready(function () {
        attachListeners();
        // Events handlers 
        $(this).off("click", ".ais-detail-send-via-email-script");
        $(this).off("click", ".ais-detail-add-comment-script");
        $(this).off("click", ".ais-detail-add-tag-script");
        $(this).off("click", ".ais-read-more-comments-script");
        $(this).off("click", ".ais-detail-add-tag-submit-script");
        $(this).off("click", ".ais-tag-lookup-button-script");
        $(this).off("click", ".ais-detail-audio-icon-script");
        $(this).off("click", ".ais-detail-video-icon-script");

        $(this).off("click", "#ais-details .ais-comments-script span.comment-approve-script");
        $(this).off("click", "#ais-details .ais-comments-script span.comment-reject-script");

        $(this).off("click", "#ais-details .tag-admin-mode-script span.tag-approve-script");
        $(this).off("click", "#ais-details .tag-admin-mode-script span.tag-reject-script");
        $(window).off("scroll");
        var rtfFields = $(".rtf-field");
        if (rtfFields.length > 0) {
          rtfFields.each(function (index, element) {
            var text = element.innerHTML;
            $.ajax({
              type: 'POST',
              url: AIS.Helpers.ResolveUrl("RtfToHtml"),
              dataType: "text",
              data: { rtfText: text },
              success: function (data) {
                element.innerHTML = data;
              },
              error: function (error) {
                element.html("An error occured parsing the Rtf to Html");
              }
            });
          });
        }
        $("#mmplayer").on("change", function (event) {
          $(".ais-multimedia-container").hide();
          var showClass = "." + $(this).val();
          $(showClass).show();
        });
        $(this).on("click", ".ais-detail-audio-icon-script", function (event) {
          var sender = $(this);

          if ($(sender).siblings(".comment-audio-element").children("object").hasClass("ais-display-none")) { $(sender).siblings(".comment-audio-element").children("object").removeClass("ais-display-none"); }
          else { $(sender).siblings(".comment-audio-element").children("object").addClass("ais-display-none"); }
        });

        $(this).on("click", ".ais-detail-video-icon-script", function (event) {

          var sender = $(this);

          if ($(sender).siblings(".comment-video-element").children("object").hasClass("ais-display-none")) { $(sender).siblings(".comment-video-element").children("object").removeClass("ais-display-none"); }
          else { $(sender).siblings(".comment-video-element").children("object").addClass("ais-display-none"); }

        });

        $(this).on("click", ".ais-detail-send-via-email-script", function (event) {
          event.preventDefault();
          AIS.Views.Detail.OpenSendViaEmailPopup();
        });

        $(this).on("click", ".ais-detail-add-comment-script", function (event) {
          event.preventDefault();
          AIS.Views.Detail.OpenAddComment(event);
        });

        $(this).on("click", ".ais-detail-add-tag-script", function (event) {
          event.preventDefault();
          AIS.Views.Detail.OpenAddTag();
        });

        $(this).on("click", "#ais-details .selector-script", function (event) {
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

        $(this).on("click", ".ais-detail-image-viewer-link-script", function (event) {
          event.preventDefault();
        });

        $(this).on("click", ".ais-detail-image-viewer-script", function (event) {
          AIS.ImageViewer.Open($(this));
        });

        $(this).on("click", "#ais-details .hierarchy .fold-script", function (event) {
          var sender = $(this);
          $(sender).addClass("unfold-script");
          $(sender).removeClass("fold-script");
          var hierarchyNode = $(sender).siblings(".hierarchy-node");
          $(sender).children(".fold").hide();
          $(sender).children(".unfold").show();
          hierarchyNode.children("ul").remove();
        });

        // 2 options for hierarchy: old: builds hierarchy in memory when searching > times out with large hierarchy
        // new: uses raw record to retrieve priref list of children > retrieves list of children per 10 records
        $(this).on("click", "#ais-details .hierarchy .unfold-script", function (event) {
          var sender = $(this);
          $(sender).addClass("fold-script");
          $(sender).removeClass("unfold-script");
          var page = $(this).attr('page');
          $(sender).children(".unfold").hide();
          $(sender).children("div").remove();
          $(sender).children(".spinner").show();
          var priref = $(this).attr('startPriref');
          var direction = $(this).attr('direction');
          if ($(sender).siblings(".hierarchy-node").children("ul.ais-children-hierarchy").length === 0) {

            var hierarchyNode = $(sender).siblings(".hierarchy-node");

            // create list (<UL></UL>) of nodes in case it doesn't exist
            if (hierarchyNode.children("ul").length === 0) {

              hierarchyNode.append(document.createElement("ul"));
            }
            else {

              hierarchyNode.children("ul").children("li").each(function (i) {
                //AIS.Views.Detail.SetChildrenHierarchy(this);
              });
              hierarchyNode.children("ul").empty();
            }

            // load the first children
            // old version: record with parts //AIS.Views.Detail.CheckLoadChildrenHierarchy(sender, page, function (initSender, initResult) {
            // new version: recordList with records 
            AIS.Views.Detail.CheckLoadParts(sender, priref, direction);
          }
          else
            $(sender).children(".spinner").hide();
        });


        $(this).on("click", ".ais-popupwrapper-script .ais-send-via-email-container .ais-send-via-email-submit-script", function (event) {

          var priref = $(".record-selector").attr("data-priref");
          var databaseName = $(".ais-database-name").val();
          var databaseDataSet = $(".ais-sitename-value").val();

          var fromName = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-FromName").val();
          var toName = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-ToName").val();
          var toEmail = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-ToEmail").val();
          var subject = $(".ais-popupwrapper-script .ais-send-via-email-container input#Email-Subject").val();
          var messageBody = $(".ais-popupwrapper-script .ais-send-via-email-container textarea#Email-MessageBody").val();
          $.ajax({

            url: AIS.Helpers.ResolveUrl("Details/senddetailsviaemail"),
            dataType: "json",
            data: {
              Priref: priref,
              DatabaseName: databaseName,
              DatabaseDataSet: databaseDataSet,
              FromName: fromName,
              ToName: toName,
              ToEmail: toEmail,
              Subject: subject,
              MessageBody: messageBody
            },
            success: function (response) {
              $(".ais-message-element").html(AIS.Helpers.Translate(response.message));
              if (response.success === true) {
                var remaining = 5; // Number of seconds
                var obj = document.getElementById("SecondsRemaining");
                obj.innerHTML = "[" + remaining + "]";
                var timeout = window.setInterval(function () {
                  remaining--;
                  if (remaining == 0) {
                    // Time is up, stop the timer and hide the bootbox
                    window.clearInterval(timeout);
                    AIS.Views.Detail.Popup().dialog('close');
                    return;
                  }
                  obj.innerHTML = "[" + remaining + "]";
                }, 1000);
              }
            }
          });
        });

        $(this).on("click", ".ais-read-more-comments-script", function (event) {
          AIS.Views.Detail.OpenAllComments();
        });

        //$("#ais-detail-add-comment-form").ajaxForm({
        //  dataType: 'json',
        //  success: function (json) {
        //    if (json.type !== "Success") {
        //      $("#ais-detail-add-comment-form .ais-message-element").html(json.message);
        //    }
        //    else {
        //      var priRef = $("#ais-detail-add-comment-form #PriRef").val();
        //      var databaseName = $("#ais-detail-add-comment-form .ais-database-name-value").val();
        //      var datasetName = $("#ais-detail-add-comment-form .ais-dataset-name-value").val();
        //      AIS.Views.Detail.UpdateCommentsSection(priRef, databaseName, datasetName);
        //      $("#ais-detail-add-comment-form")[0].reset();
        //      AIS.Views.Detail.Popup().dialog("close");
        //      AIS.Helpers.ScrollToTop();
        //      AIS.Helpers.AddTempSuccessUserMessage(json.message, false);
        //    }
        //  }
        //});

        AIS.Views.Detail.SetAddCommentAjaxForm();

        $(this).on("click", ".ais-detail-add-tag-submit-script", function (event) {
          event.preventDefault();
          AIS.Views.Detail.SubmitTag();
        });

        $(this).on("click", "#ais-details .ais-comments-script span.comment-approve-script", function (event) {

          var sender = $(this);
          var priref = $(sender).siblings(".ais-comment-priref-value").val();

          $.ajax({
            type: "get",
            url: AIS.Helpers.ResolveUrl("Details/approvecomment"),
            dataType: "json",
            data: { priref: priref },
            success: function (data) {
              $(sender).parent().remove();
            }
          });

        });

        $(this).on("click", "#ais-details .tag-admin-mode-script span.tag-approve-script", function (event) {

          var sender = $(this);
          var priref = $(sender).siblings(".ais-tag-priref-value").val();

          $.ajax({
            type: "get",
            url: AIS.Helpers.ResolveUrl("Details/approvetag"),
            dataType: "json",
            data: { priref: priref },
            success: function (data) {
              $(sender).parent().remove();
            }
          });

        });

        $(this).on("click", "#ais-details .ais-comments-script span.comment-reject-script", function (event) {

          var sender = $(this);
          var priref = $(sender).siblings(".ais-comment-priref-value").val();

          $.ajax({
            type: "get",
            url: AIS.Helpers.ResolveUrl("Details/rejectcomment"),
            dataType: "json",
            data: { priref: priref },
            success: function (data) {
              $(sender).closest(".ais-comment").remove();
            }
          });

        });

        $(this).on("click", "#ais-details .tag-admin-mode-script span.tag-reject-script", function (event) {

          var sender = $(this);
          var priref = $(sender).siblings(".ais-tag-priref-value").val();

          $.ajax({
            type: "get",
            url: AIS.Helpers.ResolveUrl("Details/rejecttag"),
            dataType: "json",
            data: { priref: priref },
            success: function (data) {
              $(sender).closest(".tag-admin-mode-script").remove();
            }
          });


        });

        $(this).on("click", ".ais-tag-lookup-button-script", function (event) {

          AIS.PopupLookup.Open(
            "/helper/GetExternalLookupValues",
            {
              database: "tagging",
              fieldName: "tag"
            },
            "Tag",
            $(".ais-detail-add-tag-form-element input#Tag").val(),
            null
          );
        });

      });
    },

    GetChildrenHierarchy: function (element) {
      var store = $(".hierarchy")[0];
      var priref = $(element).find("input.ais-priref-value").first().val();

      var savedElement = $.data(store, priref);
      if (savedElement !== undefined)
        return savedElement;

      $.data(store, priref, element);
      return element;
    },

    SetChildrenHierarchy: function (element) {
      var store = $(".hierarchy")[0];
      var priref = $(element).find("input.ais-priref-value").first().val();

      $.data(store, priref, element);
    },

    //load can work in 3 direction, above, below or both
    CheckLoadParts: function (unfoldSender, currentpriref, direction) {

      var recordsPerDirection = 5;

      var priref = unfoldSender.attr("priref");
      var locationArray = location.pathname.split('/');
      var locationPriref = locationArray[locationArray.length - 1];

      var parent;
      var hierarchyNode;
      if (unfoldSender.hasClass("ais-hierarchy-load-more-results")) {
        parent = unfoldSender.parent().siblings("#ais-hierarchy-parent-" + priref).first();
        hierarchyNode = unfoldSender.parent();
      }
      else {
        parent = unfoldSender.siblings(".hierarchy-folder.hierarchy-node").first().children("#ais-hierarchy-parent-" + priref).first();
        hierarchyNode = unfoldSender.siblings(".hierarchy-folder.hierarchy-node").first().children("ul").first();
      }
      var prirefs = parent.val().split(",");
      var prirefSlice = prirefs;
      //process the slice of records to be retrieved
      var currentPosition;
      var startPosition;
      var endPosition;

      if (parent.hasClass("limited-hierarchy")) {

        //if no start priref is passed, use the current record priref
        if (!currentpriref) {
          currentpriref = locationPriref;
        }
        currentPosition = prirefs.indexOf(currentpriref);
        startPosition = currentPosition - recordsPerDirection;
        endPosition = currentPosition + recordsPerDirection;
        if (currentPosition === -1) {
          currentPosition = 0;
          startPosition = 0;
          endPosition = 10;
        }
        switch (direction) {
          case "above":
            endPosition = currentPosition;
            startPosition = currentPosition - recordsPerDirection * 2;
            break;
          case "below":
            startPosition = currentPosition;
            endPosition = currentPosition + recordsPerDirection * 2;
            break;
          default:
            if (currentPosition == 0)
              endPosition += recordsPerDirection;
            break;
        }
      }
      else {
        if (!currentpriref) {
          currentPosition = 0;
        }
        else {
          currentPosition = prirefs.indexOf(currentpriref);
        }
        startPosition = currentPosition;
        endPosition = currentPosition + recordsPerDirection * 2;
      }
      //clamp start value to the array
      if (startPosition < 0) {
        startPosition = 0;
      }
      //clamp end value to the array
      if (endPosition > prirefs.length) {
        endPosition = prirefs.length - 1;
      }
      prirefSlice = prirefs.slice(startPosition, endPosition + 1);

      //var prirefs = $("input[id='ais-hierarchy-parent-" + priref + "'][class='ais-hierarchy-prirefs'][page='" + loadPage + "']").val();
      var sortfield = parent.attr("sort");
      var searchfield = parent.attr("field");
      //slice the array to get just the prirefs we want and join them to pass as a string
      var searchvalue = (searchfield === "priref") ? prirefSlice.join() : priref;
      var startfromvalue = 0;

      var hierarchyDb = parent.attr("database");

      $.ajax({
        url: AIS.Helpers.ResolveUrl("Details/detailsParts"),
        dataType: "html",
        type: "get",
        async: true,
        data: {
          database: hierarchyDb,
          field: searchfield,
          value: searchvalue,
          sort: sortfield,
          startfrom: startfromvalue,
          prirefs: searchvalue,
          parentPriref: priref,
          stylesheet: "detailArchiveParts",
          page: 1
        },
        success: function (data) {
          $(unfoldSender).children(".spinner").hide();
          $(unfoldSender).children(".fold").show();
          // add the data
          $(data).children("li").each(function (i) {
            var item = AIS.Views.Detail.GetChildrenHierarchy(this);
            if ($(item).attr("id").indexOf(locationPriref) > 0) $(item).addClass("ais-current");
            switch (direction) {
              case "above":
                $(item).insertBefore(hierarchyNode.children(".ais-hierarchy-load-more-results.above"));
                break;
              default:
                hierarchyNode.append($(item));
            }
          });
          // Determine if it is last page
          var hasMoreBelow = endPosition < prirefs.length - 1;
          var hasMoreAbove = startPosition > 0;

          //var lastPageElementId = "ais-hierarchy-node-" + priref + "-last";
          //lastPage = ($(data).siblings("#" + lastPageElementId).length > 0);
          //lastPage = ($("input[id='ais-hierarchy-parent-" + priref + "'][class='ais-hierarchy-prirefs'][page='" + loadPage + "']").attr("mode") != undefined);

          //update the button if loading more above or loading above and below
          if (direction != "below") {
            hierarchyNode.children(".ais-hierarchy-load-more-results.above").remove();
            //if not last page, appen link "load more results..."
            if (hasMoreAbove) {
              if (hierarchyNode.children(".ais-hierarchy-load-more-results.above").length === 0) {
                var first = hierarchyNode.children("li").first().children(".ais-priref-value").val();
                hierarchyNode.prepend
                  (
                  "<li class='ais-hierarchy-load-more-results above unfold-down ais-hierarchy-node-li unfold-script parts' priref='" + priref + "' startPriref='" + first + "' direction='above'>" +
                  "<div>" + AIS.Helpers.Translate("Label_LoadMoreAboveResults") + "</div>" +
                  "<i class='spinner fa fa-spinner fa-spin' style='display:none' />" +
                  "</li>"
                  );
              }
              else {
                var loadElement = hierarchyNode.children(".ais-hierarchy-load-more-results:last");
                loadElement.parent().append(loadElement);
              }
            }
            else {
              hierarchyNode.children("ul").children(".ais-hierarchy-load-more-results.above").hide();
            }
            hierarchyNode.children(".spinner").remove();
          }
          //update the button if loading more below or loading above and below
          if (direction !== "above") {
            hierarchyNode.children(".ais-hierarchy-load-more-results.below").remove();
            if (hasMoreBelow) {
              if (hierarchyNode.children(".ais-hierarchy-load-more-results.below").length === 0) {
                var last = hierarchyNode.children("li").last().children(".ais-priref-value").val();
                hierarchyNode.append
                  (
                  "<li class='ais-hierarchy-load-more-results below unfold-down ais-hierarchy-node-li unfold-script parts' priref='" + priref + "' startpriref='" + last + "' direction='below'>" +
                  "<div><i class='far fa-caret-square-down'></i>" + AIS.Helpers.Translate("Label_LoadMoreBelowResults") + "</div>" +
                  "<i class='spinner fa fa-spinner fa-spin' style='display:none' />" +
                  "</li>"
                  );
              }
              else {
                loadElement = hierarchyNode.children(".ais-hierarchy-load-more-results:last");
                loadElement.parent().append(loadElement);
              }
            }
            else {
              hierarchyNode.children(".ais-hierarchy-load-more-results.below").hide();
            }
          }
        },
        error: function (data) {
          // Remove loaders
          $(unfoldSender).children(".spinner").hide();
        }
      });
    },

    OpenSendViaEmailPopup: function () {
      $.ajax({
        type: "get",
        url: AIS.Helpers.ResolveUrl("results/getsendviaemailform"),
        dataType: "json",
        success: function (data) {

          AIS.Views.Detail.Popup().html(data.content);
          AIS.Views.Detail.Popup().dialog({
            modal: true,
            title: data.title,
            resizable: false,
            width: 'auto'
          });
        }
      });

    },

    RtfToHtml: function (sender) {
      $.ajax({
        type: 'POST',
        url: AIS.Helpers.ResolveUrl("RtfToHtml"),
        dataType: "text",
        data: {
          rtfText: text
        },
        success: function (data) {
          sender.html(data);
        },
        error: function (error) {
          sender.html("An error occured parsing the Rtf to Html");
        }
      });
    },

    Popup: function () { return $(".ais-popupwrapper-script"); },

    PopupMessageBox: function () { return $(".ais-popupwrapper-script .ais-send-via-email-container .ais-message-element"); },

    OpenAddComment: function (event) {
      var record = event.target.closest(".add-comment-button");
      $.ajax({

        url: AIS.Helpers.ResolveUrl("Details/getaddcommentform"),
        dataType: "json",
        data: {
          priRef: record.attributes["priref"].value,
          databaseName: record.attributes["database"].value,
          dataSet: record.attributes["dataset"].value,
        },
        success: function (data) {

          AIS.Views.Detail.Popup().html(data.content);
          AIS.Views.Detail.Popup().dialog({
            modal: true,
            title: data.title,
            resizable: false,
            width: 'auto'
          });

          AIS.Views.Detail.SetAddCommentAjaxForm();
        }
      });
    },

    SetAddCommentAjaxForm: function () {
      $("#ais-detail-add-comment-form").ajaxForm({

        dataType: 'json',
        success: function (json) {

          if (json.type !== "Success") {
            $("#ais-detail-add-comment-form .ais-message-element").html(json.message);
          }
          else {
            var priRef = $("#ais-detail-add-comment-form #PriRef").val();
            var databaseName = $("#ais-detail-add-comment-form .ais-database-name-value").val();
            var datasetName = $("#ais-detail-add-comment-form .ais-dataset-name-value").val();

            AIS.Views.Detail.UpdateCommentsSection(priRef, databaseName, datasetName);

            $("#ais-detail-add-comment-form")[0].reset();
            AIS.Views.Detail.Popup().dialog("close");

            AIS.Helpers.ScrollToTop();

            AIS.Helpers.AddTempSuccessUserMessage(json.message, false);
          }
        }
      });
    },

    OpenAllComments: function () {

      $.ajax({

        url: AIS.Helpers.ResolveUrl("Details/getallcomments"),
        dataType: "json",
        data: {
          priRef: $(".record-selector").attr("data-priref"),
          databaseName: $(".record-selector").attr("data-database"),
          dataSet: $(".ais-sitename-value").val()
        },
        success: function (data) {
          $(".ais-comments-container-element").html(data.content);
        }
      });
    },

    OpenAddTag: function () {

      $.ajax({
        url: AIS.Helpers.ResolveUrl("Details/getaddtagform"),
        dataType: "json",
        data: {
          priRef: $(".record-selector").attr("data-priref"),
          databaseName: $(".record-selector").attr("data-database"),
          dataSet: $(".ais-sitename-value").val()
        },
        success: function (data) {

          AIS.Views.Detail.Popup().html(data.content);
          AIS.Views.Detail.Popup().dialog({
            modal: true,
            title: data.title,
            resizable: false,
            width: 'auto'
          });
        }
      });
    },

    SubmitTag: function () {

      // get values
      var tag = $(".ais-detail-add-tag-form-element input[name='Tag']").val();
      var priRef = $(".ais-detail-add-tag-form-element .ais-priref-value").val();
      var databaseName = $(".ais-detail-add-tag-form-element .ais-database-name-value").val();
      var datasetName = $(".ais-detail-add-tag-form-element .ais-dataset-name-value").val();

      // arrange ajax requezt

      $.ajax({

        url: AIS.Helpers.ResolveUrl("Details/detailsaddtag"),
        dataType: "json",

        data: {
          Tag: tag,

          PriRef: priRef,
          DatabaseName: databaseName,
          DataSet: datasetName
        },

        success: function (data) {

          if (data.type !== "Success") {
            $(".ais-detail-add-tag-form-element .ais-message-element .ais-user-message").html(data.message);
          }
          else {

            $(".ais-detail-add-tag-form-element")[0].reset();
            AIS.Views.Detail.Popup().dialog("close");

            AIS.Helpers.ScrollToTop();

            AIS.Views.Detail.UpdateTagsSection(priRef, databaseName, datasetName);
          }
        }
      });
    },

    UpdateTagsSection: function (priRef, databaseName, datasetName) {

      $.ajax({
        url: AIS.Helpers.ResolveUrl("Details/gettagssection"),
        dataType: "html",
        data: {
          PriRef: priRef,
          DatabaseName: databaseName,
          DataSet: datasetName
        },
        success: function (data) {
          $(".ais-tagging-container-element").html(data);
        }
      });
    },

    UpdateCommentsSection: function (priRef, databaseName, datasetName) {

      $.ajax({
        url: AIS.Helpers.ResolveUrl("Details/getcommentssection"),
        dataType: "html",
        data: {
          PriRef: priRef,
          DatabaseName: databaseName,
          DataSet: datasetName
        },
        success: function (data) {
          $(".ais-comments-container-element").html(data);
        }
      });
    }
  };
}();

AIS.Views.Detail.Init();