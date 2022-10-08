define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/Handles", "esri/core/watchUtils"], function (require, exports, tslib_1, Accessor, decorators_1, Handles, watchUtils_1) {
    "use strict";
    var ListOptionConfigViewModel = (function (_super) {
        tslib_1.__extends(ListOptionConfigViewModel, _super);
        function ListOptionConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.savedData = null;
            _this.outputJSON = null;
            _this.optionsCallback = null;
            _this.optionsCallbackArgs = null;
            _this.selectionMode = "single";
            _this.configPanelViewModel = null;
            return _this;
        }
        ListOptionConfigViewModel.prototype.initialize = function () {
            this._handles.add([this._generatelistItemsWithMapProps()]);
        };
        ListOptionConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        ListOptionConfigViewModel.prototype.handleOutputJSON = function (key, value) {
            var _a;
            var temp = tslib_1.__assign(tslib_1.__assign({}, this.savedData), (_a = {}, _a[key] = value, _a));
            var savedData = temp;
            this.set("savedData", temp);
            this.set("outputJSON", savedData);
        };
        ListOptionConfigViewModel.prototype._generatelistItemsWithMapProps = function () {
            var _this = this;
            return watchUtils_1.whenOnce(this, "mapProperties", function () {
                _this._handles.add(watchUtils_1.when(_this, "configPanelViewModel.map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        this._generatelistItems();
                        this._handles.add(watchUtils_1.watch(this, "configPanelViewModel.map", function () {
                            _this._generatelistItems();
                        }), watchUtils_1.watch(this, "configPanelViewModel.selectedMapId", function () {
                            _this.set("savedData", null);
                            _this.set("outputJSON", null);
                        }));
                        return [2];
                    });
                }); }));
            });
        };
        ListOptionConfigViewModel.prototype._handleOptionsCallback = function () {
            var _a;
            var map = this.configPanelViewModel.map;
            var tempArgs = {};
            (_a = this.optionsCallbackArgs) === null || _a === void 0 ? void 0 : _a.forEach(function (arg) {
                tempArgs[arg] = map[arg];
            });
            return this.optionsCallback.apply(this, Object.values(tempArgs));
        };
        ListOptionConfigViewModel.prototype._generatelistItems = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var map, items, mapPropItems, listItems, listItemsArr;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            map = this.configPanelViewModel.map;
                            return [4, map.loadAll()];
                        case 1:
                            _a.sent();
                            items = map[this.mapProperties.listProperty];
                            mapPropItems = items.filter(function (item) {
                                var _a, _b;
                                var conditions = (_a = _this.mapProperties) === null || _a === void 0 ? void 0 : _a.conditions;
                                var conditionsCheck = (conditions === null || conditions === void 0 ? void 0 : conditions.length) > 0
                                    ? conditions.every(function (condition) { return item.get(condition); })
                                    : true;
                                var mapPropsType = (_b = _this.mapProperties) === null || _b === void 0 ? void 0 : _b.type;
                                var typeCheck = mapPropsType ? item.type === mapPropsType : true;
                                return typeCheck && conditionsCheck;
                            });
                            listItems = mapPropItems.map(function (mapPropItem) {
                                var _a = _this.mapProperties.listLabelValue, label = _a.label, value = _a.value;
                                return {
                                    label: mapPropItem[label],
                                    value: mapPropItem[value],
                                    options: []
                                };
                            });
                            listItemsArr = Array.isArray(listItems)
                                ? listItems
                                : listItems.toArray();
                            this._handleOptions(listItemsArr);
                            this.set("listItems", listItemsArr);
                            return [2];
                    }
                });
            });
        };
        ListOptionConfigViewModel.prototype._handleOptions = function (listItems) {
            var options = this._handleOptionsCallback();
            var optionsKeys = Object.keys(options);
            optionsKeys.forEach(function (optionKey) {
                var listItem = listItems.find(function (listItem) { return listItem.value === optionKey; });
                listItem.options = options[optionKey];
            });
        };
        ListOptionConfigViewModel.prototype.handleAccordionItem = function (e, listItem) {
            var _a;
            var _b;
            if (e.target.active &&
                this.selectionMode === "single" &&
                !((_b = this.savedData) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(listItem.value))) {
                var temp = tslib_1.__assign(tslib_1.__assign({}, this.savedData), (_a = {}, _a[listItem.value] = listItem.options[0].value, _a));
                this.savedData = temp;
                this.outputJSON = temp;
            }
        };
        ListOptionConfigViewModel.prototype.handleSwitch = function (e, listItem) {
            var _a;
            var node = e.target;
            var temp = tslib_1.__assign({}, this.savedData);
            if (node.checked) {
                var value = (temp === null || temp === void 0 ? void 0 : temp[listItem.value]) ? temp[listItem.value]
                    : this.selectionMode === "single"
                        ? listItem.options[0].value
                        : [];
                temp = tslib_1.__assign(tslib_1.__assign({}, this.savedData), (_a = {}, _a[listItem.value] = value, _a));
            }
            else {
                if (temp.hasOwnProperty(listItem.value)) {
                    delete temp[listItem.value];
                }
            }
            this.savedData = temp;
            this.outputJSON = temp;
        };
        ListOptionConfigViewModel.prototype.handleCheckbox = function (e, listItem, option) {
            var _a;
            var node = e.target;
            var temp = tslib_1.__assign({}, this.savedData);
            if (node.checked) {
                var value = Array.isArray(temp === null || temp === void 0 ? void 0 : temp[listItem.value])
                    ? tslib_1.__spreadArrays(temp[listItem.value], [option.value]) : [listItem.options[0].value];
                temp = tslib_1.__assign(tslib_1.__assign({}, this.savedData), (_a = {}, _a[listItem.value] = value, _a));
            }
            else {
                if (temp.hasOwnProperty(listItem.value)) {
                    delete temp[listItem.value];
                }
            }
            this.savedData = temp;
            this.outputJSON = temp;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "listItems", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "mapProperties", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "optionsCallback", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "optionsCallbackArgs", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "selectionMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfigViewModel.prototype, "configPanelViewModel", void 0);
        ListOptionConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("ListOptionConfigViewModel")
        ], ListOptionConfigViewModel);
        return ListOptionConfigViewModel;
    }(Accessor));
    return ListOptionConfigViewModel;
});
