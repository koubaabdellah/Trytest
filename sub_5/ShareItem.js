/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.​
*/
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
    var ShareItem = /** @class */ (function (_super) {
        __extends(ShareItem, _super);
        function ShareItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = null;
            _this.name = null;
            _this.className = null;
            _this.urlTemplate = null;
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], ShareItem.prototype, "id", void 0);
        __decorate([
            decorators_1.property()
        ], ShareItem.prototype, "name", void 0);
        __decorate([
            decorators_1.property()
        ], ShareItem.prototype, "className", void 0);
        __decorate([
            decorators_1.property()
        ], ShareItem.prototype, "urlTemplate", void 0);
        ShareItem = __decorate([
            decorators_1.subclass('ShareItem')
        ], ShareItem);
        return ShareItem;
    }((Accessor)));
    return ShareItem;
});
//# sourceMappingURL=ShareItem.js.map