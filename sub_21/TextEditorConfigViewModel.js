define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "../../../configWidgets/FileUploadConfig/FileUploadConfig/FileUploadConfigViewModel", "TemplatesCommonLib/functionality/token"], function (require, exports, tslib_1, Accessor, decorators_1, watchUtils_1, FileUploadConfigViewModel, token_1) {
    "use strict";
    var TextEditorConfigViewModel = (function (_super) {
        tslib_1.__extends(TextEditorConfigViewModel, _super);
        function TextEditorConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._previousData = null;
            _this._uploading = false;
            _this.editor = null;
            _this.editorData = null;
            _this.fieldName = null;
            _this.configPanelViewModel = null;
            _this.fileUploadConfigViewModel = new FileUploadConfigViewModel();
            return _this;
        }
        Object.defineProperty(TextEditorConfigViewModel.prototype, "state", {
            get: function () {
                return this._uploading ? "uploading" : "ready";
            },
            enumerable: false,
            configurable: true
        });
        TextEditorConfigViewModel.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel", function () {
                _this.fileUploadConfigViewModel.configPanelViewModel = _this.configPanelViewModel;
            });
        };
        TextEditorConfigViewModel.prototype.getData = function () {
            var _a, _b, _c;
            if (!this.editor) {
                return;
            }
            var editorData = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.getData();
            var sanitizedData = (_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.sanitizer) === null || _c === void 0 ? void 0 : _c.sanitize(editorData);
            var data = token_1.applyImgTokens(sanitizedData, this.configPanelViewModel.templateAppItem.get("portal.credential.token"));
            return data;
        };
        TextEditorConfigViewModel.prototype.setData = function () {
            var editorData = this.getData();
            this.set("editorData", editorData);
            this._previousData = null;
        };
        TextEditorConfigViewModel.prototype.handlePreviousData = function () {
            var _a;
            this._previousData = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.getData();
        };
        TextEditorConfigViewModel.prototype.handleCancelEdit = function () {
            var _a;
            (_a = this.editor) === null || _a === void 0 ? void 0 : _a.setData(this._previousData);
        };
        TextEditorConfigViewModel.prototype.updateCKEDITOR = function () {
            this.editor.setData(this.editorData ? this.editorData : "");
        };
        TextEditorConfigViewModel.prototype.initImageUpload = function () {
            var imageUploadEditing = this.editor.plugins.get("ImageUploadEditing");
            imageUploadEditing.on("uploadComplete", this._getImageUploadCallback());
        };
        TextEditorConfigViewModel.prototype._getImageUploadCallback = function () {
            var _this = this;
            return function (evt, _a) {
                var data = _a.data, imageElement = _a.imageElement;
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var base64Uri, blob, size, type, file, url, value;
                    var _this = this;
                    var _b, _c, _d, _e;
                    return tslib_1.__generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                base64Uri = data.default;
                                blob = this.fileUploadConfigViewModel.dataUriToBlob(base64Uri);
                                size = blob.size, type = blob.type;
                                file = {
                                    name: this.fieldName + "_textEditor_" + Date.now() + "." + blob.type.split("/")[1],
                                    size: size,
                                    type: type
                                };
                                this._uploading = true;
                                this.notifyChange("state");
                                return [4, this.fileUploadConfigViewModel.handlePortalItemResourceRequest(file, blob)];
                            case 1:
                                url = _f.sent();
                                value = ((_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.draft) === null || _c === void 0 ? void 0 : _c.uploads) ? tslib_1.__spreadArrays((_e = (_d = this.configPanelViewModel) === null || _d === void 0 ? void 0 : _d.draft) === null || _e === void 0 ? void 0 : _e.uploads, [url]) : [url];
                                return [4, this.configPanelViewModel.handleDraftData("uploads", value)];
                            case 2:
                                _f.sent();
                                this.editor.model.change(function (writer) {
                                    var token = _this.configPanelViewModel.templateAppItem.get("portal.credential.token");
                                    writer.setAttribute("src", url.replace("http://", "https://") + "?token=" + token, imageElement);
                                    _this._uploading = false;
                                    _this.notifyChange("state");
                                });
                                return [2];
                        }
                    });
                });
            };
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], TextEditorConfigViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfigViewModel.prototype, "editor", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfigViewModel.prototype, "editorData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfigViewModel.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfigViewModel.prototype, "fileUploadConfigViewModel", void 0);
        TextEditorConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("TextEditorConfigViewModel")
        ], TextEditorConfigViewModel);
        return TextEditorConfigViewModel;
    }(Accessor));
    return TextEditorConfigViewModel;
});
