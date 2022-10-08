define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/Collection", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/core/Handles", "../../../widgets/ItemBrowser/ItemBrowser", "./Item", "esri/portal/PortalItem", "esri/request", "arcgis-components/wrappers/ItemBrowser", "esri/widgets/support/widget", "../../FileUploadConfig/FileUploadConfig"], function (require, exports, tslib_1, Accessor, Collection, decorators_1, watchUtils_1, Handles, ItemBrowser, Item, PortalItem, request, ItemBrowser_1, widget_1, FileUploadConfig) {
    "use strict";
    var ITEM_TYPES = {
        instantApp: "Instant App"
    };
    var ItemCreatorConfigViewModel = (function (_super) {
        tslib_1.__extends(ItemCreatorConfigViewModel, _super);
        function ItemCreatorConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._uploading = false;
            _this.fieldName = null;
            _this.configPanelViewModel = null;
            _this.itemConfigIsOpen = false;
            _this.itemCollection = new Collection();
            _this.savedState = null;
            _this.output = null;
            _this.itemBrowser = new ItemBrowser();
            _this.itemBrowserIsOpen = false;
            _this.itemToConfigure = null;
            _this.disallowList = null;
            _this.preventSelection = false;
            _this.fileUploadConfig = new FileUploadConfig({
                acceptedTypes: [".jpg", ".jpeg", ".png", ".pdf"]
            });
            _this.portfolioAppLayout = null;
            _this.duplicateItem = false;
            _this.editorInstances = {};
            _this.arcgisUrls = [
                "mapsdevext.arcgis.com",
                "mapsqa.arcgis.com",
                "maps.arcgis.com",
                "hubdev.arcgis.com",
                "hubqa.arcgis.com",
                "hub.arcgis.com",
                "insightsdev.arcgis.com",
                "insightsqa.arcgis.com",
                "insights.arcgis.com",
                "experiencedev.arcgis.com",
                "experienceqa.arcgis.com",
                "experience.arcgis.com",
                "survey123dev.arcgis.com",
                "survey123qa.arcgis.com",
                "survey123.arcgis.com",
                "storymapsdev.arcgis.com",
                "storymapsqa.arcgis.com",
                "storymaps.arcgis.com"
            ];
            _this.miscRegex = {
                youtube: /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/,
                vimeo: /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/
            };
            _this.messages = null;
            return _this;
        }
        Object.defineProperty(ItemCreatorConfigViewModel.prototype, "state", {
            get: function () {
                return this._uploading ? "uploading" : "ready";
            },
            enumerable: false,
            configurable: true
        });
        ItemCreatorConfigViewModel.prototype.initialize = function () {
            this._initItemCollection();
        };
        ItemCreatorConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        ItemCreatorConfigViewModel.prototype._initItemCollection = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel.templateAppData", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this._handleAppCreationWithMap();
                    return [2];
                });
            }); });
            watchUtils_1.whenOnce(this, "savedState", function () {
                var items = _this.savedState.map(function (savedStateItem) { return new Item(savedStateItem); });
                _this.itemCollection.addMany(items);
            });
            this._handles.add(watchUtils_1.whenEqual(this, "fileUploadConfig.viewModel.state", "uploading", function () {
                _this.fileUploadConfig.set("viewModel.itemCreatorIsLoading", true);
                watchUtils_1.whenOnce(_this, "itemToConfigure.url", function () {
                    _this.fileUploadConfig.set("viewModel.itemCreatorIsLoading", false);
                });
            }));
        };
        ItemCreatorConfigViewModel.prototype.toggleVisibility = function (item) {
            item.visible = !item.visible;
            this.generateOutputJSON();
        };
        ItemCreatorConfigViewModel.prototype.addItem = function (item) {
            this.itemCollection.add(item);
            this.generateOutputJSON();
            this.set("itemConfigIsOpen", false);
        };
        ItemCreatorConfigViewModel.prototype.editItem = function (item, id) {
            var itemCollection = this.itemCollection;
            var itemToEdit = itemCollection.find(function (item) { return item.id === id; });
            var itemToEditIndex = itemCollection.indexOf(itemToEdit);
            itemCollection.splice(itemToEditIndex, 1, item);
            this.generateOutputJSON();
            this.set("itemConfigIsOpen", false);
        };
        ItemCreatorConfigViewModel.prototype.deleteItem = function (id) {
            var itemCollection = this.itemCollection;
            var itemToDelete = itemCollection.find(function (item) { return item.id === id; });
            itemCollection.remove(itemToDelete);
            this.generateOutputJSON();
        };
        ItemCreatorConfigViewModel.prototype.handleItemSort = function (valueListItems) {
            var itemCollection = this.itemCollection;
            var itemsCopy = valueListItems
                .map(function (valueListItem) {
                return itemCollection.find(function (item) { return item.id === valueListItem.getAttribute("data-item-id"); });
            })
                .slice();
            itemCollection.removeAll();
            itemCollection.addMany(itemsCopy);
            this.generateOutputJSON();
        };
        ItemCreatorConfigViewModel.prototype.cancelItem = function () {
            this.set("duplicateItem", false);
            this.set("preventSelection", false);
            this.set("itemConfigIsOpen", false);
        };
        ItemCreatorConfigViewModel.prototype.generateOutputJSON = function () {
            var itemCollectionArr = this.itemCollection.toArray();
            var itemArrJSON = itemCollectionArr.map(function (item) {
                var id = item.id, title = item.title, description = item.description, url = item.url, thumbnail = item.thumbnail, type = item.type, addType = item.addType, visible = item.visible, editorID = item.editorID, hideDescription = item.hideDescription, openLinksInApp = item.openLinksInApp, liveItemDetails = item.liveItemDetails, customThumbnail = item.customThumbnail, customThumbnailFile = item.customThumbnailFile, customThumbnailType = item.customThumbnailType;
                return {
                    addType: addType,
                    type: type,
                    id: id,
                    title: title,
                    description: description,
                    url: url,
                    thumbnail: thumbnail,
                    visible: visible,
                    editorID: editorID,
                    hideDescription: hideDescription,
                    openLinksInApp: openLinksInApp,
                    liveItemDetails: liveItemDetails,
                    customThumbnail: customThumbnail,
                    customThumbnailFile: customThumbnailFile,
                    customThumbnailType: customThumbnailType
                };
            });
            this.set("output", itemArrJSON);
        };
        ItemCreatorConfigViewModel.prototype.checkDisallowedItems = function (loadedPortalItem) {
            var disallow = false;
            this.preventSelection = false;
            this.disallowList.forEach(function (listItem) {
                var _a;
                var index = (_a = loadedPortalItem === null || loadedPortalItem === void 0 ? void 0 : loadedPortalItem.url) === null || _a === void 0 ? void 0 : _a.indexOf("/" + listItem + "/");
                if (!isNaN(index) && index !== -1) {
                    disallow = true;
                    console.error("ERROR: Item cannot be added. Please add a different item.");
                }
            });
            return disallow;
        };
        ItemCreatorConfigViewModel.prototype.createItemBrowser = function (itemBrowserContainer) {
            var _this = this;
            var _a;
            return new ItemBrowser_1.ItemBrowserWrapper(itemBrowserContainer, {
                apiVersion: 4,
                portal: (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal,
                request: request,
                listener: function (action, state) {
                    var _a, _b;
                    if (_this.itemBrowserIsOpen &&
                        action.type === "LOADING_CONTENT_SUCCESS") {
                        var ariaLiveNode = _this.get("configPanelViewModel.ariaLiveNode");
                        var itemTotal = (_b = (_a = state === null || state === void 0 ? void 0 : state.parameters) === null || _a === void 0 ? void 0 : _a.nextQuery) === null || _b === void 0 ? void 0 : _b.total;
                        ariaLiveNode.innerText = !isNaN(itemTotal)
                            ? _this.messages.items + " " + itemTotal
                            : "";
                    }
                },
                initialState: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState), { settings: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.settings), { config: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.settings.config), { disableItemTypeFilters: false, detailsPaneType: "flyover", enableMapAreaFilter: false, onBack: function () { return _this.closeItemBrowser(); }, showSubmitButton: false, allowedItemTypes: [
                                "Web Map",
                                "Web Scene",
                                "Web Mapping Application",
                                "Dashboard",
                                "StoryMap",
                                "Web Experience",
                                "Form",
                                "Insights Page",
                                "Hub Site Application"
                            ], availableItemTypeFilters: [
                                "maps",
                                "scenes",
                                "apps",
                                "webMaps",
                                "webApps",
                                "experienceApps",
                                "storyMaps",
                                "sites",
                                "instantApps"
                            ], showCloseBtn: false, showBackBtn: true, onSelect: function (item) { return _this.onSelect(item); }, mainActionTitle: this.messages.selectItem, dialogTitle: this.messages.dialogTitle }) }), parameters: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.parameters), { section: "myContent", sort: {
                            field: "modified",
                            order: "desc"
                        } }) })
            });
        };
        ItemCreatorConfigViewModel.prototype.onSelect = function (data) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var item, portalItem, loadedPortalItem, id, title, description, type, urlToWrite, disallow, existsInItemCollection, typeValue, descriptionContent, editor;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.set("fileUploadConfig.sizeExceeded", false);
                            this.set("duplicateItem", false);
                            item = data[0];
                            portalItem = new PortalItem({
                                id: item.id,
                                portal: {
                                    url: this.configPanelViewModel.portal.url
                                }
                            });
                            return [4, portalItem.load()];
                        case 1:
                            loadedPortalItem = _b.sent();
                            if (loadedPortalItem) {
                                id = loadedPortalItem.id, title = loadedPortalItem.title, description = loadedPortalItem.description, type = loadedPortalItem.type;
                                urlToWrite = this.getItemUrl(loadedPortalItem);
                                disallow = ((_a = this.disallowList) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                                    this.checkDisallowedItems(loadedPortalItem);
                                existsInItemCollection = this.checkExistingItem(id, urlToWrite);
                                if (disallow || existsInItemCollection) {
                                    if (existsInItemCollection) {
                                        this.set("duplicateItem", true);
                                    }
                                    else {
                                        this.set("preventSelection", true);
                                    }
                                    this.set("itemToConfigure.title", "");
                                    this.set("itemToConfigure.description", "");
                                    this.set("itemToConfigure.thumbnail", "");
                                    this.closeItemBrowser();
                                    return [2];
                                }
                                typeValue = this.getTypeValue(loadedPortalItem, type);
                                this.set("itemToConfigure.id", id);
                                this.set("itemToConfigure.type", typeValue);
                                this.set("itemToConfigure.title", title);
                                descriptionContent = this.itemToConfigure.description
                                    ? this.itemToConfigure.description
                                    : "";
                                this.set("itemToConfigure.description", descriptionContent);
                                editor = this.editorInstances[this.itemToConfigure.editorID];
                                editor === null || editor === void 0 ? void 0 : editor.setData(descriptionContent);
                                this.set("itemToConfigure.url", urlToWrite);
                                this.set("itemToConfigure.addType", "itemBrowser");
                            }
                            this.closeItemBrowser();
                            return [2];
                    }
                });
            });
        };
        ItemCreatorConfigViewModel.prototype.closeItemBrowser = function () {
            this.itemBrowserIsOpen = false;
        };
        ItemCreatorConfigViewModel.prototype.checkExistingItem = function (id, urlToWrite) {
            return (this.itemCollection.filter(function (item) { return item.id === id || item.url === urlToWrite; }).length > 0);
        };
        ItemCreatorConfigViewModel.prototype.getTypeValue = function (portalItem, type) {
            var _a;
            switch (type) {
                case "Web Mapping Application":
                    return ((_a = portalItem === null || portalItem === void 0 ? void 0 : portalItem.typeKeywords) === null || _a === void 0 ? void 0 : _a.indexOf("configurableApp")) !== -1
                        ? ITEM_TYPES.instantApp
                        : type;
                case "YouTube_Video":
                    return this.messages.videos.youtube;
                case "Vimeo_Video":
                    return this.messages.videos.vimeo;
                default:
                    return type;
            }
        };
        ItemCreatorConfigViewModel.prototype._handleAppCreationWithMap = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var templateAppData, values, portalItemId, type, portalItem, loadedPortalItem, title, description, itemUrl, id, thumbnailUrl, item;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.savedState) {
                                return [2];
                            }
                            templateAppData = this.configPanelViewModel.templateAppData;
                            values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
                            if (!((values === null || values === void 0 ? void 0 : values.webmap) || (values === null || values === void 0 ? void 0 : values.webscene))) return [3, 2];
                            portalItemId = (values === null || values === void 0 ? void 0 : values.webmap) ? values.webmap
                                : (values === null || values === void 0 ? void 0 : values.webscene) ? values.webscene
                                    : null;
                            type = (values === null || values === void 0 ? void 0 : values.webmap) ? "Web Map"
                                : (values === null || values === void 0 ? void 0 : values.webscene) ? "Web Scene"
                                    : null;
                            portalItem = new PortalItem({
                                portal: this.configPanelViewModel.portal,
                                id: portalItemId
                            });
                            return [4, portalItem.load()];
                        case 1:
                            loadedPortalItem = _a.sent();
                            title = loadedPortalItem.title, description = loadedPortalItem.description, itemUrl = loadedPortalItem.itemUrl, id = loadedPortalItem.id, thumbnailUrl = loadedPortalItem.thumbnailUrl;
                            item = new Item({
                                addType: "itemBrowser",
                                title: title,
                                description: description,
                                url: itemUrl,
                                id: id,
                                type: type,
                                thumbnail: thumbnailUrl
                            });
                            this.addItem(item);
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            });
        };
        ItemCreatorConfigViewModel.prototype.getNonPortalItemType = function (value) {
            return value.indexOf("hubdev.arcgis") !== -1 ||
                value.indexOf("hubqa.arcgis") !== -1 ||
                value.indexOf("hub.arcgis") !== -1
                ? "Hub Site Application_WebPage"
                : this.miscRegex.youtube.test(value)
                    ? "YouTube_Video"
                    : this.miscRegex.vimeo.test(value)
                        ? "Vimeo_Video"
                        : "WebPage";
        };
        ItemCreatorConfigViewModel.prototype.writeDataToNewItem = function (portalItem, node, file, editEnabled) {
            this.set("duplicateItem", false);
            if (portalItem) {
                this.itemToConfigure.id = portalItem.id;
                this.itemToConfigure.type = portalItem.type;
                this.itemToConfigure.title = portalItem.title;
                this.itemToConfigure.description =
                    portalItem.description || portalItem.snippet || "";
                var editor = this.editorInstances[this.itemToConfigure.editorID];
                editor === null || editor === void 0 ? void 0 : editor.setData(this.itemToConfigure.description);
                var itemUrl = this.getItemUrl(portalItem);
                var dataUrlToWriteArr = itemUrl.split("?");
                var dataUrlToWritePath = dataUrlToWriteArr[0];
                var nodeInputValUrlParams = node.value.split("?")[1];
                var urlToWrite = nodeInputValUrlParams
                    ? dataUrlToWritePath + "?" + nodeInputValUrlParams
                    : dataUrlToWritePath;
                this.itemToConfigure.url = urlToWrite;
            }
            else if (file) {
                this.itemToConfigure.addType = "file";
                this.itemToConfigure.id = this.fieldName + "-" + file.name;
                this.itemToConfigure.type = this._getFileItemType(file.type);
                this.itemToConfigure.title = file.name;
                this.itemToConfigure.description = "";
                var editor = this.editorInstances[this.itemToConfigure.editorID];
                editor === null || editor === void 0 ? void 0 : editor.setData(this.itemToConfigure.description);
                this.itemToConfigure.url = file.url;
                this.itemToConfigure.file = file;
            }
            else {
                if (!editEnabled) {
                    this.itemToConfigure.id = new Date().getTime() + "-url";
                    this.itemToConfigure.type = this.getNonPortalItemType(node.value);
                    this.itemToConfigure.title = "";
                    this.itemToConfigure.description = "";
                }
                var editor = this.editorInstances[this.itemToConfigure.editorID];
                editor === null || editor === void 0 ? void 0 : editor.setData(this.itemToConfigure.description);
                this.itemToConfigure.url = node.value;
            }
            var existsInItemCollection = this.checkExistingItem(this.itemToConfigure.id, this.itemToConfigure.url);
            if (existsInItemCollection && !editEnabled) {
                this.set("duplicateItem", true);
            }
        };
        ItemCreatorConfigViewModel.prototype._getFileItemType = function (type) {
            return type.indexOf("jpeg") !== -1 ||
                type.indexOf("jpg") !== -1 ||
                type.indexOf("png") !== -1
                ? "Image"
                : type.indexOf("pdf") !== -1
                    ? "PDF"
                    : null;
        };
        ItemCreatorConfigViewModel.prototype.checkDisallowedList = function (portalItem) {
            var _a;
            return (((_a = this.disallowList) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.checkDisallowedItems(portalItem));
        };
        ItemCreatorConfigViewModel.prototype.isHTTPUrl = function (node) {
            var value = node.value;
            return value.indexOf("http://") !== -1;
        };
        ItemCreatorConfigViewModel.prototype.getIdFromUrl = function (node) {
            var _a, _b;
            var path = node.value.split("?")[0];
            var pathToUse = path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;
            if (pathToUse.indexOf("experience") !== -1) {
                return pathToUse.substring(pathToUse.lastIndexOf("/") + 1);
            }
            else if (pathToUse.indexOf("survey123") !== -1) {
                return pathToUse.substring(pathToUse.lastIndexOf("/") + 1);
            }
            else if (pathToUse.indexOf("dashboards") !== -1) {
                return pathToUse.substring(pathToUse.lastIndexOf("/") + 1);
            }
            else if (pathToUse.indexOf("storymaps") !== -1) {
                return pathToUse.substring(pathToUse.lastIndexOf("/") + 1);
            }
            else if (pathToUse.indexOf("insights") !== -1) {
                return pathToUse.substring(pathToUse.lastIndexOf("/") + 1);
            }
            else {
                var url = node.value ? new URL(node.value) : null;
                return ((_a = url === null || url === void 0 ? void 0 : url.searchParams) === null || _a === void 0 ? void 0 : _a.get("appid")) || ((_b = url === null || url === void 0 ? void 0 : url.searchParams) === null || _b === void 0 ? void 0 : _b.get("id"));
            }
        };
        ItemCreatorConfigViewModel.prototype.getItemUrl = function (portalItem) {
            var itemUrl = portalItem.itemUrl, url = portalItem.url, type = portalItem.type;
            return type === "Web Map" || type === "Web Scene"
                ? itemUrl
                : type === "Hub Site Application"
                    ? url
                    : type === "Dashboard"
                        ? this._getDashBoardUrl(portalItem)
                        : type === "Web Experience"
                            ? this._getExBUrl(portalItem)
                            : type === "Form"
                                ? this._getSurvey123Url(portalItem)
                                : type === "StoryMap"
                                    ? this._getStoryMapUrl(portalItem)
                                    : type === "Insights Page"
                                        ? this._getInsightsUrl(portalItem)
                                        : url;
        };
        ItemCreatorConfigViewModel.prototype._getSurvey123Url = function (portalItem) {
            var _a, _b;
            var customBaseUrl = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.customBaseUrl;
            return customBaseUrl && customBaseUrl.indexOf("mapsdevext") !== -1
                ? "https://survey123dev.arcgis.com/share/" + portalItem.id
                : customBaseUrl && customBaseUrl.indexOf("mapsqa") !== -1
                    ? "https://survey123qa.arcgis.com/share/" + portalItem.id
                    : "https://survey123.arcgis.com/share/" + portalItem.id;
        };
        ItemCreatorConfigViewModel.prototype._getStoryMapUrl = function (portalItem) {
            var _a, _b, _c;
            var customBaseUrl = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.customBaseUrl;
            var storyMapType = ((_c = portalItem === null || portalItem === void 0 ? void 0 : portalItem.url) === null || _c === void 0 ? void 0 : _c.indexOf("collections")) !== -1
                ? "collections"
                : "stories";
            return customBaseUrl && customBaseUrl.indexOf("mapsdevext") !== -1
                ? "https://storymapsdev.arcgis.com/" + storyMapType + "/" + portalItem.id
                : customBaseUrl && customBaseUrl.indexOf("mapsqa") !== -1
                    ? "https://storymapsqa.arcgis.com/" + storyMapType + "/" + portalItem.id
                    : "https://storymaps.arcgis.com/" + storyMapType + "/" + portalItem.id;
        };
        ItemCreatorConfigViewModel.prototype._getDashBoardUrl = function (portalItem) {
            return portalItem.portal.urlKey && portalItem.portal.customBaseUrl
                ? "https://" + portalItem.portal.urlKey + "." + portalItem.portal.customBaseUrl + "/apps/dashboards/" + portalItem.id
                : portalItem.portal.url + "/apps/dashboards/" + portalItem.id;
        };
        ItemCreatorConfigViewModel.prototype._getExBUrl = function (portalItem) {
            var _a, _b;
            var customBaseUrl = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.customBaseUrl;
            return portalItem.url !== null
                ? portalItem.url
                : customBaseUrl && customBaseUrl.indexOf("mapsdevext") !== -1
                    ? "https://experiencedev.arcgis.com/experience/" + portalItem.id
                    : customBaseUrl && customBaseUrl.indexOf("mapsqa") !== -1
                        ? "https://experienceqa.arcgis.com/experience/" + portalItem.id
                        : "https://experience.arcgis.com/experience/" + portalItem.id;
        };
        ItemCreatorConfigViewModel.prototype._getInsightsUrl = function (portalItem) {
            var _a, _b;
            var customBaseUrl = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.customBaseUrl;
            return customBaseUrl && customBaseUrl.indexOf("mapsdevext") !== -1
                ? "https://insightsdev.arcgis.com/#/view/" + portalItem.id
                : customBaseUrl && customBaseUrl.indexOf("mapsqa") !== -1
                    ? "https://insightsqa.arcgis.com/#/view/" + portalItem.id
                    : "https://insights.arcgis.com/#/view/" + portalItem.id;
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemCreatorConfigViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "itemConfigIsOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "itemCollection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "itemBrowser", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "itemBrowserIsOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "itemToConfigure", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "disallowList", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "preventSelection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "fileUploadConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "portfolioAppLayout", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfigViewModel.prototype, "duplicateItem", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemCreatorConfigViewModel.prototype, "arcgisUrls", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemCreatorConfigViewModel.prototype, "miscRegex", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ItemCreatorConfig/resources")
        ], ItemCreatorConfigViewModel.prototype, "messages", void 0);
        ItemCreatorConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("ItemCreatorConfigViewModel")
        ], ItemCreatorConfigViewModel);
        return ItemCreatorConfigViewModel;
    }(Accessor));
    return ItemCreatorConfigViewModel;
});
