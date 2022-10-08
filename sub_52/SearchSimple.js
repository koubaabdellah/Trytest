if (typeof (AIS) !== "object") { var AIS = new Object(); }
if (typeof (AIS.Views) !== "object") { AIS.Views = new Object(); }
if (typeof (AIS.Views.SearchSimple) !== "object") { AIS.Views.SearchSimple = new Object(); }

AIS.Views.SearchSimple = function () {
    var databaseSelected = "Film";
    return {

        Init: function () {
            $(document).ready(function () {


                /* autocomplete aka suggest works only with NEW api */
                $('.ais-form .autocomplete-script.webapi').each(function (event) {
                    $(this).autocomplete({
                        source: function (request, response) {
                            var qid = $("#q-search-id").val();
                            $.ajax({
                                type: "GET",
                                async: true,
                                url: AIS.Helpers.ResolveUrl("helper/GetSuggestionValues"),
                                dataType: "json",
                                data:
                                {
                                    database: databaseSelected,
                                    term: request.term,
                                    qSearchId: qid
                                },
                                success: function (data) {
                                    var recordList = data["adlibJSON"]["recordList"]["record"];
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
              $('#DatabaseChoices_0__Selected').on("change", function (event) {
                    if ($(this).prop("checked")) databaseSelected = "collect";

                });
              $('#DatabaseChoices_1__Selected').on("change", function (event) {
                    if ($(this).prop("checked")) databaseSelected = "fullcatalogue";
                    else databaseSelected = "collect";

                });
              $('#DatabaseChoices_2__Selected').on("change", function (event) {
                    if ($(this).prop("checked")) databaseSelected = "archive";
                    else databaseSelected = "collect";

                });
            });

        }
    };
}();

AIS.Views.SearchSimple.Init();


