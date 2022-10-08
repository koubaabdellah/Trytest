define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1, watchUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "esri-config-panel-tips",
        content: "esri-config-panel-tips__content",
        theme: {
            light: "calcite-theme-light",
            dark: "calcite-theme-dark"
        }
    };
    var Tips = (function (_super) {
        tslib_1.__extends(Tips, _super);
        function Tips() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._tooltipNodes = {};
            _this.configPanelViewModel = null;
            return _this;
        }
        Tips.prototype.postInitialize = function () {
            this.own([this._currentTipIDWatcher()]);
        };
        Tips.prototype.render = function () {
            var tooltips = this._renderCalciteToolTips();
            return (widget_1.tsx("div", { key: "esri-config-panel-tips", class: CSS.base }, tooltips));
        };
        Tips.prototype._renderCalciteToolTips = function () {
            var _this = this;
            var tooltipItems = this._getToolTipItems();
            var tooltips = tooltipItems.map(function (tooltipItem) {
                return _this._renderCalciteToolTip(tooltipItem);
            });
            return tooltips;
        };
        Tips.prototype._renderCalciteToolTip = function (tooltipItem) {
            var id = tooltipItem.id, tip = tooltipItem.tip;
            if (!this._tooltipNodes[tooltipItem.fieldName]) {
                this._tooltipNodes[tooltipItem.fieldName] = (widget_1.tsx("calcite-popover", { key: id, "reference-element": id, closeButton: true, "intl-close": this.configPanelViewModel.configPanelMessages.close, class: this.configPanelViewModel.darkModeEnabled
                        ? CSS.theme.dark
                        : CSS.theme.light, "auto-close": "true" },
                    widget_1.tsx("div", { class: CSS.content, innerHTML: tip })));
            }
            return this._tooltipNodes[tooltipItem.fieldName];
        };
        Tips.prototype._getToolTipItems = function () {
            var tooltipItems = [];
            var tipsMap = this.configPanelViewModel.tipsMap;
            tipsMap.forEach(function (tipItem) { return tooltipItems.push(tipItem); });
            return tooltipItems;
        };
        Tips.prototype._currentTipIDWatcher = function () {
            var _this = this;
            return watchUtils_1.watch(this, "configPanelViewModel.currentTipID", function () {
                var tooltipNodeKeys = Object.keys(_this._tooltipNodes);
                tooltipNodeKeys.forEach(function (tooltipNodeKey) {
                    var tooltipNode = _this._tooltipNodes[tooltipNodeKey];
                    var domNode = tooltipNode.domNode;
                    var currentTipID = _this.configPanelViewModel.currentTipID;
                    if (currentTipID !== domNode.referenceElement) {
                        domNode.open = false;
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Tips.prototype, "configPanelViewModel", void 0);
        Tips = tslib_1.__decorate([
            decorators_1.subclass("Tips")
        ], Tips);
        return Tips;
    }(Widget_1.default));
    return Tips;
});
