define(["require", "exports", "tslib", "../../../icons/icons", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/watchUtils"], function (require, exports, tslib_1, icons_1, Widget_1, widget_1, decorators_1, watchUtils_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var Custom = (function (_super) {
        tslib_1.__extends(Custom, _super);
        function Custom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.customSectionData = null;
            _this.messages = null;
            return _this;
        }
        Custom.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "messages", function () {
                _this.customSectionData = {
                    exhibit: {
                        full: {
                            actionIcon: icons_1.default.collection,
                            actionLabel: _this.messages.exhibit.label,
                            sectionHeaderLabel: _this.messages.exhibit.label,
                            sectionHeaderSubtitle: _this.messages.exhibit.subtitle,
                            sectionTip: _this.messages.exhibit.tip,
                            type: "exhibit"
                        },
                        express: {
                            title: _this.messages.exhibit.label,
                            subtitle: _this.messages.exhibit.subtitle,
                            type: "exhibit",
                            tip: _this.messages.exhibit.tip,
                            settings: []
                        }
                    },
                    portfolio: {
                        full: {
                            actionIcon: icons_1.default.widgetsTab,
                            actionLabel: _this.messages.portfolio.label,
                            sectionHeaderLabel: _this.messages.portfolio.label,
                            sectionHeaderSubtitle: _this.messages.portfolio.subtitle,
                            sectionTip: _this.messages.portfolio.tip,
                            type: "portfolio"
                        },
                        express: {
                            title: _this.messages.portfolio.label,
                            subtitle: _this.messages.portfolio.subtitle,
                            type: "portfolio",
                            tip: _this.messages.portfolio.tip,
                            settings: []
                        }
                    },
                    charts: {
                        full: {
                            actionIcon: icons_1.default.chartsGear,
                            actionLabel: _this.messages.charts.label,
                            sectionHeaderLabel: _this.messages.charts.label,
                            sectionHeaderSubtitle: _this.messages.charts.subtitle,
                            sectionTip: _this.messages.charts.tip,
                            type: "charts"
                        },
                        express: {
                            title: _this.messages.charts.label,
                            subtitle: _this.messages.charts.subtitle,
                            type: "charts",
                            tip: _this.messages.charts.tip,
                            settings: []
                        }
                    },
                    countdown: {
                        full: {
                            actionIcon: icons_1.default.collection,
                            actionLabel: _this.messages.countdown.label,
                            sectionHeaderLabel: _this.messages.countdown.label,
                            sectionHeaderSubtitle: _this.messages.countdown.subtitle,
                            sectionTip: _this.messages.countdown.tip2,
                            type: "countdown"
                        },
                        express: {
                            title: _this.messages.countdown.label,
                            subtitle: _this.messages.countdown.subtitle,
                            type: "countdown",
                            tip: _this.messages.countdown.tip2,
                            settings: []
                        }
                    },
                    sidebar: {
                        full: {
                            actionIcon: icons_1.default.sidebar,
                            actionLabel: _this.messages.sidebar.label,
                            sectionHeaderLabel: _this.messages.sidebar.label,
                            sectionHeaderSubtitle: _this.messages.sidebar.subtitle,
                            sectionTip: _this.messages.sidebar.tip,
                            type: "sidebar"
                        },
                        express: {
                            title: _this.messages.sidebar.label,
                            subtitle: _this.messages.sidebar.subtitle,
                            type: "sidebar",
                            tip: _this.messages.sidebar.tip,
                            settings: []
                        }
                    },
                    nearby: {
                        full: {
                            actionIcon: icons_1.default.pin,
                            actionLabel: _this.messages.nearby.label,
                            sectionHeaderLabel: _this.messages.nearby.label,
                            sectionHeaderSubtitle: _this.messages.nearby.subtitle,
                            sectionTip: _this.messages.nearby.tip,
                            type: "nearby"
                        },
                        express: {
                            title: _this.messages.nearby.label,
                            subtitle: _this.messages.nearby.subtitle,
                            type: "nearby",
                            tip: _this.messages.nearby.tip,
                            settings: []
                        }
                    },
                    lookup: {
                        full: {
                            actionIcon: icons_1.default.polygonArea,
                            actionLabel: _this.messages.lookup.label,
                            sectionHeaderLabel: _this.messages.lookup.label,
                            sectionHeaderSubtitle: _this.messages.lookup.subtitle,
                            sectionTip: _this.messages.lookup.tip,
                            type: "lookup"
                        },
                        express: {
                            title: _this.messages.lookup.label,
                            subtitle: _this.messages.lookup.subtitle,
                            type: "lookup",
                            tip: _this.messages.lookup.tip,
                            settings: []
                        }
                    },
                    group: {
                        full: {
                            actionIcon: icons_1.default.group,
                            actionLabel: _this.messages.group.label,
                            sectionHeaderLabel: _this.messages.group.label,
                            sectionHeaderSubtitle: _this.messages.group.subtitle,
                            sectionTip: _this.messages.group.tip,
                            type: "group"
                        },
                        express: {
                            title: _this.messages.group.label,
                            subtitle: _this.messages.group.subtitle,
                            type: "group",
                            tip: _this.messages.group.tip,
                            settings: []
                        }
                    },
                    galleryAbout: {
                        full: {
                            actionIcon: icons_1.default.information,
                            actionLabel: _this.messages.galleryAbout.label,
                            sectionHeaderLabel: _this.messages.galleryAbout.label,
                            sectionHeaderSubtitle: _this.messages.galleryAbout.subtitle,
                            sectionTip: _this.messages.galleryAbout.tip,
                            type: "galleryAbout"
                        },
                        express: {
                            title: _this.messages.galleryAbout.label,
                            subtitle: _this.messages.galleryAbout.subtitle,
                            type: "galleryAbout",
                            tip: _this.messages.galleryAbout.tip,
                            settings: []
                        }
                    },
                    galleryInteractivity: {
                        full: {
                            actionIcon: icons_1.default.gear,
                            actionLabel: _this.messages.galleryInteractivity.label,
                            sectionHeaderLabel: _this.messages.galleryInteractivity.label,
                            sectionHeaderSubtitle: _this.messages.galleryInteractivity.subtitle,
                            sectionTip: _this.messages.galleryInteractivity.tip,
                            type: "galleryInteractivity"
                        },
                        express: {
                            title: _this.messages.galleryInteractivity.label,
                            subtitle: _this.messages.galleryInteractivity.subtitle,
                            type: "galleryInteractivity",
                            tip: _this.messages.galleryInteractivity.tip,
                            settings: []
                        }
                    },
                    galleryTheme: {
                        full: {
                            actionIcon: icons_1.default.palette,
                            actionLabel: _this.messages.galleryTheme.label,
                            sectionHeaderLabel: _this.messages.galleryTheme.label,
                            sectionHeaderSubtitle: _this.messages.galleryTheme.subtitle,
                            sectionTip: _this.messages.galleryTheme.tip,
                            type: "galleryTheme"
                        },
                        express: {
                            title: _this.messages.galleryTheme.label,
                            subtitle: _this.messages.galleryTheme.subtitle,
                            type: "galleryTheme",
                            tip: _this.messages.galleryTheme.tip,
                            settings: []
                        }
                    },
                    slider: {
                        full: {
                            actionIcon: icons_1.default.sliderHorizontal,
                            actionLabel: _this.messages.slider.label,
                            sectionHeaderLabel: _this.messages.slider.label,
                            sectionHeaderSubtitle: _this.messages.slider.subtitle,
                            sectionTip: _this.messages.slider.tip,
                            type: "slider"
                        },
                        express: {
                            title: _this.messages.slider.label,
                            subtitle: _this.messages.slider.subtitle,
                            type: "slider",
                            tip: _this.messages.slider.tip,
                            settings: []
                        }
                    },
                    attachments: {
                        full: {
                            actionIcon: icons_1.default.attachment,
                            actionLabel: _this.messages.attachments.label,
                            sectionHeaderLabel: _this.messages.attachments.label,
                            sectionHeaderSubtitle: _this.messages.attachments.subtitle,
                            sectionTip: _this.messages.attachments.tip,
                            type: "attachments"
                        },
                        express: {
                            title: _this.messages.attachments.label,
                            subtitle: _this.messages.attachments.subtitle,
                            type: "attachments",
                            tip: _this.messages.attachments.tip,
                            settings: []
                        }
                    },
                    interactiveLegend: {
                        full: {
                            actionIcon: icons_1.default.legend,
                            actionLabel: _this.messages.interactiveLegend.label,
                            sectionHeaderLabel: _this.messages.interactiveLegend.label,
                            sectionHeaderSubtitle: _this.messages.interactiveLegend.subtitle,
                            sectionTip: _this.messages.interactiveLegend.tip,
                            type: "interactiveLegend"
                        },
                        express: {
                            title: _this.messages.interactiveLegend.label,
                            subtitle: _this.messages.interactiveLegend.subtitle,
                            type: "interactiveLegend",
                            tip: _this.messages.interactiveLegend.tip,
                            settings: []
                        }
                    }
                };
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Custom.prototype, "customSectionData", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Custom/resources")
        ], Custom.prototype, "messages", void 0);
        Custom = tslib_1.__decorate([
            decorators_1.subclass("Custom")
        ], Custom);
        return Custom;
    }(Widget_1.default));
    return Custom;
});
