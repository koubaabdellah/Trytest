define(["require", "exports", "tslib", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/intl", "../../widgets/GroupBrowser/GroupBrowser", "../BaseComponent", "./GroupBrowserConfig/GroupBrowserConfigViewModel", "esri/core/Handles", "esri/core/watchUtils"], function (require, exports, tslib_1, widget_1, decorators_1, intl_1, GroupBrowser, BaseComponent, GroupBrowserConfigViewModel, Handles, watchUtils_1) {
    "use strict";
    var CSS = {
        base: "esri-group-browser-config",
        header: "esri-group-browser-config__header",
        bodyHeader: "esri-group-browser-config__bodyHeader",
        body: "esri-group-browser-config__body",
        groupSelectorBtn: "esri-group-browser-config__groupSelectorBtn",
        selectableItem: "esri-group-browser-config-selectable-item",
        selectableItemImg: "esri-group-browser-config-selectable-item__image",
        previewBase: "esri-config-panel-item-browser-preview",
        previewTitle: "esri-config-panel-item-browser-preview__title",
        previewOwner: "esri-config-panel-item-browser-preview__owner",
        previewOwnerLabel: "esri-config-panel-item-browser-preview__owner-label",
        previewOwnerText: "esri-config-panel-item-browser-preview__owner-text",
        previewDates: "esri-config-panel-item-browser-preview__dates",
        previewDateItem: "esri-config-panel-item-browser-preview__date-item",
        previewDateLabel: "esri-config-panel-item-browser-preview__date-label",
        previewDateText: "esri-config-panel-item-browser-preview__date-text",
        previewBaseDarkMode: "esri-config-panel-item-browser-preview__dark-mode",
        previewDarkModeDates: "esri-config-panel-item-browser-preview__dates--dark",
        previewDarkModeText: "esri-config-panel-item-browser-preview__dark-mode-text"
    };
    var GroupBrowserConfig = (function (_super) {
        tslib_1.__extends(GroupBrowserConfig, _super);
        function GroupBrowserConfig(values) {
            var _this = _super.call(this, values) || this;
            _this.messages = null;
            _this.viewModel = new GroupBrowserConfigViewModel();
            _this._handles = new Handles();
            _this._darkModeEnabled = false;
            return _this;
        }
        GroupBrowserConfig.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel.portal", function () {
                var _a;
                _this.viewModel.portal = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal;
            });
            this._darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)")
                .matches;
        };
        GroupBrowserConfig.prototype.render = function () {
            var header = this._renderHeader();
            var body = this._renderBody();
            var groupModal = this._renderGroupModal();
            return (widget_1.tsx("div", { class: CSS.base },
                header,
                body,
                groupModal));
        };
        GroupBrowserConfig.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        GroupBrowserConfig.prototype._renderHeader = function () {
            return (widget_1.tsx("div", { class: CSS.header },
                widget_1.tsx("span", null,
                    this.messages.headerTitle,
                    ":")));
        };
        GroupBrowserConfig.prototype._renderBody = function () {
            return (widget_1.tsx("div", null,
                widget_1.tsx("div", { class: CSS.body }, this._renderGroupOption())));
        };
        GroupBrowserConfig.prototype._renderGroupModalHelper = function () {
            var _this = this;
            this._handles.add([
                this._groupBrowser.watch("selectedGroups", function (selectedGroups) {
                    var _a;
                    _this._stagedSelectedGroup = selectedGroups[0] ? selectedGroups[0] : null;
                    _this._stagedSelectedGroupId = (_a = selectedGroups[0]) === null || _a === void 0 ? void 0 : _a.id;
                }),
                this._groupBrowser.watch("isConfirmed", function (isConfirmed) {
                    if (isConfirmed) {
                        _this.viewModel.selectedGroup = _this._stagedSelectedGroup;
                        _this.viewModel.selectedGroupId = _this._stagedSelectedGroupId;
                        _this.viewModel.makeOutput();
                        _this._groupBrowser.isConfirmed = false;
                    }
                })
            ]);
        };
        GroupBrowserConfig.prototype._renderGroupModal = function () {
            var _this = this;
            var _a, _b;
            if (!this._groupBrowser) {
                this._groupBrowser = new GroupBrowser({
                    portal: this.configPanelViewModel.portal,
                    buttonIcon: "basemap",
                    enableFiltering: true,
                    enableSingleSelection: true,
                    configPanelViewModel: this.configPanelViewModel
                });
                this._groupBrowser.modalTitle = this.messages.modalTitle;
                this._groupBrowser.buttonText = this.messages.groupSelectBtn;
                this._renderGroupModalHelper();
                watchUtils_1.whenOnce(this.viewModel, "selectedGroup", function () {
                    _this._groupBrowser.selectedGroups = [_this.viewModel.selectedGroup];
                    _this._renderGroupModalHelper();
                });
                return (widget_1.tsx("div", { class: CSS.groupSelectorBtn }, (_a = this._groupBrowser) === null || _a === void 0 ? void 0 : _a.render()));
            }
            else {
                return (widget_1.tsx("div", { class: CSS.groupSelectorBtn }, (_b = this._groupBrowser) === null || _b === void 0 ? void 0 : _b.render()));
            }
        };
        GroupBrowserConfig.prototype._renderGroupOption = function () {
            var _a;
            var title = this._renderTitle();
            var owner = this._renderOwner();
            var date = this._renderDateModified();
            var darkMode = (_a = {},
                _a[CSS.previewBaseDarkMode] = this._darkModeEnabled,
                _a);
            return this.viewModel.selectedGroup ?
                (widget_1.tsx("div", { key: "group-browser-preview", class: this.classes(CSS.previewBase, darkMode) },
                    widget_1.tsx("div", null,
                        title,
                        owner,
                        widget_1.tsx("hr", null),
                        date))) :
                (widget_1.tsx("div", { key: "group-browser-preview", class: this.classes(CSS.previewBase, darkMode) }));
        };
        GroupBrowserConfig.prototype._renderTitle = function () {
            var _a;
            var title = (_a = this.viewModel.selectedGroup) === null || _a === void 0 ? void 0 : _a.title;
            return this.configPanelViewModel.expressEnabled ? (widget_1.tsx("h4", { class: CSS.previewTitle }, title)) : (widget_1.tsx("h3", { class: CSS.previewTitle }, title));
        };
        GroupBrowserConfig.prototype._renderOwner = function () {
            var _a;
            var _b;
            var owner = (_b = this.viewModel.selectedGroup) === null || _b === void 0 ? void 0 : _b.owner;
            var darkModeText = (_a = {},
                _a[CSS.previewDarkModeText] = this._darkModeEnabled,
                _a);
            return (widget_1.tsx("div", { class: CSS.previewOwner },
                widget_1.tsx("div", { class: CSS.previewOwnerLabel },
                    this.messages.owner,
                    ":"),
                widget_1.tsx("p", { class: this.classes(CSS.previewOwnerText, darkModeText) }, owner)));
        };
        GroupBrowserConfig.prototype._renderDateModified = function () {
            var _a, _b;
            var _c;
            var modified = (_c = this.viewModel.selectedGroup) === null || _c === void 0 ? void 0 : _c.modified;
            var darkMode = (_a = {},
                _a[CSS.previewDarkModeDates] = this._darkModeEnabled,
                _a);
            var darkModeText = (_b = {},
                _b[CSS.previewDarkModeText] = this._darkModeEnabled,
                _b);
            return (widget_1.tsx("p", { class: this.classes(CSS.previewDates, darkMode) },
                widget_1.tsx("div", { class: CSS.previewDateItem },
                    widget_1.tsx("span", { class: CSS.previewDateLabel }, this.messages.modified + ": "),
                    widget_1.tsx("span", { class: this.classes(CSS.previewDateText, darkModeText) }, intl_1.formatDate(modified)))));
        };
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.savedState")
        ], GroupBrowserConfig.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/GroupBrowserConfig/resources")
        ], GroupBrowserConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.output")
        ], GroupBrowserConfig.prototype, "output", void 0);
        GroupBrowserConfig = tslib_1.__decorate([
            decorators_1.subclass("GroupBrowserConfig")
        ], GroupBrowserConfig);
        return GroupBrowserConfig;
    }(BaseComponent));
    return GroupBrowserConfig;
});
