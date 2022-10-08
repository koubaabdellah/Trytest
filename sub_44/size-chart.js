var size_chart_url;
var size_chart_params;
var size_chart_notavailable;

function changeChartTabs(id, dept) {
    if (!jQuery("#" + id).hasClass("a-loaded")) {
        jQuery("#" + id).addClass("a-loaded");
        getSizeChart(id, dept);
    }

    var tab_id = id.replace(/-tab+$/g, "");
    jQuery("#dept0,#dept1,#dept2").removeClass("a-active");
    jQuery("#" + tab_id).addClass("a-active");

    jQuery("#dept0-tab,#dept1-tab,#dept2-tab").hide();
    jQuery("#" + id).show();
}

function getSizeChart(id, dept) {
    console.log("size=" + id);
    if (id == "size-chart-body") {
        jQuery("#sizeChartModal").modal("show");
    }

    jQuery.ajax({
        type: "POST",
        url: size_chart_url,
        data: {params: size_chart_params, dept: dept, s_id: s_id, lang: lang},
        success: function (size_chart) {

            if (id == "size-chart-body") {
                if (size_chart) {
                    console.log("inssssssssss");
                    jQuery("#" + id).html(size_chart);
                    //jQuery("#tabContent").attr("id", "dept0-tab");
                    //jQuery("#dept0-tab").addClass("a-loaded");
                    //jQuery("#size-chart-body").append('<div id="dept1-tab" style="display: none;"><span class="loading">Loading...</span></div><div id="dept2-tab" style="display: none;"><span class="loading">Loading...</span></div>');
                } else {
                    jQuery("#" + id).html(size_chart_notavailable);
                }
            } else {
                jQuery("#" + id).html(size_chart);
            }
            jQuery(".a-icon-extender-expand").attr("class", "fas fa-angle-down");
            jQuery("#kid #kidLink").contents().unwrap();
            //add table-responsive class to table parent div
            if (jQuery("#size-chart-body").find("table").length > 0) {
                jQuery("#size-chart-body").find("table").parent().addClass("table-responsive");
            }
        }
    });
}

jQuery(document).on("click", "#getSizeChart", function () {
    size_chart_url = jQuery(this).attr("data-url");
    size_chart_params = jQuery(this).attr("data-params");
    size_chart_notavailable = jQuery(this).attr("data-notavailable");
    getSizeChart('size-chart-body', '');
});
jQuery(document).on("click", "#dept0,#dept1,#dept2", function () {
    var tab = jQuery(this).attr("id") + '-tab';
    var dept = jQuery(this).attr("data-deptname");
    changeChartTabs(tab, dept);
});
jQuery(document).on("click", "#expander", function () {
    jQuery(".a-expander-content").toggle();
});
