define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/core/Handles", "../../FileUploadConfig/FileUploadConfig"], function (require, exports, tslib_1, Accessor, decorators_1, watchUtils_1, Handles, FileUploadConfig) {
    "use strict";
    var PageConfigViewModel = (function (_super) {
        tslib_1.__extends(PageConfigViewModel, _super);
        function PageConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.fieldName = null;
            _this.fileUploadConfig = null;
            _this.savedData = null;
            _this.outputJSON = null;
            _this.configPanelViewModel = null;
            return _this;
        }
        PageConfigViewModel.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel", function () {
                watchUtils_1.whenOnce(_this, "savedData", function () {
                    _this._initFileUploadConfig();
                });
            });
        };
        PageConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
            this.fileUploadConfig.destroy();
        };
        PageConfigViewModel.prototype.handleOutputJSON = function (e, calciteRadioBtnGroup) {
            var node = e.target;
            var savedData = this._getSavedData(node, calciteRadioBtnGroup);
            this.set("savedData", savedData);
            this.set("outputJSON", this.savedData);
        };
        PageConfigViewModel.prototype.handleColorOutputJSON = function (calciteColorPicker) {
            var savedData = this._getSavedData(calciteColorPicker);
            this.set("savedData", savedData);
            this.set("outputJSON", this.savedData);
        };
        PageConfigViewModel.prototype._getSavedData = function (node, calciteRadioBtnGroup) {
            if (calciteRadioBtnGroup) {
                return this._getBackgroundTypeSavedDataObj(node);
            }
            else {
                return this._getSavedDataObj(node);
            }
        };
        PageConfigViewModel.prototype._getBackgroundTypeSavedDataObj = function (node) {
            var dataFieldType = node.getAttribute("data-field-type");
            var value = node.selectedItem.value;
            return this._generateSavedDataObj(value, dataFieldType, true);
        };
        PageConfigViewModel.prototype._getSavedDataObj = function (node) {
            var dataFieldType = node.getAttribute("data-field-type");
            if (dataFieldType.indexOf("backgroundColor") !== -1) {
                return this._generateSavedDataObj(node.value, dataFieldType, true);
            }
            return this._generateSavedDataObj(node.value, dataFieldType);
        };
        PageConfigViewModel.prototype._generateSavedDataObj = function (value, dataFieldType, isBackground) {
            var _a, _b;
            if (isBackground) {
                return tslib_1.__assign(tslib_1.__assign({}, this.savedData), { background: tslib_1.__assign(tslib_1.__assign({}, this.savedData.background), (_a = {}, _a[dataFieldType] = value, _a)) });
            }
            else {
                return tslib_1.__assign(tslib_1.__assign({}, this.savedData), (_b = {}, _b[dataFieldType] = value, _b));
            }
        };
        PageConfigViewModel.prototype.handleBackgroundImageOutputJSON = function (value) {
            this.set("savedData", tslib_1.__assign(tslib_1.__assign({}, this.savedData), { background: tslib_1.__assign(tslib_1.__assign({}, this.savedData.background), { backgroundImage: value }) }));
            this.set("outputJSON", this.savedData);
        };
        PageConfigViewModel.prototype._initFileUploadConfig = function () {
            var _this = this;
            var _a, _b;
            var savedData = (_b = (_a = this.savedData) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.backgroundImage;
            var configPanelViewModel = this.configPanelViewModel;
            var fileUploadConfig = savedData
                ? {
                    savedData: savedData,
                    configPanelViewModel: configPanelViewModel,
                    fieldName: this.fieldName
                }
                : {
                    configPanelViewModel: configPanelViewModel,
                    fieldName: this.fieldName
                };
            this.fileUploadConfig = new FileUploadConfig(fileUploadConfig);
            this._handles.add(watchUtils_1.watch(this, "fileUploadConfig.outputJSON", function () {
                var outputJSON = _this.fileUploadConfig.outputJSON;
                _this.handleBackgroundImageOutputJSON(outputJSON);
            }));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfigViewModel.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfigViewModel.prototype, "fileUploadConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfigViewModel.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfigViewModel.prototype, "configPanelViewModel", void 0);
        PageConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("PageConfigViewModel")
        ], PageConfigViewModel);
        return PageConfigViewModel;
    }(Accessor));
    return PageConfigViewModel;
});
