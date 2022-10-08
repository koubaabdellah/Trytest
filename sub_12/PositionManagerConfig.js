define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/Collection", "esri/core/Handles", "../BaseComponent", "./PositionManagerConfig/PositionManagerConfigViewModel", "./PositionManagerConfig/interfaces", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, widget_1, Collection, Handles, BaseComponent, PositionManagerConfigViewModel, interfaces_1, labelSettingMargin_1) {
    "use strict";
    var CSS = {
        base: "esri-position-manager-config",
        header: "esri-position-manager-config__header",
        tooltip: "esri-position-manager-config__tool-tip",
        usageInfo: "esri-position-manager-config__info",
        positionManagerDisplay: "esri-position-manager-config__posManagerBox",
        positionManagerGrid: "esri-position-manager-grid",
        positionManagerCell: "esri-position-manager-cell",
        positionManagerCellHeader: "esri-position-manager-cell__header",
        cellHeaderTitle: "esri-cell-header__title",
        positionManagerCellListWrapper: "esri-position-manager-cell__list-div-wrapper",
        positionManagerCellList: "esri-position-manager-cell__list",
        dragHereText: "esri-position-manager-cell__drag-here-text",
        cellListItem: "esri-position-manager-list-item",
        noSelect: "noselect"
    };
    var SORTABLE_GROUP_NAME = "CALCITE_DRAG_N_DROP_MULTIPLE_CELLS" + new Date().toISOString();
    var TOP_LEFT_ICON = "assets/images/configWidgets/PositionManagerConfig/position_upper_left.svg";
    var TOP_RIGHT_ICON = "assets/images/configWidgets/PositionManagerConfig/position_upper_right.svg";
    var BOTTOM_LEFT_ICON = "assets/images/configWidgets/PositionManagerConfig/position_bottom_left.svg";
    var BOTTOM_RIGHT_ICON = "assets/images/configWidgets/PositionManagerConfig/position_bottom_right.svg";
    var PositionManagerConfig = (function (_super) {
        tslib_1.__extends(PositionManagerConfig, _super);
        function PositionManagerConfig(values) {
            var _this = _super.call(this, values) || this;
            _this.viewModel = new PositionManagerConfigViewModel();
            _this._totalValueLists = 4;
            _this._handles = new Handles();
            _this._attemptInterval_ms = 500;
            var pathname = window.location.pathname;
            _this.rootDistPath = pathname.substring(0, pathname.lastIndexOf("/"));
            return _this;
        }
        Object.defineProperty(PositionManagerConfig.prototype, "uiPositions", {
            set: function (positions) {
                var topLeft = new Collection();
                var topRight = new Collection();
                var bottomLeft = new Collection();
                var bottomRight = new Collection();
                positions.forEach(function (uiPos) {
                    switch (uiPos.position) {
                        case interfaces_1.ECellType.topLeft:
                            topLeft.add(uiPos.fieldName, uiPos === null || uiPos === void 0 ? void 0 : uiPos.index);
                            break;
                        case interfaces_1.ECellType.topRight:
                            topRight.add(uiPos.fieldName, uiPos === null || uiPos === void 0 ? void 0 : uiPos.index);
                            break;
                        case interfaces_1.ECellType.bottomLeft:
                            bottomLeft.add(uiPos.fieldName, uiPos === null || uiPos === void 0 ? void 0 : uiPos.index);
                            break;
                        case interfaces_1.ECellType.bottomRight:
                            bottomRight.add(uiPos.fieldName, uiPos === null || uiPos === void 0 ? void 0 : uiPos.index);
                            break;
                    }
                });
                this.viewModel.updateCellState(interfaces_1.ECellType.topLeft, topLeft.toArray());
                this.viewModel.updateCellState(interfaces_1.ECellType.topRight, topRight.toArray());
                this.viewModel.updateCellState(interfaces_1.ECellType.bottomLeft, bottomLeft.toArray());
                this.viewModel.updateCellState(interfaces_1.ECellType.bottomRight, bottomRight.toArray());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PositionManagerConfig.prototype, "disabledPosition", {
            set: function (_disabledPosition) {
                if (_disabledPosition != null) {
                    this.viewModel.disabledCells = this.viewModel.mapDisabledPositionsToCellType(_disabledPosition);
                }
            },
            enumerable: false,
            configurable: true
        });
        PositionManagerConfig.prototype.addWidgetToPositionManager = function (uiPosition) {
            var cellPositioning;
            switch (uiPosition.position) {
                case interfaces_1.ECellType.topLeft:
                    cellPositioning = interfaces_1.ECellType.topLeft;
                    break;
                case interfaces_1.ECellType.topRight:
                    cellPositioning = interfaces_1.ECellType.topRight;
                    break;
                case interfaces_1.ECellType.bottomLeft:
                    cellPositioning = interfaces_1.ECellType.bottomLeft;
                    break;
                case interfaces_1.ECellType.bottomRight:
                    cellPositioning = interfaces_1.ECellType.bottomRight;
                    break;
            }
            if (uiPosition.position == null) {
                cellPositioning = interfaces_1.ECellType.topRight;
            }
            this.viewModel.addToCellState(cellPositioning, uiPosition);
        };
        PositionManagerConfig.prototype.updateEnabledState = function (fieldName, enabled) {
            this.viewModel.cellTypeMappings.forEach(function (locationUIPositions) {
                locationUIPositions.forEach(function (uiPos) {
                    if (uiPos.fieldName === fieldName) {
                        uiPos.enabledState = enabled;
                    }
                });
            });
            this.scheduleRender();
        };
        PositionManagerConfig.prototype.postInitialize = function () {
            this.titleHeader = this.PositionManagerMessages.headerTitle;
            this.viewModel.PositionManagerMessages = this.PositionManagerMessages;
            if (this.disabledPositionLabel == null) {
                this.disabledPositionLabel = this.PositionManagerMessages.disabledDefaultLabel;
            }
        };
        PositionManagerConfig.prototype.render = function () {
            var _a;
            var widgetInfoToolTip = (_a = this === null || this === void 0 ? void 0 : this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("div", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_rootWidgetDOMNode", class: CSS.base },
                widget_1.tsx("div", { class: this.classes(CSS.header, labelSettingMargin_1.marginClassNames.labelText) },
                    this.titleHeader,
                    " ",
                    widget_1.tsx("div", { class: CSS.tooltip }, widgetInfoToolTip)),
                widget_1.tsx("div", { class: CSS.positionManagerDisplay }, this._renderPosManager())));
        };
        PositionManagerConfig.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        PositionManagerConfig.prototype._renderPosManager = function () {
            return (widget_1.tsx("div", { class: CSS.positionManagerGrid, id: "positionManagerContainer" },
                this._renderPosManagerCell(interfaces_1.ECellType.topLeft, this.viewModel.topLeftListItems, TOP_LEFT_ICON),
                this._renderPosManagerCell(interfaces_1.ECellType.topRight, this.viewModel.topRightListItems, TOP_RIGHT_ICON),
                this._renderPosManagerCell(interfaces_1.ECellType.bottomLeft, this.viewModel.bottomLeftListItems, BOTTOM_LEFT_ICON),
                this._renderPosManagerCell(interfaces_1.ECellType.bottomRight, this.viewModel.bottomRightListItems, BOTTOM_RIGHT_ICON)));
        };
        PositionManagerConfig.prototype._renderPosManagerCell = function (cellType, uiPositions, svgIconUrl) {
            var prettyCellType = this.viewModel.prettyPrintCellType(cellType);
            var isCellDisabled = this.viewModel.disabledCells.includes(cellType);
            var listWrapperDivId = "_valueListWrapperDiv" + prettyCellType.replace(" ", "");
            var listWrapperDivRef = this[listWrapperDivId];
            var quadrantHeaderWrapperDivId = "_quadrantHeaderWrapperDiv" + prettyCellType.replace(" ", "");
            var quadrantHeaderWrapperDivRef = this[quadrantHeaderWrapperDivId];
            uiPositions.sort(function (uiPos1, uiPos2) {
                var enabledState1 = uiPos1.enabledState;
                var enabledState2 = uiPos2.enabledState;
                if (enabledState1 === true && enabledState2 == false) {
                    return -1;
                }
                else if (enabledState1 == false && enabledState2 === true) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return (widget_1.tsx("div", { class: CSS.positionManagerCell, key: "cell-" + cellType, id: "cell-" + cellType, "data-cell-type": cellType },
                this._renderQuadrantHeader(quadrantHeaderWrapperDivId, svgIconUrl, prettyCellType),
                widget_1.tsx("div", { bind: this, class: CSS.positionManagerCellListWrapper, afterCreate: widget_1.storeNode, "data-node-ref": listWrapperDivId },
                    this._renderCalciteValueListControl(isCellDisabled, cellType, uiPositions),
                    this._renderEmptyCell(uiPositions, cellType, isCellDisabled, listWrapperDivRef, quadrantHeaderWrapperDivRef))));
        };
        PositionManagerConfig.prototype._renderQuadrantHeader = function (quadrantHeaderWrapperDivId, svgIconUrl, prettyCellType) {
            return (widget_1.tsx("div", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": quadrantHeaderWrapperDivId, class: CSS.positionManagerCellHeader },
                widget_1.tsx("img", { src: this.rootDistPath + "/" + svgIconUrl, width: "16px" }),
                widget_1.tsx("span", { class: CSS.cellHeaderTitle }, prettyCellType)));
        };
        PositionManagerConfig.prototype._renderCalciteValueListControl = function (isCellDisabled, cellType, uiPositions) {
            var _this = this;
            return (!isCellDisabled && (widget_1.tsx("calcite-value-list", { bind: this, class: this.classes(CSS.positionManagerCellList, CSS.noSelect), key: "value-list-" + cellType, id: "value-list-" + cellType, "data-cell-type": cellType, "drag-enabled": "true", afterCreate: function (valueList) {
                    setTimeout(_this._setupSortableProperties.bind(_this, valueList), _this._attemptInterval_ms);
                    _this.scheduleRender();
                } }, uiPositions.map(function (uiPos) {
                return _this._renderValueListItem(cellType, uiPos);
            }).toArray())));
        };
        PositionManagerConfig.prototype._renderEmptyCell = function (uiPositions, cellType, isCellDisabled, listWrapperDivRef, quadrantHeaderWrapperDivRef) {
            return (uiPositions.length === 0 || this._areAllPositionsDisabled(uiPositions, cellType) || isCellDisabled ? (widget_1.tsx("div", { class: CSS.dragHereText, styles: {
                    "top": (listWrapperDivRef === null || listWrapperDivRef === void 0 ? void 0 : listWrapperDivRef.clientHeight) ?
                        ((listWrapperDivRef === null || listWrapperDivRef === void 0 ? void 0 : listWrapperDivRef.clientHeight) / 2) - ((listWrapperDivRef === null || listWrapperDivRef === void 0 ? void 0 : listWrapperDivRef.clientHeight) === 100 ? 10 : quadrantHeaderWrapperDivRef === null || quadrantHeaderWrapperDivRef === void 0 ? void 0 : quadrantHeaderWrapperDivRef.clientHeight) + "px"
                        : "0px",
                    "color": isCellDisabled ? null : "#007AC2",
                } }, this._renderEmptyCellMessage(isCellDisabled))) : null);
        };
        PositionManagerConfig.prototype._renderEmptyCellMessage = function (isCellDisabled) {
            return (isCellDisabled ? this.disabledPositionLabel : this.PositionManagerMessages.dragToolsHere);
        };
        PositionManagerConfig.prototype._areAllPositionsDisabled = function (uiPositions, celltype) {
            var res = uiPositions
                .map(function (uiPos) { return uiPos.enabledState; })
                .reduce(function (acc, curr) {
                return !curr && acc;
            }, true);
            return res;
        };
        PositionManagerConfig.prototype._renderValueListItem = function (cellType, uiPos) {
            var widgetName = uiPos.fieldName;
            var displayStyles = { "display": uiPos.enabledState ? "" : "none" };
            var valListItemId = "value-list-item-" + widgetName;
            var valListItemActionBtnId = "value-list-item-action-btn-" + widgetName;
            return (widget_1.tsx("calcite-value-list-item", { class: this.classes(CSS.cellListItem, CSS.noSelect), styles: displayStyles, key: valListItemId, id: valListItemId, "data-cell-type": cellType, label: uiPos.label, value: widgetName, bind: this, "non-interactive": true }));
        };
        PositionManagerConfig.prototype._setupSortableProperties = function (valList) {
            var sortableKey = Object.keys(valList).find(function (key) { return key.includes("Sortable"); });
            if (sortableKey == undefined || valList[sortableKey] == undefined || valList[sortableKey].options == undefined) {
                setTimeout(this._setupSortableProperties.bind(this, valList), this._attemptInterval_ms);
            }
            else {
                valList[sortableKey].options.group.name = SORTABLE_GROUP_NAME;
                this._setupSortableListeners(valList, sortableKey);
            }
        };
        PositionManagerConfig.prototype._setupSortableListeners = function (valList, sortableKey) {
            var _this = this;
            valList[sortableKey].options.onAdd = function (addEvent) {
                addEvent.item.dataset.cellType = addEvent.to.dataset.cellType;
                valList["items"] = Array.from(valList.children);
                _this._updateCellState(valList);
            };
            valList.addEventListener("calciteListOrderChange", function () {
                _this._updateCellState(valList);
            });
            valList[sortableKey].options.onRemove = function (removeEvent) {
                valList["items"] = Array.from(valList.children);
                _this._updateCellState(valList);
            };
        };
        PositionManagerConfig.prototype._updateCellState = function (valList) {
            this.viewModel.updateCellState(valList.dataset.cellType, Array.from(valList.children).map(function (valListItem) { return valListItem.value; }));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "uiPositions", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "disabledPosition", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "disabledPositionLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            }),
            decorators_1.aliasOf("viewModel.outputJSON")
        ], PositionManagerConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/PositionManagerConfig/resources")
        ], PositionManagerConfig.prototype, "PositionManagerMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "titleHeader", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_totalValueLists", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_handles", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.rootWidgetDOMNode"),
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_rootWidgetDOMNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_attemptInterval_ms", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "rootDistPath", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_valueListWrapperDivTopLeft", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_valueListWrapperDivTopRight", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_valueListWrapperDivBottomLeft", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_valueListWrapperDivBottomRight", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_quadrantHeaderWrapperDivTopLeft", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_quadrantHeaderWrapperDivTopRight", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_quadrantHeaderWrapperDivBottomLeft", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfig.prototype, "_quadrantHeaderWrapperDivBottomRight", void 0);
        PositionManagerConfig = tslib_1.__decorate([
            decorators_1.subclass("PositionManagerConfig")
        ], PositionManagerConfig);
        return PositionManagerConfig;
    }(BaseComponent));
    return PositionManagerConfig;
});
