define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/core/Collection", "./interfaces", "./PositionManagerUtils"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, Collection, interfaces_1, PositionManagerUtils_1) {
    "use strict";
    var HIGH_INDEX_VALUE = 1000;
    var PositionManagerConfigViewModel = (function (_super) {
        tslib_1.__extends(PositionManagerConfigViewModel, _super);
        function PositionManagerConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.masterItemsList = new Collection();
            _this.topLeftListItems = new Collection();
            _this.topRightListItems = new Collection();
            _this.bottomLeftListItems = new Collection();
            _this.bottomRightListItems = new Collection();
            _this.cellTypeMappings = new Map([
                [interfaces_1.ECellType.topLeft, _this.topLeftListItems],
                [interfaces_1.ECellType.topRight, _this.topRightListItems],
                [interfaces_1.ECellType.bottomLeft, _this.bottomLeftListItems],
                [interfaces_1.ECellType.bottomRight, _this.bottomRightListItems]
            ]);
            _this.disabledCells = new Collection();
            _this._handles = new Handles();
            _this._debounceControl = 0;
            _this._debounceDelay = 100;
            return _this;
        }
        PositionManagerConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        PositionManagerConfigViewModel.prototype.updateDisabledPositions = function (disabled) {
            var _this = this;
            this.disabledCells = this.mapDisabledPositionsToCellType(disabled);
            var masterListCopy = this.masterItemsList.clone();
            this.masterItemsList.removeAll();
            this.topLeftListItems.removeAll();
            this.topRightListItems.removeAll();
            this.bottomLeftListItems.removeAll();
            this.bottomRightListItems.removeAll();
            masterListCopy.forEach(function (uiPos) { _this.addToCellState(uiPos.position, uiPos); });
        };
        PositionManagerConfigViewModel.prototype.mapDisabledPositionsToCellType = function (disabled) {
            if (!Array.isArray(disabled)) {
                disabled = [disabled];
            }
            var disabledSet = new Set();
            disabled.forEach(function (disabledPosition) {
                PositionManagerUtils_1.positionToCellType(disabledPosition).forEach(function (cellType) { return disabledSet.add(cellType); });
            });
            return new Collection(Array.from(disabledSet));
        };
        PositionManagerConfigViewModel.prototype.addToCellState = function (cellType, uiPosition) {
            cellType = PositionManagerUtils_1.disabledCellsAdjustment(cellType, this.disabledCells);
            if (cellType == null) {
                console.error("All Position Manager Cells are disabled. Can't add the following: ", uiPosition);
                return;
            }
            uiPosition.position = cellType;
            this.masterItemsList.add(uiPosition);
            var listItems = this.cellTypeMappings.get(cellType);
            listItems === null || listItems === void 0 ? void 0 : listItems.add(uiPosition, uiPosition.index != null ? uiPosition.index : HIGH_INDEX_VALUE);
            this.generateOutputJSON();
        };
        PositionManagerConfigViewModel.prototype.updateCellState = function (cellType, valueListItems) {
            var _this = this;
            var uiPositions = this.cellTypeMappings.get(cellType);
            uiPositions.removeAll();
            valueListItems.forEach(function (valListItem, newIndex) {
                var foundPos = _this.masterItemsList.find(function (uiPos) { return uiPos.fieldName === valListItem; });
                if (foundPos) {
                    foundPos.index = newIndex;
                    foundPos.position = cellType;
                    uiPositions.add(foundPos);
                }
                else {
                    console.error("::: Position Manager Error ::: " + valListItem + " not found in master list");
                }
            });
            this.generateOutputJSON();
        };
        PositionManagerConfigViewModel.prototype.generateOutputJSON = function () {
            var _this = this;
            var JSONaccumulator = new Collection();
            this.cellTypeMappings.forEach(function (uiPositions) {
                JSONaccumulator.addMany(uiPositions);
            });
            this._debounceControl += 1;
            var output = JSONaccumulator.toArray();
            var localTrackingNum = this._debounceControl;
            setTimeout(function () {
                if (_this._debounceControl === localTrackingNum) {
                    _this.outputJSON = output;
                }
            }, this._debounceDelay);
        };
        PositionManagerConfigViewModel.prototype.actionButtonKeyUpSetup = function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Enter" || event.key === " ") {
                this._createDropDownForCrossListMovement({ x: 0, y: 0 }, event.srcElement);
            }
        };
        PositionManagerConfigViewModel.prototype.actionButtonClickSetup = function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.clientX === 0 && event.clientY === 0) {
                return;
            }
            this._createDropDownForCrossListMovement({ x: event.clientX, y: event.clientY }, event.srcElement);
        };
        PositionManagerConfigViewModel.prototype.prettyPrintCellType = function (cellType) {
            var _a = this.PositionManagerMessages, bottomLeft = _a.bottomLeft, bottomRight = _a.bottomRight, topLeft = _a.topLeft, topRight = _a.topRight;
            switch (cellType) {
                case interfaces_1.ECellType.bottomLeft:
                    return bottomLeft;
                case interfaces_1.ECellType.bottomRight:
                    return bottomRight;
                case interfaces_1.ECellType.topLeft:
                    return topLeft;
                case interfaces_1.ECellType.topRight:
                    return topRight;
            }
        };
        PositionManagerConfigViewModel.prototype.findCalciteValueList = function (cellListToFind) {
            if (this._calciteLists == null) {
                this._calciteLists = this.rootWidgetDOMNode.querySelectorAll("calcite-value-list");
            }
            for (var x = 0; x < this._calciteLists.length; x++) {
                var valList = this._calciteLists[x];
                var valListCellType = valList.dataset.cellType;
                if (valListCellType === cellListToFind) {
                    return valList;
                }
            }
        };
        PositionManagerConfigViewModel.prototype.isWidgetAlreadyAdded = function (widgetName) {
            var isWidgetInAList = false;
            this.cellTypeMappings.forEach(function (uiPositionList) {
                isWidgetInAList = isWidgetInAList || uiPositionList.map(function (uiPos) { return uiPos.fieldName; }).includes(widgetName);
            });
            return isWidgetInAList;
        };
        PositionManagerConfigViewModel.prototype._createDropDownForCrossListMovement = function (coords, actionButton) {
            var widgetListItem = actionButton.parentElement;
            var _a = this._decideLocationForDropDown(coords, actionButton), x = _a.x, y = _a.y;
            var dropDownMenu = this._createCrossListMoveDropDown(x, y);
            var valList = document.createElement("calcite-value-list");
            dropDownMenu.appendChild(valList);
            var destinationOptions = this._returnOtherCells(widgetListItem.dataset.cellType);
            destinationOptions.map(this._createMoveDropDownItem.bind(this, dropDownMenu, valList, widgetListItem));
            document.body.appendChild(dropDownMenu);
            valList.setFocus();
        };
        PositionManagerConfigViewModel.prototype._decideLocationForDropDown = function (coords, actionButton) {
            if (coords.x === 0 && coords.y === 0) {
                var rect = actionButton.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            }
            else {
                return {
                    x: coords.x,
                    y: coords.y
                };
            }
        };
        PositionManagerConfigViewModel.prototype._createCrossListMoveDropDown = function (x, y) {
            var _this = this;
            var dropdownDiv = document.createElement("div");
            dropdownDiv.addEventListener("focusout", function (e) {
                _this._removeElement(dropdownDiv);
            });
            dropdownDiv.style.position = "absolute";
            dropdownDiv.style.left = x + "px";
            dropdownDiv.style.top = y + "px";
            return dropdownDiv;
        };
        PositionManagerConfigViewModel.prototype._createMoveDropDownItem = function (dropDownMenu, valList, widgetListItem, listItemValue) {
            var valListItem = document.createElement("calcite-value-list-item");
            valListItem.className = "cross-list-movement-option";
            valListItem.label = this.prettyPrintCellType(listItemValue);
            valListItem.value = listItemValue;
            valListItem.addEventListener("keyup", this._movementOptionKeyUp.bind(this, dropDownMenu, widgetListItem));
            valListItem.addEventListener("click", this._movementOptionClick.bind(this, dropDownMenu, widgetListItem));
            valListItem.addEventListener("focusout", this._movementOptionFocusOut);
            valList.appendChild(valListItem);
        };
        PositionManagerConfigViewModel.prototype._movementOptionFocusOut = function (e) {
            var _a;
            if ((_a = e === null || e === void 0 ? void 0 : e.relatedTarget) === null || _a === void 0 ? void 0 : _a.classList.contains("cross-list-movement-option")) {
                e.stopImmediatePropagation();
            }
        };
        PositionManagerConfigViewModel.prototype._movementOptionClick = function (dropDownMenu, widgetListItem, e) {
            var beginStr = widgetListItem.dataset.cellType;
            var destStr = e.target.value;
            this._performMoveBetweenLists(widgetListItem, this.findCalciteValueList(beginStr), this.findCalciteValueList(destStr));
            this._removeElement(dropDownMenu);
        };
        PositionManagerConfigViewModel.prototype._movementOptionKeyUp = function (dropDownMenu, widgetListItem, e) {
            if (e.code === "Enter" || e.code === "Space") {
                var beginStr = widgetListItem.dataset.cellType;
                var destStr = e.target.value;
                this._performMoveBetweenLists(widgetListItem, this.findCalciteValueList(beginStr), this.findCalciteValueList(destStr));
                this._removeElement(dropDownMenu);
            }
            else if (e.code === "Escape") {
                this._removeElement(dropDownMenu);
            }
        };
        PositionManagerConfigViewModel.prototype._removeElement = function (element) {
            try {
                element.remove();
            }
            catch (err) {
            }
        };
        PositionManagerConfigViewModel.prototype._returnOtherCells = function (cellType) {
            return Object.keys(interfaces_1.ECellType)
                .map(function (key) { return interfaces_1.ECellType[key]; })
                .filter(function (enumStr) { return enumStr !== cellType; });
        };
        PositionManagerConfigViewModel.prototype._performMoveBetweenLists = function (itemToMove, beginningList, destinationList) {
            beginningList.removeChild(itemToMove);
            destinationList.appendChild(itemToMove);
            itemToMove.dataset.cellType = destinationList.dataset
                .cellType;
            this.updateCellState(beginningList.dataset.cellType, Array.from(beginningList.children).map(function (valListItem) { return valListItem.value; }));
            this.updateCellState(destinationList.dataset.cellType, Array.from(destinationList.children).map(function (valListItem) { return valListItem.value; }));
            itemToMove.children[itemToMove.children.length - 1].click();
            setTimeout(function () {
                destinationList.setFocus();
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfigViewModel.prototype, "PositionManagerMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfigViewModel.prototype, "disabledCells", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfigViewModel.prototype, "_handles", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfigViewModel.prototype, "_calciteLists", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PositionManagerConfigViewModel.prototype, "rootWidgetDOMNode", void 0);
        PositionManagerConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("PositionManagerConfigViewModel")
        ], PositionManagerConfigViewModel);
        return PositionManagerConfigViewModel;
    }(Accessor));
    return PositionManagerConfigViewModel;
});
