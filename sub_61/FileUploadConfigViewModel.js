define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/core/Handles", "esri/portal/PortalItemResource"], function (require, exports, tslib_1, Accessor, decorators_1, watchUtils_1, Handles, PortalItemResource) {
    "use strict";
    var FileUploadConfigViewModel = (function (_super) {
        tslib_1.__extends(FileUploadConfigViewModel, _super);
        function FileUploadConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._uploading = false;
            _this.itemCreatorIsLoading = false;
            _this.sizeExceeded = false;
            _this.acceptedTypes = [".jpg", ".jpeg", ".png"];
            _this.fileInputNode = null;
            _this.savedData = null;
            _this.outputJSON = null;
            _this.configPanelViewModel = null;
            _this.fileNotSupported = false;
            return _this;
        }
        FileUploadConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add([
                watchUtils_1.when(this, "fileInputNode", function () {
                    _this.fileInputNode.addEventListener("change", function (e) {
                        if (e.target.files[0].size > 52428800) {
                            _this.set("sizeExceeded", true);
                            console.error("ERROR: FILE SIZE LIMIT EXCEEDED. File size should be no more than 50MB.");
                        }
                        else {
                            _this.set("sizeExceeded", false);
                            _this.set("fileNotSupported", false);
                            _this.handleResource(e);
                        }
                    });
                })
            ]);
        };
        Object.defineProperty(FileUploadConfigViewModel.prototype, "state", {
            get: function () {
                return this._uploading || this.itemCreatorIsLoading ? "uploading" : "ready";
            },
            enumerable: false,
            configurable: true
        });
        FileUploadConfigViewModel.prototype.handleFileUpload = function () {
            this.fileInputNode.click();
        };
        FileUploadConfigViewModel.prototype.handleResource = function (e) {
            var _this = this;
            var node = e.target;
            var file = node.files[0];
            var reader = new FileReader();
            if (!file) {
                console.error("No file selected.");
                return;
            }
            this._uploading = true;
            this.notifyChange("state");
            reader.readAsDataURL(file);
            reader.onload = function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var types, isNotSupported, blob;
                return tslib_1.__generator(this, function (_a) {
                    if (e.target.readyState === FileReader.DONE) {
                        types = this.acceptedTypes.map(function (type) { return type.split(".")[1]; });
                        isNotSupported = types.filter(function (fileExt) { return file.type.includes(fileExt); }).length === 0;
                        if (isNotSupported) {
                            this._uploading = false;
                            this.itemCreatorIsLoading = false;
                            this.fileNotSupported = true;
                            this.notifyChange("state");
                            return [2];
                        }
                        blob = this.dataUriToBlob(e.target.result);
                        this.handlePortalItemResourceRequest(file, blob);
                        this._uploading = false;
                        this.notifyChange("state");
                    }
                    return [2];
                });
            }); };
            reader.onerror = function (e) {
                console.error("ERROR: ", e);
                _this._uploading = false;
                _this.notifyChange("state");
            };
        };
        FileUploadConfigViewModel.prototype.handleOutputJSON = function (fileDataToWrite) {
            this.set("outputJSON", fileDataToWrite);
        };
        FileUploadConfigViewModel.prototype.dataUriToBlob = function (dataURI) {
            var byteString = atob(dataURI.split(",")[1]);
            var mimeString = dataURI
                .split(",")[0]
                .split(":")[1]
                .split(";")[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {
                type: mimeString
            });
        };
        FileUploadConfigViewModel.prototype.handlePortalItemResourceRequest = function (file, blob) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portalItem, resourceResult, timestamp, id, path, resource, existingResourceArr, resourceDoesNotExist, name, type, size, fileDataToWrite, addedResource, updatedResource;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            portalItem = this.get("configPanelViewModel.templateAppItem");
                            return [4, portalItem.fetchResources()];
                        case 1:
                            resourceResult = _a.sent();
                            timestamp = new Date().getTime();
                            id = this.fieldName
                                ? timestamp + "_" + this.fieldName
                                : "" + timestamp;
                            path = "media/instantAppsConfigPanel_" + id + "_" + file.name
                                .split(" ")
                                .join("_");
                            resource = new PortalItemResource({
                                path: path,
                                portalItem: portalItem
                            });
                            existingResourceArr = resourceResult.resources.filter(function (resourceItem) {
                                return resourceItem.resource.path === path;
                            });
                            resourceDoesNotExist = existingResourceArr.length === 0;
                            name = file.name, type = file.type, size = file.size;
                            fileDataToWrite = {
                                name: name,
                                type: type,
                                size: size,
                                url: null
                            };
                            if (!resourceDoesNotExist) return [3, 3];
                            return [4, portalItem.addResource(resource, blob)];
                        case 2:
                            addedResource = _a.sent();
                            fileDataToWrite.url = addedResource.url;
                            this.handleOutputJSON(fileDataToWrite);
                            return [2, fileDataToWrite.url];
                        case 3: return [4, resource.update(blob)];
                        case 4:
                            updatedResource = _a.sent();
                            fileDataToWrite.url = updatedResource.url;
                            this.handleOutputJSON(fileDataToWrite);
                            return [2, fileDataToWrite.url];
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], FileUploadConfigViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "itemCreatorIsLoading", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "sizeExceeded", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "acceptedTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "fileInputNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FileUploadConfigViewModel.prototype, "fileNotSupported", void 0);
        FileUploadConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("FileUploadConfigViewModel")
        ], FileUploadConfigViewModel);
        return FileUploadConfigViewModel;
    }(Accessor));
    return FileUploadConfigViewModel;
});
