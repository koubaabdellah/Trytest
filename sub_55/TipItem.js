define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "../../icons/icons", "../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, Widget, widget_1, icons_1, focusUtils_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        tooltipIcon: "esri-config-panel__tooltip",
        iconTooltipButton: "esri-config-panel__icon-tooltip-button"
    };
    var TipItem = (function (_super) {
        tslib_1.__extends(TipItem, _super);
        function TipItem(params) {
            var _this = _super.call(this, params) || this;
            _this.id = null;
            _this.tip = null;
            _this.fieldName = null;
            _this.configPanelViewModel = null;
            _this.calciteToolTipManagerNode = null;
            return _this;
        }
        TipItem.prototype.renderTipCalciteIcon = function () {
            var _a = this, configPanelViewModel = _a.configPanelViewModel, fieldName = _a.fieldName, tip = _a.tip;
            var tipsMap = configPanelViewModel.tipsMap;
            tipsMap.set(fieldName, this);
            var id = "tooltip-icon-" + fieldName;
            if (!this.calciteToolTipManagerNode) {
                var node = tip
                    ? (widget_1.tsx("button", { bind: this, key: "key-" + id, id: id, "data-tooltip-id": id, onclick: this.handlePopover, onkeydown: this._handleTab, class: this.classes(CSS.tooltipIcon, CSS.iconTooltipButton), "data-section-index": "" + this.configPanelViewModel.currentSectionIndex },
                        widget_1.tsx("calcite-icon", { bind: this, scale: "s", icon: icons_1.default.information, "data-tooltip-id": id })))
                    : null;
                this._set("calciteToolTipManagerNode", node);
            }
            return this.calciteToolTipManagerNode;
        };
        TipItem.prototype.handlePopover = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var node = e.target;
            var dataTooltipID = node.getAttribute("data-tooltip-id");
            this.set("configPanelViewModel.currentTipID", dataTooltipID);
        };
        TipItem.prototype._handleTab = function (e) {
            focusUtils_1.handleFocusElFromSettingsPanel(e);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], TipItem.prototype, "id", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TipItem.prototype, "tip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TipItem.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TipItem.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], TipItem.prototype, "calciteToolTipManagerNode", void 0);
        TipItem = tslib_1.__decorate([
            decorators_1.subclass("TipItem")
        ], TipItem);
        return TipItem;
    }(Widget));
    return TipItem;
});
