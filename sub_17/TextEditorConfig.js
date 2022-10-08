define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "../BaseComponent", "esri/widgets/support/widget", "./TextEditorConfig/TextEditorConfigViewModel", "../../icons/icons", "esri/core/watchUtils", "esri/core/reactiveUtils", "../../utils/focusUtils", "TemplatesCommonLib/functionality/token"], function (require, exports, tslib_1, decorators_1, BaseComponent, widget_1, TextEditorConfigViewModel, icons_1, watchUtils_1, reactiveUtils_1, focusUtils_1, token_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-text-editor-config",
        button: "esri-text-editor-config__button",
        contentPreview: "esri-text-editor-config__content-preview",
        editContainer: "esri-text-editor-config__edit-container",
        editEnabled: "esri-text-editor-config--edit-enabled",
        editLink: "esri-config-panel__text-editor-edit-link",
        previewDisabled: "esri-text-editor-config--preview-disabled",
        previewContainer: "esri-text-editor-config__preview-container",
        edit: "esri-text-editor-config__edit",
        editHeaderButton: "esri-text-editor-config__edit-header-button",
        header: "esri-text-editor-config__header",
        headerContainer: "esri-text-editor-config__header-container",
        httpAlertMsgContainer: "esri-text-editor-config__http-error-msg-container",
        groupHeaderDark: "esri-config-panel__group-header--dark"
    };
    var HTML_SUPPORT = {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ],
        disallow: [
            {
                attributes: [
                    {
                        key: /^on(.*)/i,
                        value: true
                    },
                    {
                        key: /.*/,
                        value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i
                    },
                    {
                        key: /.*/,
                        value: /data:(?!image\/(png|jpeg|gif|webp))/i
                    }
                ]
            },
            {
                name: "script"
            },
            {
                name: "audio"
            },
            {
                name: "video"
            }
        ]
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
        },
        htmlSupport: HTML_SUPPORT
    };
    var TextEditorConfig = (function (_super) {
        tslib_1.__extends(TextEditorConfig, _super);
        function TextEditorConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._editEnabled = false;
            _this._httpErrorMsg = false;
            _this.sourceEditingIsOn = false;
            _this.editor = null;
            _this.textEditorNode = null;
            _this.editorData = null;
            _this.header = null;
            _this.editLink = null;
            _this.imageUpload = false;
            _this.fieldName = null;
            _this.textEditorMessages = null;
            _this.configSettingsMessages = null;
            _this.viewModel = new TextEditorConfigViewModel();
            return _this;
        }
        TextEditorConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Promise.all([
                                reactiveUtils_1.whenOnce(function () { return _this.configPanelViewModel; }),
                                reactiveUtils_1.whenOnce(function () { return _this.configSettingsMessages; })
                            ])];
                        case 1:
                            _a.sent();
                            this.viewModel.configPanelViewModel = this.configPanelViewModel;
                            this.editLink = this.configSettingsMessages.textEditor.edit;
                            this.own([watchUtils_1.watch(this, "viewModel.state", function () { return _this.scheduleRender(); })]);
                            return [2];
                    }
                });
            });
        };
        TextEditorConfig.prototype.render = function () {
            var editor = this._renderEditor();
            var preview = this._renderPreview();
            var tooltip = this.tipItem ? this.tipItem.renderTipCalciteIcon() : null;
            return (widget_1.tsx("div", { key: this.fieldName, class: CSS.base },
                this.header ? (widget_1.tsx("div", { key: "text-editor-header", class: CSS.headerContainer },
                    widget_1.tsx("span", { class: CSS.header }, this.header),
                    tooltip)) : null,
                editor,
                preview));
        };
        TextEditorConfig.prototype._renderEditor = function () {
            var _a;
            var editEnabled = (_a = {},
                _a[CSS.editEnabled] = this._editEnabled,
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.editContainer, editEnabled), id: this.fieldName + "editorContainer" },
                widget_1.tsx("div", { bind: this, id: "ckeditor" + this.fieldName, name: "ckeditor" + this.fieldName, afterCreate: this._handleCKEditorCreation }),
                this._httpErrorMsg ? (widget_1.tsx("calcite-notice", { key: "text-editor-config-http-error", scale: "s", color: "red", active: true, class: CSS.httpAlertMsgContainer, icon: "exclamation-mark-triangle-f" },
                    widget_1.tsx("span", { class: "esri-text-edtior-config__http-error-msg", slot: "message" }, this.configPanelViewModel.configPanelMessages.linkProtocol))) : null,
                widget_1.tsx("calcite-button", { key: "rte-ok-button", bind: this, onclick: this._setData, class: CSS.button, disabled: this._httpErrorMsg ||
                        this.sourceEditingIsOn ||
                        this.viewModel.state !== "ready"
                        ? true
                        : false }, this.textEditorMessages.ok),
                widget_1.tsx("calcite-button", { bind: this, onclick: this._disableEdit, class: CSS.button, appearance: "outline" }, this.textEditorMessages.cancel)));
        };
        TextEditorConfig.prototype._renderPreview = function () {
            var _a;
            var contentPreview = this._renderContentPreview();
            var editLink = this._renderEditLink();
            var headerEditButton = this._renderHeaderEditButton();
            var previewDisabled = (_a = {},
                _a[CSS.previewDisabled] = this._editEnabled,
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.previewContainer, previewDisabled) },
                headerEditButton,
                contentPreview,
                !this.editorData ? editLink : null));
        };
        TextEditorConfig.prototype._renderHeaderEditButton = function () {
            return this.viewModel.editorData ? (widget_1.tsx("div", { class: CSS.edit },
                widget_1.tsx("button", { bind: this, "aria-label": this.textEditorMessages.edit + " " + this.header, id: this.fieldName + "editButton", class: this.classes(CSS.editHeaderButton), "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, onclick: this._enableEdit, onkeydown: this._handleEditKeyDown },
                    widget_1.tsx("calcite-icon", { icon: icons_1.default.pencil, scale: "s" }),
                    this.textEditorMessages.edit))) : null;
        };
        TextEditorConfig.prototype._renderContentPreview = function () {
            var editorData = this.viewModel.editorData;
            return editorData ? (widget_1.tsx("p", { bind: this, afterCreate: this._setEditorPreview, afterUpdate: this._setEditorPreview, class: this.classes(CSS.contentPreview), "data-rich-text": editorData })) : null;
        };
        TextEditorConfig.prototype._setEditorPreview = function (node) {
            var _a, _b;
            var data = token_1.removeImgTokens(this.viewModel.editorData);
            var nodeData = token_1.removeImgTokens((_b = (_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.innerHTML);
            if (data === nodeData) {
                return;
            }
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var paragraph = document.createElement("p");
            var content = node.getAttribute("data-rich-text");
            content = token_1.applyImgTokens(content, this.viewModel.configPanelViewModel.templateAppItem.get("portal.credential.token"));
            paragraph.innerHTML = content;
            node.appendChild(paragraph);
        };
        TextEditorConfig.prototype._renderEditLink = function () {
            return (widget_1.tsx("a", { bind: this, onclick: this._enableEdit, onkeydown: this._handleEditKeyDown, "aria-label": this.editLink + " " + (this === null || this === void 0 ? void 0 : this.header), class: CSS.editLink, href: "#", id: this.fieldName + "editLink", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, this.editLink));
        };
        TextEditorConfig.prototype._setData = function () {
            var data = this.viewModel.getData();
            if (data.indexOf("http://") !== -1) {
                this._httpErrorMsg = true;
                this.scheduleRender();
                return;
            }
            this.viewModel.setData();
            this._editEnabled = false;
            this._httpErrorMsg = false;
            if (this.viewModel.editorData) {
                focusUtils_1.focusNode(this.fieldName + "editButton");
            }
            else {
                focusUtils_1.focusNode(this.fieldName + "editLink");
            }
            this.emit("setTextEditorData");
            this.scheduleRender();
        };
        TextEditorConfig.prototype._enableEdit = function () {
            this.viewModel.handlePreviousData();
            this._editEnabled = true;
            this.scheduleRender();
        };
        TextEditorConfig.prototype._handleEditKeyDown = function (e) {
            if (e.code === "Space" || e.code === "Enter") {
                this._enableEdit();
                return;
            }
            focusUtils_1.handleFocusElFromSettingsPanel(e);
        };
        TextEditorConfig.prototype._disableEdit = function () {
            this.viewModel.handleCancelEdit();
            this._editEnabled = false;
            this._httpErrorMsg = false;
            if (this.viewModel.editorData) {
                focusUtils_1.focusNode(this.fieldName + "editButton");
            }
            else {
                focusUtils_1.focusNode(this.fieldName + "editLink");
            }
            this.scheduleRender();
        };
        TextEditorConfig.prototype._handleCKEditorCreation = function (node) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var config, editor, data, sourceEditing;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.viewModel.editor) {
                                this.viewModel.editor.destroy();
                            }
                            config = DEFAULT_CONFIG;
                            if (this.imageUpload) {
                                config = tslib_1.__assign(tslib_1.__assign({}, DEFAULT_CONFIG), { toolbar: {
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
                                            "autoImage",
                                            "imageUpload",
                                            "insertTable",
                                            "-",
                                            "heading",
                                            "removeFormat",
                                            "sourceEditing"
                                        ],
                                        shouldNotGroupWhenFull: true
                                    }, image: {
                                        types: ["png", "jpeg", "jpg"]
                                    } });
                            }
                            return [4, ClassicEditor.create(node, config)];
                        case 1:
                            editor = _a.sent();
                            data = token_1.applyImgTokens(this.viewModel.editorData, this.viewModel.configPanelViewModel.templateAppItem.get("portal.credential.token"));
                            editor.setData(data);
                            editor.model.document.on("change:data", function () {
                                var data = _this.viewModel.getData();
                                if (data.indexOf("http://") !== -1) {
                                    _this._httpErrorMsg = true;
                                }
                                else {
                                    _this._httpErrorMsg = false;
                                }
                                _this.scheduleRender();
                            });
                            sourceEditing = editor.plugins.get("SourceEditing");
                            sourceEditing === null || sourceEditing === void 0 ? void 0 : sourceEditing.on("change:isSourceEditingMode", function () {
                                _this._set("sourceEditingIsOn", sourceEditing === null || sourceEditing === void 0 ? void 0 : sourceEditing.isSourceEditingMode);
                            });
                            this.viewModel.editor = editor;
                            if (this.imageUpload) {
                                this.viewModel.initImageUpload();
                            }
                            return [2];
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], TextEditorConfig.prototype, "sourceEditingIsOn", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.editor")
        ], TextEditorConfig.prototype, "editor", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.textEditorNode")
        ], TextEditorConfig.prototype, "textEditorNode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.editorData")
        ], TextEditorConfig.prototype, "editorData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfig.prototype, "header", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfig.prototype, "editLink", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfig.prototype, "imageUpload", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fieldName")
        ], TextEditorConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/TextEditorConfig/resources")
        ], TextEditorConfig.prototype, "textEditorMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TextEditorConfig.prototype, "configSettingsMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: TextEditorConfigViewModel
            })
        ], TextEditorConfig.prototype, "viewModel", void 0);
        TextEditorConfig = tslib_1.__decorate([
            decorators_1.subclass("TextEditorConfig")
        ], TextEditorConfig);
        return TextEditorConfig;
    }(BaseComponent));
    return TextEditorConfig;
});
