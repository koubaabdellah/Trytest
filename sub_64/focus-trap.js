define(["require", "exports", "tslib", "./debounce", "./focusable", "./shadow"], function (require, exports, tslib_1, debounce_1, focusable_1, shadow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FocusTrap = void 0;
    var template = document.createElement("template");
    template.innerHTML = "\n\t<div id=\"start\"></div>\n\t<div id=\"backup\"></div>\n\t<slot></slot>\n\t<div id=\"end\"></div>\n";
    var FocusTrap = (function (_super) {
        tslib_1.__extends(FocusTrap, _super);
        function FocusTrap() {
            var _this = _super.call(this) || this;
            _this.debounceId = Math.random().toString();
            _this._focused = false;
            var shadow = _this.attachShadow({ mode: "open" });
            shadow.appendChild(template.content.cloneNode(true));
            _this.$backup = shadow.querySelector("#backup");
            _this.$start = shadow.querySelector("#start");
            _this.$end = shadow.querySelector("#end");
            _this.focusLastElement = _this.focusLastElement.bind(_this);
            _this.focusFirstElement = _this.focusFirstElement.bind(_this);
            _this.onFocusIn = _this.onFocusIn.bind(_this);
            _this.onFocusOut = _this.onFocusOut.bind(_this);
            return _this;
        }
        Object.defineProperty(FocusTrap, "observedAttributes", {
            get: function () {
                return ["inactive"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FocusTrap.prototype, "inactive", {
            get: function () {
                return this.hasAttribute("inactive");
            },
            set: function (value) {
                value
                    ? this.setAttribute("inactive", "")
                    : this.removeAttribute("inactive");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FocusTrap.prototype, "focused", {
            get: function () {
                return this._focused;
            },
            enumerable: false,
            configurable: true
        });
        FocusTrap.prototype.connectedCallback = function () {
            this.$start.addEventListener("focus", this.focusLastElement);
            this.$end.addEventListener("focus", this.focusFirstElement);
            this.addEventListener("focusin", this.onFocusIn);
            this.addEventListener("focusout", this.onFocusOut);
            this.render();
        };
        FocusTrap.prototype.disconnectedCallback = function () {
            this.$start.removeEventListener("focus", this.focusLastElement);
            this.$end.removeEventListener("focus", this.focusFirstElement);
            this.removeEventListener("focusin", this.onFocusIn);
            this.removeEventListener("focusout", this.onFocusOut);
        };
        FocusTrap.prototype.attributeChangedCallback = function () {
            this.render();
        };
        FocusTrap.prototype.focusFirstElement = function () {
            this.trapFocus();
        };
        FocusTrap.prototype.focusLastElement = function () {
            this.trapFocus(true);
        };
        FocusTrap.prototype.getFocusableElements = function () {
            return shadow_1.queryShadowRoot(this, focusable_1.isHidden, focusable_1.isFocusable);
        };
        FocusTrap.prototype.trapFocus = function (trapToEnd) {
            if (this.inactive) {
                return;
            }
            var focusableElements = this.getFocusableElements();
            if (focusableElements.length > 0) {
                if (trapToEnd) {
                    focusableElements[focusableElements.length - 1].focus();
                }
                else {
                    focusableElements[0].focus();
                }
                this.$backup.setAttribute("tabindex", "-1");
            }
            else {
                this.$backup.setAttribute("tabindex", "0");
                this.$backup.focus();
            }
        };
        FocusTrap.prototype.onFocusIn = function () {
            this.updateFocused(true);
        };
        FocusTrap.prototype.onFocusOut = function () {
            this.updateFocused(false);
        };
        FocusTrap.prototype.updateFocused = function (value) {
            var _this = this;
            debounce_1.debounce(function () {
                if (_this.focused !== value) {
                    _this._focused = value;
                    _this.render();
                }
            }, 0, this.debounceId);
        };
        FocusTrap.prototype.render = function () {
            this.$start.setAttribute("tabindex", !this.focused || this.inactive ? "-1" : "0");
            this.$end.setAttribute("tabindex", !this.focused || this.inactive ? "-1" : "0");
            this.focused
                ? this.setAttribute("focused", "")
                : this.removeAttribute("focused");
        };
        return FocusTrap;
    }(HTMLElement));
    exports.FocusTrap = FocusTrap;
    window.customElements.define("focus-trap", FocusTrap);
});
