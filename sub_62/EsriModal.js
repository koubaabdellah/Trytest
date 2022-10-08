var _modal;

function EsriModal(specs) {
    var self = this;
    var defaults = {
        autoInit: true,
        overlay: "#modalOverlay",
        container: ".modal-content-panel",
        active: "active"
    };
    this.specs = $.extend(defaults, specs);
    var active = self.specs.active;
    this.init = function() {
        var overlays = $(self.specs.overlay).length;
        if (!overlays) {
            $("body").append('<div id="modalOverlay"></div>');
        }
    };
    this.currentModal;
    this.showModal = function (contentID) {
        var height = $(window).height();
        var top = window.pageYOffset + (height - 650) / 2-30;
        $(self.specs.overlay).addClass(active);
        $(self.specs.container).removeClass(active);
        var modal = $(self.specs.container + "[data-contentid=" + contentID + "]");
        modal.addClass(active);
        var ds = modal.find("iframe").attr("data-src");
        if (modal.hasClass("modal-video")) {
            modal.find("iframe").attr("src", ds);
        }
        this.currentModal = modal;
        modal.attr("style","top:"+top+"px; ");
    };
    this.hideModal = function() {
        $(self.specs.container).removeClass(active);
        $(self.specs.overlay).removeClass(active);
        this.currentModal.find(".modal-video").find("iframe");
        var modal = this.currentModal;
        if (modal.hasClass("modal-video")) {
            modal.find("iframe").attr("src", "");
        }
        this.currentModal = null;
    };
    _modal = self;
    self.specs.autoInit && self.init();
    return this;
}

$(document).ready(function() {
    var modal = new EsriModal();
    $(window).load(_initEsriModalResponsive);
    $(window).resize(_initEsriModalResponsive);
});

function _initEsriModalResponsive() {
    var width = $(window).width();
    var vidSize = 960;
    var vidCss = "evlarge";
    var active = "";
    if (width > 1e3) {
        vidSize = 960;
        vidCss = "evlarge";
    } else if (width > 760) {
        vidSize = 720;
        vidCss = "evmedium";
    } else if (width > 560) {
        vidSize = 480;
        vidCss = "evsmall";
    } else {
        vidSize = 320;
        vidCss = "evxsmall";
    }
    if ($(".modal-video").hasClass("active")) {
        active = "active";
    }
    $(".modal-video").attr({
        "class": "modal-content-panel modal-video " + vidCss + " " + active
    });
    //$(".modal-video .modal-content").css("height", vidSize / (16 / 9));
    //var newVidSrc = $(".modal-video iframe").data("src");
    //newVidSrc = newVidSrc ? newVidSrc.replace(/\/(width)\/[0-9]*\//, "/width/" + vidSize + "/") : "";
    //$(".modal-video iframe").data("src", newVidSrc);
    //if ($(".modal-video iframe").attr("src")) {
    //    $(".modal-video iframe").attr("src", newVidSrc);
    //}
    return;
}