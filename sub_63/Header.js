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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, decorators_1, Widget, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSS = {
        footer: "footer top-nav",
        header: "top-nav fade-in",
        title: "top-nav-title app-header truncate"
    };
    var toolbarId = "toolContainer";
    var Header = /** @class */ (function (_super) {
        __extends(Header, _super);
        function Header(params) {
            return _super.call(this, params) || this;
        }
        Header.prototype.render = function () {
            var titleLink = this.config.titleLink ? widget_1.tsx("span", null,
                widget_1.tsx("a", { target: "_blank", rel: "noopener", href: this.config.titleLink }, this.config.title)) : widget_1.tsx("span", null, this.config.title);
            var titleContainer = widget_1.tsx("div", { class: "column-24 app-header" },
                widget_1.tsx("div", null,
                    widget_1.tsx("a", { class: "skip-to-content", href: "#skip-to-content" }, "Skip To Content"),
                    widget_1.tsx("div", { class: CSS.title }, titleLink)),
                widget_1.tsx("div", { id: toolbarId, class: "top-nav-list right" }));
            var content = this.config.headerPosition === "top" ?
                widget_1.tsx("header", null, titleContainer)
                : widget_1.tsx("footer", null, titleContainer);
            return (widget_1.tsx("div", null, content));
        };
        Header.prototype.getToolbar = function () {
            return document.getElementById(toolbarId);
            ;
        };
        __decorate([
            decorators_1.property()
        ], Header.prototype, "config", void 0);
        Header = __decorate([
            decorators_1.subclass("app.Header")
        ], Header);
        return Header;
    }((Widget)));
    exports.default = Header;
});
//# sourceMappingURL=Header.js.map