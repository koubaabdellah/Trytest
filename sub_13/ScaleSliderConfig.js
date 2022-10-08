define(["require", "exports", "tslib", "../BaseComponent", "esri/intl", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Slider", "./scalePreviewUtils", "./ScaleRanges", "./ScaleSliderViewModel", "esri/widgets/support/widget", "esri/core/Handles", "dojo/on"], function (require, exports, tslib_1, BaseComponent, intl_1, watchUtils_1, decorators_1, Slider, scalePreviewUtils_1, ScaleRanges, ScaleSliderViewModel, widget_1, Handles, on) {
    "use strict";
    var CSS = {
        base: "esri-scale-range-slider",
        sliderLabel: "esri-scale-range-slider__slider-label",
        scaleIndicator: "esri-scale-range-slider__scale-indicator",
        scaleIndicatorIcon: "esri-scale-range-slider__scale-indicator-icon",
        scaleIndicatorContainer: "esri-scale-range-slider__scale-indicator-container",
        scaleMenuContainer: "esri-scale-range-slider__scale-menu-container",
        scaleMenuToggle: "esri-scale-range-slider__scale-menu-toggle",
        scaleMenuToggleIcon: "esri-scale-range-slider__scale-menu-toggle-icon",
        scaleMenuToggleActive: "esri-scale-range-slider__scale-menu-toggle--active",
        scaleMenu: "esri-scale-range-slider__scale-menu",
        scaleMenuList: "esri-scale-range-slider__scale-menu-list",
        scaleMenuListItem: "esri-scale-range-slider__scale-menu-item",
        scaleMenuListItemActive: "esri-scale-range-slider__scale-menu-item--active",
        scaleMenuScroller: "esri-scale-range-slider__scale-menu-scroller",
        scaleItemLabel: "esri-scale-range-slider__scale-item-label",
        scaleItemValue: "esri-scale-range-slider__scale-item-value",
        scaleItemValueEditable: "esri-scale-range-slider__scale-item-value--editable",
        scalePreview: "esri-scale-range-slider__scale-preview",
        scalePreviewThumbnail: "esri-scale-range-slider__scale-preview-thumbnail",
        slider: "esri-slider",
        expandIcon: "esri-icon-down",
        heading: "esri-widget__heading",
        hidden: "esri-hidden",
        input: "esri-input",
        button: "esri-button",
        disabled: "esri-disabled",
        widget: "esri-widget"
    };
    var DEFAULT_VISIBLE_ELEMENTS = { preview: false };
    var scaleFormattingOptions = {
        maximumFractionDigits: 0
    };
    var formatScale = function (scale) {
        return "1:" + intl_1.formatNumber(scale, scaleFormattingOptions);
    };
    var parseScale = function (scaleText) {
        var nonDigitPeriodAndWhiteSpacePattern = /[^\d.\s]/g;
        var scaleValue = scaleText
            .replace(/.*\(/, "")
            .replace(/\).*$/, "")
            .replace(/.*:/, "")
            .replace(nonDigitPeriodAndWhiteSpacePattern, "");
        return parseFloat(scaleValue);
    };
    var ScaleSliderConfig = (function (_super) {
        tslib_1.__extends(ScaleSliderConfig, _super);
        function ScaleSliderConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._activeMenu = null;
            _this._activeMenuNode = null;
            _this._activeMenuToggleNode = null;
            _this._activeThumb = null;
            _this._customMaxScale = -1;
            _this._customMinScale = -1;
            _this._focusedMenuItemIndex = -1;
            _this._previewAutoCloseTimeoutId = null;
            _this._scaleMenuNode = null;
            _this._slider = new Slider({
                draggableSegmentsEnabled: false,
                thumbCreatedFunction: function (index, _value, node) {
                    if (index === 0) {
                        _this._minThumbNode = node;
                    }
                    if (index === 1) {
                        _this._maxThumbNode = node;
                    }
                    _this.own([
                        on(node, "mouseenter", function () {
                            var preview = _this.visibleElements.preview;
                            _this._activeThumb = index;
                            _this.scheduleRender();
                        }),
                        on(node, "mouseleave", function () {
                            if (_this._previewAutoCloseTimeoutId) {
                                return;
                            }
                            _this._activeThumb = null;
                            _this.scheduleRender();
                        }),
                        on(node.parentElement, "keyup", function () {
                            _this._updateOutput();
                        })
                    ]);
                }
            });
            _this.disabled = false;
            _this.maxScale = null;
            _this.maxScaleLimit = null;
            _this.minScale = null;
            _this.minScaleLimit = null;
            _this.region = "US";
            _this.view = null;
            _this.viewModel = new ScaleSliderViewModel();
            _this.visibleElements = DEFAULT_VISIBLE_ELEMENTS;
            _this.handles = new Handles();
            _this._handleScaleMenuToggleClick = function (event) {
                var currentTarget = event.currentTarget;
                var type = currentTarget.getAttribute("data-type");
                var handleKey = "menu-closing-click-handle";
                _this.handles.remove(handleKey);
                if (type === _this._activeMenu) {
                    _this._setActiveMenu(null);
                    _this._activeMenuToggleNode = null;
                    return;
                }
                _this._setActiveMenu(type);
                _this._activeMenuToggleNode = currentTarget;
                _this.handles.add(on(document, "mousedown", function (event) {
                    var target = event.target;
                    var toggleContainer = _this._closest()(target, "." + CSS.scaleMenuToggle);
                    var scaleType = toggleContainer &&
                        toggleContainer.getAttribute("data-type");
                    var closingToggleIntended = toggleContainer && scaleType !== _this._activeMenu;
                    if (closingToggleIntended) {
                        return;
                    }
                    var isMenuToggle = scaleType;
                    var externalClick = !isMenuToggle &&
                        _this._scaleMenuNode &&
                        !_this._scaleMenuNode.contains(target);
                    if (externalClick) {
                        _this._setActiveMenu(null);
                        _this.handles.remove(handleKey);
                        _this.scheduleRender();
                    }
                }), handleKey);
            };
            _this._afterMenuListCreate = function (node) {
                _this._activeMenuNode = node;
                node.children[0].focus({ preventScroll: true });
            };
            _this._handleCustomScaleEntry = function (scale) {
                _this._setScaleFromMenuSelection(scale);
                _this._customMaxScale = -1;
                _this._customMinScale = -1;
            };
            _this._handleCustomScaleInputBlur = function () {
                if (_this._activeMenu === "max") {
                    _this._customMaxScale = -1;
                }
                else {
                    _this._customMinScale = -1;
                }
            };
            _this.handleCustomScaleInputKeyDown = function (event) {
                var target = event.currentTarget;
                var handleCustomScaleSelect = target["data-render-props"].handleCustomScaleSelect;
                var key = event.key, ctrlKey = event.ctrlKey, metaKey = event.metaKey;
                var scaleRanges = _this.viewModel.scaleRanges;
                if (key === "Enter") {
                    var scale = parseScale(target.value);
                    handleCustomScaleSelect(isNaN(scale) ? -1 : scaleRanges.clampScale(scale));
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
                if (key.length > 1 || ctrlKey || metaKey) {
                    return;
                }
                var scaleChars = /[:,.\d]/;
                if (!scaleChars.test(key)) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            _this._handleScaleMenuKeyDown = function (event) {
                var key = _this._eventKey(event);
                if (key === "Escape" || key === "Tab") {
                    _this._setActiveMenu(null);
                    _this._activeMenuToggleNode.focus();
                    return;
                }
                if (key !== "ArrowUp" && key !== "ArrowDown") {
                    return;
                }
                var menuItems = _this._activeMenuNode.children;
                var currentFocusIndex = _this._focusedMenuItemIndex;
                var futureFocusIndex = key === "ArrowUp"
                    ? (currentFocusIndex === 0 ? menuItems.length : currentFocusIndex) - 1
                    : (currentFocusIndex + 1) % menuItems.length;
                event.preventDefault();
                event.stopPropagation();
                menuItems[futureFocusIndex].focus();
                _this._focusedMenuItemIndex = futureFocusIndex;
            };
            _this._ieKeyNormalizationMap = {
                Win: "Meta",
                Scroll: "ScrollLock",
                Spacebar: " ",
                Down: "ArrowDown",
                Left: "ArrowLeft",
                Right: "ArrowRight",
                Up: "ArrowUp",
                Del: "Delete",
                Apps: "ContextMenu",
                Esc: "Escape",
                Multiply: "*",
                Add: "+",
                Subtract: "-",
                Decimal: ".",
                Divide: "/"
            };
            return _this;
        }
        ScaleSliderConfig.prototype.postInitialize = function () {
            var _this = this;
            this.label = this.ScaleRangeMessages.widgetLabel;
            this.own([
                watchUtils_1.init(this, "viewModel", function (viewModel) {
                    return (_this._slider.viewModel = viewModel
                        ? viewModel.sliderViewModel
                        : null);
                }),
                watchUtils_1.init(this, "_interactive", function (value) {
                    _this._slider.disabled = !value;
                    if (!value) {
                        _this._setActiveMenu(null);
                    }
                }),
                this._slider.on("thumb-drag", function (_a) {
                    var index = _a.index;
                    var preview = _this.visibleElements.preview;
                    _this._activeThumb = index;
                    clearTimeout(_this._previewAutoCloseTimeoutId);
                    var previewAutoCloseDelayInMs = 250;
                    _this._previewAutoCloseTimeoutId = window.setTimeout(function () {
                        _this._previewAutoCloseTimeoutId = null;
                        _this._activeThumb = null;
                        _this.scheduleRender();
                    }, previewAutoCloseDelayInMs);
                }),
                watchUtils_1.whenTrue(this, "view.stationary", function () { return _this.scheduleRender(); }),
                this._slider.on("thumb-drag", function (_a) {
                    var index = _a.index, state = _a.state;
                    if (state === "stop") {
                        _this._updateOutput();
                    }
                })
            ]);
        };
        ScaleSliderConfig.prototype.destroy = function () {
            this._slider.destroy();
            this._slider = null;
        };
        Object.defineProperty(ScaleSliderConfig.prototype, "_effectiveMaxScale", {
            get: function () {
                return this.maxScale === 0 ? this.maxScaleLimit : this.maxScale;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderConfig.prototype, "_effectiveMinScale", {
            get: function () {
                return this.minScale === 0 ? this.minScaleLimit : this.minScale;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderConfig.prototype, "_interactive", {
            get: function () {
                return this.get("viewModel.state") !== "disabled" && !this.disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderConfig.prototype, "initialScale", {
            set: function (scale) {
                this.minScale = scale;
            },
            enumerable: false,
            configurable: true
        });
        ScaleSliderConfig.prototype.castVisibleElements = function (value) {
            return tslib_1.__assign(tslib_1.__assign({}, DEFAULT_VISIBLE_ELEMENTS), value);
        };
        ScaleSliderConfig.prototype.render = function () {
            var _a;
            var _b = this, _interactive = _b._interactive, _slider = _b._slider, label = _b.label, view = _b.view, scaleRanges = _b.viewModel.scaleRanges, sliderLabel = _b.sliderLabel;
            var valueLabel = this.ScaleRangeMessages.scaleRangeLabels[scaleRanges.findScaleRangeByIndex(_slider.values[0]).id];
            _slider.layout = widget_1.isRTL() ? "horizontal-reversed" : "horizontal";
            var widgetInfoToolTip = (_a = this === null || this === void 0 ? void 0 : this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("div", { "aria-label": label, class: this.classes(CSS.base, CSS.widget, _interactive ? null : CSS.disabled) },
                sliderLabel != null ? (widget_1.tsx("div", { class: CSS.sliderLabel },
                    widget_1.tsx("span", null, sliderLabel),
                    widgetInfoToolTip)) : null,
                view ? this.renderCurrentScaleIndicator() : null,
                _slider.render(),
                widget_1.tsx("div", { class: CSS.scaleMenuContainer, key: "scale-menu-toggles" }, this.renderScaleMenuToggle("min", valueLabel))));
        };
        ScaleSliderConfig.prototype.renderMinScaleMenu = function () {
            var _a = this, _effectiveMaxScale = _a._effectiveMaxScale, minScaleLimit = _a.minScaleLimit, view = _a.view, scaleRanges = _a.viewModel.scaleRanges;
            var viewScale = view ? view.scale : undefined;
            return this.renderScaleMenu({
                type: "min",
                min: minScaleLimit,
                max: scaleRanges.findScaleRange(_effectiveMaxScale).minScale,
                map: viewScale
            });
        };
        ScaleSliderConfig.prototype.renderMaxScaleMenu = function () {
            var _a = this, _effectiveMinScale = _a._effectiveMinScale, maxScaleLimit = _a.maxScaleLimit, view = _a.view, scaleRanges = _a.viewModel.scaleRanges;
            var viewScale = view ? view.scale : undefined;
            return this.renderScaleMenu({
                type: "max",
                min: scaleRanges.findScaleRange(_effectiveMinScale).maxScale,
                max: maxScaleLimit,
                map: viewScale
            });
        };
        ScaleSliderConfig.prototype.renderScalePreview = function () {
            var _a = this, _activeThumb = _a._activeThumb, _slider = _a._slider, region = _a.region, scaleRanges = _a.viewModel.scaleRanges;
            var i = _activeThumb === 0 ? _slider.values[0] : _slider.values[1];
            var index = Object.keys(ScaleRanges.RecommendedScales).indexOf(scaleRanges.findScaleRangeByIndex(i).id);
            var thumbnailStyles = {
                backgroundImage: scalePreviewUtils_1.getScalePreviewSource(region),
                backgroundPosition: scalePreviewUtils_1.getScalePreviewSpriteBackgroundPosition(index)
            };
            return (widget_1.tsx("div", { class: CSS.scalePreview },
                widget_1.tsx("div", { class: CSS.scalePreviewThumbnail, styles: thumbnailStyles })));
        };
        ScaleSliderConfig.prototype.renderScaleMenu = function (_a) {
            var _this = this;
            var map = _a.map, min = _a.min, max = _a.max, type = _a.type;
            var scaleRanges = ScaleRanges.fromScaleRange({
                minScale: min,
                maxScale: max
            });
            var scaleLabels = this.ScaleRangeMessages.featuredScaleLabels;
            var recommendedScaleLabelToValue = ScaleRanges.RecommendedScales;
            var recommended = Object.keys(recommendedScaleLabelToValue)
                .map(function (scaleLabel) {
                return _this.renderScaleMenuItem({
                    scaleLabel: scaleLabels[scaleLabel],
                    scaleValue: recommendedScaleLabelToValue[scaleLabel],
                    valueVisible: scaleLabel !== "world",
                    handleNamedScaleSelect: _this._handleRecommendedScaleClick
                });
            });
            var _b = this, _customMaxScale = _b._customMaxScale, _customMinScale = _b._customMinScale;
            var customScale = type === "max" ? _customMaxScale : _customMinScale;
            return (widget_1.tsx("div", { bind: this, class: CSS.scaleMenu, "data-type": type, id: this.id + "__scale-menu--" + type, key: type + "-scale-menu", afterCreate: widget_1.storeNode, "data-node-ref": "_scaleMenuNode", onkeydown: this._handleScaleMenuKeyDown },
                widget_1.tsx("div", { class: CSS.scaleMenuScroller },
                    widget_1.tsx("ul", { class: CSS.scaleMenuList, afterCreate: this._afterMenuListCreate },
                        this.renderScaleMenuItem({
                            scaleValue: customScale,
                            scaleLabel: this.ScaleRangeMessages.featuredScaleLabels.custom,
                            valueVisible: false,
                            handleNamedScaleSelect: this._handleScaleSelection,
                            handleCustomScaleSelect: this._handleCustomScaleEntry
                        }),
                        map != null
                            ? this.renderScaleMenuItem({
                                scaleValue: map,
                                scaleLabel: this.ScaleRangeMessages.featuredScaleLabels.current,
                                valueVisible: true,
                                handleNamedScaleSelect: this._handleRecommendedScaleClick
                            })
                            : null,
                        recommended))));
        };
        ScaleSliderConfig.prototype._handleScaleSelection = function () {
            if (this._activeMenu === "max") {
                this._customMaxScale = this._effectiveMaxScale;
            }
            else {
                this._customMinScale = this._effectiveMinScale;
            }
        };
        ScaleSliderConfig.prototype.renderScaleMenuToggle = function (type, label) {
            var _a = this, _activeMenu = _a._activeMenu, _interactive = _a._interactive;
            var isActive = _activeMenu === type;
            return (widget_1.tsx("button", { "aria-controls": isActive ? this.id + "__scale-menu--" + type : "", "aria-pressed": isActive ? "true" : "false", class: this.classes(CSS.scaleMenuToggle), "data-type": type, key: type + "-scale-menu-toggle", onclick: this._handleScaleMenuToggleClick, disabled: !_interactive }, label));
        };
        ScaleSliderConfig.prototype.renderScaleMenuItem = function (props) {
            var scaleValue = props.scaleValue, scaleLabel = props.scaleLabel, valueVisible = props.valueVisible, handleNamedScaleSelect = props.handleNamedScaleSelect, _a = props.handleCustomScaleSelect, handleCustomScaleSelect = _a === void 0 ? null : _a;
            var id = this.id;
            var inputId = id + "__custom-scale-input";
            return (widget_1.tsx("li", { bind: this, class: CSS.scaleMenuListItem, "data-scale": scaleValue, key: scaleLabel, onclick: handleNamedScaleSelect, onkeydown: handleNamedScaleSelect, tabIndex: -1 },
                widget_1.tsx("label", { class: CSS.scaleItemLabel, for: inputId }, scaleLabel),
                scaleValue > -1 ? (handleCustomScaleSelect ? (widget_1.tsx("input", { afterCreate: this.focusAndSelectInputOnCreate, class: this.classes(CSS.scaleItemValue, CSS.scaleItemValueEditable), "data-render-props": props, id: inputId, key: "value", value: formatScale(scaleValue), onkeydown: this.handleCustomScaleInputKeyDown, onblur: this._handleCustomScaleInputBlur })) : valueVisible ? (widget_1.tsx("div", { class: CSS.scaleItemValue, key: "value" }, formatScale(scaleValue))) : null) : null));
        };
        ScaleSliderConfig.prototype.focusAndSelectInputOnCreate = function (node) {
            node.focus();
            node.select();
        };
        ScaleSliderConfig.prototype.renderCurrentScaleIndicator = function () {
            var _a = this, _slider = _a._slider, view = _a.view, scaleRanges = _a.viewModel.scaleRanges;
            var mapScale = scaleRanges.clampScale(view.scale);
            var sliderTick = this.viewModel.mapScaleToSlider(mapScale);
            var leftOffsetRatio = sliderTick / _slider.max;
            var scaleLabel = this.ScaleRangeMessages.scaleRangeLabels[scaleRanges.findScaleRangeByIndex(sliderTick).id];
            var currentScaleLabel = intl_1.substitute(this.ScaleRangeMessages.currentScaleTooltip, {
                scaleLabel: scaleLabel
            });
            return (widget_1.tsx("div", { class: CSS.scaleIndicatorContainer, key: "scale-indicator" },
                widget_1.tsx("div", { "aria-label": currentScaleLabel, class: CSS.scaleIndicator, styles: {
                        left: (widget_1.isRTL() ? -1 : 1) * leftOffsetRatio * 100 + "%"
                    }, title: currentScaleLabel }, this.renderCurrentScaleIndicatorIcon())));
        };
        ScaleSliderConfig.prototype.renderCurrentScaleIndicatorIcon = function () {
            return (widget_1.tsx("svg", { class: CSS.scaleIndicatorIcon, height: "8", width: "8", viewBox: "0 0 8 8", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                widget_1.tsx("polygon", { points: "4 0 8 8 0 8" })));
        };
        ScaleSliderConfig.prototype._handleRecommendedScaleClick = function (event) {
            var target = event.currentTarget;
            var scale = Number(target["data-scale"]);
            this._setScaleFromMenuSelection(scale);
        };
        ScaleSliderConfig.prototype._setScaleFromMenuSelection = function (scale) {
            this.minScale = scale;
            this._updateOutput();
            this._setActiveMenu(null);
        };
        ScaleSliderConfig.prototype._setActiveMenu = function (type) {
            this._activeMenu = type;
            this._focusedMenuItemIndex = type ? 0 : -1;
        };
        ScaleSliderConfig.prototype._updateOutput = function () {
            if (this.minScale === 0) {
                this.minScale = 1;
            }
            this.outputZoomScale = this.minScale;
        };
        ScaleSliderConfig.prototype._eventKey = function (_a) {
            var key = _a.key;
            return this._ieKeyNormalizationMap[key] || key;
        };
        ScaleSliderConfig.prototype._closest = function () {
            if (Element.prototype.closest) {
                return function (node, selector) { return node.closest(selector); };
            }
            var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
            return function (node, selector) {
                var el = node;
                do {
                    if (matches.call(el, selector)) {
                        return el;
                    }
                    el = el.parentElement;
                } while (el !== null && el.nodeType === 1);
                return null;
            };
        };
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("esri/widgets/ScaleRangeSlider/t9n/ScaleRangeSlider")
        ], ScaleSliderConfig.prototype, "ScaleRangeMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "_slider", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["viewModel.maxScaleLimit", "viewModel.maxScale"]
            })
        ], ScaleSliderConfig.prototype, "_effectiveMaxScale", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["viewModel.minScaleLimit", "viewModel.minScale"]
            })
        ], ScaleSliderConfig.prototype, "_effectiveMinScale", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["disabled", "viewModel.state"],
                readOnly: true
            })
        ], ScaleSliderConfig.prototype, "_interactive", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "disabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "label", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                aliasOf: "viewModel.maxScale"
            })
        ], ScaleSliderConfig.prototype, "maxScale", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                aliasOf: "viewModel.maxScaleLimit"
            })
        ], ScaleSliderConfig.prototype, "maxScaleLimit", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "initialScale", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "sliderLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "outputZoomScale", void 0);
        tslib_1.__decorate([
            decorators_1.property({ aliasOf: "viewModel.minScale" })
        ], ScaleSliderConfig.prototype, "minScale", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                aliasOf: "viewModel.minScaleLimit"
            })
        ], ScaleSliderConfig.prototype, "minScaleLimit", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "region", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                aliasOf: "viewModel.view"
            })
        ], ScaleSliderConfig.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderConfig.prototype, "visibleElements", void 0);
        tslib_1.__decorate([
            decorators_1.cast("visibleElements")
        ], ScaleSliderConfig.prototype, "castVisibleElements", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], ScaleSliderConfig.prototype, "_handleScaleSelection", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], ScaleSliderConfig.prototype, "_handleRecommendedScaleClick", null);
        ScaleSliderConfig = tslib_1.__decorate([
            decorators_1.subclass("ScaleSliderConfig")
        ], ScaleSliderConfig);
        return ScaleSliderConfig;
    }(BaseComponent));
    return ScaleSliderConfig;
});
