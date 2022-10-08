define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent) {
    "use strict";
    var CSS = {
        base: "exhibit-config",
        view: "exhibit-config__view",
        content: "exhibit-config__modal-content"
    };
    var ExhibitModal = (function (_super) {
        tslib_1.__extends(ExhibitModal, _super);
        function ExhibitModal(properties) {
            var _this = _super.call(this, properties) || this;
            _this.messages = null;
            return _this;
        }
        ExhibitModal.prototype.postInitialize = function () {
            this.isReadyForRender = true;
        };
        ExhibitModal.prototype.render = function () {
            var _a = this.messages, cancel = _a.cancel, confirm = _a.confirm, editSlide = _a.editSlide, newSlide = _a.newSlide, resetView = _a.resetView;
            var title = this.isEditing ? editSlide : newSlide;
            return (widget_1.tsx("calcite-modal", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "modal", "aria-labelledby": "modal-title", fullscreen: true, scale: "m", width: "l" },
                widget_1.tsx("h2", { slot: "header", id: "modal-title" }, title),
                widget_1.tsx("div", { slot: "content", class: CSS.content },
                    widget_1.tsx("div", { id: "slideView", class: CSS.view, afterCreate: this.viewModel.initializeMapView.bind(this.viewModel) })),
                widget_1.tsx("calcite-button", { slot: "back", bind: this.viewModel, color: "red", appearance: "outline", onclick: this.viewModel.goTo }, resetView),
                widget_1.tsx("calcite-button", { slot: "secondary", bind: this, appearance: "outline", onclick: this._handleModalCancel }, cancel),
                widget_1.tsx("calcite-button", { slot: "primary", id: "exhibit-modal-close-btn", bind: this, onclick: this._handleModalConfirm, afterCreate: this._httpsCheck }, confirm)));
        };
        ExhibitModal.prototype._httpsCheck = function (confirmBtn) {
            confirmBtn.disabled = this.viewModel.slideNote1HTTPSError || this.viewModel.slideNote2HTTPSError;
        };
        ExhibitModal.prototype._handleModalCancel = function () {
            this.viewModel.handleCancel();
            this.modal.active = false;
        };
        ExhibitModal.prototype._handleModalConfirm = function () {
            if (this.isEditing) {
                this.viewModel.handleSaveEditSlide();
            }
            else {
                this.viewModel.handleSaveNewSlide();
            }
            this.viewModel.generateOutput();
            this.modal.active = false;
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.map")
        ], ExhibitModal.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], ExhibitModal.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitModal.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitModal.prototype, "isReadyForRender", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isConfirmed")
        ], ExhibitModal.prototype, "isConfirmed", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitModal.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slide")
        ], ExhibitModal.prototype, "slide", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitModal.prototype, "isEditing", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitModal.prototype, "disableConfirm", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ExhibitConfig/resources")
        ], ExhibitModal.prototype, "messages", void 0);
        ExhibitModal = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.ExhibitModal")
        ], ExhibitModal);
        return ExhibitModal;
    }(BaseComponent));
    return ExhibitModal;
});
