define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/Collection", "../../utils/utils", "../../icons/icons"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, Collection, utils_1, icons_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-field-selector",
        header: "esri-field-selector__header",
        headerStyles: "esri-field-selector-header",
        fields: "esri-field-selector__fields",
        fieldsPickList: "esri-field-selector-picklist",
        footer: "esri-field-selector__footer"
    };
    var FieldSelector = (function (_super) {
        tslib_1.__extends(FieldSelector, _super);
        function FieldSelector(values) {
            return _super.call(this, values) || this;
        }
        FieldSelector.prototype.render = function () {
            return (widget_1.tsx("div", { key: "fieldSelector", class: CSS.base },
                this._renderHeader(),
                this._renderFields(),
                this._renderFooter()));
        };
        FieldSelector.prototype.setupFields = function (layer, uniqueId) {
            var _this = this;
            var _a;
            this.chosenLayer = layer;
            this.uniqueId = uniqueId;
            this._selectedFields = new Collection();
            this._selectedFields.addMany((_a = this._getLayerFields(this.chosenLayer)) === null || _a === void 0 ? void 0 : _a.filter(function (field) {
                return _this.layerConfigViewModel.isFieldSelected(_this.uniqueId, field.name);
            }).map(function (field) { return field.name; }));
        };
        FieldSelector.prototype.closeFieldSelector = function () {
            this._navigateToLayerSelector();
        };
        FieldSelector.prototype._renderHeader = function () {
            var _a = this.LayerSelectorMessages, fieldSelectorTitle = _a.fieldSelectorTitle, fieldExit = _a.fieldExit;
            return (widget_1.tsx("div", { class: CSS.header, key: "title" },
                widget_1.tsx("div", { class: CSS.headerStyles },
                    widget_1.tsx("div", null, fieldSelectorTitle),
                    widget_1.tsx("div", null,
                        widget_1.tsx("strong", { bind: this, title: this.chosenLayer.title, afterCreate: utils_1.applyTextFade }, this.chosenLayer.title))),
                widget_1.tsx("calcite-button", { bind: this, appearance: "transparent", title: fieldExit, "icon-start": icons_1.default.close, scale: "l", onclick: this.closeFieldSelector })));
        };
        FieldSelector.prototype._renderFields = function () {
            var filterFieldMsg = this.LayerSelectorMessages.filterFieldMsg;
            var fieldList = this._renderFieldCheckboxes();
            return (widget_1.tsx("div", { class: CSS.fields, key: "fields" },
                widget_1.tsx("calcite-pick-list", { afterCreate: function (_fieldPickList) {
                        _fieldPickList.setFocus();
                    }, multiple: this.stateStore.fieldSelectionMode === "multiple", "filter-placeholder": filterFieldMsg, "filter-enabled": "true", class: CSS.fieldsPickList }, fieldList)));
        };
        FieldSelector.prototype._renderFieldCheckboxes = function () {
            var _a;
            return (_a = this._getLayerFields(this.chosenLayer)) === null || _a === void 0 ? void 0 : _a.filter(this._filterByFieldType.bind(this)).filter(this._filterByExclusionList.bind(this)).map(this._renderFieldCheckbox.bind(this)).toArray();
        };
        FieldSelector.prototype._filterByFieldType = function (field) {
            if (this.stateStore.supportedFieldTypes === "*")
                return true;
            return this.stateStore.supportedFieldTypes.map(function (fieldType) {
                return fieldType === field.type;
            }).reduce(function (acc, curr) {
                return acc || curr;
            }, false);
        };
        FieldSelector.prototype._filterByExclusionList = function (field) {
            var _a;
            return !((_a = this.stateStore.excludeFields) === null || _a === void 0 ? void 0 : _a.includes(field.name));
        };
        FieldSelector.prototype._renderFieldCheckbox = function (field, index) {
            var name = field.name, alias = field.alias;
            var isSelected = this._selectedFields.includes(name);
            return (widget_1.tsx("calcite-pick-list-item", { label: alias, description: "{" + name + "}", value: name, selected: isSelected, afterCreate: this._setupOnClickEvent.bind(this, field) }));
        };
        FieldSelector.prototype._renderFooter = function () {
            var fieldExit = this.LayerSelectorMessages.fieldExit;
            return (widget_1.tsx("div", { class: CSS.footer },
                widget_1.tsx("calcite-button", { bind: this, onclick: this.closeFieldSelector, appearance: "outline" }, fieldExit)));
        };
        FieldSelector.prototype._setupOnClickEvent = function (field, elem) {
            var _this = this;
            elem.addEventListener("calciteListItemChange", function (e) {
                _this._handleCheckboxClick.call(_this, field, e);
            });
        };
        FieldSelector.prototype._navigateToLayerSelector = function () {
            this.stateStore.router = "LayerSelector";
        };
        FieldSelector.prototype._handleCheckboxClick = function (field, e) {
            var selected = e.target["selected"];
            if (this.stateStore.fieldSelectionMode === "single") {
                if (selected) {
                    this._selectedFields.removeAll();
                    this._selectedFields.add(field.name);
                    this.layerConfigViewModel.fieldSelectionSave(this.uniqueId, this._selectedFields);
                }
            }
            else {
                var name_1 = field.name;
                selected ? this._selectedFields.add(name_1) : this._selectedFields.remove(name_1);
                this.layerConfigViewModel.fieldSelectionSave(this.uniqueId, this._selectedFields);
            }
        };
        FieldSelector.prototype._getLayerFields = function (layer) {
            var _a, _b, _c, _d;
            var fields = new Collection(layer === null || layer === void 0 ? void 0 : layer["fields"]);
            if (((_a = layer === null || layer === void 0 ? void 0 : layer["fields"]) === null || _a === void 0 ? void 0 : _a.length) !== ((_c = (_b = layer === null || layer === void 0 ? void 0 : layer["sourceJSON"]) === null || _b === void 0 ? void 0 : _b["fields"]) === null || _c === void 0 ? void 0 : _c.length)) {
                fields.addMany((_d = layer === null || layer === void 0 ? void 0 : layer["sourceJSON"]) === null || _d === void 0 ? void 0 : _d["fields"].forEach(function (field) { return field.fieldSource = ""; }));
            }
            return fields;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], FieldSelector.prototype, "chosenLayer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FieldSelector.prototype, "uniqueId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FieldSelector.prototype, "layerConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FieldSelector.prototype, "stateStore", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerSelectorConfig/resources")
        ], FieldSelector.prototype, "LayerSelectorMessages", void 0);
        FieldSelector = tslib_1.__decorate([
            decorators_1.subclass("FieldSelector")
        ], FieldSelector);
        return FieldSelector;
    }(Widget));
    return FieldSelector;
});
