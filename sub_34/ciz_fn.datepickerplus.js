var process = process || {env: {NODE_ENV: "development"}};
(function ($) {
    $.fn.datepickerplus = function () {
        function setDateFields(text, inst) {
            var myDiv = $(inst.input).closest("span.datepickerplus");
            $("select[name$=_day]", myDiv).val(parseInt(text.split('-')[0], 10)).removeClass("errorBorder");
            $("select[name$=_month]", myDiv).val(parseInt(text.split('-')[1], 10)).removeClass("errorBorder");
            $("select[name$=_year]", myDiv).val(parseInt(text.split('-')[2], 10)).removeClass("errorBorder");
            myDiv.trigger("change");
        }

        var datepickerOptions = {
            showOn: "button",
            buttonImage: 'assets/calendar.png',
            buttonImageOnly: true,
            buttonText : 'kalender',
            dateFormat: 'dd-mm-yy',
            onSelect: setDateFields
        };

        return this.each(function () {
            var self = $(this),
                myPrefix = self.data("nameoffields"),
                myDiv = self.closest("span.datepickerplus"),
                text = myPrefix + "_datepicker",
                myInput = $("<input type='hidden' name='" + text + "' id='" + text + "'></input>");

            myInput.insertAfter(self.find("select[name$=_year]")).datepicker(datepickerOptions);

            $("select", myDiv).change(function () {
                var day = $("select[name$=_day]", myDiv).val(),
                    month = $("select[name$=_month]", myDiv).val(),
                    year = $("select[name$=_year]", myDiv).val(),
                    newDate = new Date();

                if (day === "" || month === "" || year === "") {
                    //no real date, so we keep the day of today
                } else {
                    newDate = new Date(year, month - 1, day);
                }

                if (day === "" && month === "" && year === "") {
                    newDate = null
                }

                myInput.datepicker("setDate", newDate);
            }).change();
            //triggers the change so the values from the select are set to the datepicker
        });
    };
}(jQuery));

$(document).ready(function () {
    $("span.datepickerplus").datepickerplus();
});
