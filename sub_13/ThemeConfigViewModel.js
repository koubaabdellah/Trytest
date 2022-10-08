define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/reactiveUtils", "./assets", "../../../utils/utils", "../../FileUploadConfig/FileUploadConfig/FileUploadConfigViewModel", "../../../utils/url/urlUtils"], function (require, exports, tslib_1, decorators_1, Accessor_1, reactiveUtils_1, assets_1, utils_1, FileUploadConfigViewModel, urlUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var ThemeConfigViewModel = (function (_super) {
        tslib_1.__extends(ThemeConfigViewModel, _super);
        function ThemeConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.numOfSections = 3;
            _this.logoLink = "";
            _this.fileUploadConfigViewModel = new FileUploadConfigViewModel();
            return _this;
        }
        ThemeConfigViewModel.prototype.initialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { return _this.configPanelViewModel; })];
                        case 1:
                            _a.sent();
                            this.fileUploadConfigViewModel.configPanelViewModel = this.configPanelViewModel;
                            return [2];
                    }
                });
            });
        };
        ThemeConfigViewModel.prototype.handleLogoLink = function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var node, url, _a, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            node = event.target;
                            url = node.value.trim();
                            _a = this;
                            _b = url === "";
                            if (_b) return [3, 2];
                            return [4, urlUtils_1.isValidHttpUrl(url)];
                        case 1:
                            _b = (_c.sent());
                            _c.label = 2;
                        case 2:
                            _a.isValidLogoLink = _b;
                            if (this.isValidLogoLink || url === "") {
                                this.logoLink = urlUtils_1.upgradeToHttps(url);
                                node.value = urlUtils_1.upgradeToHttps(url);
                                this._generateOutput();
                            }
                            return [2];
                    }
                });
            });
        };
        ThemeConfigViewModel.prototype.handleColorPickerChange = function (section, theme, event) {
            this.selectedPreset = null;
            var cp = event.target;
            var color = cp.value;
            color = color.toUpperCase();
            this.themeSections[section.type][theme.type] = color;
            this._generateOutput();
        };
        ThemeConfigViewModel.prototype.handlePickFont = function (font) {
            this.selectedFont = font;
            var popover = document.getElementById("theme-font-popover");
            if (popover) {
                popover.toggle(false);
            }
            this._generateOutput();
        };
        ThemeConfigViewModel.prototype.handleSelectPreset = function (event) {
            var _a, _b, _c, _d;
            var node = event.target;
            var popover = document.getElementById("theme-preset-popover");
            if (popover) {
                popover.toggle(false);
            }
            if (node.value === "none") {
                this.logo = this.applySharedTheme ? null : this.logo;
                this.logoLink = this.applySharedTheme ? null : this.logoLink;
                this.applyPresetTheme = false;
                this.applySharedTheme = false;
                this.selectedPreset = null;
            }
            else if (node.value === "custom") {
                this.applyPresetTheme = true;
                this.applySharedTheme = false;
                this.selectedPreset = null;
            }
            else {
                var preset_1 = assets_1.presetThemes.find(function (_a) {
                    var type = _a.type;
                    return type === node.value;
                });
                Object.entries(this.themeSections).forEach(function (_a) {
                    var sectionType = _a[0], section = _a[1];
                    section.background = preset_1[sectionType].background;
                    section.text = preset_1[sectionType].text;
                    Object.keys(section).forEach(function (type) {
                        var colorPicker = document.getElementById(sectionType + "-" + type + "-color-picker");
                        if (colorPicker) {
                            colorPicker.value = section[type];
                        }
                    });
                });
                this.selectedPreset = preset_1.type;
                this.applyPresetTheme = true;
                if (preset_1.type === "shared") {
                    this.applySharedTheme = true;
                    this.logo = (_b = (_a = this.sharedTheme) === null || _a === void 0 ? void 0 : _a.logo) === null || _b === void 0 ? void 0 : _b.small;
                    this.logoLink = (_d = (_c = this.sharedTheme) === null || _c === void 0 ? void 0 : _c.logo) === null || _d === void 0 ? void 0 : _d.link;
                }
                else {
                    this.applySharedTheme = false;
                }
            }
            this._generateOutput();
        };
        ThemeConfigViewModel.prototype.initTheme = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var defTheme, themeConfig, i, _y, type, values, shared, _z;
                return tslib_1.__generator(this, function (_0) {
                    switch (_0.label) {
                        case 0:
                            defTheme = Object.entries(assets_1.defaultTheme);
                            this.themeSections = {};
                            this.applyPresetTheme = utils_1.getDefaultValue({
                                fieldName: "applyCustomTheme",
                                defaultValue: false
                            }, null, (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values);
                            if (this.input) {
                                this.applySharedTheme = this.input.applySharedTheme;
                                if (this.input.hasOwnProperty("applyPresetTheme")) {
                                    this.applyPresetTheme = this.input.applyPresetTheme;
                                }
                                if (this.input.hasOwnProperty("logo")) {
                                    this.logo = this.applySharedTheme ? (_d = (_c = this.sharedTheme) === null || _c === void 0 ? void 0 : _c.logo) === null || _d === void 0 ? void 0 : _d.small : this.input.logo;
                                }
                                if (this.input.hasOwnProperty("logoLink")) {
                                    this.logoLink = this.applySharedTheme ? (_f = (_e = this.sharedTheme) === null || _e === void 0 ? void 0 : _e.logo) === null || _f === void 0 ? void 0 : _f.link : this.input.logoLink;
                                }
                            }
                            else {
                                this.applySharedTheme = utils_1.getDefaultValue({
                                    fieldName: "applySharedTheme",
                                    defaultValue: false
                                }, null, (_h = (_g = this.configPanelViewModel) === null || _g === void 0 ? void 0 : _g.templateAppData) === null || _h === void 0 ? void 0 : _h.values);
                                themeConfig = utils_1.getDefaultValue({
                                    fieldName: "themeConfig",
                                    defaultValue: null
                                }, null, (_k = (_j = this.configPanelViewModel) === null || _j === void 0 ? void 0 : _j.templateAppData) === null || _k === void 0 ? void 0 : _k.values);
                                this.input = {
                                    applyPresetTheme: this.applyPresetTheme,
                                    applySharedTheme: this.applySharedTheme,
                                    font: "Avenir Next",
                                    logo: this.applySharedTheme ? (_m = (_l = this.sharedTheme) === null || _l === void 0 ? void 0 : _l.logo) === null || _m === void 0 ? void 0 : _m.small : null,
                                    preset: this.applySharedTheme ? "shared" : null,
                                    themes: null
                                };
                                if (themeConfig) {
                                    this.input.themes = this._updateThemeConfig(themeConfig);
                                    this.applyPresetTheme = true;
                                }
                                if (this.applySharedTheme) {
                                    this.applyPresetTheme = true;
                                    this.selectedPreset = "shared";
                                    this.logo = (_p = (_o = this.sharedTheme) === null || _o === void 0 ? void 0 : _o.logo) === null || _p === void 0 ? void 0 : _p.small;
                                    this.logoLink = (_r = (_q = this.sharedTheme) === null || _q === void 0 ? void 0 : _q.logo) === null || _r === void 0 ? void 0 : _r.link;
                                }
                            }
                            this.selectedFont = (_t = (_s = this.input) === null || _s === void 0 ? void 0 : _s.font) !== null && _t !== void 0 ? _t : "Avenir Next";
                            this.selectedPreset = (_u = this.input) === null || _u === void 0 ? void 0 : _u.preset;
                            for (i = 0; i < this.numOfSections; i++) {
                                _y = defTheme[i], type = _y[0], values = _y[1];
                                if ((_w = (_v = this.input) === null || _v === void 0 ? void 0 : _v.themes) === null || _w === void 0 ? void 0 : _w[type]) {
                                    this.themeSections[type] = (_x = this.input) === null || _x === void 0 ? void 0 : _x.themes[type];
                                }
                                else {
                                    if (this.applySharedTheme) {
                                        shared = assets_1.presetThemes.find(function (_a) {
                                            var type = _a.type;
                                            return type === "shared";
                                        });
                                        this.themeSections[type] = tslib_1.__assign(tslib_1.__assign({}, values), shared[type]);
                                    }
                                    else {
                                        if (type == "primary") {
                                            this.themeSections[type] = this._getHeaderProps();
                                        }
                                        else {
                                            this.themeSections[type] = values;
                                        }
                                    }
                                }
                            }
                            if (!this.logoLink) return [3, 2];
                            _z = this;
                            return [4, urlUtils_1.isValidHttpUrl(this.logoLink)];
                        case 1:
                            _z.isValidLogoLink = _0.sent();
                            _0.label = 2;
                        case 2: return [2];
                    }
                });
            });
        };
        ThemeConfigViewModel.prototype.handleDeleteImage = function () {
            this.logo = null;
            this._generateOutput();
        };
        ThemeConfigViewModel.prototype.createImageUpload = function (messages, imageUploadEl) {
            var _this = this;
            imageUploadEl.modalTitle = messages === null || messages === void 0 ? void 0 : messages.uploadImage;
            imageUploadEl.sizeDescription = messages === null || messages === void 0 ? void 0 : messages.uploadImageMessage;
            imageUploadEl.addEventListener("arcgisImageUploadCancel", function () {
                _this.configPanelViewModel.setGenericModalDOM(null);
            });
            imageUploadEl.addEventListener("arcgisImageUploadSave", function (evt) {
                _this._getImageUploadCallback(evt.detail);
                _this.configPanelViewModel.setGenericModalDOM(null);
            });
        };
        ThemeConfigViewModel.prototype.handleHeaderNav = function () {
            var _a, _b, _c;
            var setting = this.configPanelViewModel.allSettings.find(function (_a) {
                var fieldName = _a.fieldName;
                return fieldName === "header";
            });
            if (!setting)
                return;
            var uiLocation = setting.uiLocation;
            if (this.configPanelViewModel.expressEnabled) {
                var expressSection = this.configPanelViewModel.express.viewModel.expressSections.find(function (expressSection) { return expressSection.type === uiLocation[0]; });
                this.configPanelViewModel.express.expressSection = expressSection;
                this._findNodeInterval();
            }
            else {
                var section = this.configPanelViewModel.sections.find(function (section) { return section.type === uiLocation[0]; });
                var sectionIndex = this.configPanelViewModel.sections.indexOf(section);
                this.configPanelViewModel.currentSectionIndex = sectionIndex;
                if (this.configPanelViewModel.subsectionId) {
                    this.configPanelViewModel.subsectionId = null;
                }
                if (uiLocation === null || uiLocation === void 0 ? void 0 : uiLocation[1]) {
                    var currentSection = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.sections) === null || _b === void 0 ? void 0 : _b.getItemAt((_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.currentSectionIndex);
                    if ((currentSection === null || currentSection === void 0 ? void 0 : currentSection.hasSubsections) === false) {
                        this._findNodeInterval();
                        return;
                    }
                    this.configPanelViewModel.subsectionId = uiLocation === null || uiLocation === void 0 ? void 0 : uiLocation[1];
                }
                this._findNodeInterval();
            }
        };
        ThemeConfigViewModel.prototype._generateOutput = function () {
            var newOutput = {
                applySharedTheme: this.applySharedTheme,
                applyPresetTheme: this.applyPresetTheme,
                font: this.selectedFont,
                logo: this.applySharedTheme ? null : this.logo,
                logoLink: this.applySharedTheme ? null : this.logoLink,
                preset: this.selectedPreset,
                themes: this.themeSections
            };
            this.set("outputJSON", newOutput);
        };
        ThemeConfigViewModel.prototype._updateThemeConfig = function (themeConfig) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if (!themeConfig)
                return null;
            var themeHeader = (_a = themeConfig.find(function (_a) {
                var type = _a.type;
                return type === "header";
            })) === null || _a === void 0 ? void 0 : _a.themes;
            var themeButton = (_b = themeConfig.find(function (_a) {
                var type = _a.type;
                return type === "button";
            })) === null || _b === void 0 ? void 0 : _b.themes;
            var themeBody = (_c = themeConfig.find(function (_a) {
                var type = _a.type;
                return type === "body";
            })) === null || _c === void 0 ? void 0 : _c.themes;
            return {
                primary: {
                    type: "primary",
                    background: (_d = themeHeader === null || themeHeader === void 0 ? void 0 : themeHeader.background) === null || _d === void 0 ? void 0 : _d.value,
                    text: (_e = themeHeader === null || themeHeader === void 0 ? void 0 : themeHeader.text) === null || _e === void 0 ? void 0 : _e.value
                },
                secondary: {
                    type: "secondary",
                    background: (_f = themeBody === null || themeBody === void 0 ? void 0 : themeBody.background) === null || _f === void 0 ? void 0 : _f.value,
                    text: (_g = themeBody === null || themeBody === void 0 ? void 0 : themeBody.text) === null || _g === void 0 ? void 0 : _g.value
                },
                accent: {
                    type: "accent",
                    background: (_h = themeButton === null || themeButton === void 0 ? void 0 : themeButton.background) === null || _h === void 0 ? void 0 : _h.value,
                    text: (_j = themeButton === null || themeButton === void 0 ? void 0 : themeButton.text) === null || _j === void 0 ? void 0 : _j.value
                }
            };
        };
        ThemeConfigViewModel.prototype._getImageUploadCallback = function (data) {
            var _a, _b, _c, _d;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var blob, fileName, format, size, type, name, file, url, value;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            blob = data.blob, fileName = data.fileName, format = data.format;
                            size = blob.size, type = blob.type;
                            name = fileName.replace(" ", "-").replace("." + format, "");
                            file = {
                                name: name.split(".", 1)[0] + "." + blob.type.split("/")[1],
                                size: size,
                                type: type
                            };
                            return [4, this.fileUploadConfigViewModel.handlePortalItemResourceRequest(file, blob)];
                        case 1:
                            url = _e.sent();
                            url = url.replace("http://", "https://");
                            value = ((_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.draft) === null || _b === void 0 ? void 0 : _b.uploads) ? tslib_1.__spreadArrays((_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.draft) === null || _d === void 0 ? void 0 : _d.uploads, [url]) : [url];
                            return [4, this.configPanelViewModel.handleDraftData("uploads", value)];
                        case 2:
                            _e.sent();
                            this.logo = url;
                            this._generateOutput();
                            return [2];
                    }
                });
            });
        };
        ThemeConfigViewModel.prototype._getHeaderProps = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var enableHeaderColor = utils_1.getDefaultValue({
                fieldName: "enableHeaderColor",
                defaultValue: false
            }, null, (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values);
            var headerColor = utils_1.getDefaultValue({
                fieldName: "headerColor",
                defaultValue: null
            }, null, (_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.templateAppData) === null || _d === void 0 ? void 0 : _d.values);
            var enableHeaderBackground = utils_1.getDefaultValue({
                fieldName: "enableHeaderBackground",
                defaultValue: false
            }, null, (_f = (_e = this.configPanelViewModel) === null || _e === void 0 ? void 0 : _e.templateAppData) === null || _f === void 0 ? void 0 : _f.values);
            var headerBackground = utils_1.getDefaultValue({
                fieldName: "headerBackground",
                defaultValue: null
            }, null, (_h = (_g = this.configPanelViewModel) === null || _g === void 0 ? void 0 : _g.templateAppData) === null || _h === void 0 ? void 0 : _h.values);
            this.applyPresetTheme = enableHeaderBackground || enableHeaderColor;
            return {
                type: "primary",
                background: enableHeaderBackground ? headerBackground : null,
                text: enableHeaderColor ? headerColor : "#000000"
            };
        };
        ThemeConfigViewModel.prototype._findNodeInterval = function () {
            var _this = this;
            var interval = window.setInterval(function () {
                _this._focusNode(interval);
            }, 50);
        };
        ThemeConfigViewModel.prototype._focusNode = function (interval) {
            var node = document.body.querySelector("[data-search-setting=\"search-header\"]");
            if (node) {
                node === null || node === void 0 ? void 0 : node.setFocus();
                if (document.activeElement === node) {
                    clearInterval(interval);
                }
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "themeSections", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "selectedFont", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "selectedPreset", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "applySharedTheme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "sharedTheme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "applyPresetTheme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "numOfSections", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "logo", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "logoLink", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "isValidLogoLink", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "fileUploadConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ThemeConfigViewModel.prototype, "outputJSON", void 0);
        ThemeConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("app.configWidgets.ThemeConfig.ThemeConfigViewModel")
        ], ThemeConfigViewModel);
        return ThemeConfigViewModel;
    }(Accessor_1.default));
    exports.default = ThemeConfigViewModel;
});
