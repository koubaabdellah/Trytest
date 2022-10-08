define(["require", "exports", "tslib", "esri/core/Collection", "../../../utils/appUtils", "./interfaces"], function (require, exports, tslib_1, Collection_1, appUtils_1, interfaces_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disabledCellsAdjustment = exports.positionToCellType = void 0;
    Collection_1 = tslib_1.__importDefault(Collection_1);
    var DisabledPosition_SpecialKeys = new Collection_1.default(["top", "bottom", "left", "right", "leading", "trailing"]);
    var DisabledPosition_API_convert = new Collection_1.default(["bottom-leading", "bottom-trailing", "top-leading", "top-trailing"]);
    var DisabledPosition_API_usable = new Collection_1.default(["bottom-left", "bottom-right", "top-left", "top-right"]);
    var _isRTL = appUtils_1.isRTL();
    function positionToCellType(position, forceRTL) {
        position = _convertBasedOnRTL(position, forceRTL);
        if (DisabledPosition_API_usable.includes(position)) {
            return new Collection_1.default([position]);
        }
        if (DisabledPosition_SpecialKeys.includes(position)) {
            return DisabledPosition_API_usable.filter(function (usablePosition) {
                return usablePosition.includes(position);
            });
        }
        return new Collection_1.default();
    }
    exports.positionToCellType = positionToCellType;
    function _convertBasedOnRTL(position, forceRTL) {
        if (position.includes("trailing") || position.includes("leading")) {
            if (_isRTL || forceRTL) {
                position = position.replace("trailing", "left");
                position = position.replace("leading", "right");
                return position;
            }
            else {
                position = position.replace("trailing", "right");
                position = position.replace("leading", "left");
                return position;
            }
        }
        else {
            return position;
        }
    }
    var orderedPositionLookup = new Collection_1.default([
        new Collection_1.default([interfaces_1.ECellType.topLeft, interfaces_1.ECellType.topRight]),
        new Collection_1.default([interfaces_1.ECellType.bottomLeft, interfaces_1.ECellType.bottomRight])
    ]);
    function disabledCellsAdjustment(desiredCell, disabledCells) {
        if (!disabledCells.includes(desiredCell)) {
            return desiredCell;
        }
        else {
            var latticeIndex = lookupPositionInLattice(desiredCell);
            var rowFlip = latticeLookup([(latticeIndex[0] + 1) % 2, latticeIndex[1]]);
            if (!disabledCells.includes(rowFlip)) {
                return rowFlip;
            }
            var columnFlip = latticeLookup([latticeIndex[0], (latticeIndex[1] + 1) % 2]);
            if (!disabledCells.includes(columnFlip)) {
                return columnFlip;
            }
            var rotation = latticeLookup([(latticeIndex[0] + 1) % 2, (latticeIndex[1] + 1) % 2]);
            if (!disabledCells.includes(rotation)) {
                return rotation;
            }
            return null;
        }
    }
    exports.disabledCellsAdjustment = disabledCellsAdjustment;
    function lookupPositionInLattice(cell) {
        var topRow = orderedPositionLookup.getItemAt(0);
        var bottomRow = orderedPositionLookup.getItemAt(1);
        var yIndex = topRow.findIndex(function (topCell) { return topCell === cell; });
        if (yIndex !== -1) {
            return [0, yIndex];
        }
        yIndex = bottomRow.findIndex(function (bottomCell) { return bottomCell === cell; });
        if (yIndex !== -1) {
            return [1, yIndex];
        }
        return null;
    }
    function latticeLookup(latticeIndex) {
        return orderedPositionLookup.getItemAt(latticeIndex[0]).getItemAt(latticeIndex[1]);
    }
});
