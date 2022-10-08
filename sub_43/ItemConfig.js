define(["require", "exports", "tslib", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/Handles", "esri/core/watchUtils", "esri/core/reactiveUtils", "../BaseComponent", "./ItemCreatorConfig/Item", "./ItemCreatorConfig/ItemCreatorConfigViewModel", "esri/portal/PortalItem", "../../icons/icons", "../../utils/focusUtils", "../../utils/utils", "../FileUploadConfig/FileUploadConfig", "../../utils/url/urlUtils", "../../widgets/Share/Share/t9nUtils"], function (require, exports, tslib_1, widget_1, decorators_1, Handles, watchUtils_1, reactiveUtils_1, BaseComponent, Item, ItemCreatorConfigViewModel, PortalItem, icons_1, focusUtils_1, utils_1, FileUploadConfig, urlUtils_1, t9nUtils_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-item-config",
        buttonContainer: "esri-item-config__button-container",
        addItemRadioGroup: "esri-item-config__add-item-radio-group",
        newItemText: "esri-item-config__new-item-text",
        browseContentContainer: "esri-item-config__browser-content-container",
        overlay: "esri-item-config__item-browser-overlay",
        overlayIsOpen: "esri-item-config__item-browser-overlay--open",
        inputLabel: "esri-item-config__item-label",
        inputLabelText: "esri-item-config__item-label-text",
        invalidURL: "esri-item-config__invalid-url",
        itemInfoIndicator: "esri-item-config__item-info-indicator",
        errorText: "esri-item-config__error-text",
        fieldsContainer: "esri-item-config__fields-container",
        contentInfoContainer: "esri-item-config__content-info-container",
        contentInfoType: "esri-item-config__content-info-type",
        shareLevelType: "esri-item-config__share-level-type",
        itemSelected: "esri-item-config__item-selected",
        hideDescription: "esri-item-config__hide-description",
        openLinksInApp: "esri-item-config__open-links-in-app",
        customThumbnail: "esri-item-config__custom-thumbnail",
        urlTypeLabel: "esri-item-config__url-type-label",
        tooltipIconSwitchContainer: "esri-config-panel__tooltip-icon-switch-container",
        httpAlertMsgContainer: "esri-text-editor-config__http-error-msg-container",
        groupHeaderDark: "esri-config-panel__group-header--dark"
    };
    var DEFAULT_CONFIG = {
        toolbar: {
            items: [
                "bold",
                "italic",
                "fontColor",
                "|",
                "bulletedList",
                "numberedList",
                "indent",
                "outdent",
                "-",
                "alignment",
                "|",
                "link",
                "onlyInsertImage",
                "autoImage",
                "insertTable",
                "-",
                "heading",
                "removeFormat",
                "sourceEditing"
            ],
            shouldNotGroupWhenFull: true
        },
        link: {
            decorators: {
                isExternal: {
                    mode: "manual",
                    label: "Open in a new tab",
                    defaultValue: true,
                    attributes: {
                        target: "_blank"
                    }
                }
            },
            defaultProtocol: "https://"
        }
    };
    var ItemConfig = (function (_super) {
        tslib_1.__extends(ItemConfig, _super);
        function ItemConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._currentAddOption = "itemBrowser";
            _this._wrapper = null;
            _this._handles = new Handles();
            _this._initialItemState = null;
            _this._httpErrorMsg = false;
            _this.itemToConfigure = null;
            _this.editEnabled = false;
            _this.viewModel = null;
            _this.itemNameTipItem = null;
            _this.itemDescriptionTipItem = null;
            _this.itemThumbnailTipItem = null;
            _this.liveItemDetailsTipItem = null;
            _this.openLinksInAppTipItem = null;
            _this.messages = null;
            _this.thumbnailUploadConfig = new FileUploadConfig({
                acceptedTypes: [".jpg", ".jpeg", ".png"]
            });
            _this.loadedPortalItem = null;
            _this.invalidUrl = false;
            _this.embedNotSupported = false;
            _this.checkingUrl = false;
            return _this;
        }
        ItemConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { var _a; return (_a = _this.viewModel) === null || _a === void 0 ? void 0 : _a.configPanelViewModel; })];
                        case 1:
                            _a.sent();
                            this.viewModel.fileUploadConfig.configPanelViewModel = this.viewModel.configPanelViewModel;
                            this.thumbnailUploadConfig.configPanelViewModel = this.viewModel.configPanelViewModel;
                            this.own([
                                watchUtils_1.when(this, "viewModel.itemToConfigure", function () {
                                    if (_this.viewModel.itemToConfigure) {
                                        var _a = _this.viewModel.itemToConfigure, addType = _a.addType, description = _a.description, editorID = _a.editorID, hideDescription = _a.hideDescription, id = _a.id, liveItemDetails = _a.liveItemDetails, thumbnail = _a.thumbnail, title = _a.title, type = _a.type, url = _a.url, visible = _a.visible, file = _a.file, customThumbnail = _a.customThumbnail, customThumbnailFile = _a.customThumbnailFile, customThumbnailType = _a.customThumbnailType, openLinksInApp = _a.openLinksInApp;
                                        _this._initialItemState = {
                                            addType: addType,
                                            description: description,
                                            editorID: editorID,
                                            hideDescription: hideDescription,
                                            id: id,
                                            liveItemDetails: liveItemDetails,
                                            thumbnail: thumbnail,
                                            title: title,
                                            type: type,
                                            url: url,
                                            visible: visible,
                                            file: file,
                                            customThumbnail: customThumbnail,
                                            customThumbnailFile: customThumbnailFile,
                                            customThumbnailType: customThumbnailType,
                                            openLinksInApp: openLinksInApp
                                        };
                                    }
                                }),
                                watchUtils_1.watch(this, "viewModel.itemToConfigure", function () {
                                    if (!_this.viewModel.itemToConfigure) {
                                        return;
                                    }
                                    var _a = _this.viewModel.itemToConfigure, addType = _a.addType, file = _a.file, customThumbnailFile = _a.customThumbnailFile;
                                    if (addType === "file") {
                                        _this.viewModel.fileUploadConfig.savedData = file;
                                    }
                                    if (customThumbnailFile) {
                                        _this.thumbnailUploadConfig.savedData = _this.viewModel.itemToConfigure.customThumbnailFile;
                                    }
                                }),
                                watchUtils_1.watch(this.viewModel.fileUploadConfig, "outputJSON", function () {
                                    if (_this.viewModel.fileUploadConfig.outputJSON) {
                                        _this.viewModel.writeDataToNewItem(null, null, _this.viewModel.fileUploadConfig.outputJSON);
                                    }
                                }),
                                watchUtils_1.watch(this.thumbnailUploadConfig, "outputJSON", function () {
                                    if (_this.thumbnailUploadConfig.outputJSON) {
                                        _this.itemToConfigure.customThumbnailFile = _this.thumbnailUploadConfig.outputJSON;
                                    }
                                }),
                                watchUtils_1.when(this, "itemToConfigure.id", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var portalItem, loadedPortalItem, err_1;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                portalItem = new PortalItem({
                                                    id: this.itemToConfigure.id,
                                                    portal: this.viewModel.configPanelViewModel.portal
                                                });
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, 4, 5]);
                                                return [4, portalItem.load()];
                                            case 2:
                                                loadedPortalItem = _a.sent();
                                                this.loadedPortalItem = loadedPortalItem;
                                                return [3, 5];
                                            case 3:
                                                err_1 = _a.sent();
                                                this.loadedPortalItem = null;
                                                return [3, 5];
                                            case 4:
                                                this.scheduleRender();
                                                return [7];
                                            case 5: return [2];
                                        }
                                    });
                                }); })
                            ]);
                            return [2];
                    }
                });
            });
        };
        ItemConfig.prototype.render = function () {
            var calciteRadioGroup = this._renderCalciteRadioGroup();
            var configForm = this._renderConfigForm();
            var configFormButtons = this._renderConfigFormButtons();
            return [
                widget_1.tsx("span", { class: CSS.newItemText }, this.messages.newItem),
                !this.editEnabled ? calciteRadioGroup : null,
                configForm,
                configFormButtons
            ];
        };
        ItemConfig.prototype._renderConfigForm = function () {
            var _a;
            var _b, _c, _d;
            var addTypeUI = this._renderAddTypeUI();
            var contentInfo = this._renderContentInfo();
            var contentFieldset = this._renderContentFieldset();
            var itemInfoIndicator = this._renderItemInfoIndicator();
            var itemSelected = (_a = {},
                _a[CSS.itemSelected] = ((_b = this.itemToConfigure) === null || _b === void 0 ? void 0 : _b.url) &&
                    !this.viewModel.preventSelection &&
                    !this.viewModel.duplicateItem &&
                    !this.viewModel.fileUploadConfig.sizeExceeded,
                _a);
            return (widget_1.tsx("div", { key: "item-config", class: CSS.base },
                addTypeUI,
                this.viewModel.duplicateItem ? (widget_1.tsx("div", { key: "item-config-error-text" },
                    widget_1.tsx("span", { class: CSS.errorText }, (_c = this.messages) === null || _c === void 0 ? void 0 : _c.duplicateItemErr))) : this.viewModel.preventSelection ? (widget_1.tsx("div", { key: "item-config-error-text" },
                    widget_1.tsx("span", { class: CSS.errorText }, (_d = this.messages) === null || _d === void 0 ? void 0 : _d.addItemErr))) : null,
                widget_1.tsx("div", { class: this.classes(CSS.fieldsContainer, itemSelected) },
                    widget_1.tsx("hr", null),
                    itemInfoIndicator,
                    contentInfo,
                    widget_1.tsx("hr", null),
                    contentFieldset)));
        };
        ItemConfig.prototype._renderConfigFormButtons = function () {
            var cancelButton = this._renderCancelButton();
            var confirmButton = this._renderConfirmButton();
            return (widget_1.tsx("div", { key: "item-creator-button-container", class: CSS.buttonContainer },
                cancelButton,
                confirmButton));
        };
        ItemConfig.prototype._renderCancelButton = function () {
            return (widget_1.tsx("calcite-button", { bind: this, onclick: this._cancelItem, onkeydown: function (e) {
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, appearance: "outline", "data-section-index": "" + this.viewModel.configPanelViewModel.currentSectionIndex }, this.messages.cancel));
        };
        ItemConfig.prototype._renderConfirmButton = function () {
            var _a, _b, _c, _d;
            var disabled = ((_a = this.itemToConfigure) === null || _a === void 0 ? void 0 : _a.addType) === "url"
                ? this.invalidUrl || this.embedNotSupported || this.checkingUrl
                    ? true
                    : false
                : !((_b = this.itemToConfigure) === null || _b === void 0 ? void 0 : _b.url)
                    ? true
                    : false;
            return (widget_1.tsx("calcite-button", { bind: this, onclick: this._confirmItem, onkeydown: function (e) {
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, disabled: this.viewModel.preventSelection ||
                    disabled || ((_d = (_c = this.viewModel) === null || _c === void 0 ? void 0 : _c.fileUploadConfig) === null || _d === void 0 ? void 0 : _d.sizeExceeded) ||
                    this.viewModel.duplicateItem ||
                    this._httpErrorMsg, "data-section-index": "" + this.viewModel.configPanelViewModel.currentSectionIndex, loading: this.checkingUrl ? true : false }, this.messages.done));
        };
        ItemConfig.prototype._renderAddTypeUI = function () {
            var _a, _b;
            var urlFieldset = this._renderUrlFieldset();
            var browserContentOption = this._renderBrowseContentOption();
            var fileContentOption = this._renderFileContentOption();
            var url = "url";
            var itemBrowser = "itemBrowser";
            return this.editEnabled
                ? ((_a = this.itemToConfigure) === null || _a === void 0 ? void 0 : _a.addType) === url
                    ? urlFieldset
                    : ((_b = this.itemToConfigure) === null || _b === void 0 ? void 0 : _b.addType) === itemBrowser
                        ? browserContentOption
                        : fileContentOption
                : this._currentAddOption === url
                    ? urlFieldset
                    : this._currentAddOption === itemBrowser
                        ? browserContentOption
                        : fileContentOption;
        };
        ItemConfig.prototype._renderBrowseContentOption = function () {
            var _this = this;
            var itemBrowserNode = this._renderItemBrowser();
            return (widget_1.tsx("div", { key: "item-config-ib-content-container", class: CSS.browseContentContainer },
                widget_1.tsx("span", null, this.messages.browse),
                widget_1.tsx("calcite-button", { bind: this, onclick: function () {
                        _this._openItemBrowser();
                        _this.viewModel.configPanelViewModel.setGenericModalDOM(itemBrowserNode);
                    }, scale: "s", appearance: "outline" }, this.messages.browseContent)));
        };
        ItemConfig.prototype._renderFileContentOption = function () {
            var _a;
            return (widget_1.tsx("div", { key: "file-upload-item-creator-config" }, (_a = this.viewModel.fileUploadConfig) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ItemConfig.prototype._renderCalciteRadioGroup = function () {
            var itemBrowser = this._renderCalciteRadioItemBrowserOption();
            var file = this._renderCalciteRadioItemFileOption();
            var url = this._renderCalciteRadioUrlOption();
            return (widget_1.tsx("calcite-radio-group", { layout: "horizontal", appearance: "solid", scale: "s", role: "radiogroup", width: "full", class: CSS.addItemRadioGroup },
                itemBrowser,
                file,
                url));
        };
        ItemConfig.prototype._renderCalciteRadioItemBrowserOption = function () {
            return (widget_1.tsx("calcite-radio-group-item", { bind: this, onclick: this._updateAddOption, value: "itemBrowser", role: "radio", scale: "s", checked: true }, "ArcGIS"));
        };
        ItemConfig.prototype._renderCalciteRadioItemFileOption = function () {
            return (widget_1.tsx("calcite-radio-group-item", { bind: this, onclick: this._updateAddOption, value: "file", role: "radio", scale: "s" }, this.messages.file));
        };
        ItemConfig.prototype._renderCalciteRadioUrlOption = function () {
            return (widget_1.tsx("calcite-radio-group-item", { bind: this, onclick: this._updateAddOption, value: "url", role: "radio", scale: "s" }, this.messages.url));
        };
        ItemConfig.prototype._renderItemBrowser = function () {
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.overlay), afterCreate: this._createItemBrowser }));
        };
        ItemConfig.prototype._renderUrlFieldset = function () {
            var _a, _b, _c, _d, _e, _f, _g;
            var url = this._renderUrlInput();
            return (widget_1.tsx("fieldset", { key: "url-fieldset" },
                url,
                this.invalidUrl ? (widget_1.tsx("span", { class: CSS.invalidURL }, this.messages.invalidUrl)) : this.embedNotSupported ? (widget_1.tsx("span", { class: CSS.invalidURL },
                    widget_1.tsx("calcite-link", { href: (_c = (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.appConfig) === null || _c === void 0 ? void 0 : _c.portfolioHelpDocLink, target: "_blank" }, (_e = (_d = this.messages) === null || _d === void 0 ? void 0 : _d.embedError) === null || _e === void 0 ? void 0 : _e.unableToAdd),
                    " ", "" + ((_g = (_f = this.messages) === null || _f === void 0 ? void 0 : _f.embedError) === null || _g === void 0 ? void 0 : _g.embedNotSupported))) : null));
        };
        ItemConfig.prototype._renderUrlInput = function () {
            var _a;
            return (widget_1.tsx("label", null,
                this.messages.url,
                widget_1.tsx("input", { bind: this, onblur: this._updateItemValue, type: "text", "data-input-type": "url", value: (_a = this.itemToConfigure) === null || _a === void 0 ? void 0 : _a.url })));
        };
        ItemConfig.prototype._renderContentInfo = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var baseUrl = utils_1.getBaseUrl(this.viewModel.configPanelViewModel.portal);
            var portalItemId = (_a = this.loadedPortalItem) === null || _a === void 0 ? void 0 : _a.id;
            var itemUrl = portalItemId
                ? baseUrl + "/home/item.html?id=" + portalItemId
                : "";
            return (widget_1.tsx("div", { class: CSS.contentInfoContainer },
                widget_1.tsx("span", { key: ((_b = this.itemToConfigure) === null || _b === void 0 ? void 0 : _b.id) + "-item-type" },
                    widget_1.tsx("span", { class: CSS.contentInfoType }, ((_c = this.messages) === null || _c === void 0 ? void 0 : _c.type) + ":"),
                    widget_1.tsx("span", { afterCreate: function (node) { return _this._getItemType(node); } })),
                widget_1.tsx("span", { key: ((_d = this.itemToConfigure) === null || _d === void 0 ? void 0 : _d.id) + "-share-level", class: CSS.shareLevelType },
                    widget_1.tsx("span", null, "" + ((_j = (_h = (_g = (_f = (_e = this.viewModel) === null || _e === void 0 ? void 0 : _e.configPanelViewModel) === null || _f === void 0 ? void 0 : _f.shareLevel) === null || _g === void 0 ? void 0 : _g.messages) === null || _h === void 0 ? void 0 : _h.shareLevel) === null || _j === void 0 ? void 0 : _j.title)),
                    widget_1.tsx("span", { afterUpdate: function (node) { return _this._getSharingLevel(node); } })),
                portalItemId ? (widget_1.tsx("span", { key: ((_k = this.itemToConfigure) === null || _k === void 0 ? void 0 : _k.id) + "-item-details" },
                    widget_1.tsx("a", { target: "_blank", href: itemUrl }, (_l = this.messages) === null || _l === void 0 ? void 0 :
                        _l.viewItemDetails,
                        widget_1.tsx("calcite-icon", { icon: icons_1.default.launch, scale: "s" })))) : null));
        };
        ItemConfig.prototype._getItemType = function (node) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var loadedPortalItem;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(((_a = this.itemToConfigure) === null || _a === void 0 ? void 0 : _a.type) === "Web Mapping Application")) return [3, 2];
                            return [4, reactiveUtils_1.whenOnce(function () { return _this.loadedPortalItem; })];
                        case 1:
                            loadedPortalItem = _b.sent();
                            node.innerText = this.viewModel.getTypeValue(loadedPortalItem, this.itemToConfigure.type);
                            return [3, 3];
                        case 2:
                            node.innerText = this.viewModel.getTypeValue(null, this.itemToConfigure.type);
                            _b.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        ItemConfig.prototype._getSharingLevel = function (node) {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var item, shareLevel, itemHasGroups, groupMessage, shareLevelMessage;
                var _this = this;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { return _this.loadedPortalItem; })];
                        case 1:
                            item = _c.sent();
                            shareLevel = this.viewModel.configPanelViewModel.shareLevel;
                            return [4, shareLevel.checkForGroups(item)];
                        case 2:
                            itemHasGroups = _c.sent();
                            groupMessage = t9nUtils_1.getGroupMessage(itemHasGroups, (_b = (_a = shareLevel === null || shareLevel === void 0 ? void 0 : shareLevel.messages) === null || _a === void 0 ? void 0 : _a.shareLevel) === null || _b === void 0 ? void 0 : _b.group);
                            shareLevelMessage = t9nUtils_1.getShareLevelMessage(item === null || item === void 0 ? void 0 : item.access, shareLevel === null || shareLevel === void 0 ? void 0 : shareLevel.messages, groupMessage);
                            node.innerText = "" + shareLevelMessage;
                            return [2];
                    }
                });
            });
        };
        ItemConfig.prototype._renderContentFieldset = function () {
            var _a, _b, _c;
            var title = this._renderTitleInput();
            var description = this._renderDescriptionInput();
            var isNotFile = ((_a = this.itemToConfigure) === null || _a === void 0 ? void 0 : _a.type) !== "Image" &&
                ((_b = this.itemToConfigure) === null || _b === void 0 ? void 0 : _b.type) !== "PDF";
            var thumbnail = isNotFile && this.viewModel.portfolioAppLayout === "carousel"
                ? this._renderThumbnailInput()
                : null;
            var hideDescription = this._renderHideDescription();
            var openLinksInApp = this._renderOpenLinksInApp();
            var liveItemDetails = this._checkPortalItem((_c = this.itemToConfigure) === null || _c === void 0 ? void 0 : _c.url) && isNotFile
                ? this._renderLiveItemDetails()
                : null;
            return (widget_1.tsx("fieldset", { key: "content-fieldset" },
                widget_1.tsx("legend", { class: "sr-only" }, this.messages.itemInfo),
                title,
                widget_1.tsx("calcite-accordion", { "icon-position": "start" },
                    widget_1.tsx("calcite-accordion-item", { "item-title": this.messages.itemDescription },
                        description,
                        this._httpErrorMsg ? (widget_1.tsx("calcite-notice", { key: "text-editor-config-http-error", scale: "s", color: "red", active: true, class: CSS.httpAlertMsgContainer, icon: "exclamation-mark-triangle-f" },
                            widget_1.tsx("span", { class: "esri-text-edtior-config__http-error-msg", slot: "message" }, this.viewModel.configPanelViewModel.configPanelMessages
                                .linkProtocol))) : null)),
                hideDescription,
                openLinksInApp,
                liveItemDetails,
                thumbnail));
        };
        ItemConfig.prototype._renderItemInfoIndicator = function () {
            var _a;
            return (widget_1.tsx("div", { class: CSS.itemInfoIndicator },
                this.messages.itemInfo,
                ((_a = this.itemToConfigure) === null || _a === void 0 ? void 0 : _a.url) && !this.viewModel.preventSelection ? (widget_1.tsx("calcite-icon", { key: "icon-indicator-" + this.itemToConfigure.id, icon: icons_1.default.checkCircleF, scale: "s" })) : null));
        };
        ItemConfig.prototype._renderTitleInput = function () {
            var _a;
            return (widget_1.tsx("label", { key: "title-input", class: CSS.inputLabel },
                widget_1.tsx("span", { class: CSS.inputLabelText },
                    this.messages.itemName,
                    this.itemNameTipItem
                        ? (_a = this.itemNameTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null),
                widget_1.tsx("input", { bind: this, onchange: this._updateItemValue, type: "text", "data-input-type": "title", value: this.itemToConfigure.title })));
        };
        ItemConfig.prototype._renderThumbnailInput = function () {
            var _this = this;
            var _a, _b, _c;
            var customThumbnail = this.itemToConfigure.customThumbnail;
            return [
                widget_1.tsx("label", { key: "thumbnail-input", class: CSS.customThumbnail },
                    widget_1.tsx("span", { class: CSS.inputLabelText }, this.messages.customThumbnail),
                    widget_1.tsx("div", { class: CSS.tooltipIconSwitchContainer },
                        this.itemThumbnailTipItem
                            ? (_a = this.itemThumbnailTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null,
                        widget_1.tsx("calcite-switch", { bind: this, oncalciteSwitchChange: this._handleCustomThumbnail, checked: !!customThumbnail }))),
                this.itemToConfigure.customThumbnail
                    ? [
                        widget_1.tsx("calcite-radio-group", { width: "full", scale: "s" },
                            widget_1.tsx("calcite-radio-group-item", { bind: this, onclick: this._handleCustomThumbnailType, value: "url", afterCreate: function (node) {
                                    if (_this.itemToConfigure.customThumbnailType === "url" ||
                                        _this.itemToConfigure.customThumbnailType === undefined) {
                                        node.setAttribute("checked", "");
                                    }
                                } }, this.messages.url),
                            widget_1.tsx("calcite-radio-group-item", { bind: this, onclick: this._handleCustomThumbnailType, value: "file", afterCreate: function (node) {
                                    if (_this.itemToConfigure.customThumbnailType === "file") {
                                        node.setAttribute("checked", "");
                                    }
                                } }, this.messages.file)),
                        this.itemToConfigure.customThumbnailType === "url" ? (widget_1.tsx("label", null, (_b = this.messages) === null || _b === void 0 ? void 0 :
                            _b.thumbnail,
                            widget_1.tsx("input", { bind: this, onchange: this._updateItemValue, type: "text", "data-input-type": "thumbnail", value: this.itemToConfigure.thumbnail }))) : ((_c = this.thumbnailUploadConfig) === null || _c === void 0 ? void 0 : _c.render())
                    ]
                    : null
            ];
        };
        ItemConfig.prototype._renderHideDescription = function () {
            var hideDescription = this.itemToConfigure.hideDescription;
            return (widget_1.tsx("label", { class: CSS.hideDescription },
                widget_1.tsx("span", null, this.messages.hideDescription),
                widget_1.tsx("calcite-switch", { bind: this, oncalciteSwitchChange: this._handleHideDescription, checked: !!hideDescription })));
        };
        ItemConfig.prototype._renderOpenLinksInApp = function () {
            var _a;
            var openLinksInApp = this.itemToConfigure.openLinksInApp;
            return (widget_1.tsx("label", { key: this.itemToConfigure.id + "open-links-in-app", class: CSS.openLinksInApp },
                widget_1.tsx("span", null, this.messages.openLinksInApp),
                widget_1.tsx("div", { class: CSS.tooltipIconSwitchContainer },
                    this.openLinksInAppTipItem
                        ? (_a = this.openLinksInAppTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null,
                    widget_1.tsx("calcite-switch", { bind: this, oncalciteSwitchChange: this._handleOpenLinksInApp, checked: !!openLinksInApp }))));
        };
        ItemConfig.prototype._renderLiveItemDetails = function () {
            var _a;
            var liveItemDetails = this.itemToConfigure.liveItemDetails;
            return (widget_1.tsx("label", { key: this.itemToConfigure.id + "live-item-details", class: CSS.hideDescription },
                widget_1.tsx("span", null, this.messages.liveItemDetails),
                widget_1.tsx("div", { class: CSS.tooltipIconSwitchContainer },
                    this.liveItemDetailsTipItem
                        ? (_a = this.liveItemDetailsTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null,
                    widget_1.tsx("calcite-switch", { bind: this, oncalciteSwitchChange: this._handleLiveItemDetails, checked: !!liveItemDetails }))));
        };
        ItemConfig.prototype._renderDescriptionInput = function () {
            var _a;
            return [
                widget_1.tsx("label", { key: "description-input", class: CSS.inputLabel, for: this.itemToConfigure.editorID },
                    widget_1.tsx("span", { class: CSS.inputLabelText },
                        this.messages.itemDescription,
                        this.itemDescriptionTipItem
                            ? (_a = this.itemDescriptionTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null)),
                widget_1.tsx("textarea", { bind: this, id: this.itemToConfigure.editorID, name: this.itemToConfigure.editorID, afterCreate: this._handleCKEditorCreation }, this.itemToConfigure.description
                    ? this.itemToConfigure.description
                    : "")
            ];
        };
        ItemConfig.prototype._updateAddOption = function (e) {
            var node = e.target;
            this._currentAddOption = node.value;
        };
        ItemConfig.prototype._updateItemValue = function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var node, dataInputType, isHTTPUrl, updatedUrl, id, portalItemUrl, isNotSupportedVideo, checkUrlRes, nonPortalItemUrl;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.set("fileUploadConfig.sizeExceeded", false);
                            node = e.target;
                            dataInputType = node.getAttribute("data-input-type");
                            if (!(dataInputType === "url")) return [3, 3];
                            this.itemToConfigure.addType = "url";
                            isHTTPUrl = this.viewModel.isHTTPUrl(node);
                            if (isHTTPUrl) {
                                this._set("invalidUrl", true);
                                this.scheduleRender();
                                return [2];
                            }
                            updatedUrl = node.value;
                            if (node.value.includes("https://www.")) {
                                updatedUrl = node.value.replace("https://www.", "https://");
                            }
                            else if (node.value.includes("www.")) {
                                updatedUrl = node.value.replace("www.", "https://");
                            }
                            else if (node.value && !node.value.includes("https://")) {
                                updatedUrl = "https://" + node.value;
                            }
                            node.value = updatedUrl;
                            id = this.viewModel.getIdFromUrl(node);
                            if (id) {
                                this._set("invalidUrl", false);
                                this._set("embedNotSupported", false);
                                this._handleUrlWithId(id, node);
                                return [2];
                            }
                            portalItemUrl = this._getPortalItemUrl(node);
                            if (portalItemUrl) {
                                this._set("invalidUrl", false);
                                this._set("embedNotSupported", false);
                                this.viewModel.writeDataToNewItem(null, node);
                                return [2];
                            }
                            isNotSupportedVideo = this._checkIfNotSupportedVideo(node);
                            if (!isNotSupportedVideo) return [3, 2];
                            this._set("checkingUrl", true);
                            return [4, urlUtils_1.checkUrl({
                                    url: node.value,
                                    portal: this.viewModel.configPanelViewModel.portal
                                })];
                        case 1:
                            checkUrlRes = _a.sent();
                            this._set("checkingUrl", false);
                            if (!checkUrlRes.isEmbedSupported) {
                                this._set("invalidUrl", false);
                                this._set("embedNotSupported", true);
                                return [2];
                            }
                            _a.label = 2;
                        case 2:
                            nonPortalItemUrl = this._getNonPortalItemUrl(node);
                            if (nonPortalItemUrl) {
                                this._set("invalidUrl", false);
                                this._set("embedNotSupported", false);
                                this.viewModel.writeDataToNewItem(null, node, null, this.editEnabled);
                                return [2];
                            }
                            return [3, 4];
                        case 3:
                            this.itemToConfigure[dataInputType] = node.value;
                            _a.label = 4;
                        case 4: return [2];
                    }
                });
            });
        };
        ItemConfig.prototype._confirmItem = function () {
            var _a = this, itemToConfigure = _a.itemToConfigure, viewModel = _a.viewModel;
            var itemCollection = this.get("viewModel.itemCollection");
            var existingItem = itemCollection.find(function (item) { return item.id === itemToConfigure.id; });
            var descData = this._getData();
            if (descData === false) {
                this._httpErrorMsg = true;
                this.scheduleRender();
                return;
            }
            this._httpErrorMsg = false;
            itemToConfigure.description = descData;
            if (existingItem) {
                viewModel.editItem(itemToConfigure, existingItem.id);
            }
            else {
                viewModel.addItem(itemToConfigure);
            }
            this._resetItemConfigUI();
        };
        ItemConfig.prototype._cancelItem = function () {
            var _this = this;
            if (this.editEnabled) {
                var itemIndex = this.viewModel.itemCollection.findIndex(function (item) { return item.id === _this._initialItemState.id; });
                this.viewModel.itemCollection.splice(itemIndex, 1, new Item(tslib_1.__assign({}, this._initialItemState)));
            }
            this._resetItemConfigUI();
            this.viewModel.cancelItem();
        };
        ItemConfig.prototype._resetItemConfigUI = function () {
            if (this.editEnabled) {
                this.editEnabled = false;
            }
            this.itemToConfigure = null;
            this._currentAddOption = "itemBrowser";
            this._set("invalidUrl", false);
            this._set("embedNotSupported", false);
            this.thumbnailUploadConfig.sizeExceeded = false;
            this.thumbnailUploadConfig.outputJSON = null;
            this.thumbnailUploadConfig.savedData = null;
            this.viewModel.fileUploadConfig.fileNotSupported = false;
            this.viewModel.fileUploadConfig.sizeExceeded = false;
            this.viewModel.fileUploadConfig.outputJSON = null;
            this.viewModel.fileUploadConfig.savedData = null;
            this.scheduleRender();
        };
        ItemConfig.prototype._openItemBrowser = function () {
            this.set("viewModel.itemBrowserIsOpen", true);
            this.scheduleRender();
        };
        ItemConfig.prototype._createItemBrowser = function (itemBrowserContainer) {
            var _a;
            if (!this._handles.has("itemBrowserWatcher")) {
                this._initItemBrowserModalWatcher(itemBrowserContainer);
            }
            var portal = (_a = this.viewModel.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal;
            if (!portal || (portal === null || portal === void 0 ? void 0 : portal.authMode) !== "immediate" || this._wrapper) {
                return;
            }
            this._wrapper = this.viewModel.createItemBrowser(itemBrowserContainer);
        };
        ItemConfig.prototype._initItemBrowserModalWatcher = function (itemBrowserContainer) {
            this._handles.add(watchUtils_1.init(this, "viewModel.itemBrowserIsOpen", function (isOpen) {
                var classList = itemBrowserContainer.classList;
                if (isOpen) {
                    classList.add(CSS.overlayIsOpen);
                }
                else {
                    classList.remove(CSS.overlayIsOpen);
                }
            }), "itemBrowserWatcher");
        };
        ItemConfig.prototype._handleCKEditorCreation = function (node) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var editor;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, ClassicEditor.create(node, DEFAULT_CONFIG)];
                        case 1:
                            editor = _a.sent();
                            editor.model.document.on("change:data", function () {
                                var descData = _this._getData();
                                if (descData === false) {
                                    _this._httpErrorMsg = true;
                                }
                                else {
                                    _this._httpErrorMsg = false;
                                }
                                _this.scheduleRender();
                            });
                            this.viewModel.editorInstances[this.itemToConfigure.editorID] = editor;
                            return [2];
                    }
                });
            });
        };
        ItemConfig.prototype._getData = function () {
            var _a, _b;
            var editorInstance = this.viewModel.editorInstances[this.itemToConfigure.editorID];
            if (!editorInstance) {
                return;
            }
            var editorData = editorInstance === null || editorInstance === void 0 ? void 0 : editorInstance.getData();
            var sanitizedData = (_b = (_a = this.viewModel.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.sanitizer) === null || _b === void 0 ? void 0 : _b.sanitize(editorData);
            var data = sanitizedData
                .replace("<p>", "")
                .replace("</p>", "")
                .replace("&nbsp;", "");
            if (data.indexOf("http://") !== -1) {
                return false;
            }
            return data;
        };
        ItemConfig.prototype._handleCustomThumbnail = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var node = e.target;
            this.itemToConfigure.customThumbnail = node.checked;
        };
        ItemConfig.prototype._handleCustomThumbnailType = function (e) {
            var node = e.target;
            this.itemToConfigure.customThumbnailType = node.value;
        };
        ItemConfig.prototype._handleHideDescription = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var node = e.target;
            this.itemToConfigure.hideDescription = node.checked;
        };
        ItemConfig.prototype._handleOpenLinksInApp = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var node = e.target;
            this.itemToConfigure.openLinksInApp = node.checked;
        };
        ItemConfig.prototype._handleLiveItemDetails = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var node = e.target;
            this.itemToConfigure.liveItemDetails = node.checked;
        };
        ItemConfig.prototype._handleUrlWithId = function (id, node) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portalItem, loadedPortalItem, _a, isDisallowed;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            portalItem = new PortalItem({
                                id: id,
                                portal: {
                                    url: this.viewModel.configPanelViewModel.portal.url
                                }
                            });
                            loadedPortalItem = null;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4, portalItem.load()];
                        case 2:
                            loadedPortalItem = (_b.sent());
                            return [3, 5];
                        case 3:
                            _a = _b.sent();
                            return [3, 5];
                        case 4:
                            isDisallowed = this.viewModel.checkDisallowedList(loadedPortalItem);
                            if (isDisallowed || !loadedPortalItem) {
                                this._resetItemConfig();
                            }
                            else {
                                this.viewModel.writeDataToNewItem(portalItem, node);
                            }
                            return [7];
                        case 5: return [2];
                    }
                });
            });
        };
        ItemConfig.prototype._resetItemConfig = function () {
            this.set("viewModel.preventSelection", true);
            this.set("viewModel.duplicateItem", false);
            this.set("itemToConfigure.title", "");
            this.set("itemToConfigure.description", "");
            this.set("itemToConfigure.thumbnail", "");
        };
        ItemConfig.prototype._getNonPortalItemUrl = function (node) {
            var value = node.value;
            return value;
        };
        ItemConfig.prototype._getPortalItemUrl = function (node) {
            var value = node.value;
            var isPortalItem = this._checkPortalItem(value);
            return isPortalItem ? value : null;
        };
        ItemConfig.prototype._checkPortalItem = function (value) {
            if (!value) {
                return false;
            }
            var isArcGISPortalItem = false;
            this.viewModel.arcgisUrls.forEach(function (urlSubStr) {
                if (value.indexOf(urlSubStr) !== -1) {
                    isArcGISPortalItem = true;
                }
            });
            return isArcGISPortalItem;
        };
        ItemConfig.prototype._checkIfNotSupportedVideo = function (node) {
            var _a, _b, _c, _d;
            var youtubeRegExp = (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.miscRegex) === null || _b === void 0 ? void 0 : _b.youtube;
            var vimeoRegExp = (_d = (_c = this.viewModel) === null || _c === void 0 ? void 0 : _c.miscRegex) === null || _d === void 0 ? void 0 : _d.vimeo;
            var isYouTube = youtubeRegExp ? youtubeRegExp.test(node.value) : true;
            var isVimeo = vimeoRegExp ? vimeoRegExp.test(node.value) : true;
            return !isYouTube && !isVimeo;
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemToConfigure")
        ], ItemConfig.prototype, "itemToConfigure", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "editEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ItemCreatorConfigViewModel
            })
        ], ItemConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "itemNameTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "itemDescriptionTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "itemThumbnailTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "liveItemDetailsTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "openLinksInAppTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "thumbnailUploadConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemConfig.prototype, "loadedPortalItem", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemConfig.prototype, "invalidUrl", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemConfig.prototype, "embedNotSupported", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemConfig.prototype, "checkingUrl", void 0);
        ItemConfig = tslib_1.__decorate([
            decorators_1.subclass("ItemConfig")
        ], ItemConfig);
        return ItemConfig;
    }(BaseComponent));
    return ItemConfig;
});
