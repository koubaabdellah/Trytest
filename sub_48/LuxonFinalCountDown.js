var LuxonFinalCountDownInstance = null;
var dutch_timeunits = {
    days: "dagen",
    hours: "uren",
    minutes: "minuten",
    seconds: "seconden"
};
var english_timeunits = {
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds"
};

function LuxonFinalCountDown(finalISODateTime) {
    this.interval = null;
    this.finalDate = luxon.DateTime.fromISO(finalISODateTime);
    this.previousDuration = null;
    this.element = Aanmelder.jQuery("#LuxonFinalCountDown");
    this.daysElement = this.element.find("#days").first();
    this.hoursElement = this.element.find("#hours").first();
    this.minutesElement = this.element.find("#minutes").first();
    this.secondsElement = this.element.find("#seconds").first();
    this.debug = false;

    this.update = function() {
        if (this.debug) {
            console.log("LuxonFinalCountDown: update");
        }
        var duration = this.finalDate
            .diffNow(["days", "hours", "minutes", "seconds"])
            .toObject();
        if (duration.seconds < 0) {
            console.log(
                "LuxonFinalCountDown: duration ended for " + finalISODateTime
            );
            console.log(duration);
            this.stop();
            return;
        }
        duration.days = Math.floor(duration.days);
        duration.hours = Math.floor(duration.hours);
        duration.minutes = Math.floor(duration.minutes);
        duration.seconds = Math.floor(duration.seconds);
        if (
            this.previousDuration === null ||
            (this.previousDuration &&
                (duration.days !== this.previousDuration.days ||
                    duration.hours !== this.previousDuration.hours ||
                    duration.minutes !== this.previousDuration.minutes ||
                    duration.seconds !== this.previousDuration.seconds))
        ) {
            this.updateDom(duration);
        }
        this.previousDuration = duration;
    };

    this.start = function() {
        if (this.debug) {
            console.log("LuxonFinalCountDown: start");
        }
        if (this.interval !== null) {
            this.stop();
        }
        this.update();
        var self = this;
        this.interval = setInterval(function() {
            self.update.call(self);
        }, 500);
    };

    this.stop = function() {
        if (this.debug) {
            console.log("LuxonFinalCountDown: stop");
        }
        clearInterval(this.interval);
        this.interval = null;
    };

    this.updateDom = function(duration) {
        if (this.debug) {
            console.log("LuxonFinalCountDown: updateDom");
        }
        if (this.element.length === 0) {
            console.log(
                "LuxonFinalCountDown: no #LuxonFinalCountDown element found to update"
            );
            this.stop();
            return;
        }
        this.daysElement.text(duration.days);
        this.hoursElement.text(duration.hours);
        this.minutesElement.text(duration.minutes);
        this.secondsElement.text(duration.seconds);
    };
}

$(function() {
    var has_luxon = typeof luxon !== "undefined";
    var has_LuxonFinalCountDownISODateTime =
        typeof LuxonFinalCountDownISODateTime !== "undefined";
    var is_home_page =
        typeof AanmelderWikiPageType !== "undefined" &&
        AanmelderWikiPageType === 1500;
    if (is_home_page && has_luxon && has_LuxonFinalCountDownISODateTime) {
        var lang_timeunits;
        if (bespoke_vmn_countdown_dutch_timeunits) {
            lang_timeunits = dutch_timeunits;
        } else {
            lang_timeunits = english_timeunits;
        }

        var use_dutch =
            typeof AanmelderWikiPageType !== "undefined" &&
            AanmelderWikiPageType === 1500;

        $("head").append(
            '<style type="text/css">' +
                "    #LuxonFinalCountDown {" +
                "        background-color: #" +
                bespoke_vmn_countdown_background_color +
                ";" +
                "        text-transform: uppercase; " +
                "        height: 100px; " +
                "    }" +
                "    @media (max-width: 991px) {" +
                "        #LuxonFinalCountDown {" +
                "            height: 200px;" +
                "        }" +
                "    }" +
                "    #LuxonFinalCountDown .countdown-text {" +
                "        height: 100px; " +
                "        background-color: #" +
                bespoke_vmn_countdown_text_background_color +
                ";" +
                "    }" +
                "    #LuxonFinalCountDown h1 {" +
                "        font-weight: 700; " +
                "        margin: 0;" +
                "        padding: 0;" +
                "        padding-top: 20px;" +
                "        color: #" +
                bespoke_vmn_countdown_text_color1 +
                "    }" +
                "    #LuxonFinalCountDown p {" +
                "        color: #" +
                bespoke_vmn_countdown_text_color2 +
                ";" +
                "    }" +
                "    #LuxonFinalCountDown h2 {" +
                "        font-weight: 400; " +
                "        font-size: 40px;" +
                "        padding: 0;" +
                "        padding-top: 20px;" +
                "        margin: 0;" +
                "        color: #" +
                bespoke_vmn_countdown_number_color +
                ";" +
                "    }" +
                "    #LuxonFinalCountDown h3 {" +
                "        font-size: 15px;" +
                "        margin: 0;" +
                "        padding: 0;" +
                "        color: #" +
                bespoke_vmn_countdown_timeunit_color +
                ";" +
                "    }" +
                "</style>"
        );

        var LuxonFinalCountDownTemplate = '<div id="LuxonFinalCountDown" class="container-fluid">' +
                '    <div class="row">' +
                '        <div class="col-md-8 col-sm-12 countdown-text">' +
                '            <h1 class="text-right">' +
                bespoke_vmn_countdown_text_line1 +
                "</h1>" +
                '            <p class="text-right">' +
                bespoke_vmn_countdown_text_line2 +
                "</p>" +
                "        </div>" +
                '        <div class="col-md-1 col-xs-3 text-center">' +
                '            <h2 id="days"></h2>' +
                "            <h3>" +
                lang_timeunits.days +
                "</h3>" +
                "        </div>" +
                '        <div class="col-md-1 col-xs-3 text-center">' +
                '            <h2 id="hours"></h2>' +
                "            <h3>" +
                lang_timeunits.hours +
                "</h3>" +
                "        </div>" +
                '        <div class="col-md-1 col-xs-3 text-center">' +
                '            <h2 id="minutes"></h2>' +
                "            <h3>" +
                lang_timeunits.minutes +
                "</h3>" +
                "        </div>" +
                '        <div class="col-md-1 col-xs-3 text-center">' +
                '            <h2 id="seconds"></h2>' +
                "            <h3>" +
                lang_timeunits.seconds +
                "</h3>" +
                "        </div>" +
                "    </div>" +
                "</div>"
        var $wikisections = $(".wikisections");
        if ($wikisections.length === 1) {
            $(".display-order-1").after(LuxonFinalCountDownTemplate);
        } else {
            $(".maincontentsection").prepend(LuxonFinalCountDownTemplate);
        }
        LuxonFinalCountDownInstance = new LuxonFinalCountDown(
            LuxonFinalCountDownISODateTime
        );
        LuxonFinalCountDownInstance.start();
    }
});
