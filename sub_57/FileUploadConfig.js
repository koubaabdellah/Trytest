define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../../configWidgets/BaseComponent", "../../configWidgets/FileUploadConfig/FileUploadConfig/FileUploadConfigViewModel", "TemplatesCommonLib/structuralFunctionality/a11yUtils"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, FileUploadConfigViewModel, a11yUtils_1) {
    "use strict";
    var base = "esri-file-upload-config";
    var CSS = {
        base: base,
        fileInput: base + "__file-input",
        uploadLabel: base + "__upload-label",
        fileUploadedText: base + "__file-uploaded-text",
        fileNameText: base + "__file-name-text",
        fileUploadTextContainer: base + "__file-upload-text-container",
        errorText: "esri-item-config__error-text"
    };
    var FileUploadConfig = (function (_super) {
        tslib_1.__extends(FileUploadConfig, _super);
        function FileUploadConfig(params) {
            var _this = _super.call(this, params) || this;
            _this.acceptedTypes = null;
            _this.fileInputNode = null;
            _this.savedData = null;
            _this.outputJSON = null;
            _this.messages = null;
            _this.configPanelViewModel = null;
            _this.fileNotSupported = null;
            _this.sizeExceeded = null;
            _this.viewModel = new FileUploadConfigViewModel();
            return _this;
        }
        FileUploadConfig.prototype.render = function () {
            var fileInput = this._renderFileInput();
            var baseContainer = this._renderBaseContainer();
            return [baseContainer, fileInput];
        };
        FileUploadConfig.prototype._renderBaseContainer = function () {
            var _a, _b;
            var customFileInputUINode = this._renderCustomFileInputUINode();
            var _c = this, outputJSON = _c.outputJSON, savedData = _c.savedData;
            var fileName = outputJSON
                ? outputJSON.name
                : savedData
                    ? savedData.name
                    : "";
            return (widget_1.tsx("div", { class: CSS.base },
                customFileInputUINode,
                this.viewModel.sizeExceeded ? (widget_1.tsx("div", { key: "item-config-error-text" },
                    widget_1.tsx("span", { class: CSS.errorText }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.sizeExceeded))) : this.fileNotSupported ? (widget_1.tsx("div", { key: "item-config-error-text-unsupported" },
                    widget_1.tsx("span", { class: CSS.errorText }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.unsupportedFileType))) : null,
                fileName ? this._renderFileUploadTextContainer(fileName) : null));
        };
        FileUploadConfig.prototype._renderCustomFileInputUINode = function () {
            var messages = this.messages;
            var chooseFile = messages.chooseFile, uploading = messages.uploading;
            var state = this.state;
            var isUploading = state === "uploading";
            return (widget_1.tsx("label", { class: CSS.uploadLabel }, isUploading ? (widget_1.tsx("calcite-button", { key: "uploading-button-placeholder", scale: "s", disabled: true }, a11yUtils_1.prefersReducedMotion() ? (uploading + "...") : (widget_1.tsx("calcite-loader", { label: uploading, scale: "m", active: true, inline: true })))) : (widget_1.tsx("calcite-button", { key: "choose-file-button", bind: this, onclick: this.viewModel.handleFileUpload, scale: "s" }, chooseFile))));
        };
        FileUploadConfig.prototype._renderFileUploadTextContainer = function (fileName) {
            var fileUploaded = this.messages.fileUploaded;
            var uploadedFileName = !this.viewModel.sizeExceeded
                ? this._renderUploadedFileName(fileName)
                : null;
            return (widget_1.tsx("div", { class: CSS.fileUploadTextContainer },
                widget_1.tsx("span", { class: CSS.fileUploadedText }, fileUploaded),
                this.viewModel.state === "ready" ? uploadedFileName : null));
        };
        FileUploadConfig.prototype._renderUploadedFileName = function (fileName) {
            return (widget_1.tsx("span", { key: "file-upload-name", class: CSS.fileNameText }, fileName));
        };
        FileUploadConfig.prototype._renderFileInput = function () {
            return (widget_1.tsx("input", { type: "file", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "fileInputNode", accept: this.acceptedTypes.join(", "), class: CSS.fileInput }));
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fieldName")
        ], FileUploadConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.acceptedTypes")
        ], FileUploadConfig.prototype, "acceptedTypes", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fileInputNode")
        ], FileUploadConfig.prototype, "fileInputNode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.savedData")
        ], FileUploadConfig.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], FileUploadConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/FileUploadConfig/resources")
        ], FileUploadConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], FileUploadConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fileNotSupported")
        ], FileUploadConfig.prototype, "fileNotSupported", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.sizeExceeded")
        ], FileUploadConfig.prototype, "sizeExceeded", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.state")
        ], FileUploadConfig.prototype, "state", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: FileUploadConfigViewModel
            })
        ], FileUploadConfig.prototype, "viewModel", void 0);
        FileUploadConfig = tslib_1.__decorate([
            decorators_1.subclass("FileUploadConfig")
        ], FileUploadConfig);
        return FileUploadConfig;
    }(BaseComponent));
    return FileUploadConfig;
});
