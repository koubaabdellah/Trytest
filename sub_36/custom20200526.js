$( document ).ready(function() {

	$('.navbar-toggle').click(function() {
		$('ul.navbar-nav').slideToggle();
	});

	$('.btn-advanced').click(function() {
		$(this).toggleClass('active');
		$('.advanced').slideToggle();
	});

	$('#table-one').click(function() {
		$('.table-not-show-one').slideToggle();
		$('#table-one').toggleClass('active');
	});

    $('#table-two').click(function() {
        $('.table-not-show-two').slideToggle();
        $('#table-two').toggleClass('active');
    });

    $('#table-three').click(function() {
        $('.table-not-show-three').slideToggle();
        $('#table-three').toggleClass('active');
    });

    $('#table-four').click(function() {
        $('.table-not-show-four').slideToggle();
        $('#table-four').toggleClass('active');
    });


	$('.list-item').click(function() {
		$('.list-item > .content').slideToggle();
		$(this).toggleClass('active');
	});



    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);


});

$(function() {
  var tabs = $("#exTab2");

  // For each individual tab DIV, set class and aria role attributes, and hide it
  $(tabs).find(".tab-content > div.tab-pane").attr({
    "class": "tabPanel",
    "role": "tabpanel",
    "aria-hidden": "true"
  }).hide();

  // Get the list of tab links
  var tabsList = tabs.find("ul:first").attr({    
    "role": "tablist"
  });

  // For each item in the tabs list...
  $(tabsList).find("li > a").each(
    function(a) {
      var tab = $(this);

      // Create a unique id using the tab link's href
      var tabId = "tab-" + tab.attr("href").slice(1);

      // Assign tab id, aria and tabindex attributes to the tab control, but do not remove the href
      tab.attr({
        "id": tabId,
        "role": "tab",
        "aria-selected": "false",
        "tabindex": "-1"
      }).parent().attr("role", "presentation");

      // Assign aria attribute to the relevant tab panel
      $(tabs).find(".tabPanel").eq(a).attr("aria-labelledby", tabId);

      // Set the click event for each tab link
      tab.click(
        function(e) {
          // Prevent default click event
          e.preventDefault();

          // Change state of previously selected tabList item
          $(tabsList).find("> li.active").removeClass("active").find("> a").attr({
            "aria-selected": "false",
            "tabindex": "-1"
          });

          // Hide previously selected tabPanel
          $(tabs).find(".tabPanel:visible").attr("aria-hidden", "true").hide();

          // Show newly selected tabPanel
          $(tabs).find(".tabPanel").eq(tab.parent().index()).attr("aria-hidden", "false").show();

          // Set state of newly selected tab list item
          tab.attr({
            "aria-selected": "true",
            "tabindex": "0"
          }).parent().addClass("active");
          tab.focus();
        }
      );
    }
  );

  // Set keydown events on tabList item for navigating tabs
  $(tabsList).delegate("a", "keydown",
    function(e) {
      var tab = $(this);
      switch (e.which) {
        case 37:
          //case 38:
          if (tab.parent().prev().length != 0) {
            tab.parent().prev().find("> a").click();
          } else {
            $(tabsList).find("li:last > a").click();
          }
          break;
        case 39:
          //case 40:
          if (tab.parent().next().length != 0) {
            tab.parent().next().find("> a").click();
          } else {
            $(tabsList).find("li:first > a").click();
          }
          break;
      }
    }
  );

  // Show the first tabPanel
  $(tabs).find(".tabPanel:first").attr("aria-hidden", "false").show();

  // Set state for the first tabsList li
  $(tabsList).find("li:first").addClass("active").find(" > a").attr({
    "aria-selected": "true",
    "tabindex": "0"
  });
});