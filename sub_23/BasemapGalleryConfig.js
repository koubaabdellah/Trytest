define(["require", "exports", "tslib", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "../../widgets/GroupBrowser/GroupBrowser", "../BaseComponent", "./BasemapGalleryConfig/BasemapGalleryConfigViewModel", "esri/core/Handles", "esri/core/watchUtils"], function (require, exports, tslib_1, widget_1, decorators_1, GroupBrowser, BaseComponent, BasemapGalleryConfigViewModel, Handles, watchUtils_1) {
    "use strict";
    var CSS = {
        base: "esri-basemap-gallery-config",
        header: "esri-basemap-gallery-config__header",
        bodyHeader: "esri-basemap-gallery-config__bodyHeader",
        body: "esri-basemap-gallery-config__body",
        groupSelectorBtn: "esri-basemap-gallery-config__groupSelectorBtn",
        selectableItem: "esri-basemap-gallery-config-selectable-item",
        selectableItemImg: "esri-basemap-gallery-config-selectable-item__image",
    };
    var BasemapGalleryConfig = (function (_super) {
        tslib_1.__extends(BasemapGalleryConfig, _super);
        function BasemapGalleryConfig(values) {
            var _this = _super.call(this, values) || this;
            _this.viewModel = new BasemapGalleryConfigViewModel();
            _this._handles = new Handles();
            return _this;
        }
        BasemapGalleryConfig.prototype.postInitialize = function () {
            var _this = this;
            if (this.configPanelViewModel) {
                watchUtils_1.whenDefinedOnce(this.configPanelViewModel, "portal", function () {
                    var _a;
                    _this.viewModel.portal = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal;
                });
            }
        };
        BasemapGalleryConfig.prototype.render = function () {
            var header = this._renderHeader();
            var body = this._renderBody();
            var groupModal = this._renderGroupModal();
            return (widget_1.tsx("div", { class: CSS.base },
                header,
                body,
                groupModal));
        };
        BasemapGalleryConfig.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        BasemapGalleryConfig.prototype._renderHeader = function () {
            var _a;
            var widgetInfoToolTip = (_a = this === null || this === void 0 ? void 0 : this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("div", { class: CSS.header },
                widget_1.tsx("span", null,
                    this.basemapGalleryConfigMessages.headerTitle,
                    ":"),
                widgetInfoToolTip));
        };
        BasemapGalleryConfig.prototype._renderBody = function () {
            var _a, _b, _c;
            var _d = this.basemapGalleryConfigMessages, basemapsSelected = _d.basemapsSelected, numSelectedConnectorWord = _d.numSelectedConnectorWord;
            return (widget_1.tsx("div", null,
                widget_1.tsx("div", { class: CSS.bodyHeader },
                    basemapsSelected,
                    ": ", (_a = this === null || this === void 0 ? void 0 : this.viewModel) === null || _a === void 0 ? void 0 :
                    _a.basemapSelectedCount,
                    " ",
                    numSelectedConnectorWord,
                    " ", (_c = (_b = this === null || this === void 0 ? void 0 : this.viewModel) === null || _b === void 0 ? void 0 : _b.basemapChoices) === null || _c === void 0 ? void 0 :
                    _c.length),
                widget_1.tsx("div", { class: CSS.body }, this._renderBasemapOptions())));
        };
        BasemapGalleryConfig.prototype._renderGroupModal = function () {
            var _this = this;
            var _a, _b, _c;
            var _d = this.basemapGalleryConfigMessages, modalTitle = _d.modalTitle, groupSelectBtn = _d.groupSelectBtn;
            if (!this._groupBrowser) {
                this._groupBrowser = new GroupBrowser({
                    portal: (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal,
                    modalTitle: modalTitle,
                    buttonText: groupSelectBtn,
                    enableSingleSelection: true,
                    buttonIcon: "basemap",
                    configPanelViewModel: this.configPanelViewModel
                });
                this._handles.add(this._groupBrowser.watch("selectedGroups", function (selectedGroups) {
                    var _a;
                    _this.viewModel.selectedGroupId = (_a = selectedGroups[0]) === null || _a === void 0 ? void 0 : _a.id;
                }));
                return (widget_1.tsx("div", { class: CSS.groupSelectorBtn }, (_b = this._groupBrowser) === null || _b === void 0 ? void 0 : _b.render()));
            }
            else {
                return (widget_1.tsx("div", { class: CSS.groupSelectorBtn }, (_c = this._groupBrowser) === null || _c === void 0 ? void 0 : _c.render()));
            }
        };
        BasemapGalleryConfig.prototype._renderBasemapOptions = function () {
            var _a;
            var basemapsToDisplay = (_a = this === null || this === void 0 ? void 0 : this.viewModel) === null || _a === void 0 ? void 0 : _a.basemapChoices;
            return basemapsToDisplay === null || basemapsToDisplay === void 0 ? void 0 : basemapsToDisplay.map(this._renderBasemapOption.bind(this)).toArray();
        };
        BasemapGalleryConfig.prototype._renderBasemapOption = function (pair) {
            var _this = this;
            var basemap = pair[0], isIncluded = pair[1];
            return (widget_1.tsx("div", { bind: this, class: CSS.selectableItem, key: basemap.title, onclick: function () {
                    pair[1] = !pair[1];
                    _this.viewModel.makeOutput();
                } },
                widget_1.tsx("calcite-checkbox", { checked: pair[1], onclick: function (e) {
                        if (e.srcElement !== e.target) {
                            e.stopPropagation();
                        }
                    } }),
                widget_1.tsx("img", { class: CSS.selectableItemImg, src: basemap.thumbnailUrl }),
                widget_1.tsx("h4", null,
                    " ",
                    basemap.title,
                    " ")));
        };
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.savedState")
        ], BasemapGalleryConfig.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapGalleryConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.output")
        ], BasemapGalleryConfig.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/BasemapGalleryConfig/resources")
        ], BasemapGalleryConfig.prototype, "basemapGalleryConfigMessages", void 0);
        BasemapGalleryConfig = tslib_1.__decorate([
            decorators_1.subclass("BasemapGalleryConfig")
        ], BasemapGalleryConfig);
        return BasemapGalleryConfig;
    }(BaseComponent));
    return BasemapGalleryConfig;
});
