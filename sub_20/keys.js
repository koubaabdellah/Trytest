define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyEventTypes = exports.KeyCodes = void 0;
    var KeyCodes;
    (function (KeyCodes) {
        KeyCodes["Space"] = "Space";
        KeyCodes["Enter"] = "Enter";
        KeyCodes["Escape"] = "Escape";
        KeyCodes["Tab"] = "Tab";
        KeyCodes["Down"] = "ArrowDown";
        KeyCodes["Up"] = "ArrowUp";
    })(KeyCodes = exports.KeyCodes || (exports.KeyCodes = {}));
    var KeyEventTypes;
    (function (KeyEventTypes) {
        KeyEventTypes["KeyDown"] = "keydown";
        KeyEventTypes["KeyUp"] = "keyup";
    })(KeyEventTypes = exports.KeyEventTypes || (exports.KeyEventTypes = {}));
});
