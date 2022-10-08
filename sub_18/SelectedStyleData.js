var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, decorators_1, Accessor) {
    "use strict";
    var SelectedStyleData = /** @class */ (function (_super) {
        __extends(SelectedStyleData, _super);
        function SelectedStyleData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.layerItemId = null;
            _this.selectedInfoIndex = null;
            _this.field = null;
            _this.applyStyles = null;
            _this.featureLayerView = null;
            _this.normalizationField = null;
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "layerItemId", void 0);
        __decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "selectedInfoIndex", void 0);
        __decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "field", void 0);
        __decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "applyStyles", void 0);
        __decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "featureLayerView", void 0);
        __decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "normalizationField", void 0);
        SelectedStyleData = __decorate([
            decorators_1.subclass("SelectedStyleData")
        ], SelectedStyleData);
        return SelectedStyleData;
    }(Accessor));
    return SelectedStyleData;
});
//# sourceMappingURL=SelectedStyleData.js.map