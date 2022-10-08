define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "./LayerEffectModal/LayerEffectModalViewModel"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, LayerEffectModalViewModel_1) {
    "use strict";
    LayerEffectModalViewModel_1 = tslib_1.__importDefault(LayerEffectModalViewModel_1);
    var CSS = {
        base: "layer-effect-config",
        label: "layer-effect-config__label",
        title: "layer-effect-config__label--title",
        input: "layer-effect-config__input-grid",
        colorInput: "layer-effect-config__input-grid--color",
        slider: "layer-effect-config__slider",
        resetBtnGrid: "layer-effect-config__reset-btn-grid",
        resetBtn: "layer-effect-config__reset-btn",
        selectLabel: "layer-effect-config__select-label",
        view: "layer-effect-config__view",
        content: "layer-effect-config__modal-content",
        panel: "layer-effect-config__panel",
        advSwitch: "layer-effect-config__scale-switch",
        scale: "layer-effect-config__scale",
        removeEffect: "layer-effect-config__remove-effect-btn",
        removeEffectCont: "layer-effect-config__remove-effect-container"
    };
    var LayerEffectModal = (function (_super) {
        tslib_1.__extends(LayerEffectModal, _super);
        function LayerEffectModal(properties) {
            var _this = _super.call(this, properties) || this;
            _this.viewModel = new LayerEffectModalViewModel_1.default();
            _this.layerEffectMessages = null;
            return _this;
        }
        LayerEffectModal.prototype.postInitialize = function () {
            this.viewModel.init();
            this.isReadyForRender = true;
        };
        LayerEffectModal.prototype.render = function () {
            return (widget_1.tsx("calcite-modal", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "modal", "intl-close": this.layerEffectMessages.layerEffectModal.cancel, "aria-labelledby": "modal-title", fullscreen: true, scale: "m", width: "l" },
                widget_1.tsx("h2", { slot: "header", id: "modal-title" }, this.layerEffectMessages.layerEffectModal.modalHeaderTitle),
                widget_1.tsx("div", { slot: "content", class: CSS.content },
                    widget_1.tsx("div", { id: "layerEffectView", class: CSS.view, afterCreate: this.viewModel.initializeMapView.bind(this.viewModel) })),
                widget_1.tsx("div", { slot: "primary" },
                    widget_1.tsx("calcite-button", { bind: this, appearance: "outline", onclick: this._handleModalCancel }, this.layerEffectMessages.layerEffectModal.cancel),
                    widget_1.tsx("calcite-button", { bind: this, onclick: this._handleModalConfirm }, this.layerEffectMessages.layerEffectModal.confirm))));
        };
        LayerEffectModal.prototype._handleModalCancel = function () {
            this.modal.active = false;
        };
        LayerEffectModal.prototype._handleModalConfirm = function () {
            this.viewModel.generateOutput();
            this.modal.active = false;
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.map")
        ], LayerEffectModal.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], LayerEffectModal.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModal.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configRestriction")
        ], LayerEffectModal.prototype, "configRestriction", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], LayerEffectModal.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.view")
        ], LayerEffectModal.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModal.prototype, "isReadyForRender", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModal.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isConfirmed")
        ], LayerEffectModal.prototype, "isConfirmed", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.input")
        ], LayerEffectModal.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedLayer")
        ], LayerEffectModal.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.effects")
        ], LayerEffectModal.prototype, "effects", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.scaleEffectSwitch")
        ], LayerEffectModal.prototype, "scaleEffectSwitch", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerEffectConfig/resources")
        ], LayerEffectModal.prototype, "layerEffectMessages", void 0);
        LayerEffectModal = tslib_1.__decorate([
            decorators_1.subclass("LayerEffectModal")
        ], LayerEffectModal);
        return LayerEffectModal;
    }(Widget));
    return LayerEffectModal;
});
